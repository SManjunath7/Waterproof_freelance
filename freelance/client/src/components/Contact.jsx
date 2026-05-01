import React, { useState } from 'react'
import './Contact.css'

const API_URL = import.meta.env.VITE_API_URL || ''

const SERVICES = [
  'Terrace Waterproofing',
  'Bathroom Waterproofing',
  'Slab Waterproofing',
  'Sump & Tank Waterproofing',
  'Skylight & AC Sheet Sealing',
  'Wall Crack Treatment',
  'Other',
]

export default function Contact({ showToast }) {
  const [form, setForm] = useState({
    name: '', phone: '', service: '', location: '', message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message) {
      showToast('Please fill in your name and message.', 'error')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        showToast('✅ Request sent! We will contact you soon.')
        setForm({ name: '', phone: '', service: '', location: '', message: '' })
      } else {
        showToast(data.message || 'Something went wrong.', 'error')
      }
    } catch {
      showToast('Network error. Please try again.', 'error')
    }
    setLoading(false)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info reveal-left">
            <div className="section-label">Get In Touch</div>
            <div className="section-title">Let's Fix Your <span>Leakage Problem</span></div>
            <p>
              Contact us today for a free on-site inspection and detailed quote. We'll assess
              your waterproofing needs and provide the most effective, cost-efficient solution.
            </p>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h5>Office Address</h5>
                <p>#07, Huskur Road, Makali, Bengaluru – 562162</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div>
                <h5>Phone Numbers</h5>
                <p><a href="tel:9900497309">9900497309</a> &nbsp;|&nbsp; <a href="tel:8792232753">8792232753</a></p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div>
                <h5>Email Address</h5>
                <p><a href="mailto:manjunathratna077@gmail.com">manjunathratna077@gmail.com</a></p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div>
                <h5>Working Hours</h5>
                <p>Monday – Saturday: 8:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

          <form className="contact-form reveal-right" onSubmit={handleSubmit}>
            <h3>Get a Free Quote</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-service">Service Required</label>
              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select a service...</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact-location">Property Location</label>
              <input
                id="contact-location"
                type="text"
                name="location"
                placeholder="Area / Locality in Bangalore"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Describe your waterproofing problem..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Sending...' : '📩 Request Free Inspection'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
