const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      university VARCHAR(255) DEFAULT '',
      notif_task_reminders BOOLEAN DEFAULT TRUE,
      notif_daily_digest BOOLEAN DEFAULT FALSE,
      notif_weekly_report BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT '',
      category VARCHAR(50) DEFAULT 'School',
      due_date DATE,
      completed BOOLEAN DEFAULT FALSE,
      priority VARCHAR(20) DEFAULT 'medium',
      completed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Add columns if they don't exist yet (safe for existing DBs)
  await pool.query(`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS university VARCHAR(255) DEFAULT '';
    ALTER TABLE users ADD COLUMN IF NOT EXISTS notif_task_reminders BOOLEAN DEFAULT TRUE;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS notif_daily_digest BOOLEAN DEFAULT FALSE;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS notif_weekly_report BOOLEAN DEFAULT TRUE;
    ALTER TABLE tasks ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;
  `);

  console.log("Database initialized and tables ready");
}

module.exports = { pool, initDB };
