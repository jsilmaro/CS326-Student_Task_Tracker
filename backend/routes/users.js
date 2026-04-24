const express = require("express");
const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware);

// PUT /api/users/profile — update name, email, university
router.put("/profile", async (req, res) => {
  const { name, email, university } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        university = COALESCE($3, university)
       WHERE id = $4
       RETURNING id, name, email, university`,
      [name, email, university, req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ error: "Email already in use" });
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/users/password — change password
router.put("/password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return res.status(400).json({ error: "Both current and new password are required" });

  try {
    const result = await pool.query("SELECT password FROM users WHERE id = $1", [req.userId]);
    const valid = await bcrypt.compare(currentPassword, result.rows[0].password);
    if (!valid) return res.status(401).json({ error: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, req.userId]);
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/users/notifications — save notification preferences
router.put("/notifications", async (req, res) => {
  const { taskReminders, dailyDigest, weeklyReport } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET
        notif_task_reminders = COALESCE($1, notif_task_reminders),
        notif_daily_digest = COALESCE($2, notif_daily_digest),
        notif_weekly_report = COALESCE($3, notif_weekly_report)
       WHERE id = $4
       RETURNING notif_task_reminders, notif_daily_digest, notif_weekly_report`,
      [taskReminders, dailyDigest, weeklyReport, req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/users/me — delete account
router.delete("/me", async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [req.userId]);
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
