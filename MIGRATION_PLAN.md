# Migration Plan: Thailand Teaching Academy Landing Page to React JS

## Executive Summary
This document outlines the detailed roadmap for migrating the **Thailand Teaching Academy Award (TTA ครั้งที่ 13)** landing page from the prototype located at:
`C:\Users\krittin pragopdee\Downloads\New folder (19)`
into a high-performance, modular **React JS** application in:
`c:\Users\krittin pragopdee\OneDrive\Desktop\University\TeachingAcademy\TTA-LandingPage`.

---

## 1. Source Assets & Feature Audit

### Source Assets Discovered
- **Official Brand Logos**:
  - `assets/logo.png`: Primary full-color logo (261 KB, high-resolution)
  - `assets/logo-white.png`: Monochrome white logo for dark backgrounds (115 KB)
- **Media & Uploads**:
  - `uploads/`: Additional event graphics and sponsor/sub-event assets
- **Source Prototype**:
  - `Landing Page.dc.html`: Complete markup, data schema, interactions, and style specs
  - `support.js` & `image-slot.js`: Legacy prototype runtime (to be replaced with pure React)

### Feature Inventory
| Feature / Section | Description | Technical Implementation in React |
| :--- | :--- | :--- |
| **Intro Splash Screen** | Fullscreen logo reveal & smooth fade into hero | `IntroSplash.jsx` using CSS opacity/scale keyframes |
| **Dual-Mode Navigation** | Transparent top bar transitioning to frosted glass floating pill on scroll | `Navbar.jsx` with scroll listener and intersection observers |
| **Hero Banner** | Headline, gradient badge, floating logo with drop shadow, dual CTAs | `Hero.jsx` with animated SVG background and gradient accents |
| **Animated Stats Counter** | 5 statistics cards with viewport-triggered smooth count-up (0 -> 665) | `Stats.jsx` using `requestAnimationFrame` + `IntersectionObserver` |
| **Interactive Topics Map** | 10 competition categories plotted along a curved SVG circuit line | `Topics.jsx` with responsive grid/SVG circuit line + hover transitions |
| **Topic Details Modal** | Deep modal dialog with 4 tabs (Rules, Venue, Scoring, Agenda) + download | `TopicModal.jsx` with tab state and animated progress bars |
| **Timeline Schedule** | 6-step milestone tracker with step selector and "ขณะนี้" active badge | `Schedule.jsx` with curved timeline SVG and active step state |
| **News & Documents** | 6 document download cards with category badges and action buttons | `NewsDownloads.jsx` with reusable card components |
| **Interactive Login Modal** | Multi-state modal (form -> loading -> success screen) | `LoginModal.jsx` with controlled inputs and validation |
| **Toast Notifications** | Dynamic feedback popup for downloads, map links, and registration alerts | `Toast.jsx` with auto-dismiss timers |
| **Institutional Footer** | KMUTT / TTA copyright and organization information | `Footer.jsx` |

---

## 2. Target Architecture (React + Vite)

```text
TTA-LandingPage/
├── public/
│   ├── assets/
│   │   ├── logo.png
│   │   ├── logo-white.png
│   │   └── uploads/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Dual top/pill responsive header
│   │   ├── Hero.jsx            # Hero section with floating emblem
│   │   ├── Stats.jsx           # Animated counter cards
│   │   ├── Topics.jsx          # 10 Competition category cards
│   │   ├── TopicModal.jsx      # Modal with Rules, Venue, Scoring, Agenda tabs
│   │   ├── Schedule.jsx        # Milestone timeline
│   │   ├── NewsDownloads.jsx   # Document downloads & news
│   │   ├── LoginModal.jsx      # Login dialog with validation & success state
│   │   ├── Toast.jsx           # Toast notification banner
│   │   ├── IntroSplash.jsx     # Optional opening splash animation
│   │   └── Footer.jsx          # Institutional footer
│   ├── data/
│   │   ├── topicsData.js       # Structured categories & scoring matrices
│   │   ├── scheduleData.js     # Milestone steps
│   │   └── newsData.js         # Documents & announcements
│   ├── styles/
│   │   ├── index.css           # Global tokens, typography ('Anuphan'), resets
│   │   └── animations.css      # Custom keyframe animations
│   ├── App.jsx                 # Main layout & modal/toast state coordination
│   ├── main.jsx                # Application root entry point
│   └── index.html              # HTML shell with Google Fonts & SEO tags
├── package.json
├── vite.config.js
└── MIGRATION_PLAN.md           # This document
```

---

## 3. Design Tokens & Styling System

The application will use native CSS custom properties adhering to modern design standards:

