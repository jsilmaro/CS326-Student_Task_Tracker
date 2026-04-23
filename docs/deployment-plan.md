# Deployment Plan – Student Task Tracker

## Target Environment
The system will be deployed using Vercel for frontend hosting and GitHub for version control.

## Deployment Strategy
Rolling deployment via main branch updates. Each feature is merged through Pull Requests before being deployed to production.

Steps:
1. Push latest code to main branch
2. Vercel automatically deploys from GitHub
3. Verify deployment via live URL

## Rollback Plan
If deployment fails:
1. Revert to previous stable commit using Git
2. Redeploy previous version on Vercel
3. If needed, disable auto-deploy and fix issues locally before redeploying