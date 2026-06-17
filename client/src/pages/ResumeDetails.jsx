import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ATSScoreCard from "../components/ATSScoreCard";
import AnalysisListCard from "../components/AnalysisListCard";
import Loader from "../components/Loader";
import CareerCoachCTA from "../components/CareerCoachCTA";
function ResumeDetails() {
    const { id } = useParams();
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await api.get(`/resume/${id}`);
                setResume(response.data.resume);
            } catch (error) {
                console.error("Error fetching resume:", error);
            }
        };
        fetchResume();
    }, [id]);

    if (!resume) {
        return <Loader />;
    }

    return (
        <DashboardLayout>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>

            <div style={{ fontFamily: "Inter, sans-serif", maxWidth: 900, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: "#a78bfa", boxShadow: "0 0 10px #a78bfa",
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6d28d9" }}>
                            Analysis Report
                        </span>
                    </div>
                    <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                        Resume Analysis
                    </h1>
                    <p style={{ color: "#6b7280", marginTop: 8, fontSize: 15 }}>
                        Detailed ATS evaluation and recommendations.
                    </p>
                </div>

                {/* ATS Score Card */}
                <ATSScoreCard score={resume.analysis.atsScore} />

                {/* Strengths & Weaknesses */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 16 }}>
                    <AnalysisListCard
                        title="✅ Strengths"
                        items={resume.analysis.strengths}
                    />
                    <AnalysisListCard
                        title="⚠️ Weaknesses"
                        items={resume.analysis.weaknesses}
                    />
                </div>

                {/* Missing Keywords */}
                <div style={{ marginBottom: 16 }}>
                    <AnalysisListCard
                        title="🔍 Missing Keywords"
                        items={resume.analysis.missingKeywords}
                    />
                </div>

                {/* Suggestions */}
                <div style={{ marginBottom: 8 }}>
                    <AnalysisListCard
                        title="💡 Suggestions"
                        items={resume.analysis.suggestions}
                    />
                </div>

                {/* AI Career Coach CTA — natural next step after reading the report */}
                <CareerCoachCTA resume={resume} />

            </div>
        </DashboardLayout>
    );
}

export default ResumeDetails;