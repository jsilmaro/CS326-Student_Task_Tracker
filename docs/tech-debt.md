# Technical Debt – Student Task Tracker

## Debt Items

| # | Item | File(s) | Impact | Priority |
|---|------|---------|--------|----------|
| 1 | `task_category.test.js` imports `./categorizeTask` but the module file is named `task_category.js` — test always fails with a module-not-found error | `task_category.js`, `task_category.test.js` | High — broken test suite | High |
| 2 | `categorizeTask` uses string concatenation (`task + " - " + category`) while `logChange` uses template literals — inconsistent string formatting across the codebase | `task_category.js`, `log_change.js` | Low — readability | Medium |
| 3 | No input validation in any utility function — passing `null`, `undefined`, or non-string values causes silent bad output | `sum.js`, `task_category.js`, `log_change.js` | Medium — runtime bugs | Medium |
| 4 | Test output format in `task_category.test.js` expects `"Math homework [School]"` but the function returns `"Math homework - School"` — mismatched contract between code and test | `task_category.js`, `task_category.test.js` | High — false test failures | High |
| 5 | No JSDoc comments on any function — new contributors have no inline documentation to understand expected inputs/outputs | All `.js` files | Low — maintainability | Low |

## Selected Debt to Fix

Item 1 + 4 (related): Rename `task_category.js` to `categorizeTask.js` and align the function's output format with what the test expects (`"Task [Category]"` bracket format using a template literal).
