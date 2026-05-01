import React from 'react'
import './WhyUs.css'

const FEATURES = [
  { icon: '🛡️', title: 'Non-Destructive Method', desc: 'We fix waterproofing problems without breaking tiles, floors, or walls. Zero damage to your finished interiors.' },
  { icon: '🔬', title: 'Premium Materials', desc: 'We use only ISI-certified, industry-grade waterproofing compounds sourced from trusted manufacturers.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'Committed to timelines. Our projects are completed on schedule with minimal disruption to your daily life.' },
  { icon: '📋', title: 'Written Warranty', desc: 'We provide a documented service warranty on all projects, ensuring peace of mind for years to come.' },
]

const COVERAGE = [
  { icon: '🏘️', area: 'Peenya & North Bangalore' },
  { icon: '🏢', area: 'Central Bangalore' },
  { icon: '🌆', area: 'East Bangalore' },
  { icon: '🏠', area: 'South Bangalore' },
  { icon: '🏗️', area: 'Electronic City' },
  { icon: '🌇', area: 'Whitefield & Beyond' },
]

export default function WhyUs() {
  return (
    <section id="why" className="why-us">
      <div className="container">
        <div className="why-grid">
          <div className="reveal-left">
            <div className="section-label">Why Choose Us</div>
            <div className="section-title">The MWP <span>Difference</span></div>
            <div className="features-list">
              {FEATURES.map((f, i) => (
                <div className="feature" key={i}>
                  <div className="feat-icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <div className="why-visual">
              <h3>Service Coverage Areas</h3>
              <p style={{ color: '#a8c4e0', fontSize: '0.88rem', marginBottom: '24px' }}>
                We serve across Bangalore &amp; surrounding regions
              </p>
              <div className="coverage-grid">
                {COVERAGE.map((c, i) => (
                  <div className="coverage-item" key={i}>
                    <div className="ci">{c.icon}</div>
                    <p>{c.area}</p>
                  </div>
                ))}
              </div>
              <div className="founder-quote">
                <p>"Water Proofing Solution without disturbing the structures"</p>
                <p>— Sakshappa H., Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
