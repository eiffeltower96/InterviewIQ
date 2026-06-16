import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
    const [resumes, setResumes] = useState([]);

    const totalResumes = resumes.length;

    const analyzedResumes = resumes.filter(
        (resume) => resume.atsScore !== null
    );

    const averageATS =
        analyzedResumes.length > 0
            ? Math.round(
                  analyzedResumes.reduce(
                      (sum, resume) => sum + resume.atsScore,
                      0
                  ) / analyzedResumes.length
              )
            : 0;

    const bestATS =
        analyzedResumes.length > 0
            ? Math.max(...analyzedResumes.map((resume) => resume.atsScore))
            : 0;

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await api.get("/resume");
                setResumes(response.data.resumes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchResumes();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );
        if (!confirmed) return;
        try {
            await api.delete(`/resume/${id}`);
            setResumes(resumes.filter((resume) => resume.id !== id));
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return { text: "#34d399", bg: "rgba(52,211,153,0.1)", label: "Excellent" };
        if (score >= 60) return { text: "#fbbf24", bg: "rgba(251,191,36,0.1)", label: "Good" };
        return { text: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Needs Work" };
    };

    const ScoreRing = ({ score }) => {
        if (score === null || score === undefined) return (
            <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "2px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
            }}>
                <span style={{ color: "#6b7280", fontSize: 12, fontWeight: 600 }}>N/A</span>
            </div>
        );
        const { text, bg } = getScoreColor(score);
        const radius = 28;
        const circ = 2 * Math.PI * radius;
        const dash = (score / 100) * circ;
        return (
            <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
                <svg width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                    <circle
                        cx="36" cy="36" r={radius} fill="none"
                        stroke={text} strokeWidth="4"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 6px ${text}80)` }}
                    />
                </svg>
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{ color: text, fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{score}</span>
                </div>
            </div>
        );
    };

    return (
        <DashboardLayout>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

                .dash-root { font-family: 'Inter', sans-serif; }

                .stat-card {
                    background: #0e0e1a;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.07);
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                    transition: border-color 0.2s, transform 0.2s;
                }
                .stat-card:hover {
                    border-color: rgba(255,255,255,0.15);
                    transform: translateY(-2px);
                }
                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    border-radius: 16px 16px 0 0;
                }
                .stat-card.blue::before { background: linear-gradient(90deg, #6366f1, #818cf8); }
                .stat-card.violet::before { background: linear-gradient(90deg, #7c3aed, #a78bfa); }
                .stat-card.green::before { background: linear-gradient(90deg, #059669, #34d399); }

                .stat-card.blue { box-shadow: 0 0 40px rgba(99,102,241,0.06); }
                .stat-card.violet { box-shadow: 0 0 40px rgba(124,58,237,0.06); }
                .stat-card.green { box-shadow: 0 0 40px rgba(52,211,153,0.06); }

                .resume-card {
                    background: #0e0e1a;
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.07);
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
                    margin-bottom: 10px;
                }
                .resume-card:last-child { margin-bottom: 0; }
                .resume-card:hover {
                    border-color: rgba(139,92,246,0.35);
                    transform: translateY(-1px);
                    box-shadow: 0 8px 32px rgba(124,58,237,0.1);
                }

                .btn-view {
                    background: linear-gradient(135deg, #7c3aed, #6d28d9);
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 8px 20px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    transition: opacity 0.15s, transform 0.15s;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 2px 12px rgba(124,58,237,0.35);
                }
                .btn-view:hover { opacity: 0.88; transform: translateY(-1px); }

                .btn-delete {
                    background: rgba(248,113,113,0.08);
                    color: #f87171;
                    border: 1px solid rgba(248,113,113,0.2);
                    border-radius: 10px;
                    padding: 8px 20px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s;
                }
                .btn-delete:hover {
                    background: rgba(248,113,113,0.15);
                    border-color: rgba(248,113,113,0.4);
                }

                .empty-state {
                    background: #0e0e1a;
                    border-radius: 20px;
                    border: 2px dashed rgba(255,255,255,0.1);
                    padding: 72px 32px;
                    text-align: center;
                    transition: border-color 0.2s;
                }
                .empty-state:hover { border-color: rgba(139,92,246,0.3); }

                .upload-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 28px;
                    background: linear-gradient(135deg, #7c3aed, #6d28d9);
                    color: #fff;
                    text-decoration: none;
                    padding: 12px 28px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    box-shadow: 0 4px 20px rgba(124,58,237,0.4);
                    transition: opacity 0.15s, transform 0.15s;
                }
                .upload-btn:hover { opacity: 0.88; transform: translateY(-2px); }

                .section-label {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #4b5563;
                    margin-bottom: 12px;
                }
            `}</style>

            <div className="dash-root">
                {/* Header */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                        <div style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: "#a78bfa",
                            boxShadow: "0 0 10px #a78bfa",
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6d28d9" }}>
                            Resume Intelligence
                        </span>
                    </div>
                    <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                        Dashboard
                    </h1>
                    <p style={{ color: "#6b7280", marginTop: 6, fontSize: 15 }}>
                        Track, analyze, and improve your resume performance
                    </p>
                </div>

                {/* Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
                    <div className="stat-card blue">
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px" }}>
                            Total Resumes
                        </p>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1 }}>
                                {totalResumes}
                            </h2>
                        </div>
                        <p style={{ fontSize: 12, color: "#4b5563", marginTop: 8, marginBottom: 0 }}>uploaded</p>
                    </div>

                    <div className="stat-card violet">
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px" }}>
                            Average ATS
                        </p>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#a78bfa", margin: 0, lineHeight: 1 }}>
                                {averageATS}
                            </h2>
                            <span style={{ fontSize: 16, color: "#6d28d9", marginBottom: 4, fontWeight: 600 }}>/100</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#4b5563", marginTop: 8, marginBottom: 0 }}>across all resumes</p>
                    </div>

                    <div className="stat-card green">
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px" }}>
                            Best ATS
                        </p>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#34d399", margin: 0, lineHeight: 1 }}>
                                {bestATS}
                            </h2>
                            <span style={{ fontSize: 16, color: "#059669", marginBottom: 4, fontWeight: 600 }}>/100</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#4b5563", marginTop: 8, marginBottom: 0 }}>personal best</p>
                    </div>
                </div>

                {/* Resume List */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div>
                        <p className="section-label">Your Resumes</p>
                    </div>
                    {resumes.length > 0 && (
                        <Link to="/upload" className="btn-view" style={{ fontSize: 12 }}>
                            <span>＋</span> New Upload
                        </Link>
                    )}
                </div>

                {resumes.length === 0 ? (
                    <div className="empty-state">
                        <div style={{
                            width: 64, height: 64, borderRadius: "50%",
                            background: "rgba(124,58,237,0.12)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 20px",
                            fontSize: 28,
                        }}>
                            📄
                        </div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>
                            No Resumes Yet
                        </h2>
                        <p style={{ color: "#6b7280", fontSize: 14, maxWidth: 320, margin: "0 auto", lineHeight: 1.6 }}>
                            Upload your first resume to get an AI-powered ATS score and detailed feedback.
                        </p>
                        <Link to="/upload" className="upload-btn">
                            <span>↑</span> Upload Resume
                        </Link>
                    </div>
                ) : (
                    <div>
                        {resumes.map((resume) => {
                            const colors = resume.atsScore !== null ? getScoreColor(resume.atsScore) : null;
                            return (
                                <div key={resume.id} className="resume-card">
                                    {/* Score Ring */}
                                    <ScoreRing score={resume.atsScore} />

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: "#e5e7eb" }}>
                                                Resume Analysis
                                            </span>
                                            {colors && (
                                                <span style={{
                                                    fontSize: 11, fontWeight: 600,
                                                    color: colors.text,
                                                    background: colors.bg,
                                                    padding: "2px 10px",
                                                    borderRadius: 20,
                                                    letterSpacing: "0.04em",
                                                }}>
                                                    {colors.label}
                                                </span>
                                            )}
                                        </div>
                                        <p style={{ fontSize: 12, color: "#4b5563", margin: "4px 0 0", fontFamily: "monospace" }}>
                                            ID: {resume.id.slice(0, 8)}…
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                                        <Link to={`/resume/${resume.id}`} className="btn-view">
                                            View →
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(resume.id)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;