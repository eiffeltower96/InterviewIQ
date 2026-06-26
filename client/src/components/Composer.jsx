import { useRef } from "react";
import { COACH_MODES } from "./coachModes";

/**
 * Composer
 * Same auto-growing textarea (manual style.height manipulation, capped at
 * 160px) and same Enter-to-send / Shift+Enter-for-newline behavior as
 * before. The active mode still renders as a label only — it isn't sent
 * to the backend, matching the existing CareerCoachPage behavior.
 */
function Composer({ value, onChange, onSend, activeMode, disabled }) {
  const textareaRef = useRef(null);
  const mode = COACH_MODES.find((m) => m.id === activeMode) || COACH_MODES[0];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };

  const handleInput = (e) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  };

  const canSend = value.trim() && !disabled;

  return (
    <div className="border-t border-border px-6 pt-4 pb-5" style={{ background: "linear-gradient(180deg, transparent, var(--color-surface) 30%)" }}>
      <div className="max-w-[720px] mx-auto">
        <div className="rounded-2xl border border-border-strong bg-white/[0.03] p-3 flex flex-col gap-2">
          <div className="flex items-end gap-2.5">
            <textarea
              autoFocus
              ref={textareaRef}
              value={value}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={`Ask your ${mode.label.toLowerCase()}...`}
              rows={1}
              className="flex-1 resize-none bg-transparent border-none outline-none text-ink-primary text-[14.5px] leading-relaxed py-1.5 px-1 font-sans max-h-40"
            />
            <button
              onClick={onSend}
              disabled={!canSend}
              className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                canSend
                  ? "bg-brand-500 text-white hover:bg-brand-600 cursor-pointer"
                  : "bg-white/[0.06] text-ink-quaternary cursor-default"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l14-7-7 14-2-5-5-2z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  fill={canSend ? "currentColor" : "none"}
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-300">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              {mode.label}
            </span>
            <span className="text-[11px] text-ink-quaternary">Enter to send · Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Composer;
