import { motion } from "framer-motion";

/**
 * EmptyState
 * Replaces emoji-in-a-circle empty states. Icon is passed as an SVG node
 * (inherit currentColor) so every empty state across the app uses the
 * same line-icon language instead of emoji.
 */
function EmptyState({ icon, title, description, action, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col items-center text-center py-16 px-6 ${className}`}
    >
      {icon && (
        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-border-strong flex items-center justify-center text-ink-tertiary mb-4 [&>svg]:w-5 [&>svg]:h-5">
          {icon}
        </div>
      )}
      <h3 className="text-[15px] font-semibold text-ink-primary">{title}</h3>
      {description && (
        <p className="text-[13px] text-ink-tertiary mt-1.5 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}

export default EmptyState;
