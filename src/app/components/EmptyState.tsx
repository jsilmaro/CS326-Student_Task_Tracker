import { motion } from "motion/react";
import { Plus, BookOpen, Coffee, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  onAddTask?: () => void;
  type?: "tasks" | "calendar" | "search";
}

export function EmptyState({ onAddTask, type = "tasks" }: EmptyStateProps) {
  const content = {
    tasks: {
      icon: BookOpen,
      title: "Your canvas awaits",
      description: "Start your academic journey by adding your first task",
      actionText: "Create Your First Task",
    },
    calendar: {
      icon: Coffee,
      title: "Clear skies ahead",
      description: "No tasks scheduled for this day. Time to relax or plan ahead",
      actionText: "Add a Task",
    },
    search: {
      icon: Sparkles,
      title: "Nothing found here",
      description: "Try adjusting your filters or search terms",
      actionText: null,
    },
  };

  const { icon: Icon, title, description, actionText } = content[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Decorative background */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg"
          >
            <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
          </motion.div>

          {/* Floating sparkles */}
          <motion.div
            animate={{
              y: [-5, 5, -5],
              x: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6"
      >
        <h3
          className="text-3xl mb-3 text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-lg max-w-md">
          {description}
        </p>
      </motion.div>

      {/* Action button */}
      {actionText && onAddTask && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAddTask}
            className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8 group"
          >
            <Plus className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-90" />
            {actionText}
          </Button>
        </motion.div>
      )}

      {/* Decorative dots */}
      <div className="flex gap-2 mt-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="w-2 h-2 rounded-full bg-muted"
          />
        ))}
      </div>
    </motion.div>
  );
}
