import { useRef } from "react";
import { COACH_MODES } from "./CoachSidebar";

/**
 * Composer
 * Fixed at the bottom of the conversation column (not the viewport, so it
 * respects the sidebar on desktop). Shows the active mode as a small pill
 * inside the input so switching to "Resume Roast" etc. has a visible,
 * persistent indicator of which persona is answering.
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

  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(180deg, transparent, #0d0c14 30%)",
        padding: "16px 24px 20px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div
          style={{
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={`Ask your ${mode.label.toLowerCase()}...`}
              rows={1}
              style={{
                flex: 1,
                resize: "none",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f3f4f6",
                fontSize: 14.5,
                fontFamily: "inherit",
                lineHeight: 1.5,
                padding: "6px 4px",
                maxHeight: 160,
              }}
            />
            <button
              onClick={onSend}
              disabled={!value.trim() || disabled}
              style={{
                flexShrink: 0,
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "none",
                background: value.trim() && !disabled ? "#a78bfa" : "rgba(255,255,255,0.06)",
                color: value.trim() && !disabled ? "#13111c" : "#4b5563",
                cursor: value.trim() && !disabled ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l14-7-7 14-2-5-5-2z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  fill={value.trim() && !disabled ? "#13111c" : "none"}
                />
              </svg>
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: 600,
                color: "#6d28d9",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa" }} />
              {mode.label}
            </span>
            <span style={{ fontSize: 11, color: "#4b5563" }}>Enter to send · Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Composer;