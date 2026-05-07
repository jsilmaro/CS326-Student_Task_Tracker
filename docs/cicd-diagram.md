# CI/CD Pipeline Diagram – Student Task Tracker

## Trigger

Push to `main` branch (or Pull Request targeting `main`)

## Pipeline Stages

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub: push to main                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Job 1: Unit Tests                                              │
│  ─────────────────                                              │
│  • Checkout code                                                │
│  • Setup Node.js 20                                             │
│  • Install dependencies                                         │
│  • Run Jest tests (activity/ folder)                            │
│  • PASS → continue  |  FAIL → pipeline stops                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
┌─────────────────────────┐   ┌─────────────────────────────────┐
│  Job 2: Build Frontend  │   │  Job 4: Deploy Backend (Render) │
│  ─────────────────────  │   │  ──────────────────────────────  │
│  • Setup pnpm           │   │  • Trigger Render deploy hook   │
│  • pnpm install         │   │  • Render pulls latest main     │
│  • pnpm build           │   │  • Runs: node index.js          │
│  • Upload dist artifact │   │  • Connected to Neon PostgreSQL │
└────────────┬────────────┘   └─────────────────────────────────┘
             │                             │
             ▼                             │
┌─────────────────────────────────────────┘
│  Job 3: Deploy Frontend (Vercel)
│  ────────────────────────────────
│  • Uses vercel-action
│  • Deploys dist/ to Vercel (--prod)
│  • Live at: student-task-tracker-gamma.vercel.app
└────────────────────────────┬────────────────────────────────────
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Job 5: Smoke Tests                                             │
│  ─────────────────                                              │
│  • Wait 30s for deployments to stabilize                        │
│  • curl backend root → expect HTTP 200                          │
│  • curl frontend URL → expect HTTP 200                          │
│  • PASS = deployment verified  |  FAIL = alert team             │
└─────────────────────────────────────────────────────────────────┘
```

## Secrets Required (GitHub → Settings → Secrets)

| Secret | Description |
|--------|-------------|
| `VITE_API_URL` | Backend API URL e.g. `https://cs326-student-task-tracker.onrender.com/api` |
| `FRONTEND_URL` | Vercel frontend URL e.g. `https://student-task-tracker-gamma.vercel.app` |
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Found in Vercel project settings |
| `VERCEL_PROJECT_ID` | Found in Vercel project settings |
| `RENDER_DEPLOY_HOOK_URL` | From Render → Service → Settings → Deploy Hook |

## How to Get Each Secret

### Vercel secrets
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create token → copy as `VERCEL_TOKEN`
2. Go to your Vercel project → Settings → General → scroll to **Project ID** → copy as `VERCEL_PROJECT_ID`
3. Same page → scroll to **Team ID** (or check URL: `vercel.com/[org-id]/...`) → copy as `VERCEL_ORG_ID`

### Render deploy hook
1. Go to [render.com](https://render.com) → your backend service
2. Settings → **Deploy Hook** → copy the URL → save as `RENDER_DEPLOY_HOOK_URL`

### Add secrets to GitHub
1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each one above

## Screenshot Guide (for submission)

Take screenshots of:
1. GitHub → Actions tab showing a green pipeline run with all 5 jobs passing
2. Each job expanded showing the steps and logs
3. Vercel dashboard showing the latest production deployment
4. Render dashboard showing the latest deploy triggered
5. The smoke test job logs showing HTTP 200 responses
