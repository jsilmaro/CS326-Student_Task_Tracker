/**
 * Categorizes a task by appending its category label.
 * @param {string} task - The task description
 * @param {string} category - The category name
 * @returns {string} Formatted string: "task [category]"
 */
function categorizeTask(task, category) {
  return `${task} [${category}]`;
}

module.exports = categorizeTask;
