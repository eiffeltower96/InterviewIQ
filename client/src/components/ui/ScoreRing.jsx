import { motion } from "framer-motion";

const toneColor = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  brand: "var(--color-brand-400)",
  neutral: "var(--color-ink-quaternary)",
};

export function scoreTone(score) {
  if (score === null || score === undefined) return "neutral";
  if (score >= 80) return "success";
  if (score >= 60) return "warning";
  return "error";
}

/**
 * ScoreRing
 * Single implementation of the circular score indicator used on
 * Dashboard, ATS Analysis, Profile, and Dream Company. No drop-shadow
 * glow — color appears only on the arc itself, sized by `size`.
 */
function ScoreRing({ score, size = 64, strokeWidth = 5, tone, showLabel = true, suffix = "" }) {
  const resolvedTone = tone || scoreTone(score);
  const color = toneColor[resolvedTone];
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const hasScore = score !== null && score !== undefined;
  const dash = hasScore ? (score / 100) * circumference : 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth={strokeWidth}
        />
        {hasScore && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dash} ${circumference}` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-semibold leading-none tracking-tight"
            style={{ fontSize: size * 0.26, color: hasScore ? color : "var(--color-ink-quaternary)" }}
          >
            {hasScore ? score : "—"}
          </span>
          {suffix && (
            <span className="text-[10px] text-ink-quaternary font-medium mt-0.5">{suffix}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default ScoreRing;
