# OMCRE8 Studio (Om Create Studio)

The comprehensive digital platform for **OMCRE8 Studio**, an independent multidisciplinary digital product and creative production agency founded by **Om Yadav** ([omyadav.online](https://www.omyadav.online/)).

---

## Architecture Overview

The platform consists of **three logically separate applications**:

```
ommcre8studio/
├── src/            # Application 1: Public Agency Website (Port 5173)
├── backend/        # Application 2: Backend REST API & Services (Port 4000)
└── admin-portal/   # Application 3: Secure Admin Command Center (Port 5174)
```

---

## 1. Public Agency Website (`src/`)

- **Tech Stack**: TanStack Start (SSR + routing), React 19, Tailwind CSS v4, Lucide Icons, Radix UI primitives.
- **Design Aesthetic**: Cinematic dark luxury (`#08090B`, dark glassmorphism, Geist typography, gold/cyan accents, micro-animations).
- **Key Features**:
  - **Cre8 AI Studio Assistant**: Global floating assistant on all pages. Answers questions regarding services, Om Yadav, pricing ranges, and case studies (including True Legal Advice), and can directly pre-fill or initiate consultation bookings.
  - **Flagship Case Study — True Legal Advice** (`trulegaladvice.com`): Sub-second load performance (<0.8s LCP), +44% consultation inquiry increase, legal practice taxonomy, and instant attorney calendar booking.
  - **Interactive Project Estimator**: Instant budget and timeline calculator for websites, software, e-commerce, mobile apps, cinema films, and reels retainers with 1-click inquiry pre-fill.
  - **Reels & Cinema Showcase**: Interactive video screening modal for 4K widescreen brand films and 9:16 vertical Instagram reels with DaVinci Resolve color grading.
  - **Founder & Studio Practice**: Independent multidisciplinary practice led by Om Yadav, uniting software architecture, UI/UX, cinematography, DaVinci Resolve color grading, and viral social growth.
  - **Booking System**: Direct Calendly live calendar embed and fallback appointment scheduling.
  - **Inquiry Funnel**: Validated multi-step inquiry intake with privacy consent.

---

## 2. Backend REST API (`backend/`)

- **Tech Stack**: Node.js, Express, TypeScript (ES2022), Zod, JWT.
- **Port**: `http://localhost:4000`
- **Core Endpoints**:
  - `POST /api/inquiries`: Validates incoming briefs, generates reference `OCS-2026-XXXX`, and triggers automated confirmation emails.
  - `GET /api/inquiries`: Filter leads by status (`new`, `reviewing`, `quoted`, `booked`, `won`, `archived`) and search.
  - `PATCH /api/inquiries/:id`: Update status and internal team notes.
  - `POST /api/ai/chat`: AI Assistant knowledge engine providing contextual responses regarding studio capabilities, pricing, and True Legal Advice.
  - `GET /api/bookings`: Manage scheduled discovery meetings and Calendly webhooks.
  - `POST /api/auth/login`: Admin authentication returning signed JWT tokens.
  - `GET /api/analytics`: Dashboard KPI statistics and pipeline metrics.
  - `GET /api/health`: Health status.
- **Automated Email Service**: Sends confirmation emails to clients and instant lead alerts to founder `omyadv@icloud.com` (Resend API & SMTP support + console fallback).
- **Test Suite**: Integrated Node test runner (`npm test`) covering all endpoints.

---

## 3. Admin Command Center (`admin-portal/`)

- **Tech Stack**: Standalone Vite + React 19 + Tailwind CSS + Lucide Icons.
- **Port**: `http://localhost:5174`
- **Core Features**:
  - **Secure Authentication**: Email & password login + 1-Click Demo Login (`admin@omcreate.studio` / `admin123`) with JWT session storage.
  - **Dashboard Overview**: Active pipeline value, total inquiries, discovery calls, conversion rate, and pipeline status distribution.
  - **Inquiries & Leads CRM**: Searchable lead table, status filter tabs, detail drawer with full brief, internal admin notes with instant save, and quick email reply templates.
  - **Discovery Bookings Manager**: View scheduled discovery calls, meeting links, and Calendly sync status.
  - **AI Assistant Logs**: Real-time transcripts of questions asked by visitors on the public site and lead captures.
  - **CMS & Portfolio Manager**: Toggle publication status and hero featured placement for case studies.
  - **System & Integrations**: Health monitoring for Calendly, Resend, Supabase, and OpenAI API keys.

---

## Quick Start & Running Locally

### Run Public Website:
```bash
npm run dev
# Opens at http://localhost:5173
```

### Run Backend API:
```bash
npm run backend:dev
# Opens at http://localhost:4000
```

### Run Admin Portal:
```bash
npm run admin:dev
# Opens at http://localhost:5174
```

### Run Automated Test Suites:
```bash
# Public website test suite (Vitest):
npm test

# Backend API test suite (Node test runner + Supertest):
npm run backend:test
```

---

## Credentials & Configuration

- **Admin Login**: `admin@omcreate.studio` / `admin123`
- **Founder**: Om Yadav ([omyadav.online](https://www.omyadav.online/))
- **Email**: `omyadv@icloud.com`
- **Calendly Booking**: `https://calendly.com/omyadv`
