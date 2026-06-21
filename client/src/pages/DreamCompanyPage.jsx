import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

// ---------- small presentational helpers ----------

function CircularScore({ label, value, color, sublabel, tooltip }) {
    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const pct = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;
    const offset = circumference - (pct / 100) * circumference;

    return (
        <div style={cardStyle}>
            <div style={cardHeaderRow}>
                {label}
                {tooltip && <InfoDot tooltip={tooltip} />}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <svg width={112} height={112} viewBox="0 0 112 112">
                    <circle
                        cx="56"
                        cy="56"
                        r={radius}
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth="9"
                    />
                    {typeof value === "number" && (
                        <circle
                            cx="56"
                            cy="56"
                            r={radius}
                            fill="none"
                            stroke={color}
                            strokeWidth="9"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            transform="rotate(-90 56 56)"
                            style={{ transition: "stroke-dashoffset 0.6s ease" }}
                        />
                    )}
                    <text
                        x="56"
                        y="62"
                        textAnchor="middle"
                        fontSize="24"
                        fontWeight="800"
                        fill="#fff"
                    >
                        {typeof value === "number" ? `${value}%` : "--"}
                    </text>
                </svg>
            </div>

            <p style={cardSublabel}>{sublabel}</p>
        </div>
    );
}

function HighLevelScore({ label, value, color, sublabel, tooltip }) {
    return (
        <div style={cardStyle}>
            <div style={cardHeaderRow}>
                {label}
                {tooltip && <InfoDot tooltip={tooltip} />}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <svg width={112} height={112} viewBox="0 0 112 112">
                    <path
                        d="M 15 82 A 46 46 0 1 1 97 82"
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth="9"
                        strokeLinecap="round"
                    />
                    {value && (
                        <path
                            d="M 15 82 A 46 46 0 1 1 97 82"
                            fill="none"
                            stroke={color}
                            strokeWidth="9"
                            strokeLinecap="round"
                        />
                    )}
                    <text
                        x="56"
                        y="60"
                        textAnchor="middle"
                        fontSize="19"
                        fontWeight="800"
                        fill={color}
                    >
                        {value || "--"}
                    </text>
                </svg>
            </div>

            <p style={cardSublabel}>{sublabel}</p>
        </div>
    );
}

