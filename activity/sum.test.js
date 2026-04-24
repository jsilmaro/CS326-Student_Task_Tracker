const sum = require('./sum');

test("adds 1 + 2 = 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 2 + 2 = 4", () => {
  expect(sum(2, 2)).toBe(4);
});

test("adds 5 + 5 = 10", () => {
  expect(sum(5, 5)).toBe(10);
});

test("adds 0 + 0 = 0", () => {
  expect(sum(0, 0)).toBe(0);
});

test("adds negative numbers", () => {
  expect(sum(-1, -1)).toBe(-2);
});