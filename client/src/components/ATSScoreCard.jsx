import { motion } from "framer-motion";
import { Panel } from "./ui/Card";
import Badge from "./ui/Badge";
import ScoreRing from "./ui/ScoreRing";
import { scoreTone } from "./ui/scoreTone";
import ProgressBar from "./ui/ProgressBar";

const scoreLabel = (s) => {
  if (s >= 80) return "Excellent";
  if (s >= 60) return "Good";
  return "Needs improvement";
};

const scoreMessage = (s) => {
  if (s >= 80) return "Your resume is well-optimized for ATS systems.";
  if (s >= 60) return "A few improvements could significantly boost your score.";
  return "Consider addressing the suggestions below to improve your score.";
};

/**
 * ATSScoreCard
 * Executive-summary hero for the ATS Analysis page. Same `score` prop
 * (0-100) and same threshold copy as before — just composed from the
 * shared ScoreRing / ProgressBar / Badge primitives instead of a
 * one-off SVG ring with drop-shadow glow.
 */
function ATSScoreCard({ score }) {
  const tone = scoreTone(score);

  return (
    <Panel className="flex items-center gap-8 flex-wrap mb-4">
      <ScoreRing score={score} size={120} strokeWidth={7} suffix="/100" />

      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 min-w-[200px]"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-tertiary mb-2">
          ATS Score
        </p>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-semibold text-ink-primary tracking-tight">
            {scoreLabel(score)}
          </span>
          <Badge tone={tone}>{score}/100</Badge>
        </div>

        <ProgressBar value={score} tone={tone} showValue={false} className="max-w-[320px]" />

        <p className="text-[12.5px] text-ink-tertiary mt-3">{scoreMessage(score)}</p>
      </motion.div>
    </Panel>
  );
}

export default ATSScoreCard;
