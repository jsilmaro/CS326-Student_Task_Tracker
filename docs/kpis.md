# KPIs – Student Task Tracker

## Defined Key Performance Indicators

| # | KPI | Definition | Measurement Method | Target |
|---|-----|-----------|-------------------|--------|
| 1 | Deployment Frequency | How often code is deployed to production | Count of successful CI/CD pipeline runs per week | ≥ 2 per week |
| 2 | Lead Time for Changes | Time from code commit to live in production | Time between `git push` and Vercel/Render deploy completion | < 5 minutes |
| 3 | API Response Time | Average time for backend to respond to requests | Request logger timestamps in Render logs (`ms` field) | < 500ms |
| 4 | Defect Rate | Number of bugs found per sprint | Count of entries in `docs/defect-log.md` per week | ≤ 2 per sprint |
| 5 | System Availability | Percentage of time the app is accessible | Uptime monitoring via Render dashboard / smoke test pass rate | ≥ 99% |

## Data Collection Methods

- Deployment Frequency — GitHub Actions run history (Actions tab)
- Lead Time — GitHub Actions job duration logs
- API Response Time — Render service logs (request logger added in `backend/index.js`)
- Defect Rate — `docs/defect-log.md` entries per sprint
- Availability — Render uptime dashboard + CI/CD smoke test results
