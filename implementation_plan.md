# Manjunatha Water Proofing — Full-Stack Website Build

Complete rebuild of the existing React+Vite client and Express server into a professional waterproofing business website, guided by the design in `fronend.html`.

## Proposed Changes

### Server — Complete Rewrite to SQLite Stack

The existing server uses MongoDB/Mongoose. We'll replace it with **SQLite via better-sqlite3** as requested — zero external DB setup needed.

#### [MODIFY] [server.js](file:///c:/Users/Lenovo/Desktop/demo/freelance/server/server.js)
- Replace Mongoose with `better-sqlite3`
- Add `helmet` for security headers
- Add `express-validator` for input validation
- **Endpoints**:
  - `POST /api/contact` — saves to `contacts` table, emails owner
  - `POST /api/appointments/book` — saves to `appointments` table, checks double-booking, emails customer
  - `GET /api/appointments/slots?date=YYYY-MM-DD` — returns available/booked slots
  - `GET /api/health` — health check
- SQLite DB auto-creates on first run (`data/mwp.db`)

#### [MODIFY] [package.json](file:///c:/Users/Lenovo/Desktop/demo/freelance/server/package.json)
- Remove `mongoose`, add `better-sqlite3`, `helmet`, `express-validator`
- Add `"start": "node server.js"` script

#### [MODIFY] [.env](file:///c:/Users/Lenovo/Desktop/demo/freelance/server/.env)
- Update to match the new config schema (PORT, CLIENT_URL, SMTP_USER, SMTP_PASS, OWNER_EMAIL)

---

### Client — Complete Single-Page Rebuild

Replace the existing multi-page React app with a **single-page scroll** site matching your `fronend.html` design direction, but upgraded with:
- **Sora + Inter** fonts (per your spec)
- **Deep navy (#0f3d66)** primary, **water blue (#1e88e5)** CTA accent, **warm white (#f5f7fb)** background
- **Dark/light mode toggle** in navbar
- All sections from your requirements (Hero, About, Process, Why Us, Founder Quote, Service Areas, Contact, Footer)
- Client logo marquee using your assets (kavery.png, Forthis.png, biocon.png, image.png)
- Company logo from `logo.jpeg`
- Floating WhatsApp button
- Appointment booking modal with date/time slot picker
- Contact form wired to `POST /api/contact`

#### File Structure After Build:
```
client/src/
├── main.jsx                 # Entry point
├── App.jsx                  # Single page app, no router needed
├── index.css                # Global design system (CSS variables, dark mode, resets)
├── App.css                  # All section styles
├── components/
│   ├── Navbar.jsx + .css    # Sticky nav, dark mode toggle, hamburger
│   ├── Hero.jsx + .css      # Hero with shield SVG, rain, stats, floating card
│   ├── Services.jsx + .css  # Service cards grid
│   ├── About.jsx + .css     # About with feature pills
│   ├── Process.jsx + .css   # 4-step process
│   ├── WhyUs.jsx + .css     # Dark section + 4 feature cards
│   ├── Clients.jsx + .css   # Logo marquee
│   ├── Testimonials.jsx+.css# Customer reviews
│   ├── Contact.jsx + .css   # 2-column: info + form
│   ├── Footer.jsx + .css    # Multi-column footer
│   ├── BookingModal.jsx+.css# Appointment booking modal
│   └── WhatsAppBtn.jsx      # Floating WhatsApp
└── assets/                  # Existing images (logo, client logos)
```

#### Key Components:

**Navbar** — Sticky, glass effect, MW badge + company name, nav links with anchor scroll, "Call Now" ghost button + "Book Free Inspection" primary CTA, dark/light mode toggle, hamburger menu on mobile, scrolled state with white bg + shadow.

**Hero** — Rain animation, headline, trust badges ("No tile breaking", "Written warranty", "Fast execution"), floating "Leakage problem?" card, emergency banner, stats counter.

**Services** — 6 service cards with hover animations and accent bottom border.

**About** — Left-aligned, feature pills grid (6 items), SVG illustration with badge.

**Process** — 4 numbered steps with connecting line, dark background.

**Why Choose Us** — Dark navy bg, 4 checkmark cards.

**Founder Quote** — Blockquote section with pattern background.

**Service Areas** — 6 area tags.

**Clients** — Auto-scrolling marquee with your 4 client logos.

**Testimonials** — 3 review cards.

**Contact** — 2-column: info left (address, phone, hours, WhatsApp) + form right, POST to `/api/contact`, success toast.

**Booking Modal** — Triggered by "Book Free Inspection" CTA, fetches available slots from `/api/appointments/slots`, submits to `/api/appointments/book`.

**Footer** — Logo, nav links, contact info, copyright.

**WhatsApp Button** — Fixed bottom-right, links to `wa.me` with pre-filled message.

> [!IMPORTANT]
> The address will be updated to: **#07, Huskur road, Makali Bengaluru - 562162** as specified in your requirements. The founder name will be **Sakshappa H** (displayed in attribution) while **Mrutyunkshappa H** appears in the about section as the team lead, matching your frontend.html patterns.

## Verification Plan

### Automated Tests
1. Start the server: `cd server && npm start` — verify health endpoint returns OK
2. Start the client: `cd client && npm run dev` — verify it loads at localhost:5173
3. Test contact form submission from the UI
4. Test appointment booking flow
5. Browser visual check of all sections, dark mode toggle, mobile responsiveness
