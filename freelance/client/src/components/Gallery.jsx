import React, { useState } from 'react'
import galleryTerrace from '../assets/gallery-terrace.png'
import galleryBathroom from '../assets/gallery-bathroom.png'
import galleryWall from '../assets/gallery-wall.png'
import gallerySlab from '../assets/gallery-slab.png'
import gallerySump from '../assets/gallery-sump.png'
import galleryCompleted from '../assets/gallery-completed.png'
import './Gallery.css'

const GALLERY_ITEMS = [
  {
    src: galleryTerrace,
    title: 'Terrace Waterproofing',
    category: 'terrace',
    desc: 'Professional membrane coating on residential terrace',
  },
  {
    src: galleryBathroom,
    title: 'Bathroom Waterproofing',
    category: 'bathroom',
    desc: 'Non-destructive bathroom waterproof treatment',
  },
  {
    src: galleryWall,
    title: 'Wall Crack Treatment',
    category: 'wall',
    desc: 'Exterior wall crack repair and waterproof coating',
  },
  {
    src: gallerySlab,
    title: 'Slab Waterproofing',
    category: 'slab',
    desc: 'Polymer-based slab waterproofing application',
  },
  {
    src: gallerySump,
    title: 'Sump Waterproofing',
    category: 'sump',
    desc: 'Underground water tank waterproof treatment',
  },
  {
    src: galleryCompleted,
    title: 'Completed Project',
    category: 'completed',
    desc: 'Successfully completed terrace waterproofing project',
  },
]

const FILTERS = ['all', 'terrace', 'bathroom', 'wall', 'slab', 'sump', 'completed']

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="gallery-header reveal">
          <div className="section-label">Our Work</div>
          <div className="section-title">Project <span>Gallery</span></div>
          <p className="section-desc">
            Browse through our recent waterproofing projects across Bangalore.
            Quality workmanship you can see.
          </p>
        </div>

        <div className="gallery-filters reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <div
              className="gallery-card reveal"
              key={i}
              onClick={() => setLightbox(item)}
            >
              <div className="gallery-img-wrap">
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="gallery-zoom">🔍</div>
                </div>
              </div>
              <div className="gallery-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="lightbox-info">
              <h3>{lightbox.title}</h3>
              <p>{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
