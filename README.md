# HireMe Admin Dashboard

A complete React + Redux Toolkit + Tailwind CSS admin dashboard for the HireMe artist booking platform.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

**Login credentials (demo):**
- Email: `admin@hireme.lk`
- Password: `admin123`

---

## 📁 Folder Structure

```
src/
├── app/
│   └── store.js                  # Redux store (configureStore)
│
├── components/
│   ├── common/
│   │   ├── FilterTabs.jsx        # Reusable tab filters (All/Verified/Pending...)
│   │   ├── PageHeader.jsx        # Page title + subtitle
│   │   ├── SearchBar.jsx         # Search input with icon
│   │   ├── StatCard.jsx          # Stat number card with badge
│   │   └── StatusBadge.jsx       # Colored status pill (verified/pending/banned...)
│   └── layout/
│       ├── AdminLayout.jsx       # Sidebar + Topbar wrapper (Outlet)
│       ├── Sidebar.jsx           # Left nav with active states + badge counts
│       └── Topbar.jsx            # Top bar with search + bell notification
│
├── features/                     # Redux slices (one per domain)
│   ├── auth/
│   │   └── authSlice.js          # login / logout
│   ├── artists/
│   │   └── artistsSlice.js       # list, filter, approve, reject, suspend
│   ├── verification/
│   │   └── verificationSlice.js  # list, expand/collapse, approve, reject
│   ├── customers/
│   │   └── customersSlice.js     # list, filter, ban, unban
│   ├── bookings/
│   │   └── bookingsSlice.js      # list, filter, cancel
│   └── settings/
│       └── settingsSlice.js      # commission %, deposit %, toggles
│
├── pages/
│   ├── Login.jsx                 # Admin login screen
│   ├── Dashboard.jsx             # Stats overview + recent bookings
│   ├── Artists.jsx               # Artist table with approve/reject
│   ├── Verification.jsx          # Expandable verification cards
│   ├── Customers.jsx             # User table with ban/unban
│   ├── Bookings.jsx              # All bookings with filters
│   └── Settings.jsx              # Commission, toggles, platform config
│
├── routes/
│   ├── AppRouter.jsx             # All routes defined here
│   └── ProtectedRoute.jsx        # Redirects to /login if not authenticated
│
└── utils/
    └── mockData.js               # All mock data (replace with real API calls)
```

---

## 🔧 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Redux Toolkit | Global state management |
| React Router v6 | Page routing |
| Tailwind CSS | Styling |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |

---

## 🔌 Connecting to Your Real API

Replace mock data in `src/utils/mockData.js` with API calls.

Example with RTK Query (recommended):

```js
// features/artists/artistsAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const artistsApi = createApi({
  reducerPath: 'artistsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api.com/api/' }),
  endpoints: (builder) => ({
    getArtists: builder.query({ query: () => 'artists' }),
    approveArtist: builder.mutation({
      query: (id) => ({ url: `artists/${id}/approve`, method: 'POST' }),
    }),
  }),
})
```

---

## 📄 Pages Summary

| Page | Path | Features |
|------|------|---------|
| Dashboard | `/` | Stats cards, recent bookings, quick metrics |
| Artists | `/artists` | Table, search, filter, approve/reject/suspend |
| Verification | `/verification` | Expandable cards with docs & portfolio |
| Customers | `/customers` | Table, search, filter, ban/unban |
| Bookings | `/bookings` | Full booking list, status filters, cancel |
| Settings | `/settings` | Commission %, deposit %, feature toggles |
