import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post("/auth/register", { name, email, password });
            console.log(response.data);
            alert("Registration Successful");
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);
            alert("Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", fontFamily: "Inter, sans-serif", background: "#08080f" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes float-up {
                    0%   { transform: translateY(0px) scale(1);      opacity: 0.06; }
                    50%  { transform: translateY(-28px) scale(1.05); opacity: 0.1;  }
                    100% { transform: translateY(0px) scale(1);      opacity: 0.06; }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }

                .reg-input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 13px 16px;
                    color: #e5e7eb;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                    box-sizing: border-box;
                }
                .reg-input::placeholder { color: #374151; }
                .reg-input:focus {
                    border-color: rgba(124,58,237,0.6);
                    background: rgba(124,58,237,0.05);
                    box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
                }

                .reg-btn {
                    width: 100%;
                    padding: 14px;
                    border-radius: 12px;
                    border: none;
                    background: linear-gradient(135deg, #7c3aed, #6d28d9);
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 24px rgba(124,58,237,0.45);
                    transition: opacity 0.15s, transform 0.15s, box-shadow 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    letter-spacing: 0.01em;
                }
                .reg-btn:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 32px rgba(124,58,237,0.55);
                }
                .reg-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    animation: float-up 6s ease-in-out infinite;
                }
                .form-card { animation: fade-in 0.5s ease-out both; }
            `}</style>

            {/* LEFT PANEL */}
            <div style={{
                width: "50%",
                background: "#0a0a14",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                padding: 48,
            }}
                className="left-panel"
            >
                <style>{`.left-panel { display: none; } @media(min-width: 768px) { .left-panel { display: flex !important; } }`}</style>

                <div className="orb" style={{ width: 320, height: 320, background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)", top: "10%", left: "5%", animationDelay: "0s" }} />
                <div className="orb" style={{ width: 200, height: 200, background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)", bottom: "15%", right: "10%", animationDelay: "2s" }} />
                <div className="orb" style={{ width: 140, height: 140, background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)", top: "55%", left: "30%", animationDelay: "4s" }} />

                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: 14,
                            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 22, boxShadow: "0 0 24px rgba(124,58,237,0.5)",
                        }}>✦</div>
                        <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                            InterviewIQ
                        </span>
                    </div>

                    <h1 style={{ fontSize: 42, fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.03em", maxWidth: 380 }}>
                        Your next job starts here
                    </h1>
                    <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, maxWidth: 340, margin: "0 0 48px" }}>
                        Build stronger resumes with AI-powered ATS analysis and get noticed by the right companies.
                    </p>

                    {[
                        { icon: "◈", text: "Instant ATS scoring" },
                        { icon: "✦", text: "Keyword gap analysis" },
                        { icon: "↑", text: "Actionable suggestions" },
                    ].map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                            <div style={{
                                width: 34, height: 34, borderRadius: 10,
                                background: "rgba(124,58,237,0.12)",
                                border: "1px solid rgba(124,58,237,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#a78bfa", fontSize: 14, flexShrink: 0,
                            }}>{f.icon}</div>
                            <span style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 24px",
                background: "#08080f",
            }}>
                <div className="form-card" style={{ width: "100%", maxWidth: 420 }}>
                    {/* Mobile logo */}
                    <div className="mobile-logo" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
                        <style>{`.mobile-logo { display: flex; } @media(min-width: 768px) { .mobile-logo { display: none !important; } }`}</style>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 16,
                        }}>✦</div>
                        <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>InterviewIQ</span>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                            Create account
                        </h2>
                        <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>
                            Start optimizing your resume today — it's free.
                        </p>
                    </div>

                    <div style={{
                        background: "#0e0e1a",
                        borderRadius: 20,
                        border: "1px solid rgba(255,255,255,0.07)",
                        padding: 28,
                        boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                    }}>
                        <form onSubmit={handleRegister}>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#6b7280", marginBottom: 8 }}>
                                    Full Name
                                </label>
                                <input
                                    className="reg-input"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Smith"
                                />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#6b7280", marginBottom: 8 }}>
                                    Email
                                </label>
                                <input
                                    className="reg-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#6b7280", marginBottom: 8 }}>
                                    Password
                                </label>
                                <input
                                    className="reg-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                />
                            </div>

                            <button type="submit" className="reg-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <div style={{
                                            width: 16, height: 16,
                                            border: "2px solid rgba(255,255,255,0.25)",
                                            borderTopColor: "#fff", borderRadius: "50%",
                                            animation: "spin 0.7s linear infinite",
                                        }} />
                                        Creating account…
                                    </>
                                ) : "Create Account →"}
                            </button>
                        </form>
                    </div>

                    <p style={{ textAlign: "center", fontSize: 13, color: "#4b5563", marginTop: 20 }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#a78bfa", fontWeight: 600, textDecoration: "none" }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;