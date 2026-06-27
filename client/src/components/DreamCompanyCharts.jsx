import { motion } from "framer-motion";
import { Card } from "./ui/Card";

/**
 * InfoDot
 * Same tooltip-on-hover affordance as before (native title attribute).
 */
function InfoDot({ tooltip }) {
  return (
    <span
      title={tooltip}
      className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border-strong text-ink-quaternary text-[10px] cursor-default shrink-0"
    >
      ?
    </span>
  );
}

/**
 * ScoreRingCard
 * Same circle-progress math as the original CircularScore: radius 46,
 * circumference-based stroke-dashoffset, rotated -90deg so progress
 * starts at 12 o'clock. Renders inside a Card with the label/sublabel
 * row, same as before — just sourcing color from the design tokens
 * instead of raw hex per-call-site.
 */
export function ScoreRingCard({ label, value, color, sublabel, tooltip }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const pct = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <Card className="p-4 flex flex-col">
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-secondary">
        {label}
        {tooltip && <InfoDot tooltip={tooltip} />}
      </div>

      <div className="flex justify-center mt-2.5">
        <svg width="104" height="104" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r={radius} fill="none" stroke="var(--color-border-strong)" strokeWidth="9" />
          {typeof value === "number" && (
            <motion.circle
              cx="56"
              cy="56"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              transform="rotate(-90 56 56)"
            />
          )}
          <text x="56" y="62" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--color-ink-primary)">
            {typeof value === "number" ? `${value}%` : "—"}
          </text>
        </svg>
      </div>

      <p className="text-[12px] text-ink-tertiary text-center leading-relaxed mt-1.5">{sublabel}</p>
    </Card>
  );
}

/**
 * GaugeCard
 * Same semi-circle gauge path as the original HighLevelScore
 * (M 15 82 A 46 46 0 1 1 97 82) — used for the non-percentage
 * "Competition Level" card.
 */
export function GaugeCard({ label, value, color, sublabel, tooltip }) {
  const gaugePath = "M 15 82 A 46 46 0 1 1 97 82";

  return (
    <Card className="p-4 flex flex-col">
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-secondary">
        {label}
        {tooltip && <InfoDot tooltip={tooltip} />}
      </div>

      <div className="flex justify-center mt-2.5">
        <svg width="104" height="104" viewBox="0 0 112 112">
          <path d={gaugePath} fill="none" stroke="var(--color-border-strong)" strokeWidth="9" strokeLinecap="round" />
          {value && <path d={gaugePath} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" />}
          <text x="56" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill={value ? color : "var(--color-ink-quaternary)"}>
            {value || "—"}
          </text>
        </svg>
      </div>

      <p className="text-[12px] text-ink-tertiary text-center leading-relaxed mt-1.5">{sublabel}</p>
    </Card>
  );
}

/**
 * CategoryBar
 * Same 3-column grid layout (label / bar / percentage) as the original.
 */
export function CategoryBar({ label, score, color }) {
  return (
    <div className="grid grid-cols-[140px_1fr_40px] items-center gap-3 mb-3.5">
      <span className="text-[13px] text-ink-secondary">{label}</span>
      <div className="h-[8px] rounded-full bg-border-strong overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="text-[13px] font-semibold text-ink-primary text-right">{score}%</span>
    </div>
  );
}

/**
 * ScoreDonut
 * Same multi-segment donut math as before: each segment's arc length is
 * proportional to its value, segments are placed sequentially around the
 * circle by tracking cumulativeOffset, starting at -90deg (12 o'clock).
 */
export function ScoreDonut({ segments }) {
  const radius = 56;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="flex items-center gap-5 flex-wrap">
      <svg width="136" height="136" viewBox="0 0 150 150">
        {segments.map((seg, i) => {
          const segLength = (seg.value / 100) * circumference;
          const dasharray = `${segLength} ${circumference - segLength}`;
          const rotation = (cumulativeOffset / circumference) * 360 - 90;
          cumulativeOffset += segLength;
          return (
            <circle
              key={i}
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dasharray}
              transform={`rotate(${rotation} 75 75)`}
            />
          );
        })}
      </svg>

      <div className="flex flex-col gap-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-[12.5px] text-ink-secondary">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: seg.color }} />
            {seg.label}
            <span className="text-ink-quaternary">({seg.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * buildScoreDistribution
 * Identical bucketing logic to the original: buckets each category score
 * into Excellent/Good/Average/Below Average tiers, returns the percentage
 * share of each tier for the donut chart. Colors now reference the same
 * palette used by CATEGORY_COLORS for visual consistency.
 */
export function buildScoreDistribution(categoryScores) {
  const values = Object.values(categoryScores || {});
  if (values.length === 0) return null;

  const buckets = {
    "Excellent (80-100)": { count: 0, color: "var(--color-brand-400)" },
    "Good (60-79)": { count: 0, color: "#3b82f6" },
    "Average (40-59)": { count: 0, color: "var(--color-warning)" },
    "Below Average (0-39)": { count: 0, color: "#fb923c" },
  };

  values.forEach((v) => {
    if (v >= 80) buckets["Excellent (80-100)"].count++;
    else if (v >= 60) buckets["Good (60-79)"].count++;
    else if (v >= 40) buckets["Average (40-59)"].count++;
    else buckets["Below Average (0-39)"].count++;
  });

  const total = values.length;
  return Object.entries(buckets).map(([label, { count, color }]) => ({
    label,
    value: Math.round((count / total) * 100),
    color,
  }));
}

export const CATEGORY_LABELS = {
  technicalSkills: "Technical Skills",
  projects: "Projects",
  experience: "Experience",
  dsa: "DSA / Problem Solving",
  communication: "Communication",
};

export const CATEGORY_COLORS = {
  technicalSkills: "var(--color-brand-400)",
  projects: "#3b82f6",
  experience: "#22d3ee",
  dsa: "var(--color-success)",
  communication: "var(--color-warning)",
};
