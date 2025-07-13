# 1StopFirm - Complete Project Documentation

![1StopFirm Logo](1StopFirm-Logo.png)

---

## Table of Contents
- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Key Pages & Routing](#key-pages--routing)
- [Assets & Media](#assets--media)
- [Scripts & Functionality](#scripts--functionality)
- [Styles & Theming](#styles--theming)
- [Service Worker & PWA](#service-worker--pwa)
- [Server & Local Development](#server--local-development)
- [Contact Forms & Integrations](#contact-forms--integrations)
- [Deployment & Hosting](#deployment--hosting)
- [Security & Best Practices](#security--best-practices)
- [Contributing](#contributing)
- [Contact & Support](#contact--support)
- [License](#license)

---

## Project Overview

**1StopFirm** is a modern, multi-page business website for a marketing and growth agency. It features:
- Clean navigation and routing (with Python server)
- Responsive, animated UI (HTML5, CSS3, JS)
- Service-specific landing pages
- Integrated contact forms (Web3Forms)
- PWA support (service worker)
- Modular scripts and styles
- Rich media and branding assets

---

## Directory Structure

```
1StopFirm/
├── about.html                  # About/Team page
├── blogs.html                  # Blog/Insights
├── brand-development.html      # Brand development service
├── contact-us.html             # Contact page
├── digital-marketing.html # Digital marketing service
├── fresh-website-development.html # Website development service
├── index.html                  # Homepage
├── services.html               # Services overview
├── strategy-consultation.html  # Strategy consultation service
├── thank-you.html              # Form submission success
├── section_fix.html            # Section fix/test page
├── server.py                   # Python server with clean routing
├── start-server.bat            # Windows batch file to start server
├── sw.js                       # Service worker for PWA
├── cache.manifest              # App cache manifest
├── cache-bust.txt              # Cache busting utility
├── README.md                   # Project documentation
├── scripts/                    # All JavaScript modules
│   ├── main.js
│   ├── brand-development.js
│   ├── digital-marketing.js
│   ├── website-development.js
│   ├── performance-check.js
│   ├── device-detection.js
│   ├── dropdown-fix.js
├── styles/                     # All CSS modules
│   ├── global.css
│   ├── layout.css
│   ├── components.css
│   ├── animations.css
│   ├── brand-development.css
│   ├── digital-marketing.css
│   ├── website-development.css
│   ├── strategy-consultation.css
│   ├── global-responsive.css
├── assets/                     # (Optional) Static assets
├── [images, icons, logos, etc.]
```

---

## Key Pages & Routing

### Main Pages
- `/` or `/home` → `index.html` (Homepage)
- `/about` → `about.html`
- `/services` → `services.html`
- `/blogs` → `blogs.html`
- `/contact` or `/contact-us` → `contact-us.html`
- `/brand-development` → `brand-development.html`
- `/strategy` or `/strategy-consultation` → `strategy-consultation.html`
- `/digital-marketing` → `digital-marketing.html`
- `/web-development` → `fresh-website-development.html`
- `/thank-you` → `thank-you.html`

### Navigation
- All navigation menus and footers use clean URLs (e.g. `/web-development`)
- Internal anchor links use `#section` for smooth scrolling
- All forms redirect to `/thank-you` on success

---

## Assets & Media
- **Images:** Team, branding, blog, and service images (JPG, PNG)
- **Icons:** Font Awesome, favicon (`new.ico`, `Bold Purple _1SF_ Icon (1).ico`)
- **Logos:** `1StopFirm-Logo.png`, etc.
- **Other:** Illustrations, backgrounds, and client logos

---

## Scripts & Functionality

### scripts/
- `main.js`: Core site logic, navigation, and form handling
- `brand-development.js`: Brand service-specific scripts
- `digital-marketing.js`: Digital marketing page logic
- `website-development.js`: Website development page logic
- `performance-check.js`: Performance and optimization checks
- `device-detection.js`: Device and browser detection
- `dropdown-fix.js`: Dropdown menu bug fixes

### Other JS
- `strategy-fix.js`, `strategy-quick-fix.js`, etc.: Quick fixes and enhancements
- Inline scripts in HTML for AOS, Swiper, and animation initialization

---

## Styles & Theming

### styles/
- `global.css`: Base variables, resets, and typography
- `layout.css`: Grid, flex, and layout utilities
- `components.css`: Buttons, cards, navbars, etc.
- `animations.css`: Keyframes and animation helpers
- `brand-development.css`, `digital-marketing.css`, `website-development.css`, `strategy-consultation.css`: Page-specific styles
- `global-responsive.css`: Responsive breakpoints and overrides
- `styles.css`: (Legacy/global styles)

---

## Service Worker & PWA
- `sw.js`: Service worker for offline support, caching, and PWA features
- `cache.manifest`: App cache manifest for legacy support
- PWA ready: Add to home screen, offline browsing, installable

---

## Server & Local Development

### server.py
- Python HTTP server with clean URL routing (see above)
- Maps pretty URLs (e.g. `/web-development`) to HTML files
- Handles static file serving and MIME types
- Auto-opens browser on start
- Finds a free port automatically

### start-server.bat
- Windows batch file to launch the Python server

### Running Locally
1. **Install Python 3** (if not already installed)
2. **Run the server:**
   ```bash
   python server.py
   ```
3. **Or use the batch file:**
   ```bash
   start-server.bat
   ```
4. **Visit:**
   ```
   http://localhost:8080 (or the port shown in terminal)
   ```

---

## Contact Forms & Integrations
- All forms use [Web3Forms](https://web3forms.com) for backendless submissions
- API endpoint: `https://api.web3forms.com/submit`
- Access key: (see HTML form hidden field)
- All forms redirect to `/thank-you` on success
- Spam protection: honeypot fields, validation
- Forms present on: homepage, contact, services, all main service pages, about, blogs

---

## Deployment & Hosting
- **Static hosting:** Netlify, Vercel, GitHub Pages, Firebase, Surge.sh
- **Production build:** No build step required (pure HTML/CSS/JS)
- **Deploy:** Upload all files/folders to your static host
- **PWA:** Works out of the box on HTTPS

---

## Security & Best Practices
- HTTPS recommended for all deployments
- Content Security Policy (CSP) headers advised
- XSS protection via input validation and sanitization
- No sensitive data in client-side code
- Service worker and cache busting for updates
- Accessibility: ARIA labels, keyboard navigation, color contrast

---

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit and push your changes
4. Open a Pull Request with a clear description

---

## Contact & Support
- **Business:** contact.1stopfirm@gmail.com | +91 85271 19684 | Kota, Rajasthan, India
- **Technical:** rahul.soral@1stopfirm.com | [GitHub](https://github.com/Rahul-Soral)
- **Website:** https://1stopfirm.com

---

## License
This project is proprietary and owned by **1StopFirm**. All rights reserved.