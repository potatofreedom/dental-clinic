import { useState, useEffect } from 'react'
import PageWrapper from '../../components/PageWrapper'
import ContactBlock from '../../components/ContactBlock'
import { services } from '../../data/services'

const data = services.find((s) => s.slug === 'veneers')

const shades = [
  { id: 'A1', color: '#F5F0E1', label: 'A1' },
  { id: 'A2', color: '#EDE5CE', label: 'A2' },
  { id: 'A3', color: '#E5D9BC', label: 'A3' },
  { id: 'B1', color: '#F0EDE4', label: 'B1' },
  { id: 'B2', color: '#E8E2D4', label: 'B2' },
  { id: 'C1', color: '#EAE6DB', label: 'C1' },
  { id: 'D2', color: '#E0D8C8', label: 'D2' },
  { id: 'BL1', color: '#FAFAF5', label: 'BL1' },
]

export default function Veneers() {
  const [openItem, setOpenItem] = useState(null)
  const [selectedShade, setSelectedShade] = useState(shades[0])

  useEffect(() => {
    document.title = `${data.title} — Стоматологическая клиника`
  }, [])

  return (
    <PageWrapper>
      {/* Hero with shade picker */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-text-muted mb-3 block">{data.number} / Направление</span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-text mb-4">{data.title}</h1>
              <p className="text-text-muted text-lg max-w-md leading-relaxed">{data.short}</p>
            </div>

            {/* Shade picker */}
            <div className="flex flex-col items-center gap-6">
              {/* Color swatch preview */}
              <div
                className="w-32 h-32 rounded-2xl border border-border shadow-sm transition-colors duration-400"
                style={{ backgroundColor: selectedShade.color }}
              />
              <p className="text-sm text-text-muted">
                Оттенок {selectedShade.label}
              </p>

              {/* Shade scale */}
              <div className="flex gap-2.5">
                {shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                      selectedShade.id === shade.id
                        ? 'border-primary scale-110 shadow-[0_2px_12px_rgba(30,77,140,0.2)]'
                        : 'border-border hover:scale-105'
                    }`}
                    style={{ backgroundColor: shade.color }}
                    aria-label={`Оттенок ${shade.label}`}
                  />
                ))}
              </div>
            </div>
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
