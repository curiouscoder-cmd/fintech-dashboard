import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function FrostCard({ children, className, delay = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-white/60 bg-white/40 p-6 shadow-sm backdrop-blur-xl transition-all hover:bg-white/60 hover:shadow-md",
        "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default FrostCard;
