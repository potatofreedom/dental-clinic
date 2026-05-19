import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import ContactBlock from '../../components/ContactBlock'
import { directions } from '../../data/services'

// Implant hero for surgery page
function ImplantHero() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    left: `${12 + Math.sin(i * 2.3) * 38 + 38}%`,
    top: `${15 + Math.cos(i * 1.7) * 35 + 35}%`,
    delay: `${(i * 0.6) % 4}s`,
    duration: `${3.5 + (i % 3)}s`,
  }))

  return (
    <div className="relative flex items-center justify-center h-72 lg:h-[380px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,77,140,0.08),transparent_65%)]" />
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent/30"
          style={{ left: p.left, top: p.top, animation: `implantParticle ${p.duration} ease-in-out ${p.delay} infinite` }}
        />
      ))}
      <div className="relative flex flex-col items-center" style={{ animation: 'implantToothIn 1.2s ease-out forwards' }}>
        <svg width="180" height="290" viewBox="0 0 280 420" fill="none" className="drop-shadow-lg">
          <path
            d="M140 20C70 20 35 70 35 150C35 240 70 390 115 390C135 390 120 290 140 290C160 290 145 390 165 390C210 390 245 240 245 150C245 70 210 20 140 20Z"
            fill="url(#surgToothGrad)" stroke="var(--color-accent)" strokeWidth="3"
          />
          <g style={{ animation: 'implantScrewIn 1.2s ease-out 0.8s both' }}>
            <rect x="115" y="220" width="50" height="120" rx="12" fill="#94A3B8" />
            {[...Array(7)].map((_, i) => (
              <line key={i} x1="115" y1={230 + i * 15} x2="165" y2={245 + i * 15} stroke="#CBD5E1" strokeWidth="3.5" />
            ))}
          </g>
          <path d="M85 90C70 130 70 200 85 250" stroke="white" strokeWidth="10" strokeLinecap="round" style={{ animation: 'implantShine 3s ease-in-out infinite' }} />
          <defs>
            <linearGradient id="surgToothGrad" x1="140" y1="20" x2="140" y2="390" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="var(--color-accent-soft)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 rounded-full blur-3xl bg-accent/15 -z-10" style={{ animation: 'implantGlow 4s ease-in-out infinite' }} />
      </div>
    </div>
  )
}

export default function DirectionPage() {
  const { slug } = useParams()
  const data = directions.find((d) => d.slug === slug)
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    if (data) document.title = `${data.title} — Стоматологическая клиника`
  }, [data])

  if (!data) {
    return (
      <PageWrapper>
        <section className="pt-40 pb-32 text-center">
          <h1 className="font-heading text-4xl text-text mb-4">Страница не найдена</h1>
          <Link to="/" className="text-primary hover:text-primary-hover transition-colors">На главную</Link>
        </section>
      </PageWrapper>
    )
  }

  const toggleItem = (sectionIdx, itemIdx) => {
    const key = `${sectionIdx}-${itemIdx}`
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 ${slug === 'surgery' ? 'lg:grid-cols-2' : ''} gap-12 items-center`}>
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-text-muted mb-3 block">{data.number} / Направление</span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-text mb-4">{data.title}</h1>
              <p className="text-text-muted text-lg max-w-lg leading-relaxed">{data.short}</p>
            </div>
            {slug === 'surgery' && <ImplantHero />}
          </div>
        </div>
      </section>

      {/* Sub-services */}
      {data.subServices.map((sub, sIdx) => (
        <section key={sub.title} className={sIdx % 2 === 1 ? 'py-16 md:py-20 bg-surface-alt/40' : 'py-16 md:py-20'}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-heading text-2xl md:text-3xl text-text mb-8">{sub.title}</h2>
            <div className="space-y-3">
              {sub.items.map((item, iIdx) => {
                const isOpen = openItems[`${sIdx}-${iIdx}`]
                return (
                  <div key={item.name} className="border border-border rounded-2xl bg-surface">
                    <button
                      onClick={() => toggleItem(sIdx, iIdx)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-accent font-medium">{String(iIdx + 1).padStart(2, '0')}</span>
                        <span className="font-medium text-text">{item.name}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-text-muted transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-text-muted text-sm leading-relaxed pl-10">{item.description}</p>
                        {item.duration && (
                          <p className="text-xs text-accent mt-2 pl-10">Длительность: {item.duration}</p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <ContactBlock />
        </div>
      </section>
    </PageWrapper>
  )
}
