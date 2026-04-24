import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Circle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameDay, addMonths, subMonths, isToday, parseISO,
} from "date-fns";
import { EmptyState } from "../components/EmptyState";
import { getTasks } from "../services/api";

interface Task {
  id: number;
  title: string;
  category: "School" | "Personal" | "Others";
  due_date: string;
  completed: boolean;
}

const categoryColors = {
  School: "bg-primary",
  Personal: "bg-accent",
  Others: "bg-secondary",
};

export function Calendar() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const paddingDays = Array(monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1).fill(null);

  const getTasksForDate = (date: Date) =>
    tasks.filter(t => t.due_date && isSameDay(parseISO(t.due_date), date));

  const selectedDateTasks = getTasksForDate(selectedDate);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>Calendar</h1>
        <p className="text-lg text-muted-foreground">View your schedule and upcoming deadlines</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>{format(currentMonth, "MMMM yyyy")}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="rounded-xl">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => setCurrentMonth(new Date())} className="rounded-xl px-4">Today</Button>
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="rounded-xl">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
              <div key={d} className="text-center text-sm font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {paddingDays.map((_, i) => <div key={`pad-${i}`} className="aspect-square" />)}
            {monthDays.map((day, i) => {
              const dayTasks = getTasksForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);
              return (
                <motion.button key={day.toISOString()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }} onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-xl p-2 relative transition-all duration-200 ${
                    isSelected ? "bg-primary text-white shadow-md" :
                    isCurrentDay ? "bg-accent/20 text-accent border-2 border-accent" : "hover:bg-muted"
                  }`}>
                  <span className="text-sm">{format(day, "d")}</span>
                  {dayTasks.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayTasks.slice(0, 3).map(t => (
                        <div key={t.id} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : categoryColors[t.category]}`} />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected date tasks */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            {format(selectedDate, "EEEE, MMMM d")}
          </h3>
          {selectedDateTasks.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedDateTasks.map((task, i) => (
                <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl border transition-all hover:shadow-sm ${task.completed ? "opacity-60" : ""}`}>
                  <div className="flex items-start gap-3">
                    {task.completed ? <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> : <Circle className="w-5 h-5 text-muted-foreground mt-0.5" />}
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium mb-1 ${task.completed ? "line-through" : ""}`}>{task.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-lg ${categoryColors[task.category]} text-white`}>{task.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-4"><EmptyState type="calendar" /></div>
          )}

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Categories:</p>
            <div className="space-y-2">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-xs text-muted-foreground">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming deadlines */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mt-6 bg-white rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>Upcoming Deadlines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks
            .filter(t => !t.completed && t.due_date && parseISO(t.due_date) >= new Date())
            .sort((a, b) => parseISO(a.due_date).getTime() - parseISO(b.due_date).getTime())
            .slice(0, 6)
            .map((task, i) => (
              <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 + 0.4 }}
                className="p-4 rounded-xl border border-border hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3 mb-2">
                  <Circle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <h4 className="text-sm font-medium flex-1">{task.title}</h4>
                </div>
                <div className="flex items-center justify-between ml-7">
                  <span className={`text-xs px-2 py-1 rounded-lg ${categoryColors[task.category]} text-white`}>{task.category}</span>
                  <span className="text-xs text-muted-foreground">{format(parseISO(task.due_date), "MMM d")}</span>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
