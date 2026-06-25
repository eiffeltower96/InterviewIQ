/**
 * scoreTone
 * Maps a 0-100 score to a semantic tone bucket. Shared by ScoreRing and
 * ProgressBar so the success/warning/error thresholds only live in one
 * place (>=80 success, >=60 warning, else error — matches the thresholds
 * already used by ATSScoreCard / Dashboard's getScoreColor before this
 * redesign, just centralized).
 */
export function scoreTone(score) {
  if (score === null || score === undefined) return "neutral";
  if (score >= 80) return "success";
  if (score >= 60) return "warning";
  return "error";
}

export const toneColor = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  brand: "var(--color-brand-400)",
  neutral: "var(--color-ink-quaternary)",
};
