const express = require("express");
const { pool } = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware);

// GET /api/tasks/stats — streak + completed today for motivation widget
router.get("/stats", async (req, res) => {
  try {
    // Completed today
    const todayResult = await pool.query(
      `SELECT COUNT(*) FROM tasks
       WHERE user_id = $1 AND completed = TRUE
       AND completed_at::date = CURRENT_DATE`,
      [req.userId]
    );

    // Streak: count consecutive days with at least 1 completed task going back from today
    const streakResult = await pool.query(
      `SELECT completed_at::date AS day
       FROM tasks
       WHERE user_id = $1 AND completed = TRUE AND completed_at IS NOT NULL
       GROUP BY day ORDER BY day DESC`,
      [req.userId]
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < streakResult.rows.length; i++) {
      const day = new Date(streakResult.rows[i].day);
      const expected = new Date(today);
      expected.setDate(today.getDate() - i);
      if (day.toDateString() === expected.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    res.json({
      completedToday: parseInt(todayResult.rows[0].count),
      streak,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/tasks — get all tasks for logged-in user
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY completed ASC, due_date ASC",
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/tasks — create a task
router.post("/", async (req, res) => {
  const { title, description, category, due_date, priority } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, category, due_date, priority)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.userId, title, description || "", category || "School", due_date, priority || "medium"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/tasks/:id — update a task
router.put("/:id", async (req, res) => {
  const { title, description, category, due_date, completed, priority } = req.body;
  try {
    const result = await pool.query(
      `UPDATE tasks SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        category = COALESCE($3, category),
        due_date = COALESCE($4, due_date),
        completed = COALESCE($5, completed),
        priority = COALESCE($6, priority),
        completed_at = CASE
          WHEN $5 = TRUE AND completed = FALSE THEN NOW()
          WHEN $5 = FALSE THEN NULL
          ELSE completed_at
        END
       WHERE id = $7 AND user_id = $8 RETURNING *`,
      [title, description, category, due_date, completed, priority, req.params.id, req.userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id",
      [req.params.id, req.userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
