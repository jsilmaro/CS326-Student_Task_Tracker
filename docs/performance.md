# Performance & Refactor Notes – Student Task Tracker

## Refactor: categorizeTask (Week 8 Maintenance)

### What Changed

| | Before | After |
|-|--------|-------|
| File name | `task_category.js` | `categorizeTask.js` |
| Import in test | `require('./categorizeTask')` (broken — file not found) | `require('./categorizeTask')` (resolves correctly) |
| Output format | `"Math homework - School"` | `"Math homework [School]"` |
| String style | Concatenation: `task + " - " + category` | Template literal: `` `${task} [${category}]` `` |
| JSDoc | None | Added `@param` and `@returns` |

### Before

```js
// task_category.js
function categorizeTask(task, category) {
  return task + " - " + category;
}
```

Test result: **FAIL** — module not found (`./categorizeTask` did not exist), and output format mismatch.

### After

```js
// categorizeTask.js
function categorizeTask(task, category) {
  return `${task} [${category}]`;
}
```

Test result: **PASS** — module resolves, output matches expected `"Math homework [School]"`.

### Performance Observation

This refactor is a correctness and maintainability fix rather than a runtime performance change. The measurable impact is:

- Test suite: 1 previously broken test now passes
- Module resolution: eliminated a runtime `MODULE_NOT_FOUND` error
- Code consistency: all string formatting now uses template literals across the codebase

No regression in `sum.js` or `log_change.js` tests.

## Version

Tagged: `v0.8-maintenance`
