import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, CheckCircle2, Circle, Trash2, Edit, Search, Filter, AlertCircle, TrendingUp, Minus, GripVertical } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";

type Priority = "high" | "medium" | "low";

interface Task {
  id: string;
  title: string;
  description: string;
  category: "School" | "Personal" | "Others";
  dueDate: Date;
  completed: boolean;
  priority: Priority;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete Math Assignment",
      description: "Chapters 5-7 problem sets",
      category: "School",
      dueDate: new Date(2026, 3, 25),
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Research Paper Draft",
      description: "History of Renaissance Art - 2000 words",
      category: "School",
      dueDate: new Date(2026, 3, 28),
      completed: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Study for Chemistry Exam",
      description: "Review organic chemistry notes",
      category: "School",
      dueDate: new Date(2026, 3, 24),
      completed: true,
      priority: "high",
    },
    {
      id: "4",
      title: "Gym Session",
      description: "Upper body workout",
      category: "Personal",
      dueDate: new Date(2026, 3, 23),
      completed: true,
      priority: "low",
    },
    {
      id: "5",
      title: "Read Chapter 8",
      description: "Biology textbook",
      category: "School",
      dueDate: new Date(2026, 3, 26),
      completed: false,
      priority: "medium",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "School" as "School" | "Personal" | "Others",
    dueDate: new Date(),
    priority: "medium" as Priority,
  });
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, ...formData }
          : task
      ));
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...formData,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setIsDialogOpen(false);
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      category: "School",
      dueDate: new Date(),
      priority: "medium",
    });
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.dueDate,
    });
    setIsDialogOpen(true);
  };

  let filteredTasks = tasks;

  if (filterCategory !== "all") {
    filteredTasks = filteredTasks.filter(task => task.category === filterCategory);
  }

  if (filterStatus === "completed") {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (filterStatus === "pending") {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }

  if (searchQuery) {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const categoryColors = {
    School: "bg-primary text-white",
    Personal: "bg-accent text-white",
    Others: "bg-secondary text-foreground",
  };

  const priorityConfig = {
    high: {
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      icon: AlertCircle,
      label: "High Priority",
    },
    medium: {
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-200",
      icon: TrendingUp,
      label: "Medium Priority",
    },
    low: {
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: Minus,
      label: "Low Priority",
    },
  };

  // Sort tasks by priority (high -> medium -> low) and completion status
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

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
          Your Tasks
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage all your assignments and to-dos in one place
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-xl border-border bg-white text-base"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Category:
            </span>
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              onClick={() => setFilterCategory("all")}
              className="rounded-xl h-9"
            >
              All
            </Button>
            <Button
              variant={filterCategory === "School" ? "default" : "outline"}
              onClick={() => setFilterCategory("School")}
              className="rounded-xl h-9"
            >
              School
            </Button>
            <Button
              variant={filterCategory === "Personal" ? "default" : "outline"}
              onClick={() => setFilterCategory("Personal")}
              className="rounded-xl h-9"
            >
              Personal
            </Button>
            <Button
              variant={filterCategory === "Others" ? "default" : "outline"}
              onClick={() => setFilterCategory("Others")}
              className="rounded-xl h-9"
            >
              Others
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              Status:
            </span>
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className="rounded-xl h-9"
            >
              All
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
              className="rounded-xl h-9"
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              onClick={() => setFilterStatus("completed")}
              className="rounded-xl h-9"
            >
              Completed
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Add Task Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingTask(null);
                setFormData({
                  title: "",
                  description: "",
                  category: "School",
                  dueDate: new Date(),
                });
              }}
              className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md h-12 px-6 w-full md:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                {editingTask ? "Edit Task" : "Add New Task"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add more details..."
                  className="rounded-xl min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: "School" | "Personal" | "Others") =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left rounded-xl"
                    >
                      {format(formData.dueDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl">
                    <Calendar
                      mode="single"
                      selected={formData.dueDate}
                      onSelect={(date) => date && setFormData({ ...formData, dueDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["high", "medium", "low"] as Priority[]).map((priority) => {
                    const config = priorityConfig[priority];
                    const Icon = config.icon;
                    const isSelected = formData.priority === priority;

                    return (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority })}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? `${config.border} ${config.bg}`
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${config.color}`} />
                        <p className="text-xs font-medium capitalize">{priority}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 rounded-xl bg-primary">
                  {editingTask ? "Update" : "Create"} Task
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Task List */}
      <div className="space-y-4">
        {sortedTasks.length === 0 ? (
          <EmptyState
            onAddTask={() => {
              setEditingTask(null);
              setFormData({
                title: "",
                description: "",
                category: "School",
                dueDate: new Date(),
                priority: "medium",
              });
              setIsDialogOpen(true);
            }}
            type={searchQuery || filterCategory !== "all" || filterStatus !== "all" ? "search" : "tasks"}
          />
        ) : (
          sortedTasks.map((task, index) => {
            const priorityInfo = priorityConfig[task.priority];
            const PriorityIcon = priorityInfo.icon;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className={`bg-white rounded-2xl p-4 md:p-6 border-l-4 border-t border-r border-b shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  task.completed ? "opacity-60" : ""
                }`}
                style={{
                  borderLeftColor: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f97316" : "#3b82f6"
                }}
              >
                {/* Priority indicator gradient */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-5 blur-2xl"
                  style={{
                    background: `radial-gradient(circle, ${
                      task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f97316" : "#3b82f6"
                    }, transparent)`
                  }}
                />

                <div className="flex items-start gap-3 md:gap-4 relative z-10">
                  {/* Drag handle */}
                  <div className="opacity-0 group-hover:opacity-50 transition-opacity cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <motion.button
                    onClick={() => toggleComplete(task.id)}
                    className="mt-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </motion.button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`text-lg md:text-xl ${task.completed ? "line-through" : ""}`}
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {task.title}
                          </h3>
                          {!task.completed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg ${priorityInfo.bg}`}
                            >
                              <PriorityIcon className={`w-3 h-3 ${priorityInfo.color}`} />
                              <span className={`text-xs font-medium ${priorityInfo.color}`}>
                                {task.priority}
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 md:gap-2 flex-shrink-0">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(task)}
                            className="rounded-xl"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                            className="rounded-xl text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-3">{task.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <Badge className={`${categoryColors[task.category]} rounded-lg w-fit`}>
                        {task.category}
                      </Badge>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Due: {format(task.dueDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}

      </div>
    </div>
  );
}
