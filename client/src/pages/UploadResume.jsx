import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

function UploadResume() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [dragOver, setDragOver] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a PDF resume");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("resume", file);
            formData.append("jobDescription", jobDescription);
            setLoadingText("Uploading Resume...");
            const uploadResponse = await api.post("/resume/upload", formData);
            const resumeId = uploadResponse.data.resumeId;
            setLoadingText("Generating ATS Analysis...");
            await api.post("/analysis/ats", { resumeId });
            navigate(`/resume/${resumeId}`);
        } catch (error) {
            console.error(error);
            alert("Upload Failed");
        } finally {
            setLoading(false);
            setLoadingText("");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped && dropped.type === "application/pdf") {
            setFile(dropped);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const steps = [
        { icon: "↑", label: "Upload PDF" },
        { icon: "◈", label: "AI Parsing" },
        { icon: "✦", label: "ATS Score" },
    ];

    return (
        <DashboardLayout>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

                .upload-root { font-family: 'Inter', sans-serif; }

                .upload-card {
                    background: #0e0e1a;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.07);
                    padding: 36px;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.4);
                }

                .drop-zone {
                    border: 2px dashed rgba(124,58,237,0.35);
                    border-radius: 16px;
                    padding: 48px 24px;
                    text-align: center;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s;
                    position: relative;
                    background: rgba(124,58,237,0.03);
                }
                .drop-zone:hover, .drop-zone.active {
                    border-color: rgba(124,58,237,0.7);
                    background: rgba(124,58,237,0.07);
                }
                .drop-zone input[type="file"] {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                }

                .file-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 20px;
                    background: rgba(124,58,237,0.12);
                    border: 1px solid rgba(124,58,237,0.3);
                    border-radius: 40px;
                    padding: 8px 18px;
                    color: #a78bfa;
                    font-size: 13px;
                    font-weight: 600;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .file-pill .remove-btn {
                    background: rgba(248,113,113,0.12);
                    border: none;
                    color: #f87171;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 11px;
                    flex-shrink: 0;
                    transition: background 0.15s;
                }
                .file-pill .remove-btn:hover { background: rgba(248,113,113,0.25); }

                .jd-textarea {
                    width: 100%;
                    height: 148px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                    padding: 16px;
                    color: #e5e7eb;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    resize: none;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s;
                    box-sizing: border-box;
                }
                .jd-textarea::placeholder { color: #374151; }
                .jd-textarea:focus {
                    border-color: rgba(124,58,237,0.5);
                    background: rgba(124,58,237,0.04);
                }

                .analyze-btn {
                    width: 100%;
                    padding: 15px;
                    border-radius: 14px;
                    border: none;
                    background: linear-gradient(135deg, #7c3aed, #6d28d9);
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 24px rgba(124,58,237,0.4);
                    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    letter-spacing: 0.01em;
                }
                .analyze-btn:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 32px rgba(124,58,237,0.5);
                }
                .analyze-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .step-row {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    margin-bottom: 36px;
                }
                .step-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    flex: 1;
                    position: relative;
                }
                .step-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(124,58,237,0.12);
                    border: 1px solid rgba(124,58,237,0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #a78bfa;
                    font-size: 16px;
                    position: relative;
                    z-index: 1;
                }
                .step-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: #4b5563;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                }
                .step-connector {
                    flex: 1;
                    height: 1px;
                    background: rgba(124,58,237,0.2);
                    margin-top: -22px;
                }

                .spinner {
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255,255,255,0.25);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                .section-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.06);
                    margin: 28px 0;
                }
            `}</style>

            <div className="upload-root" style={{ maxWidth: 640, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: "#a78bfa", boxShadow: "0 0 10px #a78bfa",
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6d28d9" }}>
                            New Analysis
                        </span>
                    </div>
                    <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                        Upload Resume
                    </h1>
                    <p style={{ color: "#6b7280", marginTop: 8, fontSize: 15, lineHeight: 1.6 }}>
                        Get an instant AI-powered ATS score and targeted improvement tips.
                    </p>
                </div>

                <div className="upload-card">
                    {/* Steps */}
                    <div className="step-row">
                        {steps.map((step, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                                <div className="step-item">
                                    <div className="step-icon">{step.icon}</div>
                                    <span className="step-label">{step.label}</span>
                                </div>
                                {i < steps.length - 1 && <div className="step-connector" />}
                            </div>
                        ))}
                    </div>

                    {/* Drop Zone */}
                    <div
                        className={`drop-zone${dragOver ? " active" : ""}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <div style={{
                            width: 56, height: 56, borderRadius: "50%",
                            background: "rgba(124,58,237,0.12)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 16px",
                            fontSize: 24,
                            pointerEvents: "none",
                        }}>
                            📄
                        </div>
                        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#e5e7eb", margin: "0 0 8px", pointerEvents: "none" }}>
                            Drop your PDF here
                        </h2>
                        <p style={{ color: "#4b5563", fontSize: 13, margin: 0, pointerEvents: "none" }}>
                            or <span style={{ color: "#a78bfa", fontWeight: 600 }}>click to browse</span> — PDF only
                        </p>
                    </div>

                    {file && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className="file-pill">
                                <span>📎</span>
                                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</span>
                                <button
                                    className="remove-btn"
                                    onClick={() => setFile(null)}
                                >✕</button>
                            </div>
                        </div>
                    )}

                    <div className="section-divider" />

                    {/* Job Description */}
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                Job Description
                            </label>
                            <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>Optional — boosts match accuracy</span>
                        </div>
                        <textarea
                            className="jd-textarea"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here to get a tailored ATS score…"
                        />
                    </div>

                    {/* CTA */}
                    <button
                        className="analyze-btn"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner" />
                                {loadingText}
                            </>
                        ) : (
                            <>
                                <span style={{ fontSize: 16 }}>✦</span>
                                Analyze Resume
                            </>
                        )}
                    </button>

                    <p style={{ textAlign: "center", fontSize: 12, color: "#374151", marginTop: 14, marginBottom: 0 }}>
                        Your data is processed securely and never shared.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UploadResume;