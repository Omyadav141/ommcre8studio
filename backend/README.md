# OMCRE8 Studio — Backend API Architecture

Robust modular backend server for **OMCRE8 Studio (Om Create Studio)**, an independent digital product and creative production agency founded by **Om Yadav** ([omyadav.online](https://www.omyadav.online/)).

---

## Architecture Overview

- **Language / Runtime**: Node.js & TypeScript (ES2022)
- **Framework**: Express.js with modular REST routers
- **Validation**: Zod schema validation
- **Authentication**: JWT token signed sessions for the Admin Portal
- **Data Persistence**: In-memory store with JSON file syncing (`data/studio-db.json`) and PostgreSQL / Supabase adapter readiness
- **Email Automation**: Resend API integration with plain-text & rich HTML templating + developer console logger fallback
- **AI Intelligence**: Contextual RAG engine loaded with studio services, Om Yadav background, pricing matrix, and True Legal Advice case study facts (supports OpenAI / Gemini API keys)

---

## API Endpoints

### 1. Inquiries & Lead Management
- `POST /api/inquiries`: Submit project enquiry (validates via Zod, issues reference `OCS-2026-XXXX`, triggers automated confirmation to client and alert to `omyadv@icloud.com`).
- `GET /api/inquiries`: List all leads (supports `?status=new|reviewing|quoted|won` and `?search=`).
- `GET /api/inquiries/:id`: Retrieve single enquiry.
- `PATCH /api/inquiries/:id`: Update lead status and internal review notes.
- `DELETE /api/inquiries/:id`: Archive or delete enquiry.

### 2. AI Studio Assistant
- `POST /api/ai/chat`: Interactive chat with history. Responds intelligently about studio services, budgets, timelines, True Legal Advice, Om Yadav, and booking links.
- `GET /api/ai/logs`: Inspect conversation logs and lead generation trends.

### 3. Bookings & Calendar
- `GET /api/bookings`: Retrieve scheduled discovery calls.
- `POST /api/bookings`: Record a discovery meeting.
- `PATCH /api/bookings/:id`: Update status or reschedule meeting.
- `POST /api/bookings/calendly-webhook`: Real-time listener for Calendly appointments (`invitee.created`).

### 4. Admin Authentication
- `POST /api/auth/login`: Authenticate admin with email and password (`admin@omcreate.studio` / `admin123`). Returns signed JWT.
- `GET /api/auth/me`: Verify JWT session and return admin profile.

### 5. Analytics & Dashboard
- `GET /api/analytics`: Overview metrics (Total leads, active pipeline value, booked calls, conversion rate, breakdown by capability).

### 6. Portfolio & CMS
- `GET /api/projects`: Retrieve case studies and showcase projects.
- `PATCH /api/projects/:id`: Update status (draft/published), descriptions, and tags.

### 7. System Health
- `GET /api/health`: Health status, uptime, and timestamp.

---

## Installation & Running

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:4000`.

To run tests:
```bash
npm test
```
