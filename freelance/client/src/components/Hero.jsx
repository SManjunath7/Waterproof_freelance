import React, { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero({ onBookClick }) {
  const rainRef = useRef(null)

  useEffect(() => {
    const container = rainRef.current
    if (!container) return
    for (let i = 0; i < 40; i++) {
      const d = document.createElement('div')
      d.className = 'drop'
      d.style.left = Math.random() * 100 + '%'
      d.style.height = (30 + Math.random() * 60) + 'px'
      d.style.animationDuration = (0.6 + Math.random() * 1.4) + 's'
      d.style.animationDelay = (Math.random() * 2) + 's'
      container.appendChild(d)
    }
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-bg-anim" />
        <div className="raindrops" ref={rainRef} />

        <div className="hero-content container">
          <div className="hero-text">
            <div className="hero-tagline">Bangalore's Trusted Experts Since 2010</div>
            <h1>Leak-Proof <span>Protection</span> for Every Structure</h1>
            <p>
              Permanent waterproofing solutions without disturbing your existing structures.
              Expert service for terraces, bathrooms, slabs, sumps, tanks &amp; more.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={onBookClick}>
                🔧 Book Free Inspection
              </button>
              <a href="#services" className="btn-outline">🏗️ Our Services</a>
            </div>
            <div className="hero-stats">
              <StatBox num="15+" label="Years Experience" />
              <StatBox num="500+" label="Projects Done" />
              <StatBox num="100%" label="Guaranteed" />
            </div>
            <div className="emergency-banner">
              <span>🚨 Emergency leakage? We respond within 24 hours —</span>
              <a href="tel:8792232753">Call Now</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-shield">
              <svg className="shield-svg" viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="shieldGrad" x1="0" y1="0" x2="340" y2="400" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a3a6e" />
                    <stop offset="100%" stopColor="#0a1930" />
                  </linearGradient>
                  <linearGradient id="accentGrad" x1="0" y1="0" x2="340" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e53935" />
                    <stop offset="100%" stopColor="#d32f2f" />
                  </linearGradient>
                </defs>
                <path d="M170 20 L310 80 L310 220 Q310 330 170 380 Q30 330 30 220 L30 80 Z" fill="url(#shieldGrad)" stroke="rgba(100,160,255,0.3)" strokeWidth="2" />
                <path d="M170 50 L285 98 L285 218 Q285 310 170 352 Q55 310 55 218 L55 98 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(100,160,255,0.15)" strokeWidth="1" />
                <path d="M170 130 L230 170 L230 230 L200 230 L200 200 L140 200 L140 230 L110 230 L110 170 Z" fill="url(#accentGrad)" opacity="0.9" />
                <path d="M100 175 L170 125 L240 175" fill="none" stroke="#e53935" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="130" cy="270" rx="10" ry="14" fill="rgba(100,160,255,0.6)" />
                <ellipse cx="170" cy="285" rx="10" ry="14" fill="rgba(100,160,255,0.8)" />
                <ellipse cx="210" cy="270" rx="10" ry="14" fill="rgba(100,160,255,0.6)" />
                <path d="M115 258 L145 282 M145 258 L115 282" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <circle cx="230" cy="120" r="26" fill="#22c55e" opacity="0.9" />
                <path d="M218 120 L226 130 L244 110" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M55 310 Q100 295 145 310 Q190 325 235 310 Q280 295 285 310" stroke="rgba(100,160,255,0.4)" strokeWidth="3" fill="none" />
                <path d="M60 325 Q105 310 150 325 Q195 340 240 325 Q275 315 282 325" stroke="rgba(100,160,255,0.25)" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#0f1d36" />
        </svg>
      </div>
    </>
  )
}

function StatBox({ num, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const target = parseInt(num)
    if (isNaN(target)) return

    const suffix = num.replace(/[0-9]/g, '')
    let animated = false

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true
        let count = 0
        const inc = Math.ceil(target / 40)
        const t = setInterval(() => {
          count += inc
          if (count >= target) { count = target; clearInterval(t) }
          el.textContent = count + suffix
        }, 35)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [num])

  return (
    <div className="stat-box">
      <span className="stat-num" ref={ref}>{num}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
