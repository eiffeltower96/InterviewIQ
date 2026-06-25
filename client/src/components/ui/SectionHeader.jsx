import { motion } from "framer-motion";

/**
 * SectionHeader
 * Replaces the repeated "glowing dot + uppercase eyebrow + H1 + subtitle"
 * block that was copy-pasted across every page. The dot has no box-shadow
 * glow — it's a plain small brand-colored dot, used as a structural marker
 * (this is a primary page heading) rather than decoration.
 */
function SectionHeader({ eyebrow, title, description, action, size = "lg", className = "" }) {
  const titleSize = size === "lg" ? "text-[28px]" : "text-xl";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start justify-between gap-4 ${className}`}
    >
      <div>
        {eyebrow && (
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-300">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className={`${titleSize} font-semibold text-ink-primary tracking-tight`}>{title}</h1>
        {description && (
          <p className="text-[13.5px] text-ink-tertiary mt-1.5 max-w-xl">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 pt-1">{action}</div>}
    </motion.div>
  );
}

export default SectionHeader;
