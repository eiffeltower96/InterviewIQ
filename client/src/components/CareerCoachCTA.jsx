import { useNavigate } from "react-router-dom";

/**
 * CareerCoachCTA
 * Sits as the final beat of the Resume Analysis report — the bridge from
 * "here is your data" to "let's talk about what it means."
 *
 * Visually it borrows directly from ATSScoreCard / AnalysisListCard:
 * - same dark card surface + subtle border
 * - same violet glow language used for the "Analysis Report" eyebrow dot
 * - same Inter type scale
 *
 * It is data-aware: the headline references the resume's actual weakest
 * point so the CTA reads as a continuation of the report, not a banner ad
 * for a feature.
 */
function CareerCoachCTA({ resume }) {
  const navigate = useNavigate();

  const score = resume?.analysis?.atsScore;
  const topWeakness = resume?.analysis?.weaknesses?.[0];
  const missingCount = resume?.analysis?.missingKeywords?.length || 0;

  // Build a single, specific line instead of a generic feature blurb.
  let contextLine = "Ask follow-up questions about this report and get a clear plan to act on it.";
  if (topWeakness) {
    contextLine = `Start with your biggest gap — "${topWeakness}" — or ask anything else about this report.`;
  } else if (missingCount > 0) {
    contextLine = `You're missing ${missingCount} keyword${missingCount > 1 ? "s" : ""} recruiters look for. Ask your coach how to add them naturally.`;
  }

  return (
    <div
      style={{
        position: "relative",
        marginTop: 24,
        marginBottom: 8,
        borderRadius: 20,
        padding: 1,
        background: "linear-gradient(135deg, rgba(167,139,250,0.5), rgba(109,40,217,0.15), rgba(167,139,250,0.05))",
      }}
    >
      <div
        style={{
          borderRadius: 19,
          padding: "28px 28px",
          background: "#13111c",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(167,139,250,0.14) 0%, transparent 55%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, minWidth: 0, flex: 1 }}>
          {/* Icon badge — same glow treatment as the eyebrow dot above the H1 */}
          <div
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(167,139,250,0.12)",
              border: "1px solid rgba(167,139,250,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(167,139,250,0.25)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                fill="#a78bfa"
              />
              <circle cx="18.5" cy="17.5" r="2" fill="#a78bfa" opacity="0.7" />
            </svg>
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Talk it through with your AI Career Coach
              </h3>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#6d28d9",
                  background: "rgba(167,139,250,0.12)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                New
              </span>
            </div>
            <p style={{ fontSize: 14, color: "#9ca3af", margin: 0, lineHeight: 1.55, maxWidth: 480 }}>
              {contextLine}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/resume/${resume?.id}/coach`)}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#a78bfa",
            color: "#13111c",
            fontWeight: 700,
            fontSize: 14,
            border: "none",
            borderRadius: 12,
            padding: "12px 20px",
            cursor: "pointer",
            boxShadow: "0 0 0 0 rgba(167,139,250,0)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(167,139,250,0.35)";
            e.currentTarget.style.background = "#b79cfb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 0 0 rgba(167,139,250,0)";
            e.currentTarget.style.background = "#a78bfa";
          }}
        >
          {score !== undefined ? `Discuss my ${score} score` : "Open Career Coach"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CareerCoachCTA;