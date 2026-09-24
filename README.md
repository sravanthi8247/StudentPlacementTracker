# Student Placement Tracker

A full-stack MERN application for colleges to track student placement activity — managing student profiles, recruiting companies, and placement records, with a live dashboard summarizing placement statistics.

## Features

- **Authentication** — JWT-based register/login with bcrypt password hashing and role-based access (`student` / `admin`)
- **Protected API** — every data route requires a valid token; create/update/delete actions are restricted to admins
- **Student management** — add, edit, delete, and list students with branch, year, CGPA, skills, and placement status
- **Company management** — track recruiting companies visiting campus
- **Placement records** — log which students were placed at which companies
- **Dashboard** — live stats: total students, placed vs. not placed, placement rate, total companies, total placements

## Tech Stack

**Frontend:** React 18, Vite, React Router, Axios
**Backend:** Node.js, Express, MongoDB (Mongoose)
**Auth:** JSON Web Tokens (JWT), bcryptjs

## Project Structure

```
StudentPlacementTracker/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Reusable UI, forms, layout
│       ├── pages/          # Route-level pages (Dashboard, Students, Companies, Placements, Login, Register)
│       ├── services/       # Axios API calls
│       ├── context/        # React context (auth state)
│       ├── hooks/          # Custom hooks
│       └── utils/          # Validation helpers
└── server/                 # Express + MongoDB backend
    ├── controllers/        # Route handlers
    ├── models/              # Mongoose schemas (User, Student, Company, Placement)
    ├── routes/              # Express routers
    ├── middleware/          # Auth (protect/authorize) and error handling
    └── config/              # Database connection
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/StudentPlacementTracker.git
cd StudentPlacementTracker
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env   # then fill in your own values
npm run dev
```

`.env` variables:

| Variable | Description |
|---|---|
| `PORT` | Port the API runs on (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `CLIENT_URL` | Frontend origin, for CORS (default `http://localhost:5173`) |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (default `7d`) |

### 3. Set up the frontend

```bash
cd client
npm install
cp .env.example .env   # optional — see below
npm run dev
```

By default the frontend calls `/api` and Vite proxies that to `http://localhost:5000`, so no extra config is needed for local development. When deploying, set `VITE_API_URL` in `client/.env` to your deployed backend's URL (e.g. `https://your-backend.example.com/api`).

The app will be running at `http://localhost:5173`.

## API Overview

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |
| GET | `/api/students`, `/api/companies`, `/api/placements` | Authenticated |
| POST/PUT/DELETE | `/api/students`, `/api/companies`, `/api/placements` | Admin only |
| GET | `/api/students/dashboard/stats` | Authenticated |
| GET | `/api/health` | Public |

## License

This project is licensed under the [MIT License](LICENSE).
