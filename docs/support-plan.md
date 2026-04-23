# Support Plan – Student Task Tracker

## Issue Reporting Process

1. User encounters a bug or issue
2. Open a GitHub Issue using the bug report template
   - Include: steps to reproduce, expected vs actual behavior, screenshots if possible
3. Issue is triaged by the QA Lead (Gentrolizo) within 1 business day
4. Issue is labeled (bug / enhancement / question) and assigned to a team member

## Response Times

| Severity | Description | Response Time | Resolution Target |
|----------|-------------|---------------|-------------------|
| Critical | System down / login broken | Within 4 hours | Same day |
| High | Core feature not working (tasks, dashboard) | Within 1 day | Within 2 days |
| Medium | Minor feature broken or UI issue | Within 2 days | Within 5 days |
| Low | Cosmetic issue / enhancement request | Within 1 week | Next sprint |

## Common Issues & Fixes

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| Can't log in | Wrong credentials or session expired | Clear cookies, retry or reset password |
| Tasks not saving | Network error or validation failure | Check console errors, retry |
| Page not loading | Deployment issue | Check Vercel status, redeploy if needed |
| Logout not working | Session bug | Hard refresh (Ctrl+Shift+R), clear cache |

## Escalation Path

1. User reports issue via GitHub Issues
2. QA Lead (Gentrolizo) reviews and assigns
3. Assigned developer investigates and fixes
4. If unresolved within response window, escalate to Project Manager (Rapirap)
5. Critical issues are communicated to the full team immediately

## Support Contacts

| Role | Member | Responsibility |
|------|--------|---------------|
| Project Manager | Rapirap | Final escalation, team coordination |
| QA Lead | Gentrolizo | Issue triage and verification |
| DevOps Lead | Quibra | Deployment and infrastructure issues |
| Documentation Lead | Silmaro | Docs updates and user guidance |
