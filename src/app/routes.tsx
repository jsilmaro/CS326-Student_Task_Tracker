import { createBrowserRouter, redirect } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Calendar as CalendarPage } from "./pages/Calendar";
import { Settings } from "./pages/Settings";
import { RootLayout } from "./layouts/RootLayout";

function requireAuth() {
  if (!localStorage.getItem("token")) {
    return redirect("/");
  }
  return null;
}

function requireGuest() {
  if (localStorage.getItem("token")) {
    return redirect("/app/dashboard");
  }
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    loader: requireGuest,
    Component: Login,
  },
  {
    path: "/app",
    loader: requireAuth,
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () => redirect("/app/dashboard"),
      },
      { path: "dashboard", Component: Dashboard },
      { path: "tasks", Component: Tasks },
      { path: "calendar", Component: CalendarPage },
      { path: "settings", Component: Settings },
    ],
  },
]);
