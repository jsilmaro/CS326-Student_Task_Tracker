import { createBrowserRouter, redirect } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Calendar as CalendarPage } from "./pages/Calendar";
import { Settings } from "./pages/Settings";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/app",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () => redirect("/app/dashboard")
      },
      { path: "dashboard", Component: Dashboard },
      { path: "tasks", Component: Tasks },
      { path: "calendar", Component: CalendarPage },
      { path: "settings", Component: Settings },
    ],
  },
]);
