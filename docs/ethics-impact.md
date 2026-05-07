# Ethics & Impact – Student Task Tracker

## Stakeholders

| Stakeholder | Role | Interest |
|-------------|------|----------|
| Students | Primary users | Manage academic tasks, meet deadlines, reduce stress |
| Instructors / Faculty | Indirect users | Students submitting work on time |
| University / Institution | Indirect | Academic performance and student wellbeing |
| Development Team | Builders | Delivering a reliable, secure, and useful tool |
| Third-party service providers | Infrastructure | Neon (DB), Vercel (hosting), Render (backend) |

## Potential Ethical Risks & Mitigations

| Risk | Description | Mitigation |
|------|-------------|------------|
| Data privacy | Student task data (titles, deadlines, categories) is stored in a cloud database | Data is user-specific, access-controlled by JWT auth, and not shared with third parties |
| Unauthorized access | If a token is stolen, an attacker could read or modify a user's tasks | Tokens expire in 7 days; HTTPS enforced in production; passwords are bcrypt-hashed |
| Over-reliance on the tool | Students may become dependent on the app and struggle without it | The app is a supplement, not a replacement for personal responsibility |
| Bias in task categorization | Fixed categories (School, Personal, Others) may not reflect all users' needs | Categories are a starting point; future versions should allow custom categories |
| Exclusion | Students without reliable internet access cannot use the system | Acknowledged limitation; offline support is a future enhancement |
| Data retention after account deletion | Deleted accounts cascade-delete all tasks (ON DELETE CASCADE in DB) | Clearly documented in privacy note; users can delete their account at any time |

## Professional Responsibilities

- The team commits to not collecting data beyond what is necessary for the app to function
- No analytics, tracking pixels, or third-party advertising are used
- The codebase is open source under MIT license — transparent and auditable
- Security vulnerabilities are addressed promptly (see `docs/security-checklist.md`)
