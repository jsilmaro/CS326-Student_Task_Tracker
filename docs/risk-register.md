# Risk Register – Student Task Tracker

| Risk | Likelihood (1–5) | Impact (1–5) | Score | Mitigation | Owner |
|------|------------------|--------------|-------|------------|-------|
| Server downtime | 3 | 5 | 15 | Use reliable hosting + backups | Quibra |
| Data loss | 2 | 5 | 10 | Regular database backups | Quibra |
| Login/auth bugs | 4 | 4 | 16 | Thorough testing | Gentrolizo |
| Missed deadlines | 3 | 4 | 12 | Weekly check-ins | Rapirap |
| Poor UI/UX | 2 | 3 | 6 | User feedback testing | Silmaro |
| Merge conflicts | 4 | 3 | 12 | Use PR workflow | Quibra |
| Requirement changes | 3 | 4 | 12 | Flexible backlog updates | Rapirap |
| Security vulnerability | 2 | 5 | 10 | Input validation + auth security | Gentrolizo |
| Feature complexity increase | 3 | 3 | 9 | Simplify implementation | Rapirap |
| SQL Injection | 2 | 5 | 10 | All queries use parameterized statements ($1, $2...) — no raw string interpolation | Gentrolizo |
| Broken Authentication / JWT theft | 3 | 5 | 15 | JWT expires in 7 days; tokens stored in localStorage; HTTPS enforced in production; generic login error messages prevent user enumeration | Gentrolizo |
| Vulnerable dependencies (CVE) | 3 | 4 | 12 | Weekly `npm audit` / `pnpm audit` in CI pipeline; vite upgraded to 6.4.2 to patch 5 CVEs in Week 11 | Quibra |