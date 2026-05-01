import React from 'react'
import forthis from '../assets/Forthis.png'
import biocon from '../assets/biocon.png'
import kavery from '../assets/kavery.png'
import globalCal from '../assets/image.png'
import './Clients.css'

const CLIENT_LOGOS = [
  { src: forthis, alt: 'Fortis Hospital' },
  { src: biocon, alt: 'Biocon' },
  { src: kavery, alt: 'Kauvery Hospital' },
  { src: globalCal, alt: 'Global Calcium' },
]

export default function Clients() {
  // Duplicate for seamless loop
  const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section id="clients" className="clients">
      <div className="container">
        <div className="clients-header reveal">
          <div className="section-label">Trusted By</div>
          <div className="section-title">Our <span>Valued Clients</span></div>
          <p className="section-desc">
            We have successfully completed waterproofing projects for leading organisations
            across Bangalore and Karnataka.
          </p>
        </div>
        <div className="clients-track-wrap">
          <div className="clients-track">
            {allLogos.map((c, i) => (
              <div className="client-logo" key={i}>
                <img src={c.src} alt={c.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
