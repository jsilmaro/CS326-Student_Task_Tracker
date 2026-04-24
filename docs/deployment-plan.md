# Deployment Plan – Student Task Tracker

## Target Environment

- Platform: Vercel (frontend) + GitHub (version control)
- Branch: `main` is the production branch
- URL: deployed via Vercel's GitHub integration (auto-deploy on push)

## Rollout Strategy

Rolling deployment through Pull Requests into `main`.

1. Developer opens a PR from a feature branch
2. PR is reviewed and tests must pass (CI green)
3. PR is merged into `main`
4. Vercel automatically triggers a new deployment
5. Team verifies the live URL after each deploy

## Rollback Steps

If a deployment breaks the system:

1. Identify the last stable commit on `main`
   ```
   git log --oneline main
   ```
2. Revert to that commit
   ```
   git revert <bad-commit-hash>
   git push origin main
   ```
3. Vercel will auto-deploy the reverted code
4. If auto-deploy is unreliable, go to Vercel dashboard → Deployments → select a previous deployment → click "Redeploy"
5. Notify the team via the project communication channel

## Verification Steps

After every deployment:
- [ ] Open the live URL and confirm the app loads
- [ ] Test login and registration
- [ ] Add, edit, and delete a task
- [ ] Confirm logout works
- [ ] Check browser console for errors
