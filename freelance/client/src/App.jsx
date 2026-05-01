import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Clients from './components/Clients'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppBtn from './components/WhatsAppBtn'
import BookingModal from './components/BookingModal'
import './App.css'

function App() {
  const [showBooking, setShowBooking] = useState(false)
  const [toast, setToast] = useState(null)

  // Scroll reveal observer
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    revealEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <>
      <Navbar onBookClick={() => setShowBooking(true)} />
      <main>
        <Hero onBookClick={() => setShowBooking(true)} />
        <Services />
        <About />
        <Process />
        <Clients />
        <WhyUs />
        <Testimonials />
        <Contact showToast={showToast} />
      </main>
      <Footer />
      <WhatsAppBtn />
      {showBooking && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          showToast={showToast}
        />
      )}
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </>
  )
}

export default App