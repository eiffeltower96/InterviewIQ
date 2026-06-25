import { motion } from "framer-motion";
import { scoreTone, toneColor } from "./scoreTone";

/**
 * ProgressBar
 * Linear equivalent of ScoreRing — used for category breakdowns
 * (Dream Company category scores, ATS score bar). Flat fill, no glow.
 */
function ProgressBar({ value, tone, label, showValue = true, height = 6 }) {
  const resolvedTone = tone || scoreTone(value);
  const color = toneColor[resolvedTone];
  const pct = Math.max(0, Math.min(100, value ?? 0));

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5 text-[13px]">
          {label && <span className="text-ink-secondary">{label}</span>}
          {showValue && <span className="font-semibold text-ink-primary">{pct}%</span>}
        </div>
      )}
      <div
        className="w-full rounded-full bg-border-strong overflow-hidden"
        style={{ height }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
