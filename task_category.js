function categorizeTask(task, category) {
  return task + " - " + category; // different style = conflict trigger
}

module.exports = categorizeTask;