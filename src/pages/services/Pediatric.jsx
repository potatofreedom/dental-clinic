import { useState, useEffect } from 'react'
import PageWrapper from '../../components/PageWrapper'
import ContactBlock from '../../components/ContactBlock'
import { services } from '../../data/services'

const data = services.find((s) => s.slug === 'pediatric')

export default function Pediatric() {
  const [openItem, setOpenItem] = useState(null)

  useEffect(() => {
    document.title = `${data.title} — Стоматологическая клиника`
  }, [])

  return (
    <PageWrapper>
      {/* Hero — playful but premium */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-text-muted mb-3 block">{data.number} / Направление</span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-text mb-4">{data.title}</h1>
              <p className="text-text-muted text-lg max-w-md leading-relaxed">
                <em className="font-heading">Бережно и нежно</em> — именно так мы работаем с маленькими пациентами.
              </p>
            </div>

            {/* Soft, playful geometric */}
            <div className="flex items-center justify-center">
              <div className="relative animate-[gentlePulse_3s_ease-in-out_infinite]">
                <svg className="w-60 h-60" viewBox="0 0 200 210" fill="none">
                  <defs>
                    <radialGradient id="toothGlow" cx="0.4" cy="0.35" r="0.6">
                      <stop offset="0%" stopColor="white" />
                      <stop offset="100%" stopColor="#F5F0E8" />
                    </radialGradient>
                    <radialGradient id="cheekGlow" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0%" stopColor="#F4D8D0" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#F4D8D0" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Soft background circles */}
                  <circle cx="100" cy="100" r="88" fill="#F4D8D0" opacity="0.12" />
                  <circle cx="100" cy="100" r="68" fill="#F4D8D0" opacity="0.08" />
                  {/* Tooth character */}
                  <path
                    d="M100,32 C76,32 58,50 55,78 C53,96 55,112 62,130 C66,142 71,158 79,170 C83,176 90,174 93,165 L100,148 L107,165 C110,174 117,176 121,170 C129,158 134,142 138,130 C145,112 147,96 145,78 C142,50 124,32 100,32 Z"
                    fill="url(#toothGlow)"
                    stroke="#E8C4BC"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Crown highlight */}
                  <path
                    d="M100,42 C84,42 70,55 68,75 C67,85 68,92 70,98"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.5"
                    fill="none"
                  />
                  {/* Root separation line */}
                  <path
                    d="M100,128 L100,148"
                    stroke="#E8C4BC"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeLinecap="round"
                  />
                  {/* Eyes */}
                  <ellipse cx="86" cy="80" rx="4" ry="4.5" fill="#4A5568" />
                  <ellipse cx="114" cy="80" rx="4" ry="4.5" fill="#4A5568" />
                  {/* Eye highlights */}
                  <circle cx="88" cy="78" r="1.8" fill="white" />
                  <circle cx="116" cy="78" r="1.8" fill="white" />
                  <circle cx="84.5" cy="82" r="0.8" fill="white" opacity="0.6" />
                  <circle cx="112.5" cy="82" r="0.8" fill="white" opacity="0.6" />
                  {/* Gentle smile */}
                  <path d="M89 98 Q100 108 111 98" stroke="#E8A89E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Rosy cheeks */}
                  <circle cx="76" cy="93" r="8" fill="url(#cheekGlow)" />
                  <circle cx="124" cy="93" r="8" fill="url(#cheekGlow)" />
                  {/* Tiny sparkle */}
                  <circle cx="72" cy="55" r="2" fill="#F4D8D0" opacity="0.5" />
                  <circle cx="130" cy="48" r="1.5" fill="#F4D8D0" opacity="0.4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-text mb-10">
            <em className="font-heading">Услуги</em> направления
          </h2>
          <div className="space-y-4">
            {data.items.map((item, i) => (
              <div
                key={item.name}
                className="border border-border rounded-3xl bg-surface"
              >
                <button
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#F4D8D0', color: '#1E4D8C' }}>
                      {i + 1}
                    </span>
                    <span className="font-medium text-text">{item.name}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-text-muted transition-transform duration-200 flex-shrink-0 ${openItem === i ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItem === i && (
                  <div className="px-6 pb-5">
                    <p className="text-text-muted text-sm leading-relaxed pl-11">{item.description}</p>
                    {item.duration && (
                      <p className="text-xs mt-2 pl-11" style={{ color: '#D4918A' }}>Длительность: {item.duration}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'rgba(244,216,208,0.15)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-text mb-10">
            <em className="font-heading">Как проходит</em> приём
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.steps.map((step, i) => (
              <div key={step} className="flex gap-4 items-start">
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full text-sm flex items-center justify-center font-medium"
                  style={{ backgroundColor: '#F4D8D0', color: '#1E4D8C' }}
                >
                  {i + 1}
                </span>
                <p className="text-text-muted pt-1.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <ContactBlock />
        </div>
      </section>
    </PageWrapper>
  )
}
