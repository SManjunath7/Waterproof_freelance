import React from 'react'
import './GSTTrust.css'

const GST_DETAILS = [
  ['GSTIN', '29FLZPS5413J1Z2'],
  ['Legal name', 'HIREJOGANNA SAKSHAPPA'],
  ['Business type', 'Proprietorship · Regular registration'],
  ['Registration date', '29 May 2026'],
  ['Status', <span className="gst-status">Active ✓</span>],
  ['Registered office', 'No. 06, Near Toll India, Huskur Main Road, Makali, Bengaluru, Karnataka 562162'],
]

export default function GSTTrust() {
  return (
    <section id="trust" className="gst-trust">
      <div className="container">
        <div className="gst-card reveal">
          <div className="gst-intro">
            <div className="gst-seal" aria-hidden="true">✓</div>
            <div>
              <div className="section-label">Verified business details <span className="gst-govt-badge">Govt. Verified</span></div>
              <div className="section-title">Work with <span>confidence</span></div>
              <p>
                Manjunatha Water Proofing is a GST-registered waterproofing service in Karnataka.
                Clear business details help you book with confidence and request a proper invoice.
              </p>
              <a className="gst-cta" href="#contact">Request a free inspection <span>→</span></a>
            </div>
          </div>

          <div className="gst-details" aria-label="GST registration details">
            {GST_DETAILS.map(([label, value]) => (
              <div className="gst-detail" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <div className="gst-note"><span>✓</span> Registration certificate issued 29 May 2026</div>
            <a href="https://services.gst.gov.in/services/searchtp" target="_blank" rel="noopener noreferrer" className="gst-verify-link">
              Verify on GST Portal <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
