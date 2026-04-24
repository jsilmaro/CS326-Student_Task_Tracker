import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, isToday } from "date-fns";
import { EmptyState } from "../components/EmptyState";

interface Task {
  id: string;
  title: string;
  category: "School" | "Personal" | "Others";
  dueDate: Date;
  completed: boolean;
}

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete Math Assignment",
    category: "School",
    dueDate: new Date(2026, 3, 25),
    completed: false,
  },
  {
    id: "2",
    title: "Research Paper Draft",
    category: "School",
    dueDate: new Date(2026, 3, 28),
    completed: false,
  },
  {
    id: "3",
    title: "Study for Chemistry Exam",
    category: "School",
    dueDate: new Date(2026, 3, 24),
    completed: true,
  },
  {
    id: "4",
    title: "Gym Session",
    category: "Personal",
    dueDate: new Date(2026, 3, 23),
    completed: true,
  },
  {
    id: "5",
    title: "Read Chapter 8",
    category: "School",
    dueDate: new Date(2026, 3, 26),
    completed: false,
  },
  {
    id: "6",
    title: "Project Presentation",
    category: "School",
    dueDate: new Date(2026, 3, 30),
    completed: false,
  },
];

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfWeek = monthStart.getDay();
  const daysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const paddingDays = Array(daysToAdd).fill(null);

  const getTasksForDate = (date: Date) => {
    return sampleTasks.filter(task => isSameDay(task.dueDate, date));
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  const categoryColors = {
    School: "bg-primary",
    Personal: "bg-accent",
    Others: "bg-secondary",
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Calendar
        </h1>
        <p className="text-lg text-muted-foreground">
          View your schedule and upcoming deadlines
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="rounded-xl"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(new Date())}
                className="rounded-xl px-4"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="rounded-xl"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Padding Days */}
            {paddingDays.map((_, index) => (
              <div key={`padding-${index}`} className="aspect-square" />
            ))}

            {/* Month Days */}
            {monthDays.map((day, index) => {
              const tasksForDay = getTasksForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);

              return (
                <motion.button
                  key={day.toISOString()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.01 }}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-xl p-2 relative transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-white shadow-md"
                      : isCurrentDay
                      ? "bg-accent/20 text-accent border-2 border-accent"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className={`text-sm ${isSelected ? "font-medium" : ""}`}>
                    {format(day, "d")}
                  </span>
                  {tasksForDay.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {tasksForDay.slice(0, 3).map(task => (
                        <div
                          key={task.id}
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? "bg-white" : categoryColors[task.category]
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Date Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <h3 className="text-xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            {format(selectedDate, "EEEE, MMMM d")}
          </h3>

          {selectedDateTasks.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedDateTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4
                        className={`text-sm font-medium mb-1 ${task.completed ? "line-through" : ""}`}
                      >
                        {task.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-lg ${categoryColors[task.category]} text-white`}
                      >
                        {task.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-4">
              <EmptyState type="calendar" />
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Categories:</p>
            <div className="space-y-2">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-xs text-muted-foreground">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 bg-white rounded-2xl p-6 border border-border shadow-sm"
      >
        <h3 className="text-xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Upcoming Deadlines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleTasks
            .filter(task => !task.completed && task.dueDate >= new Date())
            .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
            .slice(0, 6)
            .map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.4 }}
                className="p-4 rounded-xl border border-border hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Circle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <h4 className="text-sm font-medium flex-1">{task.title}</h4>
                </div>
                <div className="flex items-center justify-between ml-7">
                  <span className={`text-xs px-2 py-1 rounded-lg ${categoryColors[task.category]} text-white`}>
                    {task.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(task.dueDate, "MMM d")}
                  </span>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
