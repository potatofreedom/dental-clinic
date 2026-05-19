import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import ContactBlock from '../components/ContactBlock'
import { services } from '../data/services'

const facts = [
  { number: '15+', label: 'лет опыта' },
  { number: '3D', label: 'диагностика' },
  { number: '12', label: 'врачей' },
]

const whyUs = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.2}>
        <rect x="4" y="4" width="32" height="32" rx="8" />
        <path d="M14 20h12M20 14v12" />
      </svg>
    ),
    title: 'Технологии',
    text: 'Цифровое сканирование, 3D-диагностика и навигационная хирургия для максимальной точности.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="20" cy="14" r="6" />
        <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" />
      </svg>
    ),
    title: 'Врачи',
    text: 'Специалисты с международным опытом и постоянным повышением квалификации.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.2}>
        <path d="M20 8l2.5 7.5H30l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
      </svg>
    ),
    title: 'Подход',
    text: 'Индивидуальный план лечения с учётом ваших пожеланий и особенностей.',
  },
]

export default function Home() {
  useEffect(() => {
    document.title = 'Стоматологическая клиника — Современная стоматология бизнес-класса'
  }, [])

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background dots */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto w-full px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] text-text mb-6">
              Стоматология,
              <br />
              <em className="font-heading">которой доверяют</em>
            </h1>
            <p className="text-text-muted text-lg md:text-xl max-w-md mb-8 leading-relaxed">
              Современные технологии, опытные врачи и индивидуальный подход к каждому пациенту.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full hover:bg-primary-hover transition-colors duration-200"
              >
                Узнать о направлениях
              </a>
              <Link
                to="/contacts"
                className="inline-flex items-center gap-2 border border-border text-text font-medium px-7 py-3.5 rounded-full hover:bg-surface-alt transition-colors duration-200"
              >
                Связаться
              </Link>
            </div>
          </div>

          {/* Decorative geometric composition */}
          <div className="hidden lg:flex items-center justify-center relative h-[400px]">
            {/* Outer ring */}
            <div className="absolute w-80 h-80 rounded-full border border-accent/20 animate-pulse" />
            {/* Middle ring */}
            <div className="absolute w-60 h-60 rounded-full border border-primary/15" />
            {/* Inner glow */}
            <div className="absolute w-40 h-40 rounded-full bg-accent-soft/20" />
            {/* Crosshair lines */}
            <svg className="absolute w-80 h-80 text-border" viewBox="0 0 320 320" fill="none" stroke="currentColor" strokeWidth="0.5">
              <line x1="160" y1="40" x2="160" y2="280" opacity="0.4" />
              <line x1="40" y1="160" x2="280" y2="160" opacity="0.4" />
              {/* Corner arcs */}
              <path d="M100 60 A100 100 0 0 1 260 160" opacity="0.2" />
              <path d="M60 220 A100 100 0 0 1 220 60" opacity="0.15" />
            </svg>
            {/* Center plus icon */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-[0_8px_40px_-12px_rgba(30,77,140,0.12)]">
              <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.15em] text-text-muted">Прокрутите</span>
          <div className="w-px h-8 bg-border" />
        </div>
      </section>

      {/* About */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-text leading-tight">
                Точность.<br />Эстетика.<br />Забота.
              </h2>
            </div>

            <div>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Наша клиника объединяет передовые технологии и многолетний опыт для достижения идеального результата. Мы используем цифровое планирование лечения и минимально инвазивные методики.
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-10">
                Каждый пациент получает индивидуальный план лечения, составленный командой специалистов. Мы ценим ваше время, комфорт и доверие.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {facts.map((f) => (
                  <div key={f.label}>
                    <div className="font-heading text-3xl md:text-4xl text-primary mb-1">{f.number}</div>
                    <div className="text-text-muted text-sm">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading number="02" title="Направления" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading number="03" title="Почему мы" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-surface border border-border rounded-2xl p-8"
              >
                <div className="text-primary mb-5">{item.icon}</div>
                <h3 className="font-heading text-xl text-text mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <ContactBlock />
        </div>
      </section>
    </PageWrapper>
  )
}
