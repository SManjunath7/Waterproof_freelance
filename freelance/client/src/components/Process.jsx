import React from 'react'
import './Process.css'

const STEPS = [
  { num: '01', title: 'Free Inspection', desc: 'Our expert visits your site, assesses the problem areas and identifies root causes.' },
  { num: '02', title: 'Custom Proposal', desc: 'We provide a detailed, transparent quotation with the best solution for your needs.' },
  { num: '03', title: 'Expert Execution', desc: 'Our trained technicians apply proven waterproofing systems with precision.' },
  { num: '04', title: 'Quality Guarantee', desc: 'We stand behind our work with a written warranty and post-service follow-up.' },
]

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="process-header reveal">
          <div className="section-label">How It Works</div>
          <div className="section-title" style={{ color: '#fff' }}>
            Our Simple <span style={{ color: 'var(--accent)' }}>4-Step</span> Process
          </div>
        </div>
        <div className="process-steps">
          {STEPS.map((s, i) => (
            <div className="step reveal" key={i}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