function InfoDot({ tooltip }) {
    return (
        <span
            title={tooltip}
            style={{
                color: "#6b7280",
                fontSize: 11,
                cursor: "default",
                border: "1px solid #374151",
                borderRadius: "50%",
                width: 14,
                height: 14,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            ?
        </span>
    );
}

function CategoryBar({ label, score, color }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr 44px",
                alignItems: "center",
                gap: 12,
                marginBottom: 14
            }}
        >
            <span style={{ color: "#d1d5db", fontSize: 14 }}>{label}</span>
            <div
                style={{
                    height: 9,
                    background: "#1f2937",
                    borderRadius: 6,
                    overflow: "hidden"
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${score}%`,
                        background: color,
                        borderRadius: 6,
                        transition: "width 0.6s ease"
                    }}
                />
            </div>
            <span
                style={{
                    color: "#e5e7eb",
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: "right"
                }}
            >
                {score}%
            </span>
        </div>
    );
}

function ScoreDonut({ segments }) {
    const radius = 62;
    const strokeWidth = 24;
    const circumference = 2 * Math.PI * radius;
    let cumulativeOffset = 0;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <svg width={150} height={150} viewBox="0 0 150 150">
                {segments.map((seg, i) => {
                    const segLength = (seg.value / 100) * circumference;
                    const dasharray = `${segLength} ${circumference - segLength}`;
                    const rotation = (cumulativeOffset / circumference) * 360 - 90;
                    cumulativeOffset += segLength;
                    return (
                        <circle
                            key={i}
                            cx="75"
                            cy="75"
                            r={radius}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={dasharray}
                            transform={`rotate(${rotation} 75 75)`}
                        />
                    );
                })}
            </svg>

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {segments.map((seg, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 13,
                            color: "#d1d5db"
                        }}
                    >
                        <span
                            style={{
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                background: seg.color,
                                display: "inline-block"
                            }}
                        />
                        {seg.label}
                        <span style={{ color: "#9ca3af" }}>({seg.value}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SectionLabel({ icon, children }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#a855f7",
                fontWeight: 700,
                fontSize: 15
            }}
        >
            {icon}
            {children}
        </div>
    );
}

// ---------- styles ----------

const cardStyle = {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: 16,
    padding: "18px 20px",
    color: "#fff"
};

const cardHeaderRow = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: 600
};

const cardSublabel = {
    color: "#9ca3af",
    fontSize: 12.5,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 0,
    lineHeight: 1.4
};

const inputStyle = {
    padding: 13,
    borderRadius: 12,
    border: "1px solid #374151",
    background: "#0f172a",
    color: "#fff",
    outline: "none",
    fontSize: 14
};

// Category score buckets — derived from the scores so the bucketing always matches the actual data
function buildScoreDistribution(categoryScores) {
    const values = Object.values(categoryScores || {});
    if (values.length === 0) return null;

    const buckets = {
        "Excellent (80-100)": { count: 0, color: "#a855f7" },
        "Good (60-79)": { count: 0, color: "#3b82f6" },
        "Average (40-59)": { count: 0, color: "#f59e0b" },
        "Below Average (0-39)": { count: 0, color: "#fb923c" }
    };

    values.forEach((v) => {
        if (v >= 80) buckets["Excellent (80-100)"].count++;
        else if (v >= 60) buckets["Good (60-79)"].count++;
        else if (v >= 40) buckets["Average (40-59)"].count++;
        else buckets["Below Average (0-39)"].count++;
    });

    const total = values.length;
    return Object.entries(buckets).map(([label, { count, color }]) => ({
        label,
        value: Math.round((count / total) * 100),
        color
    }));
}

const CATEGORY_LABELS = {
    technicalSkills: "Technical Skills",
    projects: "Projects",
    experience: "Experience",
    dsa: "DSA / Problem Solving",
    communication: "Communication"
};

const CATEGORY_COLORS = {
    technicalSkills: "#a855f7",
    projects: "#3b82f6",
    experience: "#22d3ee",
    dsa: "#22c55e",
    communication: "#f59e0b"
};

function DreamCompanyPage() {
    const [analysis, setAnalysis] = useState(null);
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();

    const handleAnalyze = async () => {
        if (!company.trim() || !role.trim()) {
            setError("Enter a company and role to analyze.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await api.post("/company-analysis", {
                resumeId: id,
                company,
                role
            });

            setAnalysis(response.data.analysis);
        } catch (err) {
            console.error(err);
            setError("Couldn't run the analysis. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const result = analysis?.result;
    const distribution = result ? buildScoreDistribution(result.categoryScores) : null;
    const analyzedDate = analysis?.createdAt
        ? new Date(analysis.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit"
          })
        : null;

    return (
        <DashboardLayout>
            <div
                style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    width: "100%",
                    maxWidth: 1400,
                    margin: "0 auto"
                }}
            >
                <ResumeWorkspaceSidebar />

                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 28
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    fontSize: 32,
                                    fontWeight: 800,
                                    color: "#fff",
                                    marginBottom: 6,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10
                                }}
                            >
                                Dream Company Analyzer
                                <span style={{ fontSize: 22 }}>✨</span>
                            </h1>
                            <p style={{ color: "#9ca3af", fontSize: 14.5, margin: 0 }}>
                                Analyze your profile fit, strengths, gaps and roadmap for any
                                company and role.
                            </p>
                        </div>

                        {/* Decorative skyline accent */}
                        <svg
                            width="160"
                            height="70"
                            viewBox="0 0 160 70"
                            style={{ flexShrink: 0, opacity: 0.9 }}
                        >
                            <rect x="6" y="30" width="14" height="38" rx="2" fill="#3b82f6" opacity="0.7" />
                            <rect x="24" y="18" width="16" height="50" rx="2" fill="#7c3aed" opacity="0.85" />
                            <rect x="44" y="34" width="13" height="34" rx="2" fill="#3b82f6" opacity="0.6" />
                            <rect x="61" y="8" width="18" height="60" rx="2" fill="#a855f7" />
                            <rect x="83" y="26" width="14" height="42" rx="2" fill="#3b82f6" opacity="0.7" />
                            <rect x="101" y="14" width="16" height="54" rx="2" fill="#7c3aed" opacity="0.8" />
                            <rect x="121" y="32" width="13" height="36" rx="2" fill="#3b82f6" opacity="0.6" />
                            {[
                                [12, 8],
                                [50, 4],
                                [95, 6],
                                [135, 10],
                                [70, 2]
                            ].map(([x, y], i) => (
                                <text key={i} x={x} y={y} fontSize="10" fill="#c4b5fd">
                                    ✦
                                </text>
                            ))}
                        </svg>
                    </div>

                    {/* Input Card */}
                    <div
                        style={{
                            background: "#111827",
                            border: "1px solid #1f2937",
                            borderRadius: 16,
                            padding: "20px 24px",
                            marginBottom: 22
                        }}
                    >
                        <h3 style={{ color: "#a855f7", marginTop: 0, marginBottom: 16, fontSize: 15 }}>
                            Enter Company & Role
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr auto",
                                gap: 14,
                                alignItems: "start"
                            }}
                        >
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        color: "#9ca3af",
                                        fontSize: 12,
                                        marginBottom: 6
                                    }}
                                >
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Google"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    style={{ ...inputStyle, width: "100%" }}
                                />
                            </div>

                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        color: "#9ca3af",
                                        fontSize: 12,
                                        marginBottom: 6
                                    }}
                                >
                                    Target Role
                                </label>
                                <input
                                    type="text"
                                    placeholder="Frontend Engineer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    style={{ ...inputStyle, width: "100%" }}
                                />
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                style={{
                                    marginTop: 20,
                                    padding: "13px 26px",
                                    border: "none",
                                    borderRadius: 12,
                                    background: loading
                                        ? "#6d28d9"
                                        : "linear-gradient(135deg, #a855f7, #7c3aed)",
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: 14,
                                    cursor: loading ? "default" : "pointer",
                                    opacity: loading ? 0.8 : 1,
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {loading ? "Analyzing..." : "✨ Analyze Profile"}
                            </button>
                        </div>

                        {error && (
                            <p style={{ color: "#f87171", fontSize: 13, marginTop: 12, marginBottom: 0 }}>
                                {error}
                            </p>
                        )}

                        {!error && (
                            <p style={{ color: "#6b7280", fontSize: 11.5, marginTop: 10, marginBottom: 0 }}>
                                🔒 Your data is secure and private
                            </p>
                        )}
                    </div>

                    {/* Analysis Summary header row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            marginBottom: 14
                        }}
                    >
                        <SectionLabel icon="📊">Analysis Summary</SectionLabel>
                        {analyzedDate && (
                            <span style={{ color: "#6b7280", fontSize: 12.5 }}>
                                Analyzed on {analyzedDate}
                            </span>
                        )}
                    </div>

                    {/* Score rings — 4 cards in one row, matching target proportions */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 16,
                            marginBottom: 22
                        }}
                    >
                        <CircularScore
                            label="Overall Match Score"
                            value={result?.overallScore}
                            color="#a855f7"
                            sublabel={
                                result
                                    ? "You have a strong match for this role."
                                    : "Overall profile fit"
                            }
                            tooltip="How closely your profile matches this role overall"
                        />

                        <CircularScore
                            label="Shortlist Chance"
                            value={result?.shortlistChance}
                            color="#22c55e"
                            sublabel={
                                result
                                    ? "Good probability of getting shortlisted."
                                    : "Shortlist chance based on your profile"
                            }
                            tooltip="Estimated likelihood of being shortlisted"
                        />

                        <CircularScore
                            label="Profile Strength"
                            value={result?.profileStrength}
                            color="#3b82f6"
                            sublabel={
                                result
                                    ? "Your profile is strong in key areas."
                                    : "Profile strength based on your qualifications"
                            }
                            tooltip="Overall strength of your qualifications"
                        />

                        <HighLevelScore
                            label="Competition Level"
                            value={result?.competitionLevel}
                            color="#f59e0b"
                            sublabel={
                                result
                                    ? `${result.competitionLevel} competition for this role${
                                          company ? ` at ${company}` : ""
                                      }.`
                                    : "Competition level based on market analysis"
                            }
                            tooltip="How competitive this role is in the current market"
                        />
                    </div>

                    {/* Charts Section */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr",
                            gap: 16,
                            marginBottom: 22
                        }}
                    >
                        <div style={cardStyle}>
                            <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 15 }}>
                                Category-wise Scores
                            </h3>

                            {result?.categoryScores ? (
                                <div>
                                    {Object.entries(result.categoryScores).map(([key, score]) => (
                                        <CategoryBar
                                            key={key}
                                            label={CATEGORY_LABELS[key] || key}
                                            score={score}
                                            color={CATEGORY_COLORS[key] || "#a855f7"}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: "#9ca3af" }}>
                                    Bar chart will be shown here after analysis.
                                </p>
                            )}
                        </div>

                        <div style={cardStyle}>
                            <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 15 }}>
                                Score Distribution
                            </h3>

                            {distribution ? (
                                <ScoreDonut segments={distribution} />
                            ) : (
                                <p style={{ color: "#9ca3af" }}>
                                    Donut chart will be shown here after analysis.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Insight Cards — 4 across, verdict folded into the same row */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 16,
                            marginBottom: 22
                        }}
                    >
                        <div style={cardStyle}>
                            <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15 }}>
                                Top Strengths
                            </h3>
                            {result?.strengths?.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ color: "#86efac", fontSize: 13.5, marginBottom: 8 }}
                                >
                                    ✓ {item}
                                </div>
                            ))}
                        </div>

                        <div style={cardStyle}>
                            <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15 }}>
                                Skills To Improve
                            </h3>
                            {result?.missingSkills?.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ color: "#fca5a5", fontSize: 13.5, marginBottom: 8 }}
                                >
                                    ✗ {item}
                                </div>
                            ))}
                        </div>

                        <div style={cardStyle}>
                            <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15 }}>
                                Key Focus Areas
                            </h3>
                            {result?.focusAreas?.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ color: "#93c5fd", fontSize: 13.5, marginBottom: 8 }}
                                >
                                    {index + 1}. {item}
                                </div>
                            ))}
                        </div>

                        <div style={cardStyle}>
                            <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15, color: "#a855f7" }}>
                                Recruiter's Verdict
                            </h3>
                            <p style={{ color: "#d1d5db", fontSize: 13.5, lineHeight: 1.5, marginBottom: 10 }}>
                                {result ? result.verdict : "Waiting for analysis"}
                            </p>
                            {result && (
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#22c55e"
                                    }}
                                >
                                    Verdict: Good Potential
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Roadmap */}
                    <div style={cardStyle}>
                        <h3 style={{ marginTop: 0, marginBottom: 4, fontSize: 15 }}>
                            30-Day Action Plan
                        </h3>

                        {result?.roadmap && (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${result.roadmap.length}, 1fr)`,
                                    gap: 16,
                                    marginTop: 18,
                                    position: "relative"
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 26,
                                        left: "6%",
                                        right: "6%",
                                        height: 1,
                                        background: "#374151",
                                        zIndex: 0
                                    }}
                                />
                                {result.roadmap.map((step, index) => (
                                    <div key={index} style={{ position: "relative", zIndex: 1 }}>
                                        <div
                                            style={{
                                                color: "#6b7280",
                                                fontSize: 11.5,
                                                marginBottom: 8
                                            }}
                                        >
                                            Week {index + 1}
                                        </div>
                                        <div
                                            style={{
                                                width: 11,
                                                height: 11,
                                                borderRadius: "50%",
                                                background: "#a855f7",
                                                marginBottom: 10,
                                                boxShadow: "0 0 0 4px #111827"
                                            }}
                                        />
                                        <div style={{ color: "#e5e7eb", fontSize: 13.5, lineHeight: 1.4 }}>
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DreamCompanyPage;