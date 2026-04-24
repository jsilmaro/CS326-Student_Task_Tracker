const BASE_URL = "http://localhost:3001/api";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// Auth
export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// User / Profile
export async function updateProfile(data: { name?: string; email?: string; university?: string }) {
  const res = await fetch(`${BASE_URL}/users/profile`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  localStorage.setItem("user", JSON.stringify(json));
  return json;
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const res = await fetch(`${BASE_URL}/users/password`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
}

export async function updateNotifications(prefs: {
  taskReminders?: boolean;
  dailyDigest?: boolean;
  weeklyReport?: boolean;
}) {
  const res = await fetch(`${BASE_URL}/users/notifications`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(prefs),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
}

export async function deleteAccount() {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  logout();
  return json;
}

// Stats (for motivation widget)
export async function getStats(): Promise<{ completedToday: number; streak: number }> {
  const res = await fetch(`${BASE_URL}/tasks/stats`, { headers: authHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
}

// Tasks
export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function createTask(task: {
  title: string;
  description?: string;
  category?: string;
  due_date?: string;
  priority?: string;
}) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function updateTask(id: string | number, updates: Partial<{
  title: string;
  description: string;
  category: string;
  due_date: string;
  completed: boolean;
  priority: string;
}>) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function deleteTask(id: string | number) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}
