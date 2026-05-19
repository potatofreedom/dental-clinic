import { Link } from 'react-router-dom'
import { directions } from '../data/services'

export default function Footer() {
  return (
    <footer className="bg-primary text-white/90">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Col 1 — Logo & description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/3.svg" alt="Логотип" className="w-10 h-10" />
              <span className="font-heading text-lg">Dental Studio</span>
            </div>
            <p className="text-accent-soft text-sm leading-relaxed">
              Премиальная стоматологическая клиника с индивидуальным подходом к каждому пациенту.
            </p>
          </div>

          {/* Col 2 — Directions */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-[0.1em] text-accent-soft mb-4">
              Направления
            </h4>
            <ul className="space-y-2">
              {directions.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/services/${d.slug}`}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacts */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-[0.1em] text-accent-soft mb-4">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>г. Москва, ул. Примерная, д. 1</li>
              <li>
                <a href="tel:+70001234567" className="hover:text-white transition-colors">
                  +7 (000) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@dentalclinic.ru" className="hover:text-white transition-colors">
                  info@dentalclinic.ru
                </a>
              </li>
              <li>
                Пн–Пт: 9:00–21:00<br />
                Сб: 10:00–18:00<br />
                Вс: выходной
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} Dental Studio. Все права защищены.</span>
          <div className="flex gap-4">
            <span>ООО &laquo;Клиника&raquo;, ИНН 0000000000</span>
            <Link to="/contacts" className="hover:text-white/70 transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
