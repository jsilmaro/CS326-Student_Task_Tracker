# System Architecture – Student Task Tracker

## Overview

Student Task Tracker is a full-stack web application with a React frontend, a Node.js/Express REST API backend, and a PostgreSQL database hosted on Neon.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER (Browser)                             │
│                  https://student-task-tracker-gamma.vercel.app      │
└────────────────────────────┬────────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Vercel)                               │
│                                                                     │
│  React 18 + Vite + Tailwind CSS + shadcn/ui                        │
│                                                                     │
│  Pages:                                                             │
│  ├── /           → Login / Register                                 │
│  ├── /app/dashboard  → Dashboard + MotivationWidget                │
│  ├── /app/tasks      → Task CRUD                                    │
│  ├── /app/calendar   → Calendar view                               │
│  └── /app/settings   → Profile, theme, notifications               │
│                                                                     │
│  Services:                                                          │
│  └── src/app/services/api.ts  → fetch() calls to backend           │
└────────────────────────────┬────────────────────────────────────────┘
                             │ HTTPS + JSON + Bearer JWT
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     BACKEND API (Render)                            │
│              https://cs326-student-task-tracker.onrender.com        │
│                                                                     │
│  Node.js + Express                                                  │
│                                                                     │
│  Middleware:                                                        │
│  ├── CORS          → whitelist Vercel origin                        │
│  ├── Request Logger → [timestamp] METHOD /path STATUS ms            │
│  ├── auth.js       → JWT Bearer token verification                  │
│  └── validate.js   → input sanitization + field validation          │
│                                                                     │
│  Routes:                                                            │
│  ├── POST /api/auth/register                                        │
│  ├── POST /api/auth/login                                           │
│  ├── GET  /api/auth/me                                              │
│  ├── GET|POST|PUT|DELETE /api/tasks                                 │
│  ├── GET  /api/tasks/stats                                          │
│  └── PUT|DELETE /api/users/*                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │ SSL + Parameterized Queries
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     DATABASE (Neon)                                 │
│         PostgreSQL — ep-bold-dream-amadem34 (US East)               │
│                                                                     │
│  Tables:                                                            │
│  ├── users (id, name, email, password_hash, university,             │
│  │          notif_*, created_at)                                    │
│  └── tasks (id, user_id FK, title, description, category,          │
│             due_date, completed, priority, completed_at,            │
│             created_at)                                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Authentication Flow
```
User submits login form
  → Frontend: POST /api/auth/login { email, password }
  → Backend: validateLogin middleware → bcrypt.compare → JWT sign
  → Response: { token, user }
  → Frontend: stores token in localStorage
  → All subsequent requests: Authorization: Bearer <token>
```

### Task CRUD Flow
```
User creates a task
  → Frontend: POST /api/tasks { title, category, due_date, priority }
  → Backend: authMiddleware (verify JWT) → validateTask → INSERT INTO tasks
  → Response: created task row
  → Frontend: updates local state, re-renders task list
```

---

## Component Responsibilities

| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| Frontend | React + Vite | UI rendering, routing, API calls |
| API Server | Node.js + Express | Business logic, auth, validation |
| Database | PostgreSQL (Neon) | Persistent data storage |
| Auth | JWT + bcryptjs | Stateless authentication |
| CI/CD | GitHub Actions | Automated test, build, deploy |
| Frontend Host | Vercel | Static site delivery via CDN |
| Backend Host | Render | Node.js process hosting |
