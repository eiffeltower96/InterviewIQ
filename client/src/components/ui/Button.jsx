import { forwardRef } from "react";
import { motion } from "framer-motion";

const variantClasses = {
  primary:
    "bg-brand-500 text-white border border-brand-500 hover:bg-brand-600 hover:border-brand-600 disabled:bg-brand-800 disabled:border-brand-800",
  secondary:
    "bg-surface-raised text-ink-primary border border-border-strong hover:border-ink-quaternary hover:bg-[#1a1a1d] disabled:opacity-50",
  ghost:
    "bg-transparent text-ink-secondary border border-transparent hover:bg-white/[0.04] hover:text-ink-primary disabled:opacity-50",
  danger:
    "bg-transparent text-error border border-error-border hover:bg-error-bg disabled:opacity-50",
};

const sizeClasses = {
  sm: "h-7 px-2.5 text-[12.5px] gap-1.5 rounded-md",
  md: "h-9 px-3.5 text-[13.5px] gap-2 rounded-lg",
  lg: "h-10 px-4.5 text-sm gap-2 rounded-lg",
};

/**
 * Button
 * Flat fills, hairline borders, no gradients or glow shadows.
 * `loading` swaps the leading icon slot for a spinner and disables the button.
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    loading = false,
    disabled = false,
    className = "",
    as,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  const Component = as === "span" ? motion.span : motion.button;

  return (
    <Component
      ref={ref}
      type={as ? undefined : props.type || "button"}
      disabled={as ? undefined : isDisabled}
      aria-disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={`
        inline-flex items-center justify-center font-medium
        whitespace-nowrap select-none
        transition-colors duration-150
        disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin shrink-0"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ) : (
        icon && <span className="inline-flex shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
      )}
      {children}
      {!loading && iconRight && (
        <span className="inline-flex shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{iconRight}</span>
      )}
    </Component>
  );
});

export default Button;
