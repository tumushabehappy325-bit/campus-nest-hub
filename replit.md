# Campus Nest Hub

A student housing portal for Mbarara University of Science & Technology (MUST). Browse verified accommodation listings, manage bookings, and administer the platform — all with role-based access.

## Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **UI**: shadcn/ui + Tailwind CSS
- **State**: React Context (AuthContext), TanStack Query for data
- **Charts**: Recharts (admin analytics)
- **Auth**: localStorage-based (no backend yet)

## Running the app

```bash
npm install
npm run dev        # main app (students + landlords) at http://localhost:5000
npm run admin      # admin console at http://localhost:3001
npm run build      # production build
npm run preview    # preview production build
npm run lint       # lint
```

## User roles & dashboards

### Admin
- **Login**: `admin@campusnest.ac.mw` / `admin123`
- **Main app admin view** `/admin/dashboard` on port 5000 (in-app, uses localStorage)
- **Dedicated Admin Console** → **port 3001** (separate Express server with persistent JSON store)
  - Verify / reject landlord registration applications
  - Review and action student reports (fraud, safety, maintenance, welfare)
  - Manage welfare cases with severity tracking and case notes
  - View platform analytics (listings, bookings, user counts) with live charts

### Student
- Register at `/register` (select "Student")
- **Dashboard** `/student/dashboard`: Search properties, save listings, schedule visits, book properties, send messages, leave reviews, report issues, manage profile

### Landlord
- Register at `/register` (select "Landlord") — requires admin verification
- **Dashboard** `/landlord/dashboard`: Create/manage listings, upload photos & verification docs, manage bookings, respond to messages

## Architecture

```
src/
  contexts/     AuthContext.tsx          — auth state, login/register/logout
  types/        auth.ts, listing.ts      — shared types
  pages/
    auth/       Login.tsx, Register.tsx
    student/    StudentDashboard, Profile, SavedListings, MyVisits, MyBookings, Messages, Reviews
    landlord/   LandlordDashboard, CreateListing, ManageListings, ManageBookings, LandlordMessages, LandlordProfile
    admin/      AdminDashboard
  components/
    DashboardLayout.tsx   — role-aware sidebar (green=student, blue=landlord, slate=admin)
    ProtectedRoute.tsx    — role-gated route guard
    Navbar.tsx            — public nav with Sign In / Register / My Dashboard
  data/
    listings.ts           — mock listings (mockListings + alias listings)
    mockStudentData.ts    — mock visits, bookings, messages, reviews
    mockLandlordData.ts   — mock landlord listings, bookings, messages
  routes/
    AppRoutes.tsx         — all routes; DASHBOARD_PATHS used by App.tsx to hide public Navbar
```

## Data persistence

- **Main app (port 5000)**: user accounts and sessions live in `localStorage`. Keys: `campus_nest_users`, `campus_nest_session`.
- **Admin console (port 3001)**: data persisted in `admin-server/db.json` (Express JSON store). Includes seeded students, landlords, landlord applications, reports, and welfare cases. Changes survive server restarts.

## User preferences

- Keep the existing project structure; do not restructure or migrate without asking.
- Port 5000 for the Vite dev server (required for Replit webview).
