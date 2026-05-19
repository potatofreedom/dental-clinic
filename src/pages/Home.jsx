import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import ContactBlock from '../components/ContactBlock'
import { directions } from '../data/services'

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

// Interactive flowing lines that respond to mouse
function FlowingHero() {
  const svgRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    let raf
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll('.flow-path')
    const update = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      paths.forEach((path, i) => {
        const offset = (i + 1) * 15
        const cy1 = 200 + (my - 0.5) * offset + Math.sin(Date.now() / (2000 + i * 400)) * 20
        const cy2 = 300 + (my - 0.5) * offset * 0.7 + Math.cos(Date.now() / (1800 + i * 300)) * 15
        const cx1 = 300 + (mx - 0.5) * offset
        const cx2 = 700 + (mx - 0.5) * offset * 0.5
        path.setAttribute('d', `M-50 ${250 + i * 40} C${cx1} ${cy1}, ${cx2} ${cy2}, 1050 ${260 + i * 30}`)
      })
      raf = requestAnimationFrame(update)
    }

    const onMove = (e) => {
      const rect = svg.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    svg.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(update)
    return () => {
      cancelAnimationFrame(raf)
      svg.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      fill="none"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          className="flow-path"
          d={`M-50 ${250 + i * 40} C300 ${200 + i * 20}, 700 ${300 + i * 15}, 1050 ${260 + i * 30}`}
          stroke="var(--color-accent)"
          strokeWidth={1.2 - i * 0.15}
          opacity={0.12 - i * 0.015}
          strokeLinecap="round"
        />
      ))}
      {/* Accent dots along the curves */}
      <circle cx="250" cy="240" r="3" fill="var(--color-accent)" opacity="0.15" />
      <circle cx="500" cy="270" r="4" fill="var(--color-primary)" opacity="0.08" />
      <circle cx="750" cy="250" r="2.5" fill="var(--color-accent)" opacity="0.12" />
    </svg>
  )
}

// Decorative section divider — flowing wave
function WaveDivider() {
  return (
    <div className="w-full overflow-hidden -my-px">
      <svg className="w-full h-16 md:h-24 text-accent/[0.07]" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none">
        <path
          d="M0 60 C200 20, 400 80, 600 50 C800 20, 1000 70, 1200 40"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M0 70 C200 40, 400 90, 600 60 C800 30, 1000 80, 1200 50"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}

const bgDotsStyle = {
  backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}

export default function Home() {
  useEffect(() => {
    document.title = 'Стоматологическая клиника — Современная стоматология бизнес-класса'
  }, [])

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background dots */}
        <div className="absolute inset-0 opacity-[0.04]" style={bgDotsStyle} />

        {/* Interactive flowing lines */}
        <div className="absolute inset-0 hidden lg:block">
          <FlowingHero />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 py-32 relative z-10">
          <div className="max-w-2xl">
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
                href="#directions"
                className="inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full hover:bg-primary-hover transition-colors duration-200"
              >
                Направления
              </a>
              <Link
                to="/contacts"
                className="inline-flex items-center gap-2 border border-border text-text font-medium px-7 py-3.5 rounded-full hover:bg-surface-alt transition-colors duration-200"
              >
                Связаться
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.15em] text-text-muted">Прокрутите</span>
          <div className="w-px h-8 bg-border" />
        </div>
      </section>

      <WaveDivider />

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

      <WaveDivider />

      {/* Directions */}
      <section id="directions" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading number="02" title="Направления" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {directions.map((d) => (
              <ServiceCard key={d.slug} direction={d} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider />

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
