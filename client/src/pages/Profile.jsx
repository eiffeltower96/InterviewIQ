import React from 'react'
import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [stats, setStats] = useState({
        totalResumes: 0,
        averageATS: 0,
        bestATS: 0,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userResponse = await api.get("/auth/me");
                const statsResponse = await api.get("/auth/stats");
                setUser(userResponse.data.user);
                setStats(statsResponse.data.stats);
                const resumeResponse = await api.get("/resume/history");
                setResumes(resumeResponse.data.resumes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfile();
    }, []);

    if (!user) {
        return (
            <DashboardLayout>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#6b7280", fontFamily: "Inter, sans-serif", padding: "40px 0" }}>
                    <div style={{
                        width: 18, height: 18, border: "2px solid rgba(124,58,237,0.3)",
                        borderTopColor: "#a78bfa", borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                    }} />
                    Loading profile…
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </DashboardLayout>
        );
    }

    const getScoreColor = (score) => {
        if (!score) return { text: "#6b7280", label: "—" };
        if (score >= 80) return { text: "#34d399", label: "Excellent" };
        if (score >= 60) return { text: "#fbbf24", label: "Good" };
        return { text: "#f87171", label: "Needs Work" };
    };

    const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : "??";

    return (
        <DashboardLayout>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                .profile-root { font-family: 'Inter', sans-serif; }

                .profile-card {
                    background: #0e0e1a;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.07);
                    padding: 32px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    box-shadow: 0 16px 48px rgba(0,0,0,0.35);
                }

                .stat-card {
                    background: #0e0e1a;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.07);
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                    transition: border-color 0.2s, transform 0.2s;
                    flex: 1;
                }
                .stat-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    border-radius: 16px 16px 0 0;
                }
                .stat-card.blue::before  { background: linear-gradient(90deg, #6366f1, #818cf8); }
                .stat-card.violet::before { background: linear-gradient(90deg, #7c3aed, #a78bfa); }
                .stat-card.green::before  { background: linear-gradient(90deg, #059669, #34d399); }

                .history-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    transition: background 0.15s;
                }
                .history-row:last-child { border-bottom: none; }
                .history-row:hover { background: rgba(255,255,255,0.02); }

                .view-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(124,58,237,0.12);
                    border: 1px solid rgba(124,58,237,0.25);
                    color: #a78bfa;
                    padding: 6px 16px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: background 0.15s, border-color 0.15s;
                }
                .view-link:hover {
                    background: rgba(124,58,237,0.22);
                    border-color: rgba(124,58,237,0.45);
                }

                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className="profile-root" style={{ maxWidth: 780, margin: "0 auto" }}>
                {/* Page Header */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: "#a78bfa", boxShadow: "0 0 10px #a78bfa",
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6d28d9" }}>
                            Account
                        </span>
                    </div>
                    <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                        Profile
                    </h1>
                </div>

                {/* User Card */}
                <div className="profile-card">
                    {/* Avatar */}
                    <div style={{
                        width: 72, height: 72, borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 26, fontWeight: 800, color: "#fff",
                        boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                        letterSpacing: "-0.02em",
                    }}>
                        {initials}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                            {user.name}
                        </h2>
                        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 10px" }}>
                            {user.email}
                        </p>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 20, padding: "4px 12px",
                        }}>
                            <span style={{ fontSize: 11, color: "#4b5563" }}>📅</span>
                            <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
                                Member since {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
                    <div className="stat-card blue">
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px" }}>
                            Total Resumes
                        </p>
                        <h2 style={{ fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1 }}>
                            {stats.totalResumes}
                        </h2>
                        <p style={{ fontSize: 12, color: "#374151", marginTop: 8, marginBottom: 0 }}>uploaded</p>
                    </div>

                    <div className="stat-card violet">
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px" }}>
                            Average ATS
                        </p>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                            <h2 style={{ fontSize: 40, fontWeight: 800, color: "#a78bfa", margin: 0, lineHeight: 1 }}>
                                {stats.averageATS}
                            </h2>
                            <span style={{ fontSize: 15, color: "#6d28d9", marginBottom: 3, fontWeight: 600 }}>/100</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#374151", marginTop: 8, marginBottom: 0 }}>across all resumes</p>
                    </div>

                    <div className="stat-card green">
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px" }}>
                            Best ATS
                        </p>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                            <h2 style={{ fontSize: 40, fontWeight: 800, color: "#34d399", margin: 0, lineHeight: 1 }}>
                                {stats.bestATS}
                            </h2>
                            <span style={{ fontSize: 15, color: "#059669", marginBottom: 3, fontWeight: 600 }}>/100</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#374151", marginTop: 8, marginBottom: 0 }}>personal best</p>
                    </div>
                </div>

                {/* Resume History */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4b5563", margin: 0 }}>
                            Resume History
                        </p>
                        <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>
                            {resumes.length} {resumes.length === 1 ? "entry" : "entries"}
                        </span>
                    </div>

                    <div style={{
                        background: "#0e0e1a",
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.07)",
                        overflow: "hidden",
                    }}>
                        {resumes.length === 0 ? (
                            <div style={{ padding: "48px 24px", textAlign: "center" }}>
                                <p style={{ color: "#374151", fontSize: 14 }}>No resume history yet.</p>
                                <Link to="/upload" style={{
                                    display: "inline-block", marginTop: 12,
                                    color: "#a78bfa", fontSize: 13, fontWeight: 600,
                                    textDecoration: "none",
                                }}>
                                    Upload your first resume →
                                </Link>
                            </div>
                        ) : (
                            resumes.map((resume) => {
                                const score = resume.analysis?.atsScore;
                                const { text: scoreColor, label: scoreLabel } = getScoreColor(score);
                                return (
                                    <div key={resume.id} className="history-row">
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{
                                                width: 38, height: 38, borderRadius: 10,
                                                background: "rgba(124,58,237,0.1)",
                                                border: "1px solid rgba(124,58,237,0.2)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 16, flexShrink: 0,
                                            }}>
                                                📄
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb", margin: 0 }}>
                                                    Resume Analysis
                                                </p>
                                                <p style={{ fontSize: 12, color: "#4b5563", margin: "3px 0 0" }}>
                                                    {new Date(resume.uploadedAt).toLocaleDateString("en-US", {
                                                        month: "short", day: "numeric", year: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                            <div style={{ textAlign: "right" }}>
                                                <span style={{ fontSize: 18, fontWeight: 800, color: scoreColor }}>
                                                    {score ?? "—"}
                                                </span>
                                                <p style={{ fontSize: 11, color: "#4b5563", margin: "2px 0 0", fontWeight: 600, letterSpacing: "0.04em" }}>
                                                    {scoreLabel}
                                                </p>
                                            </div>
                                            <Link to={`/resume/${resume.id}`} className="view-link">
                                                View →
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;