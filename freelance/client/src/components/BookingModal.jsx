import React, { useState, useEffect } from 'react';
import './BookingModal.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const SERVICES = [
  "Terrace Waterproofing",
  "Bathroom Waterproofing",
  "Slab Waterproofing",
  "Sump & Tank Waterproofing",
  "Skylight & AC Sheet Sealing",
  "Wall Crack Treatment"
];

const ALL_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

const BookingModal = ({ isOpen, onClose, showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: SERVICES[0],
    date: '',
    time: '',
    address: ''
  });

  const [availableSlots, setAvailableSlots] = useState(ALL_SLOTS);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fetch slots when date changes
  useEffect(() => {
    if (!formData.date) return;
    
    const fetchSlots = async () => {
      setFetchingSlots(true);
      try {
        const response = await fetch(`${API_URL}/api/appointments/slots?date=${formData.date}`);
        if (!response.ok) throw new Error('Failed to fetch slots');
        const data = await response.json();
        
        // If API returns array of available slots, use it, else fallback to all
        if (data && Array.isArray(data.availableSlots)) {
          setAvailableSlots(data.availableSlots);
        } else {
          setAvailableSlots(ALL_SLOTS);
        }
      } catch (err) {
        console.error('Error fetching slots:', err);
        setAvailableSlots(ALL_SLOTS); // Graceful fallback
      } finally {
        setFetchingSlots(false);
      }
    };
    
    fetchSlots();
    // Reset selected time when date changes
    setFormData(prev => ({ ...prev, time: '' }));
  }, [formData.date]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate Phone
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      showToast('Please enter a valid 10-digit Indian mobile number', 'error');
      return;
    }

    if (!formData.time) {
      showToast('Please select a time slot', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
      
      showToast('Appointment booked successfully!', 'success');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(15, 29, 54, 0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}
    >
      <div className="booking-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
        
        <div className="modal-header-icon">📅</div>
        <h2>Book an Inspection</h2>
        <p className="modal-sub">Schedule a site visit by our waterproofing experts</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Your full name" 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                placeholder="10-digit mobile number" 
                pattern="[6-9][0-9]{9}" 
                title="Enter a valid 10-digit Indian mobile number" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Service Needed</label>
            <select name="service" value={formData.service} onChange={handleChange} required>
              {SERVICES.map(srv => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Location / Address</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              placeholder="Enter your complete address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
                min={today} 
              />
            </div>
          </div>

          {formData.date && (
            <div className="form-group">
              <label>Available Time Slots</label>
              {fetchingSlots ? (
                <div className="slots-loading">Loading slots...</div>
              ) : (
                <div className="time-slots">
                  {ALL_SLOTS.map(slot => {
                    const isAvailable = availableSlots.includes(slot);
                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={!isAvailable}
                        className={`time-slot-btn ${formData.time === slot ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(slot)}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn-book" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
