# Esnaad Legal & Administrative Consultancy — Website

A professional, bilingual (Arabic/English) website for Esnaad Legal & Administrative Consultancy, a UAE-based law firm.

## Features Implemented

### ✅ Complete

- **Project Setup**: Vite + React 18, Tailwind CSS, i18next
- **Bilingual Support**: Full Arabic/English with RTL/LTR layouts
- **Responsive Design**: Mobile-first approach with professional styling
- **Home Page**: Complete with all sections:
  - Hero section with CTAs
  - Vision & Mission cards
  - Services overview grid (12 services)
  - Company values with icons
  - Sectors served + achievements
  - Company history timeline
- **Navigation**: Header with language toggle, Footer with company info
- **Routing**: All pages accessible via `/en` and `/ar` prefixes

### 🚧 Stub Pages (Ready for Development)

- **Services Page**: Will contain detailed service descriptions
- **About Page**: Company story, team, qualifications
- **Contact Page**: Form + contact information
- **Consultation System**: 8-step wizard for remote consultations

## Quick Start

1. **Install dependencies:**

```bash
npm install
```

2. **Start development server:**

```bash
npm run dev
```

3. **View the site:**

- English: http://localhost:5174/en
- Arabic: http://localhost:5174/ar

## Technology Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Animations**: Framer Motion (ready to implement)
- **Forms**: React Hook Form (ready to implement)

## Project Structure

```
src/
├── components/
│   ├── common/           # Header, Footer, LanguageToggle
│   └── home/            # Hero, About, Services, Values, Sectors, History
├── pages/               # Main page components
├── locales/             # Translation files (en.json, ar.json)
├── utils/               # Constants and services data
└── styles/              # Global CSS
```

## Design System

- **Primary Color**: Deep Navy (#1a3a52)
- **Secondary**: Gold (#b8860b)
- **Accent**: Teal (#008b8b)
- **Typography**: Montserrat (headings), Open Sans (body)
- **Shadows**: Small, medium, large variants
- **Responsive**: Mobile, tablet, desktop breakpoints

## Services Offered

The website showcases 12 main services:

- Administrative Cases
- Labor Disputes
- Rental Cases
- Contract Drafting
- Civil Cases
- Criminal Cases
- Commercial Cases
- Personal Status Cases
- Arbitration
- Penal Cases
- Debt Collection
- Administrative Services (HR, ISO, Trademarks)

## Next Development Phase

Priority items for full implementation:

1. **Contact Form**: React Hook Form with validation
2. **Service Details**: Individual service pages with detailed info
3. **About Page**: Complete team information and company story
4. **Consultation Wizard**: Multi-step form for consultation booking
5. **Animations**: Framer Motion scroll animations
6. **SEO**: Meta tags, structured data, sitemap
7. **Performance**: Image optimization, code splitting

## Contact Information

- **Address**: Hamdan Street, Al Building No. 6, Abu Dhabi, UAE
- **Phone**: +971 2 622 2210
- **Email**: esnaaduae@gmail.com
- **Founded**: 2013 by Dr. Iyad Ibrahim Al-Ghoul

---

Ready for further development and customization based on client feedback.
