import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
function DreamCompanyPage() {
const [analysis, setAnalysis] =
    useState(null);
    const [company, setCompany] =
        useState("");

    const [role, setRole] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const cardStyle = {
        background: "#111827",
        border: "1px solid #1f2937",
        borderRadius: 16,
        padding: 20,
        minHeight: 180,
        color: "#fff"
    };
    const { id } = useParams();
    const handleAnalyze =
async () => {

    try {

        setLoading(true);

        const response =
            await api.post(
                "/company-analysis",
                {
                    resumeId: id,
                    company,
                    role
                }
            );

        setAnalysis(
            response.data.analysis
        );

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

};
    return (
        <DashboardLayout>

            <div
                style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start"
                }}
            >

                <ResumeWorkspaceSidebar />

                <div
                    style={{
                        flex: 1
                    }}
                >

                    {/* Header */}

                    <div
                        style={{
                            marginBottom: 32
                        }}
                    >

                        <h1
                            style={{
                                fontSize: 36,
                                fontWeight: 800,
                                color: "#fff",
                                marginBottom: 8
                            }}
                        >
                            Dream Company Analyzer
                        </h1>

                        <p
                            style={{
                                color: "#9ca3af",
                                fontSize: 15
                            }}
                        >
                            Analyze your profile fit, strengths, gaps and roadmap for any company and role.
                        </p>

                    </div>

                    {/* Input Card */}

                    <div
                        style={{
                            background: "#111827",
                            border: "1px solid #1f2937",
                            borderRadius: 16,
                            padding: 24,
                            marginBottom: 24
                        }}
                    >

                        <h3
                            style={{
                                color: "#a855f7",
                                marginBottom: 20
                            }}
                        >
                            Enter Company & Role
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr auto",
                                gap: 16
                            }}
                        >

                            <input
                                type="text"
                                placeholder="Google"
                                value={company}
                                onChange={(e) =>
                                    setCompany(
                                        e.target.value
                                    )
                                }
                                style={{
                                    padding: 14,
                                    borderRadius: 12,
                                    border: "1px solid #374151",
                                    background: "#0f172a",
                                    color: "#fff",
                                    outline: "none"
                                }}
                            />

                            <input
                                type="text"
                                placeholder="Frontend Engineer"
                                value={role}
                                onChange={(e) =>
                                    setRole(
                                        e.target.value
                                    )
                                }
                                style={{
                                    padding: 14,
                                    borderRadius: 12,
                                    border: "1px solid #374151",
                                    background: "#0f172a",
                                    color: "#fff",
                                    outline: "none"
                                }}
                            />

                            <button
                                onClick={handleAnalyze}
                                style={{
                                    padding:
                                        "0 24px",
                                    border: "none",
                                    borderRadius: 12,
                                    background:
                                        "#7c3aed",
                                    color: "#fff",
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}
                            >
                                {
                                    loading
                                        ? "Analyzing..."
                                        : "Analyze"
                                }
                            </button>

                        </div>

                    </div>

                    {/* Analysis Summary */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",
                            gap: 16,
                            marginBottom: 24
                        }}
                    >

                        <div style={cardStyle}>
                            <h3>
                                Overall Match Score
                            </h3>

                            <div
                                style={{
                                    marginTop: 20,
                                    fontSize: 42,
                                    fontWeight: 800,
                                    color: "#a855f7"
                                }}
                            >
                                --
                            </div>

                            <p
                                style={{
                                    color: "#9ca3af"
                                }}
                            >
                                Waiting for analysis
                            </p>
                        </div>

                        <div style={cardStyle}>
                            <h3>
                                Shortlist Chance
                            </h3>

                            <div
                                style={{
                                    marginTop: 20,
                                    fontSize: 42,
                                    fontWeight: 800,
                                    color: "#22c55e"
                                }}
                            >
                                --
                            </div>

                            <p
                                style={{
                                    color: "#9ca3af"
                                }}
                            >
                                Waiting for analysis
                            </p>
                        </div>

                        <div style={cardStyle}>
                            <h3>
                                Profile Strength
                            </h3>

                            <div
                                style={{
                                    marginTop: 20,
                                    fontSize: 42,
                                    fontWeight: 800,
                                    color: "#3b82f6"
                                }}
                            >
                                --
                            </div>

                            <p
                                style={{
                                    color: "#9ca3af"
                                }}
                            >
                                Waiting for analysis
                            </p>
                        </div>

                        <div style={cardStyle}>
                            <h3>
                                Competition Level
                            </h3>

                            <div
                                style={{
                                    marginTop: 20,
                                    fontSize: 42,
                                    fontWeight: 800,
                                    color: "#f59e0b"
                                }}
                            >
                                --
                            </div>

                            <p
                                style={{
                                    color: "#9ca3af"
                                }}
                            >
                                Waiting for analysis
                            </p>
                        </div>

                    </div>

                    {/* Charts Section Placeholder */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "2fr 1fr",
                            gap: 16,
                            marginBottom: 24
                        }}
                    >

                        <div style={cardStyle}>
                            <h3>
                                Category Wise Scores
                            </h3>

                            <p
                                style={{
                                    color: "#9ca3af",
                                    marginTop: 12
                                }}
                            >
                                Bar chart will be shown here after analysis.
                            </p>
                        </div>

                        <div style={cardStyle}>
                            <h3>
                                Score Distribution
                            </h3>

                            <p
                                style={{
                                    color: "#9ca3af",
                                    marginTop: 12
                                }}
                            >
                                Donut chart will be shown here after analysis.
                            </p>
                        </div>

                    </div>

                    {/* Insight Cards */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",
                            gap: 16,
                            marginBottom: 24
                        }}
                    >

                        <div style={cardStyle}>
                            <h3>
                                Top Strengths
                            </h3>
                        </div>

                        <div style={cardStyle}>
                            <h3>
                                Skills To Improve
                            </h3>
                        </div>

                        <div style={cardStyle}>
                            <h3>
                                Key Focus Areas
                            </h3>
                        </div>

                        <div style={cardStyle}>
                            <h3>
                                Recruiter's Verdict
                            </h3>
                        </div>

                    </div>

                    {/* Roadmap */}

                    <div style={cardStyle}>

                        <h3>
                            30-Day Action Plan
                        </h3>

                        <p
                            style={{
                                color: "#9ca3af",
                                marginTop: 12
                            }}
                        >
                            Personalized roadmap will appear here after analysis.
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default DreamCompanyPage;