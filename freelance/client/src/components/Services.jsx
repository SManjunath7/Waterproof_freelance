import React from 'react'
import './Services.css'

const SERVICES = [
  {
    icon: '🏠',
    title: 'Terrace Waterproofing',
    desc: 'Advanced terrace waterproofing with slope correction. Prevents seepage and extends the life of your roof slab by decades.',
    tag: 'Most Popular',
  },
  {
    icon: '🚿',
    title: 'Bathroom Waterproofing',
    desc: 'Complete bathroom and toilet waterproofing without breaking tiles. Our non-destructive method saves time and cost.',
    tag: 'Non-Destructive',
  },
  {
    icon: '🏗️',
    title: 'Slab Waterproofing',
    desc: 'Structural slab and basement waterproofing using crystalline and polymer-based coatings for permanent protection.',
    tag: 'Permanent Fix',
  },
  {
    icon: '💧',
    title: 'Sump & Tank Waterproofing',
    desc: 'Water sump and overhead tank lining with food-grade, non-toxic materials to ensure clean and leak-free water storage.',
    tag: 'Safe & Non-Toxic',
  },
  {
    icon: '🌧️',
    title: 'Skylight & AC Sheet',
    desc: 'Sealing of skylight joints, AC sheet overlaps, and roof penetrations that commonly cause major water ingress problems.',
    tag: 'Specialty Work',
  },
  {
    icon: '🧱',
    title: 'Wall Crack & Paint',
    desc: 'Exterior wall waterproofing, crack injection, and waterproof paint application to protect against dampness and mold.',
    tag: 'Complete Solution',
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header reveal">
          <div className="section-label">What We Offer</div>
          <div className="section-title">Our <span>Waterproofing</span> Services</div>
          <p className="section-desc">
            Comprehensive solutions for all types of structures — from residential homes to
            large commercial buildings. No disruption to your existing structure.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card reveal" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
