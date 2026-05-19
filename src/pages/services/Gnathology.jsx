import { useState, useEffect } from 'react'
import PageWrapper from '../../components/PageWrapper'
import ContactBlock from '../../components/ContactBlock'
import { services } from '../../data/services'

const data = services.find((s) => s.slug === 'gnathology')

export default function Gnathology() {
  const [openItem, setOpenItem] = useState(null)

  useEffect(() => {
    document.title = `${data.title} — Стоматологическая клиника`
  }, [])

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-text-muted mb-3 block">{data.number} / Направление</span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-text mb-4">{data.title}</h1>
            <p className="text-text-muted text-lg max-w-lg leading-relaxed">{data.short}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-text mb-10">Услуги направления</h2>
          <div className="space-y-4">
            {data.items.map((item, i) => (
              <div
                key={item.name}
                className="border border-border rounded-2xl bg-surface"
              >
                <button
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-accent font-medium">{String(i + 1).padStart(2, '0')}</span>
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
                    <p className="text-text-muted text-sm leading-relaxed pl-10">{item.description}</p>
                    {item.duration && (
                      <p className="text-xs text-accent mt-2 pl-10">Длительность: {item.duration}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 md:py-32 bg-surface-alt/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-text mb-10">Как проходит приём</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.steps.map((step, i) => (
              <div key={step} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                <p className="text-text-muted pt-1">{step}</p>
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
