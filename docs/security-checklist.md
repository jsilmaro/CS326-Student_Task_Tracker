# Security Checklist – Student Task Tracker

## 1. Input Validation

| Location | Validation Applied | Status |
|----------|--------------------|--------|
| `POST /api/auth/register` | Name (2–100 chars), valid email format, password (8–128 chars) | ✅ Done |
| `POST /api/auth/login` | Valid email format, password required | ✅ Done |
| `POST /api/tasks` | Title required (1–255 chars), description (≤2000), category whitelist, priority whitelist, valid date | ✅ Done |
| `PUT /api/tasks/:id` | Same field validation as create | ✅ Done |

Validation middleware: `backend/middleware/validate.js`

## 2. Authentication & Authorization

| Item | Implementation | Status |
|------|---------------|--------|
| Password hashing | bcryptjs with salt rounds = 10 | ✅ Done |
| Token-based auth | JWT signed with `JWT_SECRET`, expires in 7 days | ✅ Done |
| Protected routes | All `/api/tasks` and `/api/users` routes require valid Bearer token | ✅ Done |
| User isolation | All DB queries filter by `user_id = req.userId` — users can only access their own data | ✅ Done |
| Generic error messages | Login returns "Invalid email or password" (not which field is wrong) | ✅ Done |

## 3. Secrets Management

| Item | Status |
|------|--------|
| `.env` file gitignored | ✅ Done |
| `backend/.env` gitignored | ✅ Done |
| Database URL in environment variable | ✅ Done |
| JWT secret in environment variable | ✅ Done |
| CI/CD secrets stored in GitHub Secrets | ✅ Done |
| `.env.example` provided (no real values) | ✅ Done |

## 4. Dependency Security

| Audit | Result | Date |
|-------|--------|------|
| `npm audit` (backend) | 0 vulnerabilities | Week 11 |
| `pnpm audit` (frontend) | 0 vulnerabilities after vite upgrade to 6.4.2 | Week 11 |

Vite was upgraded from 6.3.5 → 6.4.2 to patch 5 known CVEs (path traversal, file read via WebSocket).

## 5. Logging & Error Handling

| Item | Status |
|------|--------|
| Server errors logged with `console.error` | ✅ Done |
| Stack traces not exposed to client | ✅ Done — only generic "Server error" returned |
| Validation errors return descriptive 400 messages | ✅ Done |

## 6. Least Privilege

| Item | Status |
|------|--------|
| Users can only read/write their own tasks | ✅ Done — `WHERE user_id = $1` on all queries |
| No admin endpoints exposed | ✅ Done |
| DB user has only necessary permissions (Neon managed) | ✅ Done |
