import React from 'react'
import logo from '../assets/logo.jpeg'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logo} alt="MWP Logo" />
          <p>
            Manjunatha Water Proofing is Bangalore's trusted waterproofing contractor,
            providing permanent, non-destructive solutions for over 10 years.
            Your leakage problems end here.
          </p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Terrace Waterproofing</a></li>
            <li><a href="#services">Bathroom Waterproofing</a></li>
            <li><a href="#services">Slab Waterproofing</a></li>
            <li><a href="#services">Sump &amp; Tank</a></li>
            <li><a href="#services">Wall Crack Treatment</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:8792232753">📞 8792232753</a></li>
            <li><a href="tel:9900497309">📞 9900497309</a></li>
            <li><a href="mailto:manjunathratna077@gmail.com">✉️ Email Us</a></li>
            <li><a href="#contact">📍 Makali, Bangalore</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Manjunatha Water Proofing. All rights reserved.</p>
        <div className="footer-socials">
          <a
            href="https://wa.me/918792232753?text=Hi%2C%20I%20need%20waterproofing%20service"
            className="social-btn"
            title="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >💬</a>
          <a href="#" className="social-btn" title="Facebook">📘</a>
          <a href="#" className="social-btn" title="Instagram">📷</a>
        </div>
      </div>
    </footer>
  )
}