# Demo Script – Student Task Tracker (v1.0)

Duration: 5–7 minutes

---

## 1. Problem (30 seconds)

"Students struggle to track multiple assignments across different subjects, often missing deadlines or losing track of priorities. Existing tools are either too complex or not focused on academic use. We built TaskFlow — a simple, focused task tracker designed specifically for students."

---

## 2. Solution (1 minute)

Show the live app at: https://student-task-tracker-gamma.vercel.app

- Walk through the Login page — show register and sign in
- Show the Dashboard — greeting, motivation widget, stats, recent tasks
- Show the Tasks page — add a task, set priority, set due date, mark complete
- Show the Calendar — tasks plotted on calendar by due date
- Show Settings — theme switching, profile update

---

## 3. Pipeline (1.5 minutes)

Show GitHub Actions at: https://github.com/jsilmaro/CS326-Student_Task_Tracker/actions

- "Every push to main triggers our 5-job CI/CD pipeline"
- Job 1: Unit Tests — Jest runs activity/ tests in ~16 seconds
- Job 2: Build Frontend — pnpm build compiles the React app
- Job 3 + 4: Deploy Frontend (Vercel) and Deploy Backend (Render) run in parallel
- Job 5: Smoke Test — curl checks confirm both services return HTTP 200

---

## 4. Deployment (1 minute)

- Frontend: Vercel — https://student-task-tracker-gamma.vercel.app
- Backend: Render — https://cs326-student-task-tracker.onrender.com
- Database: Neon PostgreSQL — tables: users, tasks
- Show Render logs — request logger output: `[timestamp] GET / 200 145ms`

---

## 5. Metrics (1 minute)

Reference docs/metrics-report.md:

- Deployment frequency: ~4 deploys/week
- Lead time: ~2–3 minutes end-to-end
- Defect rate: 3 bugs total across 14 weeks, all resolved
- API response time: 150–300ms warm, cold start ~800ms (free tier)
- ROI: 172% based on 100-student productivity model

---

## 6. Lessons Learned (1 minute)

- "We learned that CI/CD saves significant debugging time — catching broken builds before they reach production"
- "Security should be built in from the start — adding input validation and auditing dependencies early prevents bigger issues later"
- "Free tier hosting has real limitations (cold starts, sleep) — important to document and plan for in production"
- "Documentation as code (docs/ folder in the repo) keeps the team aligned and makes submission easy"
- "Merge conflicts happen — a clear branching strategy and PR workflow prevents most of them"

---

## Key Files to Reference During Demo

| Topic | File |
|-------|------|
| Architecture | docs/architecture.md |
| CI/CD pipeline | .github/workflows/deploy.yml |
| Security | docs/security-checklist.md |
| KPIs | docs/kpis.md + docs/metrics-report.md |
| Cost-benefit | docs/cost-benefit.md |
| Ethics | docs/ethics-impact.md |
