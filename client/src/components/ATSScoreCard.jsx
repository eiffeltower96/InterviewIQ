function ATSScoreCard({ score }) {
    const getColors = (s) => {
        if (s >= 80) return { primary: "#34d399", glow: "rgba(52,211,153,0.15)", track: "rgba(52,211,153,0.12)", label: "Excellent", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.25)", text: "#34d399" };
        if (s >= 60) return { primary: "#fbbf24", glow: "rgba(251,191,36,0.15)",  track: "rgba(251,191,36,0.12)",  label: "Good",      bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)",  text: "#fbbf24" };
        return             { primary: "#f87171", glow: "rgba(248,113,113,0.15)", track: "rgba(248,113,113,0.12)", label: "Needs Improvement", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", text: "#f87171" };
    };

    const c = getColors(score);
    const radius = 54;
    const circ = 2 * Math.PI * radius;
    const dash = (score / 100) * circ;

    return (
        <div style={{
            background: "#0e0e1a",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "32px 36px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 40,
            boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 80px ${c.glow}`,
            fontFamily: "Inter, sans-serif",
            flexWrap: "wrap",
        }}>
            <style>{`@keyframes draw-arc { from { stroke-dasharray: 0 ${circ}; } }`}</style>

            {/* Ring */}
            <div style={{ position: "relative", width: 140, height: 140, flexShrink: 0 }}>
                <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="70" cy="70" r={radius} fill="none" stroke={c.track} strokeWidth="8" />
                    <circle
                        cx="70" cy="70" r={radius} fill="none"
                        stroke={c.primary} strokeWidth="8"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeLinecap="round"
                        style={{
                            filter: `drop-shadow(0 0 10px ${c.primary})`,
                            animation: "draw-arc 1s ease-out forwards",
                        }}
                    />
                </svg>
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{ fontSize: 38, fontWeight: 800, color: c.primary, lineHeight: 1, letterSpacing: "-0.03em" }}>
                        {score}
                    </span>
                    <span style={{ fontSize: 12, color: "#4b5563", fontWeight: 600, marginTop: 2 }}>/100</span>
                </div>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 180 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4b5563", margin: "0 0 10px" }}>
                    ATS Score
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                        {c.label}
                    </span>
                    <span style={{
                        fontSize: 12, fontWeight: 600,
                        color: c.text, background: c.bg,
                        border: `1px solid ${c.border}`,
                        padding: "3px 12px", borderRadius: 20,
                    }}>
                        {score}/100
                    </span>
                </div>

                {/* Progress bar */}
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, height: 6, overflow: "hidden", maxWidth: 320 }}>
                    <div style={{
                        height: "100%", width: `${score}%`,
                        background: `linear-gradient(90deg, ${c.primary}80, ${c.primary})`,
                        borderRadius: 8,
                        boxShadow: `0 0 8px ${c.primary}60`,
                        transition: "width 1s ease-out",
                    }} />
                </div>
                <p style={{ fontSize: 12, color: "#374151", marginTop: 8 }}>
                    {score >= 80
                        ? "Your resume is well-optimized for ATS systems."
                        : score >= 60
                        ? "A few improvements could significantly boost your score."
                        : "Consider addressing the suggestions below to improve your score."}
                </p>
            </div>
        </div>
    );
}

export default ATSScoreCard;
