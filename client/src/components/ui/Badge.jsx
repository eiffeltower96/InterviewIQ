const toneClasses = {
  neutral: "bg-white/[0.06] text-ink-secondary border-border-strong",
  brand: "bg-brand-500/10 text-brand-300 border-brand-500/25",
  success: "bg-success-bg text-success border-success-border",
  error: "bg-error-bg text-error border-error-border",
  warning: "bg-warning-bg text-warning border-warning-border",
};

/**
 * Badge
 * Small status pill. Tone maps directly to the app's semantic palette —
 * success/error/warning plus neutral and brand. No ad-hoc colors.
 */
function Badge({ tone = "neutral", dot = false, children, className = "" }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full
        text-[11px] font-medium border leading-none
        ${toneClasses[tone]}
        ${className}
      `}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />}
      {children}
    </span>
  );
}

export default Badge;
