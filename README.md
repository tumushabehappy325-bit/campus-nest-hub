# MUST Student Housing

A student housing portal for Mbarara University of Science & Technology (MUST). Browse and book verified accommodation, manage listings as a landlord, and administer the platform through a dedicated admin console.

## Ports

| Service | Port | Description |
|---------|------|-------------|
| Main app | **5000** | Student & landlord dashboards (React/Vite) |
| Admin Console | **3001** | Standalone admin management panel (Express + HTML) |

## Getting Started

Install dependencies:

```bash
npm install
```

Start both servers:

```bash
npm run dev     # Main app → http://localhost:5000
npm run admin   # Admin Console → http://localhost:3001
```

## Admin Console (port 3001)

Login with `admin@must.ac.ug` / `admin123`

The admin console is a separate Express server with its own persistent data store (`admin-server/db.json`). It provides:

- **Overview** — platform stats at a glance
- **All Users** — view all registered students and landlords
- **Verify Landlords** — approve or reject landlord registration applications with document review
- **Reports** — investigate and resolve student-submitted reports (fraud, safety, maintenance)
- **Welfare Cases** — manage student housing crises with severity levels and case notes
- **Analytics** — charts for listings, bookings, and user growth

## Demo credentials

| Role | Email | Password |
|------|-------|----------|
| Admin (main app) | `admin@must.ac.ug` | `admin123` |
| Admin (console) | `admin@must.ac.ug` | `admin123` |
| Student | Register at `/register` | — |
| Landlord | Register at `/register` | — |

## Scripts

```bash
npm run dev        # Main app dev server (port 5000)
npm run admin      # Admin console server (port 3001)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Lint checks
```
