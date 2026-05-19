import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { directions } from '../data/services'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setServicesOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-surface/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={closeMobile}>
            <Logo className="w-10 h-10" />
            <span className="font-heading text-lg text-text hidden sm:block">
              Dental Studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-200 flex items-center gap-1"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Направления
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                  <div className="bg-surface border border-border rounded-2xl p-3 shadow-[0_8px_40px_-12px_rgba(30,77,140,0.12)]">
                    {directions.map((d) => (
                      <Link
                        key={d.slug}
                        to={`/services/${d.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:text-text hover:bg-surface-alt transition-colors duration-150"
                      >
                        <span className="text-xs text-accent font-medium w-5">{d.number}</span>
                        {d.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-text-muted hover:text-text'
                }`
              }
            >
              Контакты
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+70001234567"
              className="hidden md:flex items-center gap-2 border border-primary text-primary text-sm font-medium px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
            >
              +7 (000) 123-45-67
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-surface pt-[72px] overflow-y-auto md:hidden">
          <nav className="px-6 py-8 flex flex-col gap-2" aria-label="Главное меню">
            <p className="text-xs uppercase tracking-[0.15em] text-text-muted mb-2 px-3">
              Направления
            </p>
            {directions.map((d) => (
              <Link
                key={d.slug}
                to={`/services/${d.slug}`}
                onClick={closeMobile}
                className="flex items-center gap-4 px-3 py-3 rounded-xl text-lg text-text hover:bg-surface-alt transition-colors"
              >
                <span className="text-sm text-accent font-medium w-6">{d.number}</span>
                {d.title}
              </Link>
            ))}

            <div className="border-t border-border my-4" />

            <Link
              to="/contacts"
              onClick={closeMobile}
              className="px-3 py-3 rounded-xl text-lg text-text hover:bg-surface-alt transition-colors"
            >
              Контакты
            </Link>

            <a
              href="tel:+70001234567"
              className="mt-4 flex items-center justify-center gap-2 border border-primary text-primary font-medium px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
            >
              +7 (000) 123-45-67
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
