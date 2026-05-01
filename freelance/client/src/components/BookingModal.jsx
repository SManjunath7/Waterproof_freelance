import React, { useState } from 'react'
import './BookingModal.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const SERVICES = [
  'Terrace Waterproofing',
  'Bathroom Waterproofing',
  'Slab Waterproofing',
  'Sump & Tank Waterproofing',
  'Skylight & AC Sheet Sealing',
  'Wall Crack Treatment',
  'General Inspection',
]

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
]

export default function BookingModal({ onClose, showToast }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', location: '', date: '', time_slot: '', notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time_slot) {
      showToast('Please fill in name, phone, date, and select a time slot.', 'error')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        showToast(`✅ ${data.message}`)
        onClose()
      } else {
        showToast(data.message || 'Booking failed.', 'error')
      }
    } catch {
      showToast('Network error. Please try again.', 'error')
    }
    setSubmitting(false)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-header-icon">🔧</div>
        <h2>Book Free Inspection</h2>
        <p className="modal-sub">Schedule a free on-site inspection. We'll call to confirm.</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="booking-name">Your Name *</label>
              <input id="booking-name" type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="booking-phone">Phone *</label>
              <input id="booking-phone" type="tel" name="phone" placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="booking-email">Email (optional)</label>
            <input id="booking-email" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="booking-service">Service</label>
              <select id="booking-service" name="service" value={form.service} onChange={handleChange}>
                <option value="">Select service...</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="booking-location">Location</label>
              <input id="booking-location" type="text" name="location" placeholder="Area in Bangalore" value={form.location} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="booking-date">Preferred Date *</label>
            <input id="booking-date" type="date" name="date" min={today} value={form.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Select Time Slot *</label>
            <div className="time-slots">
              {TIME_SLOTS.map((slot) => {
                const isSelected = form.time_slot === slot
                return (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot-btn${isSelected ? ' selected' : ''}`}
                    onClick={() => setForm({ ...form, time_slot: slot })}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="booking-notes">Notes (optional)</label>
            <textarea id="booking-notes" name="notes" placeholder="Any specific details..." value={form.notes} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-book" disabled={submitting}>
            {submitting ? '⏳ Booking...' : '📅 Confirm Inspection'}
          </button>
        </form>
      </div>
    </div>
  )
}
