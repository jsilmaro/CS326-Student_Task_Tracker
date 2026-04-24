import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, CheckCircle2, Circle, Trash2, Edit, Search, Filter,
  AlertCircle, TrendingUp, Minus, GripVertical, Loader2,
} from "lucide-react";
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
import { format, parseISO } from "date-fns";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

type Priority = "high" | "medium" | "low";
type Category = "School" | "Personal" | "Others";

interface Task {
  id: number;
  title: string;
  description: string;
  category: Category;
  due_date: string;
  completed: boolean;
  priority: Priority;
}

const priorityConfig = {
  high: { color: "text-red-500", bg: "bg-red-50", border: "border-red-200", icon: AlertCircle, label: "High" },
  medium: { color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", icon: TrendingUp, label: "Medium" },
  low: { color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200", icon: Minus, label: "Low" },
};

const categoryColors: Record<Category, string> = {
  School: "bg-primary text-white",
  Personal: "bg-accent text-white",
  Others: "bg-secondary text-foreground",
};

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "School" as Category,
    dueDate: new Date(),
    priority: "medium" as Priority,
  });
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        due_date: format(formData.dueDate, "yyyy-MM-dd"),
        priority: formData.priority,
      };

      if (editingTask) {
        const updated = await updateTask(editingTask.id, payload);
        setTasks(tasks.map(t => t.id === editingTask.id ? updated : t));
      } else {
        const created = await createTask(payload);
        setTasks([created, ...tasks]);
      }

      setIsDialogOpen(false);
      setEditingTask(null);
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.due_date ? parseISO(task.due_date) : new Date(),
      priority: task.priority,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "School", dueDate: new Date(), priority: "medium" });
  };

  let filtered = tasks;
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);
  if (filterStatus === "completed") filtered = filtered.filter(t => t.completed);
  else if (filterStatus === "pending") filtered = filtered.filter(t => !t.completed);
  if (searchQuery) filtered = filtered.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

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
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>Your Tasks</h1>
        <p className="text-lg text-muted-foreground">Manage all your assignments and to-dos in one place</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-xl border-border bg-white text-base"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-2"><Filter className="w-4 h-4" />Category:</span>
            {["all", "School", "Personal", "Others"].map(cat => (
              <Button key={cat} variant={filterCategory === cat ? "default" : "outline"} onClick={() => setFilterCategory(cat)} className="rounded-xl h-9">
                {cat === "all" ? "All" : cat}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground flex items-center">Status:</span>
            {["all", "pending", "completed"].map(s => (
              <Button key={s} variant={filterStatus === s ? "default" : "outline"} onClick={() => setFilterStatus(s)} className="rounded-xl h-9 capitalize">
                {s === "all" ? "All" : s}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Add Task */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <Dialog open={isDialogOpen} onOpenChange={open => { setIsDialogOpen(open); if (!open) { setEditingTask(null); resetForm(); } }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md h-12 px-6 w-full md:w-auto">
              <Plus className="w-5 h-5 mr-2" />Add New Task
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
                <Label>Title</Label>
                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Enter task title" className="rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Add more details..." className="rounded-xl min-h-24" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v: Category) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
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
                    <Button variant="outline" className="w-full justify-start text-left rounded-xl">
                      {format(formData.dueDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl">
                    <Calendar mode="single" selected={formData.dueDate} onSelect={d => d && setFormData({ ...formData, dueDate: d })} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["high", "medium", "low"] as Priority[]).map(p => {
                    const cfg = priorityConfig[p];
                    const Icon = cfg.icon;
                    return (
                      <button key={p} type="button" onClick={() => setFormData({ ...formData, priority: p })}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${formData.priority === p ? `${cfg.border} ${cfg.bg}` : "border-border hover:border-primary/50"}`}>
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${cfg.color}`} />
                        <p className="text-xs font-medium capitalize">{p}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 rounded-xl">Cancel</Button>
                <Button type="submit" disabled={saving} className="flex-1 rounded-xl bg-primary">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingTask ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Task List */}
      <div className="space-y-4">
        <AnimatePresence>
          {sorted.length === 0 ? (
            <EmptyState
              onAddTask={() => { resetForm(); setIsDialogOpen(true); }}
              type={searchQuery || filterCategory !== "all" || filterStatus !== "all" ? "search" : "tasks"}
            />
          ) : sorted.map((task, index) => {
            const pInfo = priorityConfig[task.priority];
            const PIcon = pInfo.icon;
            const dueDate = task.due_date ? parseISO(task.due_date) : null;

            return (
              <motion.div key={task.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }} whileHover={{ x: 4, scale: 1.01 }}
                className={`bg-white rounded-2xl p-4 md:p-6 border-l-4 border-t border-r border-b shadow-sm hover:shadow-lg transition-all duration-300 ${task.completed ? "opacity-60" : ""}`}
                style={{ borderLeftColor: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f97316" : "#3b82f6" }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="opacity-30"><GripVertical className="w-4 h-4 text-muted-foreground" /></div>
                  <motion.button onClick={() => toggleComplete(task)} className="mt-1" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {task.completed ? <CheckCircle2 className="w-6 h-6 text-primary" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
                  </motion.button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <h3 className={`text-lg md:text-xl ${task.completed ? "line-through" : ""}`} style={{ fontFamily: "var(--font-heading)" }}>
                          {task.title}
                        </h3>
                        {!task.completed && (
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${pInfo.bg}`}>
                            <PIcon className={`w-3 h-3 ${pInfo.color}`} />
                            <span className={`text-xs font-medium ${pInfo.color}`}>{task.priority}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(task)} className="rounded-xl"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(task.id)} className="rounded-xl text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-3">{task.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <Badge className={`${categoryColors[task.category]} rounded-lg w-fit`}>{task.category}</Badge>
                      {dueDate && <span className="text-xs md:text-sm text-muted-foreground">Due: {format(dueDate, "MMM dd, yyyy")}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
