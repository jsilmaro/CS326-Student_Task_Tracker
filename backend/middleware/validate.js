/**
 * Input validation middleware
 * Validates and sanitizes request body fields before they reach route handlers.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_CATEGORIES = ["School", "Personal", "Others"];
const ALLOWED_PRIORITIES = ["high", "medium", "low"];

/**
 * Validate registration input
 */
function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2)
    return res.status(400).json({ error: "Name must be at least 2 characters" });

  if (name.trim().length > 100)
    return res.status(400).json({ error: "Name must be under 100 characters" });

  if (!email || !EMAIL_REGEX.test(email))
    return res.status(400).json({ error: "A valid email address is required" });

  if (!password || password.length < 8)
    return res.status(400).json({ error: "Password must be at least 8 characters" });

  if (password.length > 128)
    return res.status(400).json({ error: "Password must be under 128 characters" });

  // Sanitize
  req.body.name = name.trim();
  req.body.email = email.toLowerCase().trim();

  next();
}

/**
 * Validate login input
 */
function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !EMAIL_REGEX.test(email))
    return res.status(400).json({ error: "A valid email address is required" });

  if (!password || typeof password !== "string")
    return res.status(400).json({ error: "Password is required" });

  req.body.email = email.toLowerCase().trim();

  next();
}

/**
 * Validate task creation/update input
 */
function validateTask(req, res, next) {
  const { title, description, category, priority, due_date } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0)
      return res.status(400).json({ error: "Task title cannot be empty" });
    if (title.trim().length > 255)
      return res.status(400).json({ error: "Task title must be under 255 characters" });
    req.body.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string")
      return res.status(400).json({ error: "Description must be a string" });
    if (description.length > 2000)
      return res.status(400).json({ error: "Description must be under 2000 characters" });
    req.body.description = description.trim();
  }

  if (category !== undefined && !ALLOWED_CATEGORIES.includes(category))
    return res.status(400).json({ error: `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}` });

  if (priority !== undefined && !ALLOWED_PRIORITIES.includes(priority))
    return res.status(400).json({ error: `Priority must be one of: ${ALLOWED_PRIORITIES.join(", ")}` });

  if (due_date !== undefined && due_date !== null) {
    const date = new Date(due_date);
    if (isNaN(date.getTime()))
      return res.status(400).json({ error: "due_date must be a valid date" });
  }

  next();
}

module.exports = { validateRegister, validateLogin, validateTask };
