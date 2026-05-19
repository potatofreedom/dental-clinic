import { useEffect, useRef } from 'react'

export default function Logo({ className = 'w-12 h-12', variant = 'dark' }) {
  const ref = useRef(null)
  const src = variant === 'light' ? '/3.svg' : '/4.svg'

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        ref.current.style.transform = `rotate(${(window.scrollY / 900) * 360}deg)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className={className}>
      <img src={src} alt="Логотип клиники" className="w-full h-full" />
    </div>
  )
}
