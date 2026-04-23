const categorizeTask = require('./categorizeTask');

test("adds category to task", () => {
  expect(categorizeTask("Math homework", "School"))
    .toBe("Math homework [School]");
});