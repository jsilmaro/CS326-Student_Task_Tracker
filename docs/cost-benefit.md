# Cost–Benefit Analysis – Student Task Tracker

## Project Overview

- Team size: 4 members
- Project duration: 14 weeks (CS326 Software Engineering course)
- Roles: Project Manager, QA Lead, DevOps Lead, Documentation Lead
- Stack: React + Vite (frontend), Node.js + Express (backend), PostgreSQL on Neon

---

## Development Cost

### Estimated Hours per Role

| Role | Member | Est. Hours/Week | Weeks Active | Total Hours |
|------|--------|----------------|--------------|-------------|
| Project Manager / Scrum Master | Rapirap | 4 | 14 | 56 |
| QA Lead | Gentrolizo | 3 | 14 | 42 |
| DevOps Lead | Quibra | 4 | 14 | 56 |
| Documentation Lead | Silmaro | 3 | 14 | 42 |
| **Total** | | | | **196 hours** |

### Cost Calculation

Using a student/junior developer rate of **$15/hour** (academic project estimate):

| Item | Calculation | Cost |
|------|-------------|------|
| Development labor | 196 hours × $15/hr | $2,940 |
| Tools & software | All tools used are free/open source | $0 |
| **Total Development Cost** | | **$2,940** |

> Note: In a professional setting, junior developer rates range from $25–$50/hr. At $25/hr, total dev cost = $4,900.

---

## Operational Cost (Annual)

| Item | Provider | Cost |
|------|----------|------|
| Frontend hosting | Vercel (free tier) | $0/year |
| Backend hosting | Render (free tier) | $0/year |
| Database | Neon (free tier — 0.5 GB) | $0/year |
| Domain name | Not purchased (using platform subdomains) | $0/year |
| CI/CD | GitHub Actions (free for public repos) | $0/year |
| **Total Operational Cost** | | **$0/year** |

> If scaled to production with paid tiers:
> - Render Starter: $7/month = $84/year
> - Neon Pro: $19/month = $228/year
> - Vercel Pro: $20/month = $240/year
> - **Estimated production ops cost: ~$552/year**

---

## Benefits

### Tangible Benefits

| Benefit | Estimated Value |
|---------|----------------|
| Time saved per student per week (no manual tracking) | ~30 min/week |
| Reduced missed deadlines (estimated 20% improvement) | Fewer late submissions |
| Centralized task view replaces multiple apps/notebooks | 1 tool instead of 3–4 |
| Automated reminders reduce cognitive load | Estimated 15 min/week saved |

If used by **100 students**, each saving 30 min/week over a 16-week semester:
- Total time saved = 100 × 0.5 hr × 16 weeks = **800 hours**
- At student time value of $10/hr = **$8,000 in productivity value**

### Intangible Benefits

- Reduced academic stress from better deadline visibility
- Improved study habits through task prioritization (high/medium/low)
- Skill development for the dev team (full-stack, CI/CD, security, documentation)
- Portfolio project demonstrating real-world software engineering practices
- Open source contribution potential under MIT license

---

## ROI Calculation

Using the academic scenario (100 students, 1 semester):

```
ROI = (Total Benefits - Total Costs) / Total Costs × 100

Total Benefits = $8,000 (productivity value)
Total Costs    = $2,940 (dev) + $0 (ops) = $2,940

ROI = ($8,000 - $2,940) / $2,940 × 100 = 172%
```

**ROI = 172%** — the system generates more than double its development cost in productivity value within one semester of use.

---

## Case Study

> If this system is used by **500 students** across a university's CS department over one academic year, each saving an average of 30 minutes per week on task management across two 16-week semesters, the total productivity gain is approximately **8,000 hours**. At a conservative student time value of $10/hour, this represents **$80,000 in recovered productive time** — against a one-time development cost of $2,940 and annual operational costs under $600. The system pays for itself within the first week of adoption at scale.

---

## Recommendation

**Proceed — with minor improvements.**

The Student Task Tracker delivers strong value relative to its cost. Development cost is low (academic project, free tooling), operational cost is near-zero on free tiers, and the productivity benefits are measurable and significant at scale.

Recommended next steps:
1. Upgrade Render to a paid tier to eliminate cold-start delays (improves availability KPI)
2. Add offline support (PWA) to increase accessibility
3. Conduct a user study with real students to validate the 30 min/week time-saving estimate
4. Consider adding a mobile app to increase adoption rate

The system is technically sound, secure, and deployable. It is ready for pilot use with a small student cohort.
