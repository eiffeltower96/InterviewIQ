import { motion } from "framer-motion";

/**
 * MetricCard
 * Used for "Total Resumes / Average ATS / Best ATS" style stat tiles on
 * Dashboard and Profile. Deliberately plain: a label, a big number, a
 * trailing unit, and a one-line caption. No colored top-bar, no glow —
 * the only color is on the number itself when a tone is given.
 */
const toneText = {
  neutral: "text-ink-primary",
  brand: "text-brand-300",
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
};

function MetricCard({ label, value, unit, caption, tone = "neutral", className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`bg-surface border border-border rounded-xl p-4 ${className}`}
    >
      <p className="text-[11px] font-medium text-ink-tertiary uppercase tracking-wide">
        {label}
      </p>
      <div className="flex items-baseline gap-1.5 mt-2">
        <span className={`text-[28px] font-semibold leading-none tracking-tight ${toneText[tone]}`}>
          {value}
        </span>
        {unit && <span className="text-[13px] text-ink-quaternary font-medium">{unit}</span>}
      </div>
      {caption && <p className="text-[12px] text-ink-quaternary mt-2">{caption}</p>}
    </motion.div>
  );
}

export default MetricCard;
