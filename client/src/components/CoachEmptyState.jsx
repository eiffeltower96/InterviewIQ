/**
 * CoachEmptyState
 * The single highest-leverage screen in this feature. A generic "Ask me
 * anything" empty state is what makes an AI feature feel bolted-on.
 * Here every prompt is generated from the resume's own analysis, so the
 * first thing a first-time user sees is proof the assistant already
 * read their report.
 */
function CoachEmptyState({ resume, onSelectPrompt }) {
  const score = resume?.analysis?.atsScore;
  const weakness = resume?.analysis?.weaknesses?.[0];
  const missingKeyword = resume?.analysis?.missingKeywords?.[0];
  const strength = resume?.analysis?.strengths?.[0];

  const prompts = [
    {
      icon: "trend",
      label: "Explain my score",
      prompt: score !== undefined
        ? `Why is my ATS score ${score}, and what would move it up fastest?`
        : "What does my ATS score mean and how can I improve it?",
    },
    {
      icon: "fix",
      label: "Fix my biggest weakness",
      prompt: weakness
        ? `How do I fix this weakness: "${weakness}"?`
        : "What's the single biggest weakness in my resume?",
    },
    {
      icon: "keyword",
      label: "Add missing keywords",
      prompt: missingKeyword
        ? `How do I naturally add "${missingKeyword}" to my resume without keyword-stuffing?`
        : "How do I add missing keywords without sounding stuffed?",
    },
    {
      icon: "target",
      label: "Find my best-fit role",
      prompt: strength
        ? `Given my strength in "${strength}", which roles should I target?`
        : "Based on this resume, which roles suit me most?",
    },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Mark — same spark glyph + glow language as the CTA badge */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "rgba(167,139,250,0.1)",
          border: "1px solid rgba(167,139,250,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          boxShadow: "0 0 32px rgba(167,139,250,0.22)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#a78bfa" />
        </svg>
      </div>

      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {resume ? `Let's talk about your resume` : "Your AI Career Coach"}
      </h2>
      <p style={{ fontSize: 14.5, color: "#6b7280", marginTop: 8, maxWidth: 420, lineHeight: 1.6 }}>
        {score !== undefined
          ? `I've read your analysis — score of ${score} with ${resume?.analysis?.missingKeywords?.length || 0} keyword gaps. Ask me anything, or start here:`
          : "Ask me anything about your resume, your fit for a role, or how to improve your score."}
      </p>

      {/* Starter prompts grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 10,
          marginTop: 28,
          width: "100%",
          maxWidth: 640,
        }}
      >
        {prompts.map((p) => (
          <button
            key={p.label}
            onClick={() => onSelectPrompt(p.prompt)}
            style={{
              textAlign: "left",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              cursor: "pointer",
              transition: "border-color 0.15s ease, background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)";
              e.currentTarget.style.background = "rgba(167,139,250,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb", marginBottom: 4 }}>
              {p.label}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "#6b7280",
                lineHeight: 1.45,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {p.prompt}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CoachEmptyState;