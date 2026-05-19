# CLAUDE.md — terminal-ws

Это Go-сервис реального времени для системы записи грузовых автомобилей на контейнерный терминал. Он принимает WebSocket-соединения от 1С, Rails-приложения и браузеров водителей, управляет состоянием таймслотов через Redis и транслирует обновления всем клиентам.

---

## Архитектурные принципы

**Не хранить состояние в памяти.** Всё важное — токены, состояния слотов, локи — живёт в Redis. Если процесс упал и поднялся, клиенты переподключились, данные не потеряны.

**Hub — единственный регистр соединений.** Hub запускается как одна горутина. Только она читает и пишет в `map[*Client]bool`. Никаких мьютексов на эту map — race condition исключён структурно.

**Одна горутина пишет в WS.** У каждого клиента есть `writePump` — единственная горутина, которая вызывает `conn.WriteMessage`. Никаких конкурентных записей в одно соединение.

**Бизнес-логика не в хендлерах.** Хендлеры десериализуют сообщение, валидируют и вызывают `SlotService` или `TokenService`. Логика захвата, сброса, подтверждения — только в `internal/slots`.

**Ошибки — явные.** Возвращать `error` везде где возможен сбой. Не паниковать, кроме старта (невозможно подключиться к Redis при init — паника оправдана, сервис без Redis бесполезен).

---

## Структура пакетов

```
internal/
├── config/         Конфиг из env. Валидация при старте — приложение не стартует без обязательных переменных.
├── hub/            Hub + Client. Управление соединениями, broadcast, read/write pump.
├── handler/        HTTP хендлеры. Upgrade до WS, роутинг сообщений по типу.
├── slots/          Бизнес-логика слотов. SetSchedule, Capture, Confirm, Release, ForceUpdate.
├── token/          Создание и валидация токенов водителей в Redis.
├── sms/            Публикация SMS-задачи (RPUSH в Redis или HTTP к Rails).
├── redis/          Тонкая обёртка над go-redis. Pub/Sub подписка для multi-instance.
├── middleware/      Auth middleware. Recovery middleware.
└── message/        Типы всех сообщений. Валидация обязательных полей.
```

Пакеты не импортируют друг друга циклически. Зависимости направлены внутрь:
`handler → slots, token, sms, hub, message`
`slots → redis`
`token → redis`
`hub → (ничего из internal, только stdlib + go-redis для pub/sub)`

---

## Ключевые файлы и их ответственность

### `cmd/server/main.go`
Точка входа. Инициализация в строгом порядке:
1. Загрузить конфиг (`config.Load()`) — паника если не валиден
2. Подключить Redis — паника если недоступен
3. Создать Hub, запустить `hub.Run()` в горутине
4. Зарегистрировать Pub/Sub подписку Redis
5. Зарегистрировать HTTP хендлеры
6. Запустить `http.ListenAndServe`
7. Graceful shutdown по SIGTERM/SIGINT (дать клиентам 10 сек на отключение)

### `internal/hub/hub.go`
```go
type Hub struct {
    clients    map[*Client]bool      // только читается/пишется в Run()
    broadcast  chan []byte            // сообщение → всем клиентам
    register   chan *Client
    unregister chan *Client
    redis      *redis.Client
}

func (h *Hub) Run() {
    // Единственный select-loop. Никаких мьютексов.
}
```

Broadcast не блокирующий: если `client.send` переполнен (клиент завис) — закрыть соединение, не ждать.

### `internal/hub/client.go`
```go
type Client struct {
    hub    *Hub
    conn   *websocket.Conn
    send   chan []byte      // буферизованный, 256 сообщений
    role   ClientRole       // RoleOneC | RoleApp | RoleDriver
    passID string           // для RoleDriver
    token  string           // для RoleDriver (для инвалидации)
}
```

`readPump` — горутина чтения. Устанавливает `ReadDeadline = now + 90s`, обновляет при каждом `pong`.  
`writePump` — горутина записи. Тикер 30s для `ping`. При `send` закрытом или `WriteDeadline` — выход.

### `internal/slots/service.go`
Все публичные методы принимают контекст (`context.Context`) и возвращают `error`.

```go
type Service struct {
    redis *redis.Client
}

func (s *Service) SetSchedule(ctx context.Context, date string, slots []SlotItem) error
func (s *Service) Capture(ctx context.Context, slotID, passID, date string) error   // SET NX EX
func (s *Service) Confirm(ctx context.Context, slotID, passID, date string) error
func (s *Service) Release(ctx context.Context, slotID, passID, date string) error
func (s *Service) ForceUpdate(ctx context.Context, slotID, date string, state int) error
func (s *Service) GetAll(ctx context.Context, date string) ([]SlotState, error)
```

`Capture` использует `redis.SetNX(ctx, "slot_lock:"+slotID, passID, 60*time.Second)`. Если `false` — вернуть `ErrSlotLocked`.

### `internal/message/types.go`
Все типы сообщений — только здесь. Добавляешь новый тип — добавляешь здесь. Хендлер не объявляет inline-структуры.

### `internal/middleware/auth.go`
Проверка Bearer-токена до Upgrade. Для браузеров — проверка `?token=` через `TokenService.Exists()`.
Если не прошёл — HTTP 401, WS не открывается.

