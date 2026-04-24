# CS326 - Student Task Tracker

A web-based task tracking system that helps students manage assignments, set deadlines, and monitor their progress. Built with React + Vite + Tailwind CSS.

## Project Status

Frontend UI is in progress. Backend integration is planned next.

## Team Roles

| Member | Role |
|--------|------|
| Rapirap | Project Manager / Scrum Master |
| Gentrolizo | QA Lead |
| Quibra | DevOps Lead |
| Silmaro | Documentation Lead |

## Repository Structure

```
CS326-Student_Task_Tracker/
├── src/                        # Frontend (React + Vite + Tailwind)
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── layouts/
│   │   └── pages/
│   │       ├── Dashboard.tsx
│   │       ├── Tasks.tsx
│   │       ├── Login.tsx
│   │       ├── Calendar.tsx
│   │       └── Settings.tsx
│   └── styles/
├── activity/                   # CS326 in-lab activity files (Jest)
│   ├── sum.js
│   ├── sum.test.js
│   ├── categorizeTask.js
│   ├── task_category.js
│   ├── task_category.test.js
│   └── log_change.js
├── docs/                       # Project documentation
├── index.html
├── vite.config.ts
└── package.json
```

## Running the Frontend

```bash
pnpm install
pnpm dev
```

## Project Schedule

| Week | Goals | Deliverables |
|------|-------|-------------|
| Week 1 | Planning | Backlog |
| Week 2 | Sprint 1 start | Auth features |
| Week 3 | Task features | Add/Edit/Delete |
| Week 4 | Dashboard | UI complete |
| Week 5 | Testing | QA report |
| Week 6 | Deployment | Live system |
| Week 7 | Deployment docs | Deployment plan, support plan, release checklist |
| Week 8 | Maintenance | Tech debt log, refactor, performance notes, v0.8 tag |

## Sprint 1 Plan

Sprint Goal: Build core functionality for task tracking system

| Story | Owner |
|-------|-------|
| User Registration | Rapirap |
| Login | Gentrolizo |
| Add Task | Quibra |
| View Dashboard | Silmaro |
| Logout | Rapirap |
| Categorize Tasks | Silmaro |

## Product Backlog

| # | User Story | Priority | Points |
|---|-----------|----------|--------|
| 1 | As a student, I want to create an account so that I can manage my tasks | High | 5 |
| 2 | As a student, I want to log in so that I can access my tasks | High | 5 |
| 3 | As a student, I want to add tasks so that I can track assignments | High | 8 |
| 4 | As a student, I want to edit tasks so that I can update details | Medium | 5 |
| 5 | As a student, I want to delete tasks so that I can remove completed ones | Medium | 3 |
| 6 | As a student, I want to set deadlines so that I can track due dates | High | 5 |
| 7 | As a student, I want to mark tasks as complete so that I know progress | High | 3 |
| 8 | As a student, I want to view all tasks in a dashboard so that I see everything | High | 8 |
| 9 | As a student, I want reminders so that I don't miss deadlines | Low | 8 |
| 10 | As a student, I want to log out so that my account is secure | High | 2 |
| 11 | As a student, I want to categorize tasks so that I can organize them better | Medium | 5 |

## Versions

| Tag | Description |
|-----|-------------|
| v0.5-scm | SCM workflow practice — branching, PRs, merge conflict resolution |
| v0.8-maintenance | Refactor: fixed `categorizeTask` module name and output format |

## Docs

<<<<<<< HEAD
| Document | Description |
|----------|-------------|
| [Backlog](docs/backlog.md) | Full user stories with acceptance criteria |
| [Schedule](docs/schedule.md) | Weekly goals and deliverables |
| [Sprint 1 Plan](docs/sprint-1-plan.md) | Sprint stories and owners |
| [Team Roles](docs/team-roles.md) | Member responsibilities |
| [QA Plan](docs/qa-plan.md) | Test strategy and severity levels |
| [Defect Log](docs/defect-log.md) | Known bugs and status |
| [Risk Register](docs/risk-register.md) | Risks and mitigation strategies |
| [SCM Notes](docs/scm-notes.md) | Source control workflow notes |
| [Release Notes](docs/release-notes.md) | Release history |
| [Deployment Plan](docs/deployment-plan.md) | Deployment strategy and rollback steps |
| [Release Checklist](docs/release-checklist.md) | Pre-release verification steps |
| [Support Plan](docs/support-plan.md) | Issue reporting and response times |
| [Tech Debt](docs/tech-debt.md) | Technical debt items |
| [Performance](docs/performance.md) | Refactor before/after notes |
=======
- [Backlog](docs/backlog.md)
- [Schedule](docs/schedule.md)
- [Sprint 1 Plan](docs/sprint-1-plan.md)
- [Team Roles](docs/team-roles.md)
- [Deployment Plan](docs/deployment-plan.md)
- [Release Checklist](docs/release-checklist.md)
- [Support Plan](docs/support-plan.md)


  # Student Task Tracker UI

  This is a code bundle for Student Task Tracker UI. The original project is available at https://www.figma.com/design/fkFZJccaDlMsYQo6F1e1i4/Student-Task-Tracker-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
>>>>>>> 32db75506ee78594b872433ff59ce60b020474a5