```css
:root {
  /* Brand Primary - Energy Orange */
  --color-primary-start: #FFB21E;
  --color-primary: #FF6A1A;
  --color-primary-dark: #FF4D1A;
  --gradient-primary: linear-gradient(135deg, #FFB21E, #FF6A1A 55%, #FF4D1A);
  --shadow-primary: 0 14px 28px -12px rgba(255, 90, 26, 0.85);

  /* Brand Secondary - Electric Blue */
  --color-blue-start: #2FA6FF;
  --color-blue: #1F7BFF;
  --color-blue-dark: #1747D6;
  --gradient-blue: linear-gradient(135deg, #2FA6FF, #1F7BFF 55%, #2A5BFF);
  --shadow-blue: 0 14px 28px -12px rgba(31, 123, 255, 0.8);

  /* Neutrals & Surfaces */
  --color-ink-900: #0E1A33;
  --color-ink-700: #1D2F66;
  --color-ink-500: #3A4560;
  --color-ink-400: #5B6478;
  --color-bg-light: #F8FAFC;
  --color-border: #E1E6EF;

  /* Typography */
  --font-family-base: 'Anuphan', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-icon: 'Material Symbols Rounded';
}
```

---

## 4. Execution Roadmap

### Phase 1: Project Scaffolding & Asset Migration
- [x] Initialize Vite + React project in `c:\Users\krittin pragopdee\OneDrive\Desktop\University\TeachingAcademy\TTA-LandingPage`.
- [x] Copy `assets/logo.png`, `assets/logo-white.png`, and `uploads/` into `public/assets/`.
- [x] Set up `index.html` with Thai language attributes (`lang="th"`), Google Fonts (**Anuphan** & **Material Symbols Rounded**), and OpenGraph SEO tags.

### Phase 2: Design Tokens & Typography
- [x] Create `src/styles/index.css` with CSS variables for colors, gradients, typography, and glassmorphism.
- [x] Create `src/styles/animations.css` with smooth transitions (`ttaFadeUp`, `ttaPop`, `ttaFloat`, `ttaShine`).

### Phase 3: Data Layer Extraction
- [x] Extract competition categories, rules, venues, agendas, and scoring metrics into `src/data/topicsData.js`.
- [x] Extract milestone schedule into `src/data/scheduleData.js`.
- [x] Extract downloadable documents and news into `src/data/newsData.js`.

### Phase 4: Component Implementation
- [x] **Navigation (`Navbar.jsx`)**: Top bar transitioning into floating frosted glass pill on scroll, section anchor links, and mobile menu.
- [x] **Hero Section (`Hero.jsx`)**: Catchy headline, gradient text, floating emblem with glow, and action buttons.
- [x] **Stats Section (`Stats.jsx`)**: 5 angled cards with automated smooth count-up animation when scrolled into view.
- [x] **Competition Topics (`Topics.jsx` & `TopicModal.jsx`)**: Interactive cards with curved circuit line, opening full modal with 4 tabs:
  1. *กติกาการแข่งขัน* (Competition rules)
  2. *สถานที่แข่ง* (Venue & room information)
  3. *เกณฑ์การให้คะแนน* (Evaluation criteria & animated progress bars)
  4. *กำหนดการแข่งขัน* (Event day schedule timeline)
- [x] **Milestone Schedule (`Schedule.jsx`)**: Interactive wave timeline with step selection and *ขณะนี้* status indicator.
- [x] **News & Resources (`NewsDownloads.jsx`)**: Cards with category badges and action triggers.
- [x] **Login & Feedback (`LoginModal.jsx` & `Toast.jsx`)**: Modal dialog with form validation, loading spinner, success transition, and toast messages.
- [x] **Footer (`Footer.jsx`)**: Institutional credentials (KMUTT & TTA).

### Phase 5: Responsive & Cross-Device Optimization
- [x] Convert desktop-specific absolute coordinates into responsive flex/grid layouts on smaller viewports.
- [x] Ensure touch-friendly buttons and tap targets for tablets and mobile devices.

### Phase 6: Build Verification & Launch
- [x] Run `npm run build` to confirm zero lint or compilation errors.
- [x] Run `npm run dev` to verify hot module replacement and complete interactive functionality.

---

## 5. Success Criteria
1. **Visual Fidelity**: 100% pixel-matching and enhanced aesthetic fidelity over the prototype.
2. **Performance**: Zero legacy runtime dependencies (`support.js`, `image-slot.js`); clean, lightweight React bundle.
3. **Responsiveness**: Smooth experience across mobile (375px+), tablet, and desktop (1440px+).
4. **Interactivity**: Fully functional tabs, modal dialogs, count-up animations, and toast feedback.
