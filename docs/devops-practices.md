# DevOps Practices – Student Task Tracker

## 1. Automation

| Practice | Implementation |
|----------|---------------|
| CI/CD Pipeline | GitHub Actions — triggers on every push to `main` |
| Automated testing | Jest unit tests run on every push before build |
| Automated build | `pnpm build` runs after tests pass |
| Automated deployment | Vercel auto-deploys frontend; Render deploy hook triggers backend |
| Automated smoke tests | curl health checks after every deploy verify HTTP 200 |
| Dependency audit | `pnpm audit` / `npm audit` run to detect CVEs |

## 2. Collaboration

| Practice | Implementation |
|----------|---------------|
| Version control | Git + GitHub — all changes tracked |
| Branch strategy | Feature branches → PR → merge to `main` |
| PR template | `.github/pull_request_template.md` standardizes reviews |
| Issue tracking | GitHub Issues with bug report and feature request templates |
| Code review | PRs reviewed before merge to main |
| Commit conventions | Conventional commits (`feat:`, `fix:`, `chore:`, `ci:`) |

## 3. Monitoring & Logging

| Practice | Implementation |
|----------|---------------|
| Request logging | Custom middleware logs `[timestamp] METHOD /path STATUS ms` to Render console |
| Error logging | Global error handler logs all unhandled errors with timestamp and route |
| Smoke tests | Post-deploy health checks in CI pipeline verify frontend and backend are live |
| Uptime | Render dashboard shows service uptime and restart history |
| Dependency monitoring | `pnpm audit` catches CVEs — vite upgraded from 6.3.5 → 6.4.2 in Week 11 |

## 4. Feedback Loops

| Loop | How It Works |
|------|-------------|
| Fast feedback on code | Tests run in ~16s; full pipeline completes in ~3 min |
| Deploy verification | Smoke test confirms live system after every deploy |
| Bug tracking | Defects logged in `docs/defect-log.md` and tracked to resolution |
| KPI review | Weekly metrics reviewed in `docs/metrics-report.md` |
| Security feedback | Audit results reviewed each sprint; vulnerabilities patched immediately |

## 5. Cloud/DevOps Improvement — Pipeline Optimization

Added parallel job execution in the CI/CD pipeline:
- `deploy-backend` runs in parallel with `build` (both depend only on `test`)
- This reduces total pipeline time by ~20–30 seconds compared to sequential execution

Pipeline structure:
```
test → build → deploy-frontend → smoke-test
     ↘ deploy-backend ↗
```

Both deploy jobs run simultaneously after tests pass, then smoke test waits for both.

## 6. Release Management

| Version | Tag | Description |
|---------|-----|-------------|
| v0.5-scm | `v0.5-scm` | SCM workflow practice |
| v0.8-maintenance | `v0.8-maintenance` | Refactor and tech debt fixes |
| v1.0 | `v1.0` | Production release — full stack, CI/CD, security, monitoring |
