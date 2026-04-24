# Release Checklist – Student Task Tracker

Use this checklist before every production release.

## Code Quality
- [ ] All feature branches merged into `main` via reviewed PRs
- [ ] No unresolved merge conflicts
- [ ] Code reviewed by at least one other team member

## Testing
- [ ] All unit tests pass (`npm test`)
- [ ] No failing tests in CI
- [ ] Manual smoke test completed on staging/preview URL

## Versioning
- [ ] Version number updated in `package.json`
- [ ] Git tag created for the release
  ```
  git tag -a v1.0.0 -m "Release v1.0.0"
  git push origin v1.0.0
  ```

## Backup & Rollback
- [ ] Previous stable commit SHA noted
- [ ] Rollback steps reviewed (see `docs/deployment-plan.md`)
- [ ] Team notified of upcoming deployment

## Deployment
- [ ] Push to `main` triggers Vercel auto-deploy
- [ ] Live URL verified after deployment
- [ ] No console errors on live site

## Post-Release
- [ ] Release notes updated (`docs/release-notes.md`)
- [ ] Defect log reviewed (`docs/defect-log.md`)
- [ ] Team confirms system is stable
