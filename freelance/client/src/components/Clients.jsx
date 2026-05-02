import React from 'react'
import forthis from '../assets/Forthis.png'
import biocon from '../assets/biocon.png'
import kavery from '../assets/kavery.png'
import globalCal from '../assets/image.png'
import './Clients.css'

const CLIENT_LOGOS = [
  { src: forthis, alt: 'Fortis Hospitals' },
  { src: biocon, alt: 'Biocon' },
  { src: kavery, alt: 'Kauvery Hospital' },
  { src: globalCal, alt: 'Global Calcium' },
]

export default function Clients() {
  // Triple for seamless infinite loop
  const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section id="clients" className="clients">
      <div className="container">
        <div className="clients-header reveal">
          <div className="section-label clients-label">Trusted By</div>
          <div className="section-title clients-title">Our <span>Valued Clients</span></div>
          <p className="section-desc clients-desc">
            We have successfully completed waterproofing projects for leading organisations
            across Bangalore and Karnataka.
          </p>
        </div>
      </div>
      <div className="clients-track-wrap">
        <div className="clients-track">
          {allLogos.map((c, i) => (
            <div className="client-logo" key={i}>
              <img src={c.src} alt={c.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
