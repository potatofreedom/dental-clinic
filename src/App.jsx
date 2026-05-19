import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import Consultation from './pages/services/Consultation'
import Treatment from './pages/services/Treatment'
import Surgery from './pages/services/Surgery'
import Veneers from './pages/services/Veneers'
import Orthodontics from './pages/services/Orthodontics'
import Pediatric from './pages/services/Pediatric'
import Gnathology from './pages/services/Gnathology'
import Sedation from './pages/services/Sedation'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/services/consultation" element={<Consultation />} />
        <Route path="/services/treatment" element={<Treatment />} />
        <Route path="/services/surgery" element={<Surgery />} />
        <Route path="/services/veneers" element={<Veneers />} />
        <Route path="/services/orthodontics" element={<Orthodontics />} />
        <Route path="/services/pediatric" element={<Pediatric />} />
        <Route path="/services/gnathology" element={<Gnathology />} />
        <Route path="/services/sedation" element={<Sedation />} />
      </Routes>
      <Footer />
    </>
  )
}
