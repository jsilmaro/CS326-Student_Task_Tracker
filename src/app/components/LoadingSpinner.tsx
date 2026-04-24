import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = {
    small: "w-4 h-4",
    default: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`${sizes[size]} text-primary`} />
      </motion.div>
    </motion.div>
  );
}

export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4"
      >
        <LoadingSpinner size="large" />
        <p className="text-muted-foreground">{message}</p>
      </motion.div>
    </motion.div>
  );
}
