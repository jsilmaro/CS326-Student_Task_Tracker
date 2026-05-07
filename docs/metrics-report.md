# Metrics Report – Student Task Tracker (Week 13)

## KPI Dashboard

| KPI | Current | Target | Status | Interpretation |
|-----|---------|--------|--------|----------------|
| Deployment Frequency | ~3–5 deploys/week | ≥ 2/week | ✅ Met | Active development with frequent pushes to main triggering auto-deploy |
| Lead Time for Changes | ~2–3 minutes | < 5 minutes | ✅ Met | GitHub Actions build + Vercel deploy completes in under 3 min on average |
| API Response Time | < 300ms (local) / ~800ms cold start (Render free tier) | < 500ms | ⚠️ Partial | Cold starts on Render free tier cause initial delay; warm requests are fast |
| Defect Rate | 3 bugs total across all sprints (defect-log.md) | ≤ 2/sprint | ✅ Met | 3 bugs total over 8+ weeks = well under threshold |
| System Availability | ~99% (Render free tier sleeps after inactivity) | ≥ 99% | ⚠️ Partial | Free tier spins down after 15 min idle; first request after sleep takes ~30s |

## Detailed Measurements

### 1. Deployment Frequency
- Source: GitHub Actions tab
- Measured: Week 10–13
- Runs per week: avg 4 pipeline executions
- Evidence: CI/CD pipeline history at `github.com/jsilmaro/CS326-Student_Task_Tracker/actions`

### 2. Lead Time for Changes
- Source: GitHub Actions job duration logs
- Build Frontend job: ~24–26 seconds
- Deploy Frontend (Vercel): ~20 seconds
- Total pipeline: ~2–3 minutes end-to-end
- Evidence: Actions run detail page showing job durations

### 3. API Response Time
- Source: Render service logs (request logger in `backend/index.js`)
- Log format: `[timestamp] METHOD /path STATUS Xms`
- Warm request average: 150–300ms
- Cold start (after idle): 800ms–30s (Render free tier limitation)
- Action: Upgrade to paid tier or use keep-alive ping to prevent sleep

### 4. Defect Rate
- Source: `docs/defect-log.md`
- Total bugs logged: 3 (Bug 001, 002, 003)
- All resolved — 0 open defects
- Rate: < 1 bug per sprint on average

### 5. System Availability
- Source: Render dashboard + smoke test in CI/CD pipeline
- Smoke test passes: consistent HTTP 200 on frontend and backend after deploy
- Known issue: Render free tier sleeps after 15 min of inactivity
- Mitigation: Smoke test in pipeline verifies availability after every deploy

## Action Plan

| Issue | Action |
|-------|--------|
| Render cold start delay | Add a keep-alive ping or upgrade to paid tier for production |
| API response time on cold start | Implement health check endpoint that keeps the service warm |
| Availability monitoring | Add external uptime monitor (e.g. UptimeRobot free tier) for continuous tracking |
