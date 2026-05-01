import React from 'react'
import './Testimonials.css'

const REVIEWS = [
  {
    text: "Manjunatha Water Proofing fixed our 5-year-old terrace leak in just 2 days without breaking a single tile. Absolutely outstanding workmanship and very professional team.",
    name: 'Ramesh Kumar',
    location: 'Peenya, Bangalore',
    initial: 'R',
  },
  {
    text: "We hired them for our bathroom waterproofing. The non-destructive approach saved us so much hassle. No mess, no breaking of tiles, and no leakage since then — it's been 18 months.",
    name: 'Priya Sharma',
    location: 'Yeshwantpur, Bangalore',
    initial: 'P',
  },
  {
    text: "Excellent service for our commercial building's sump waterproofing. The team was knowledgeable, prompt, and the pricing was very competitive. Highly recommend for any waterproofing needs.",
    name: 'Suresh Babu',
    location: 'Hebbal, Bangalore',
    initial: 'S',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="testi-header reveal">
          <div className="section-label">What Clients Say</div>
          <div className="section-title">Customer <span>Reviews</span></div>
        </div>
        <div className="testi-grid">
          {REVIEWS.map((r, i) => (
            <div className="testi-card reveal" key={i}>
              <div className="stars">★★★★★</div>
              <p className="testi-body">{r.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{r.initial}</div>
                <div>
                  <h5>{r.name}</h5>
                  <span>{r.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
