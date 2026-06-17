import { useState } from "react";

/**
 * Future-feature modes. Each mode swaps the system prompt server-side and
 * changes the suggested follow-ups — this list is the seam where
 * "Dream Company Match," "Resume Roast," etc. plug in later without any
 * layout change, only new entries here + a backend prompt.
 */
export const COACH_MODES = [
  {
    id: "general",
    label: "Career Coach",
    description: "Ask anything about your resume",
    icon: "spark",
    available: true,
  },
  {
    id: "roast",
    label: "Resume Roast",
    description: "Brutally honest, no sugar-coating",
    icon: "flame",
    available: true,
  },
  {
    id: "ats",
    label: "ATS Improvement",
    description: "Get past the filters",
    icon: "filter",
    available: true,
  },
  {
    id: "interview",
    label: "Interview Prep",
    description: "Practice for your next round",
    icon: "mic",
    available: false,
  },
  {
    id: "dream-match",
    label: "Dream Company Match",
    description: "See where you fit best",
    icon: "target",
    available: false,
  },
  {
    id: "roadmap",
    label: "Career Roadmap",
    description: "Your path to the next level",
    icon: "map",
    available: false,
  },
];

const ICONS = {
  spark: (
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
  ),
  flame: (
    <path
      d="M12 2c1 3-3 4-3 7a3 3 0 006 0c1-1 1-2 0-3 1.5.5 3 2.5 3 5a6 6 0 11-12 0c0-4 3-6 6-9z"
      fill="currentColor"
    />
  ),
  filter: (
    <path d="M4 5h16M7 12h10M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  map: (
    <path
      d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z M9 4v14M15 6v14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

function ModeIcon({ name, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {ICONS[name]}
    </svg>
  );
}

/**
 * CoachSidebar
 * Desktop-only persistent panel. Mirrors the dark surface + violet accent
 * language from the report cards. Collapsible to give the conversation
 * area room on smaller laptop screens.
 */
function CoachSidebar({
  collapsed,
  onToggleCollapse,
  activeMode,
  onSelectMode,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}) {
  const [hoveredMode, setHoveredMode] = useState(null);

  if (collapsed) {
    return (
      <div
        style={{
          width: 60,
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "#0d0c14",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 16,
          gap: 12,
        }}
      >
        <button
          onClick={onToggleCollapse}
          title="Expand sidebar"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "#9ca3af",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={onNewConversation}
          title="New conversation"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid rgba(167,139,250,0.3)",
            background: "rgba(167,139,250,0.12)",
            color: "#a78bfa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: 272,
        flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        background: "#0d0c14",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 14px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#a78bfa",
              boxShadow: "0 0 8px #a78bfa",
            }}
          />
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6d28d9" }}>
            Career Coach
          </span>
        </div>
        <button
          onClick={onToggleCollapse}
          title="Collapse sidebar"
          style={{ background: "transparent", border: "none", color: "#6b7280", cursor: "pointer", padding: 4 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* New conversation */}
      <div style={{ padding: "4px 14px 14px" }}>
        <button
          onClick={onNewConversation}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#a78bfa",
            color: "#13111c",
            fontWeight: 700,
            fontSize: 13.5,
            border: "none",
            borderRadius: 10,
            padding: "10px 0",
            cursor: "pointer",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New conversation
        </button>
      </div>

      {/* Mode shortcuts */}
      <div style={{ padding: "0 10px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#4b5563", letterSpacing: "0.06em", textTransform: "uppercase", padding: "8px 8px 6px" }}>
          Modes
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {COACH_MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            const isHovered = hoveredMode === mode.id;
            return (
              <button
                key={mode.id}
                disabled={!mode.available}
                onClick={() => mode.available && onSelectMode(mode.id)}
                onMouseEnter={() => setHoveredMode(mode.id)}
                onMouseLeave={() => setHoveredMode(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 8px",
                  borderRadius: 9,
                  border: "none",
                  background: isActive ? "rgba(167,139,250,0.12)" : isHovered && mode.available ? "rgba(255,255,255,0.04)" : "transparent",
                  cursor: mode.available ? "pointer" : "default",
                  opacity: mode.available ? 1 : 0.45,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isActive ? "rgba(167,139,250,0.18)" : "rgba(255,255,255,0.04)",
                    color: isActive ? "#a78bfa" : "#9ca3af",
                  }}
                >
                  <ModeIcon name={mode.icon} size={14} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: isActive ? "#fff" : "#d1d5db" }}>
                      {mode.label}
                    </span>
                    {!mode.available && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "#6b7280",
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 4,
                          padding: "1px 5px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        SOON
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {mode.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation history */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 10px", marginTop: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#4b5563", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0 8px 8px" }}>
          History
        </div>
        {conversations.length === 0 ? (
          <p style={{ fontSize: 12.5, color: "#4b5563", padding: "4px 8px", lineHeight: 1.5 }}>
            Your conversations about this resume will show up here.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {conversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  style={{
                    textAlign: "left",
                    width: "100%",
                    padding: "9px 10px",
                    borderRadius: 9,
                    border: "none",
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: isActive ? "#fff" : "#9ca3af",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {conv.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>{conv.timeLabel}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoachSidebar;