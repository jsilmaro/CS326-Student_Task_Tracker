import { motion } from "motion/react";
import { Flame, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";

interface MotivationWidgetProps {
  completedToday: number;
  streak: number;
  totalTasks: number;
  completedTotal: number;
}

const motivationalMessages = [
  { threshold: 0, message: "Start your day with a win!", icon: Sparkles },
  { threshold: 1, message: "Great start! Keep the momentum going", icon: TrendingUp },
  { threshold: 3, message: "You're on fire today! 🔥", icon: Flame },
  { threshold: 5, message: "Incredible progress! You're unstoppable", icon: CheckCircle2 },
];

export function MotivationWidget({ completedToday, streak, totalTasks, completedTotal }: MotivationWidgetProps) {
  const progress = totalTasks > 0 ? (completedTotal / totalTasks) * 100 : 0;

  const message = motivationalMessages
    .slice()
    .reverse()
    .find(m => completedToday >= m.threshold) || motivationalMessages[0];

  const MessageIcon = message.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"
          >
            <MessageIcon className="w-5 h-5" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-medium"
          >
            {message.message}
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
          >
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              {completedToday}
            </p>
            <p className="text-xs opacity-90">Today</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
          >
            <div className="flex items-center gap-1">
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                {streak}
              </p>
              <Flame className="w-5 h-5 text-orange-300" />
            </div>
            <p className="text-xs opacity-90">Day Streak</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
          >
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              {Math.round(progress)}%
            </p>
            <p className="text-xs opacity-90">Complete</p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="bg-white h-full rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