---

## Правила написания кода

### Горутины
- Каждая запущенная горутина должна иметь канал для завершения или контекст с отменой.
- `go func()` без механизма остановки — запрещено.
- Логировать запуск/остановку долгоживущих горутин (hub, pubsub listener).

### Каналы
- Используй буферизованные каналы для `send` (буфер 256). Небуферизованные только для сигнализации (done, quit).
- Не закрывай канал со стороны получателя. Только отправитель закрывает.

### Ошибки
- Оборачивать: `fmt.Errorf("slots.Capture: %w", err)`.
- Sentinel errors для бизнес-ошибок: `var ErrSlotLocked = errors.New("slot locked")`.
- В хендлерах: бизнес-ошибки → `ErrorMsg` клиенту, технические ошибки → log + `ErrorMsg` с `INTERNAL_ERROR`.

### Redis
- Все операции с таймаутом: `ctx, cancel := context.WithTimeout(ctx, 3*time.Second)`.
- Lua-скрипт для атомарных операций (check + update в одной транзакции).
- Ключи только через константы:
```go
const (
    KeyToken    = "token:%s"
    KeySlots    = "slots:%s"
    KeySlotLock = "slot_lock:%s"
)
```

### Логирование
- `slog` (Go 1.21+), JSON в production, Text в development.
- Каждый лог-вызов с контекстными атрибутами (`slot_id`, `pass_id`, `client_role`).
- Не логировать токены и номера телефонов (PII).
- Уровни: `DEBUG` — каждое WS-сообщение, `INFO` — бизнес-события, `WARN` — recoverable ошибки, `ERROR` — падения и Redis-сбои.

### Тесты
- Unit-тесты для `slots/service.go` — мокать Redis через интерфейс.
- Integration-тесты с реальным Redis (testcontainers или локальный).
- Всегда запускать с `go test -race ./...` перед коммитом.
- Benchmark для `hub.broadcast` — цель: < 5ms для 500 клиентов.

---

## Конфигурация

Конфиг только из переменных окружения. Никаких конфиг-файлов в продакшне. Никаких дефолтов для секретов.

```go
type Config struct {
    Port              string        // PORT, default "8080"
    Env               string        // ENV, default "production"
    AuthSecret1C      string        // AUTH_SECRET_1C — обязательный
    AuthSecretApp     string        // AUTH_SECRET_APP — обязательный
    RedisURL          string        // REDIS_URL — обязательный
    RedisPubSubChan   string        // REDIS_PUBSUB_CHANNEL, default "slot_updates"
    TokenTTL          time.Duration // TOKEN_TTL_SECONDS, default 3600s
    SlotLockTTL       time.Duration // SLOT_LOCK_TTL_SECONDS, default 60s
    SmsQueueKey       string        // SMS_QUEUE_KEY, default "sms_jobs"
    LogLevel          slog.Level    // LOG_LEVEL, default INFO
}
```

`config.Load()` возвращает ошибку если хоть один обязательный параметр пустой. `main.go` паникует на эту ошибку.

---

## Graceful Shutdown

```
SIGTERM получен
  → hub.shutdown: broadcast пустое сообщение "server_shutdown" всем клиентам
  → дать 10 секунд на закрытие соединений
  → принудительно закрыть оставшиеся
  → закрыть Redis соединение
  → выйти с кодом 0
```

HTTP сервер: `server.Shutdown(ctx)` с таймаутом 15 секунд.

---

## Расширение функциональности

### Добавить новый тип сообщения
1. Добавить структуру в `internal/message/types.go`
2. Добавить `case "новый.тип":` в нужный хендлер (`handler_1c.go`, `handler_app.go`, `handler_client.go`)
3. Добавить бизнес-логику в соответствующий сервис
4. Написать тест

### Добавить новую роль клиента
1. Добавить константу `ClientRole` в `internal/hub/client.go`
2. Добавить эндпоинт в `handler/handler.go`
3. Добавить auth-middleware для новой роли
4. Определить, каким клиентам этой роли нужен broadcast

### Масштабирование (несколько инстансов)
Уже готово: каждый инстанс при получении `slot.update` публикует в Redis Pub/Sub. Все инстансы подписаны на канал и транслируют своим клиентам. Нужно только убедиться, что `REDIS_PUBSUB_CHANNEL` одинаковый у всех инстансов.

---

## Команды разработки

```bash
# Запустить локально
go run ./cmd/server

# Тесты
go test ./...
go test -race ./...
go test -bench=. ./internal/hub/...

# Статический анализ
go vet ./...
staticcheck ./...

# Сборка
go build -o bin/terminal-ws ./cmd/server

# Docker
docker build -t terminal-ws .
docker run --env-file .env -p 8080:8080 terminal-ws
```

---

## Запрещено

- `sync.Map` — использовать обычный map внутри горутины Hub
- `interface{}` / `any` в бизнес-логике — только конкретные типы
- `time.Sleep` в горутинах — использовать `time.After` или `time.NewTicker`
- `log.Fatal` вне `main.go`
- Хардкод секретов, URL, таймаутов — только через конфиг
- Прямая запись в `slots:<date>` из хендлера — только через `SlotService`
- `websocket.Conn.WriteMessage` из нескольких горутин — только из `writePump`
