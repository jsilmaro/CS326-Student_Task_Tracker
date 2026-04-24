import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Circle, ArrowRight, TrendingUp, Clock, Calendar as CalendarIcon, Settings, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import { MotivationWidget } from "../components/MotivationWidget";
import { EmptyState } from "../components/EmptyState";
import { getTasks, getStats, getUser } from "../services/api";

interface Task {
  id: number;
  title: string;
  description: string;
  category: "School" | "Personal" | "Others";
  due_date: string;
  completed: boolean;
  priority: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({ completedToday: 0, streak: 0 });
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    async function load() {
      try {
        const [taskData, statData] = await Promise.all([getTasks(), getStats()]);
        setTasks(taskData);
        setStats(statData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const recentTasks = tasks.slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Good {greeting}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-lg text-muted-foreground">Here's an overview of your academic progress</p>
      </motion.div>

      <div className="mb-8">
        <MotivationWidget
          completedToday={stats.completedToday}
          streak={stats.streak}
          totalTasks={total}
          completedTotal={completed}
        />
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Tasks", value: total, icon: CheckCircle2, trend: `${total} tasks` },
          { label: "Completed", value: completed, icon: CheckCircle2, trend: "Great work!" },
          { label: "Pending", value: pending, icon: Clock, trend: `${pending} remaining` },
          { label: "Completion", value: `${completionRate}%`, icon: TrendingUp, trend: "On track" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }} whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10"><Icon className="w-5 h-5 text-primary" /></div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-4xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Tasks */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>Recent Tasks</h2>
            <p className="text-muted-foreground">Your latest assignments and activities</p>
          </div>
          <Button onClick={() => navigate("/app/tasks")}
            className="rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-md h-12 px-6 group">
            <span>View All</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="space-y-4">
          {recentTasks.length === 0 ? (
            <EmptyState onAddTask={() => navigate("/app/tasks")} type="tasks" />
          ) : recentTasks.map((task, i) => {
            const dueDate = task.due_date ? parseISO(task.due_date) : null;
            return (
              <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }} whileHover={{ x: 4, scale: 1.01 }}
                className={`bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${task.completed ? "opacity-60" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {task.completed ? <CheckCircle2 className="w-6 h-6 text-primary" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-xl mb-2 ${task.completed ? "line-through" : ""}`} style={{ fontFamily: "var(--font-heading)" }}>
                      {task.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{task.description}</p>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-sm ${
                        task.category === "School" ? "bg-primary/10 text-primary" :
                        task.category === "Personal" ? "bg-accent/10 text-accent" : "bg-secondary text-foreground"
                      }`}>{task.category}</span>
                      {dueDate && <span className="text-sm text-muted-foreground">Due: {format(dueDate, "MMM dd, yyyy")}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Manage Tasks", desc: "Add, edit, and organize your assignments", icon: CheckCircle2, path: "/app/tasks", style: "from-primary via-primary/90 to-primary/70 text-white" },
          { label: "View Calendar", desc: "See your schedule and upcoming deadlines", icon: CalendarIcon, path: "/app/calendar", style: "from-accent via-accent/90 to-accent/70 text-white" },
          { label: "Settings", desc: "Customize your experience", icon: Settings, path: "/app/settings", style: "from-secondary via-muted to-secondary/70 text-foreground" },
        ].map(({ label, desc, icon: Icon, path, style }) => (
          <motion.button key={label} onClick={() => navigate(path)} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className={`bg-gradient-to-br ${style} rounded-2xl p-6 text-left shadow-md hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon className="w-8 h-8 mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl mb-2 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>{label}</h3>
            <p className="text-sm opacity-90 relative z-10">{desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
