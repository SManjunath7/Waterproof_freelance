import React from 'react'
import { InlineWidget } from 'react-calendly'
import './BookingModal.css'

export default function BookingModal({ onClose, showToast }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2>Book Free Inspection</h2>
        <p className="modal-sub">Schedule your on-site inspection instantly via Calendly.</p>

        <div className="calendly-container">
          <InlineWidget 
            url="https://calendly.com/manjunaths07744/30min" 
            styles={{ 
              height: '700px',
              width: '100%'
            }} 
          />
        </div>
      </div>
    </div>
  )
}
