import React from 'react'

const STYLE = {
  position: 'fixed',
  bottom: '28px',
  right: '28px',
  background: '#25D366',
  color: '#fff',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.8rem',
  zIndex: 999,
  boxShadow: '0 6px 24px rgba(37, 211, 102, 0.5)',
  textDecoration: 'none',
  animation: 'pulse-wa 2s infinite',
}

export default function WhatsAppBtn() {
  return (
    <>
      <style>{`
        @keyframes pulse-wa {
          0%, 100% { box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5); }
          50% { box-shadow: 0 6px 40px rgba(37, 211, 102, 0.8); }
        }
      `}</style>
      <a
        href="https://wa.me/918792232753?text=Hi%2C%20I%20need%20waterproofing%20service.%20Please%20contact%20me."
        target="_blank"
        rel="noopener noreferrer"
        style={STYLE}
        title="Chat on WhatsApp"
        id="whatsapp-btn"
      >
        💬
      </a>
    </>
  )
}
