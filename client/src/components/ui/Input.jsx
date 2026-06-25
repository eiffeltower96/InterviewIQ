import { forwardRef } from "react";

/**
 * Input
 * Single consistent text field used across Login, Register, Upload,
 * Dream Company, and Interview Simulator forms.
 */
export const Input = forwardRef(function Input(
  { label, hint, error, className = "", containerClassName = "", id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11.5px] font-medium text-ink-tertiary uppercase tracking-wide mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          w-full h-9 px-3 rounded-lg text-[13.5px]
          bg-surface text-ink-primary placeholder:text-ink-quaternary
          border ${error ? "border-error-border" : "border-border-strong"}
          outline-none transition-all duration-150
          focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-error">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-ink-quaternary">{hint}</p>
      )}
    </div>
  );
});

/**
 * Textarea
 * Same visual language as Input, sized for longer-form content
 * (job descriptions, resume text, interview answers).
 */
export const Textarea = forwardRef(function Textarea(
  { label, hint, error, className = "", containerClassName = "", id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className={containerClassName}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={inputId}
            className="text-[11.5px] font-medium text-ink-tertiary uppercase tracking-wide"
          >
            {label}
          </label>
          {hint && <span className="text-[11px] text-ink-quaternary">{hint}</span>}
        </div>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={`
          w-full px-3 py-2.5 rounded-lg text-[13.5px] leading-relaxed
          bg-surface text-ink-primary placeholder:text-ink-quaternary
          border ${error ? "border-error-border" : "border-border-strong"}
          outline-none transition-all duration-150 resize-none
          focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          font-sans
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  );
});

/**
 * Select
 * Native select, restyled to match Input — used for interview type, etc.
 */
export const Select = forwardRef(function Select(
  { label, className = "", containerClassName = "", id, children, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11.5px] font-medium text-ink-tertiary uppercase tracking-wide mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={`
            w-full h-9 px-3 pr-8 rounded-lg text-[13.5px] appearance-none
            bg-surface text-ink-primary border border-border-strong
            outline-none transition-all duration-150 cursor-pointer
            focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <svg
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-tertiary"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
});
