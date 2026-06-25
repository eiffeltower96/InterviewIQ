import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../layouts/AuthLayout";
import { Input, Button } from "../components/ui";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.log(error.response?.data);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <AuthLayout
            title="Welcome back"
            description="Sign in to your account to continue."
            footer={
                <p className="text-center text-[13px] text-ink-tertiary">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-brand-300 font-medium hover:text-brand-200">
                        Create one
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="bg-surface-raised border border-border rounded-xl p-6">
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
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    error={error}
                    containerClassName="mb-5"
                />

                <Button type="submit" loading={loading} className="w-full" iconRight={!loading && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}>
                    {loading ? "Signing in" : "Sign in"}
                </Button>
            </form>

            <p className="text-center text-[11.5px] text-ink-quaternary mt-5">
                Secured with end-to-end encryption
            </p>
        </AuthLayout>
    );
}

export default Login;
