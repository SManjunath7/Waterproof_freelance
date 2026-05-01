import React from 'react'
import './About.css'

const POINTS = [
  { icon: '✅', text: 'Zero Structural Damage' },
  { icon: '🔬', text: 'Premium Quality Materials' },
  { icon: '🛡️', text: 'Workmanship Warranty' },
  { icon: '⚡', text: 'Fast & Clean Execution' },
  { icon: '📞', text: 'Post-Service Support' },
  { icon: '💰', text: 'Competitive Pricing' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual reveal-left">
            <svg viewBox="0 0 500 380" xmlns="http://www.w3.org/2000/svg" className="about-main-img" style={{ background: 'linear-gradient(135deg, #0a1930, #1a3a6e)' }}>
              <defs>
                <linearGradient id="bldGrad" x1="0" y1="0" x2="0" y2="380" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1a3a6e" />
                  <stop offset="100%" stopColor="#0a1930" />
                </linearGradient>
              </defs>
              <rect width="500" height="380" fill="url(#bldGrad)" />
              <rect x="140" y="120" width="220" height="200" fill="#1e4080" rx="4" />
              <rect x="155" y="100" width="190" height="30" fill="#2563b8" rx="3" />
              <rect x="165" y="145" width="40" height="40" fill="#93c5fd" rx="3" opacity="0.7" />
              <rect x="230" y="145" width="40" height="40" fill="#93c5fd" rx="3" opacity="0.5" />
              <rect x="295" y="145" width="40" height="40" fill="#93c5fd" rx="3" opacity="0.7" />
              <rect x="165" y="205" width="40" height="40" fill="#93c5fd" rx="3" opacity="0.5" />
              <rect x="230" y="205" width="40" height="40" fill="#93c5fd" rx="3" opacity="0.7" />
              <rect x="295" y="205" width="40" height="40" fill="#93c5fd" rx="3" opacity="0.5" />
              <rect x="220" y="270" width="60" height="50" fill="#1e4080" rx="4" />
              <path d="M250 40 L290 58 L290 95 Q290 125 250 140 Q210 125 210 95 L210 58 Z" fill="#e53935" opacity="0.9" />
              <path d="M238 90 L246 100 L264 78" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <text x="70" y="160" fontSize="28" opacity="0.5">💧</text>
              <text x="380" y="200" fontSize="24" opacity="0.4">💧</text>
              <text x="90" y="250" fontSize="20" opacity="0.3">💧</text>
              <circle cx="420" cy="220" r="18" fill="#e53935" opacity="0.8" />
              <rect x="407" y="238" width="26" height="40" fill="#1a3a6e" rx="4" />
              <text x="390" y="295" fontSize="11" fill="#93c5fd" opacity="0.7">Manjunatha MWP</text>
              <rect x="0" y="320" width="500" height="60" fill="#050e1f" opacity="0.5" />
              <path d="M0 325 Q125 310 250 325 Q375 340 500 325" stroke="rgba(100,160,255,0.3)" strokeWidth="2.5" fill="none" />
            </svg>
            <div className="about-badge">
              <span className="num">15+</span>
              <div className="lbl">Years of<br />Excellence</div>
            </div>
          </div>

          <div className="about-text reveal-right">
            <div className="section-label">Who We Are</div>
            <div className="section-title">Manjunatha<br /><span>Water Proofing</span></div>
            <p className="section-desc" style={{ maxWidth: '100%', marginBottom: '20px' }}>
              We are one of Bangalore's leading waterproofing contractors, specialising in
              non-destructive, permanent solutions for residential and commercial properties.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: '24px' }}>
              Our expert team led by <strong>Mrutyunkshappa H.</strong> brings years of on-site
              experience in delivering leak-free results across terraces, bathrooms, sumps, tanks,
              skylights, and more — all without disrupting your structure.
            </p>
            <div className="about-points">
              {POINTS.map((p, i) => (
                <div className="point" key={i}>
                  <div className="point-icon">{p.icon}</div>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
