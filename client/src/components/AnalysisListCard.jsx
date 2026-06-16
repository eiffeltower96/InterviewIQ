function AnalysisListCard({ title, items }) {
    const getAccent = (t) => {
        if (t.includes("✅")) return { color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.15)",  dot: "#34d399", topBar: "linear-gradient(90deg,#059669,#34d399)" };
        if (t.includes("⚠️")) return { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.15)",  dot: "#fbbf24", topBar: "linear-gradient(90deg,#d97706,#fbbf24)" };
        if (t.includes("🔍")) return { color: "#60a5fa", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.15)",  dot: "#60a5fa", topBar: "linear-gradient(90deg,#2563eb,#60a5fa)" };
        if (t.includes("💡")) return { color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.15)", dot: "#a78bfa", topBar: "linear-gradient(90deg,#7c3aed,#a78bfa)" };
        return                       { color: "#9ca3af", bg: "rgba(156,163,175,0.08)", border: "rgba(156,163,175,0.15)", dot: "#6b7280", topBar: "linear-gradient(90deg,#4b5563,#9ca3af)" };
    };

    const a = getAccent(title);
    const labelText = title.replace(/[\u{1F300}-\u{1FFFF}]|[\u2600-\u27BF]/gu, "").trim();

    return (
        <div style={{
            background: "#0e0e1a",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
            fontFamily: "Inter, sans-serif",
            transition: "border-color 0.2s, transform 0.2s",
        }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = a.border; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = ""; }}
        >
            {/* Top accent bar */}
            <div style={{ height: 3, background: a.topBar }} />

            {/* Header */}
            <div style={{
                padding: "18px 22px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", gap: 10,
            }}>
                <span style={{ fontSize: 18 }}>{title.match(/[\u{1F300}-\u{1FFFF}]|[\u2600-\u27BF]|[\uD800-\uDFFF]/gu)?.[0] ?? "•"}</span>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#e5e7eb", margin: 0, letterSpacing: "0.01em" }}>
                    {labelText}
                </h2>
                <span style={{
                    marginLeft: "auto",
                    fontSize: 11, fontWeight: 700,
                    color: a.color, background: a.bg,
                    border: `1px solid ${a.border}`,
                    padding: "2px 10px", borderRadius: 20,
                }}>
                    {items.length}
                </span>
            </div>

            {/* Items */}
            <ul style={{ margin: 0, padding: "14px 22px 20px", listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item, index) => (
                    <li key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: a.dot, flexShrink: 0,
                            marginTop: 7,
                            boxShadow: `0 0 6px ${a.dot}80`,
                        }} />
                        <span style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.6 }}>
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnalysisListCard;
