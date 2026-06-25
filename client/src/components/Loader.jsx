import { motion } from "framer-motion";

/**
 * Loader
 * Used wherever a page is waiting on its initial fetch (ResumeDetails,
 * CareerCoachPage). Same purpose as before, flat spinner instead of a
 * glowing pulse-ring. `message` defaults to the original copy.
 */
function Loader({ message = "Loading analysis…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="w-9 h-9 rounded-full border-[2.5px] border-border-strong"
        style={{ borderTopColor: "var(--color-brand-400)" }}
      />
      <p className="text-[13px] text-ink-tertiary font-medium">{message}</p>
    </div>
  );
}

export default Loader;
