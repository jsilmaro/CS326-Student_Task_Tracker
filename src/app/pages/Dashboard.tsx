import { motion } from "motion/react";
import { CheckCircle2, Circle, ArrowRight, TrendingUp, Clock, Calendar as CalendarIcon, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { MotivationWidget } from "../components/MotivationWidget";
import { EmptyState } from "../components/EmptyState";

interface Task {
  id: string;
  title: string;
  description: string;
  category: "School" | "Personal" | "Others";
  dueDate: Date;
  completed: boolean;
}

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete Math Assignment",
    description: "Chapters 5-7 problem sets",
    category: "School",
    dueDate: new Date(2026, 3, 25),
    completed: false,
  },
  {
    id: "2",
    title: "Research Paper Draft",
    description: "History of Renaissance Art - 2000 words",
    category: "School",
    dueDate: new Date(2026, 3, 28),
    completed: false,
  },
  {
    id: "3",
    title: "Study for Chemistry Exam",
    description: "Review organic chemistry notes",
    category: "School",
    dueDate: new Date(2026, 3, 24),
    completed: true,
  },
  {
    id: "4",
    title: "Gym Session",
    description: "Upper body workout",
    category: "Personal",
    dueDate: new Date(2026, 3, 23),
    completed: true,
  },
];

export function Dashboard() {
  const navigate = useNavigate();

  const stats = {
    total: sampleTasks.length,
    completed: sampleTasks.filter(t => t.completed).length,
    pending: sampleTasks.filter(t => !t.completed).length,
  };

  const recentTasks = sampleTasks.slice(0, 3);
  const completionRate = Math.round((stats.completed / stats.total) * 100);

  // Motivation widget data
  const completedToday = 2; // Mock data - in real app, filter by today's date
  const streak = 5; // Mock data - calculate from completion history

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}
        </h1>
        <p className="text-lg text-muted-foreground">
          Here's an overview of your academic progress
        </p>
      </motion.div>

      {/* Motivation Widget */}
      <div className="mb-8">
        <MotivationWidget
          completedToday={completedToday}
          streak={streak}
          totalTasks={stats.total}
          completedTotal={stats.completed}
        />
      </div>

      {/* Analytics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {[
          { label: "Total Tasks", value: stats.total, icon: CheckCircle2, color: "primary", trend: "+2 this week" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "accent", trend: "Great work!" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "muted", trend: `${stats.pending} remaining` },
          { label: "Completion", value: `${completionRate}%`, icon: TrendingUp, color: "primary", trend: "On track" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors duration-300`}>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-4xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Recent Tasks
            </h2>
            <p className="text-muted-foreground">
              Your latest assignments and activities
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate("/app/tasks")}
              className="rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-md hover:shadow-lg h-12 px-6 group transition-all duration-300"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        <div className="space-y-4">
          {recentTasks.length === 0 ? (
            <EmptyState onAddTask={() => navigate("/app/tasks")} type="tasks" />
          ) : (
            recentTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
              whileHover={{ x: 4, scale: 1.01 }}
              className={`bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-xl mb-2 ${task.completed ? "line-through" : ""}`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">{task.description}</p>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-sm ${
                      task.category === "School" ? "bg-primary/10 text-primary" :
                      task.category === "Personal" ? "bg-accent/10 text-accent" :
                      "bg-secondary text-foreground"
                    }`}>
                      {task.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Due: {format(task.dueDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.button
          onClick={() => navigate("/app/tasks")}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white rounded-2xl p-6 text-left shadow-md hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CheckCircle2 className="w-8 h-8 mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="text-xl mb-2 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>
            Manage Tasks
          </h3>
          <p className="text-sm opacity-90 relative z-10">
            Add, edit, and organize your assignments
          </p>
        </motion.button>

        <motion.button
          onClick={() => navigate("/app/calendar")}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-accent via-accent/90 to-accent/70 text-white rounded-2xl p-6 text-left shadow-md hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CalendarIcon className="w-8 h-8 mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="text-xl mb-2 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>
            View Calendar
          </h3>
          <p className="text-sm opacity-90 relative z-10">
            See your schedule and upcoming deadlines
          </p>
        </motion.button>

        <motion.button
          onClick={() => navigate("/app/settings")}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-secondary via-muted to-secondary/70 text-foreground rounded-2xl p-6 text-left shadow-md hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Settings className="w-8 h-8 mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="text-xl mb-2 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>
            Settings
          </h3>
          <p className="text-sm opacity-90 relative z-10">
            Customize your experience
          </p>
        </motion.button>
      </motion.div>
    </div>
  );
}
