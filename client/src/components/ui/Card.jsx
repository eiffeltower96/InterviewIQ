import { motion } from "framer-motion";

/**
 * Card
 * Default content surface. Flat 1px border, no shadow, subtle border
 * brighten on hover only when `interactive` (used for clickable resume
 * rows, history items, etc.) — static cards never move on hover.
 */
export function Card({ children, interactive = false, className = "", ...props }) {
  const Component = interactive ? motion.div : "div";
  const motionProps = interactive
    ? {
        whileHover: { borderColor: "var(--color-border-strong)", y: -1 },
        transition: { duration: 0.15 },
      }
    : {};

  return (
    <Component
      className={`
        bg-surface border border-border rounded-xl
        ${interactive ? "cursor-pointer" : ""}
        ${className}
      `}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Panel
 * Larger structural surface — used for the main content blocks within a
 * page (configure-interview panel, resume studio columns, etc). Slightly
 * more padding convention than Card; visually identical surface so the
 * two compose without looking mismatched.
 */
export function Panel({ children, className = "", padded = true, ...props }) {
  return (
    <div
      className={`
        bg-surface border border-border rounded-xl
        ${padded ? "p-5" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * PanelHeader
 * Consistent header row for Panel — title + optional right-aligned action.
 */
export function PanelHeader({ title, description, action, className = "" }) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-4 ${className}`}>
      <div>
        <h3 className="text-[13.5px] font-semibold text-ink-primary">{title}</h3>
        {description && <p className="text-xs text-ink-tertiary mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
