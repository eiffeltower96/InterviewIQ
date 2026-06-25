import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../layouts/AuthLayout";
import { Input, Button } from "../components/ui";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const response = await api.post("/auth/register", { name, email, password });
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);
            setError("Registration failed. Try a different email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create account"
            description="Start optimizing your resume today — it's free."
            footer={
                <p className="text-center text-[13px] text-ink-tertiary">
                    Already have an account?{" "}
                    <Link to="/login" className="text-brand-300 font-medium hover:text-brand-200">
                        Sign in
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleRegister} className="bg-surface-raised border border-border rounded-xl p-6">
                <Input
                    label="Full name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="name"
                    required
                    containerClassName="mb-4"
                />

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    containerClassName="mb-4"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                    error={error}
                    containerClassName="mb-5"
                />

                <Button type="submit" loading={loading} className="w-full" iconRight={!loading && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}>
                    {loading ? "Creating account" : "Create account"}
                </Button>
            </form>

            <p className="text-center text-[11.5px] text-ink-quaternary mt-5">
                By continuing you agree to our terms and privacy policy.
            </p>
        </AuthLayout>
    );
}

export default Register;
