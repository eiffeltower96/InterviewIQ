import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// ── Minimal motion primitives (no framer-motion dep needed in artifact env) ──
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
    return () => clearTimeout(timer);
  }, [delay]);
  return ref;
}

function useScrollFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Score ring ──
function ScoreRing({ score = 87 }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(score), 400);
    return () => clearTimeout(t);
  }, [score]);
  const dash = (progress / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="drop-shadow-xl">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#1e1b2e" strokeWidth="12" />
      <circle
        cx="70" cy="70" r={r} fill="none"
        stroke="url(#ringGrad)" strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform="rotate(-90 70 70)"
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <text x="70" y="66" textAnchor="middle" fill="white" fontSize="26" fontWeight="700" fontFamily="system-ui">{progress}</text>
      <text x="70" y="84" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="system-ui">ATS Score</text>
    </svg>
  );
}

// ── Keyword pill ──
function Pill({ label, found }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
      found
        ? "bg-violet-500/10 border-violet-500/30 text-violet-300"
        : "bg-red-500/10 border-red-500/20 text-red-400 line-through"
    }`}>
      {found ? "✓" : "✗"} {label}
    </span>
  );
}

// ── Animated hero mockup ──
function HeroMockup() {
  const keywords = [
    { label: "Python", found: true },
    { label: "CI/CD", found: true },
    { label: "Kubernetes", found: false },
    { label: "REST APIs", found: true },
    { label: "Docker", found: false },
    { label: "PostgreSQL", found: true },
  ];
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow behind card */}
      <div className="absolute inset-0 rounded-2xl bg-violet-600/20 blur-3xl scale-105 pointer-events-none" />
      <div className="relative bg-[#0f0c1a] border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-auto text-[10px] text-gray-500 font-mono">resume_analysis.json</span>
        </div>

        {/* Score + match */}
        <div className="flex items-center justify-between mb-5 gap-4">
          <ScoreRing score={87} />
          <div className="flex-1">
            <div className="text-xs text-gray-400 mb-1">Job Match</div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-3">
              <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-2 rounded-full"
                style={{ width: "73%", transition: "width 1.2s ease" }} />
            </div>
            <div className="text-xs text-gray-400 mb-0.5 mt-3">Impact Score</div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full"
                style={{ width: "91%", transition: "width 1.4s ease" }} />
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="text-xs text-gray-400 mb-2">Keyword Detection</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map(k => <Pill key={k.label} {...k} />)}
        </div>

        {/* AI suggestion chip */}
        <div className="flex items-start gap-3 bg-violet-500/10 border border-violet-500/20 rounded-xl p-3">
          <span className="text-violet-400 text-lg mt-0.5">✦</span>
          <p className="text-xs text-gray-300 leading-relaxed">
            Add <span className="text-violet-300 font-medium">Kubernetes</span> and <span className="text-violet-300 font-medium">Docker</span> to your skills section — they appear in 94% of similar postings.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Feature card ──
const features = [
  {
    icon: "◎",
    title: "ATS Score",
    desc: "Instant pass/fail prediction against 50+ applicant tracking systems. Know your odds before you apply.",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    icon: "⌖",
    title: "Job Description Matching",
    desc: "Paste any job posting. InterviewIQ maps your experience to every requirement and surfaces the gaps.",
    accent: "from-indigo-500 to-cyan-500",
  },
  {
    icon: "◈",
    title: "Missing Keyword Detection",
    desc: "Pinpoints every high-value term recruiters search for — ranked by how often they appear across live postings.",
    accent: "from-pink-500 to-violet-500",
  },
  {
    icon: "✦",
    title: "AI Rewrite Suggestions",
    desc: "Bullet-level rewrites that inject impact, metrics, and keywords without changing your voice.",
    accent: "from-violet-500 to-pink-500",
  },
];

function FeatureCard({ icon, title, desc, accent, delay }) {
  const ref = useScrollFadeIn();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className="group relative bg-[#0f0c1a] border border-white/8 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${accent} text-white text-lg mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Stats ──
const stats = [
  {
    value: "ATS",
    label: "Resume Scoring"
  },
  {
    value: "JD",
    label: "Job Matching"
  },
  {
    value: "AI",
    label: "Suggestions"
  }
];

// ── Main ──
export default function Home() {
  const navigate = useNavigate();

useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }

}, []);
  const heroRef = useFadeIn(100);
  const subRef = useFadeIn(250);
  const ctaRef = useFadeIn(380);
  const mockupRef = useFadeIn(200);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#07050f] text-white overflow-x-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── Noise + gradient bg ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-indigo-600/8 rounded-full blur-[100px]" />
      </div>

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Interview<span className="text-violet-400">IQ</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <Link
  to="/register"
  className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
>
  Get Started Free
</Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div ref={heroRef} className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/25 rounded-full px-3 py-1.5 text-xs text-violet-300 font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              AI-powered resume intelligence
            </div>

            <h1 ref={subRef} className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight mb-5">
             Land More Interviews <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                with AI-Powered Resume Analysis
              </span>
            </h1>

            <p ref={ctaRef} className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
             Upload your resume, match it against any job description,
discover missing keywords, and improve your ATS score instantly.
            </p>

            {/* Email CTA */}
           <div className="flex flex-col sm:flex-row gap-3">

  <Link
    to="/register"
    className="
      bg-violet-600
      hover:bg-violet-500
      text-white
      px-6
      py-3
      rounded-lg
      font-medium
      text-center
      transition-all
    "
  >
    Get Started Free
  </Link>

  <Link
    to="/login"
    className="
      border
      border-white/10
      hover:border-violet-500/50
      text-white
      px-6
      py-3
      rounded-lg
      font-medium
      text-center
      transition-all
    "
  >
    Login
  </Link>

</div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 pt-10 border-t border-white/6">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div ref={mockupRef}>
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-violet-400">What InterviewIQ does</span>
          <h2 className="text-3xl font-bold text-white mt-3">Four tools. One edge.</h2>
          <p className="text-gray-400 text-base mt-2 max-w-md mx-auto">
            Everything a hiring manager sees — surfaced before you hit send.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#0f0c1a] border border-white/8 rounded-3xl p-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-3">How it works</p>
          <h2 className="text-2xl font-bold mb-8">Three steps to a stronger resume</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload your resume", body: "Drop a PDF or paste plain text. We parse it instantly." },
              { step: "02", title: "Add the job description", body: "Copy the posting URL or text. InterviewIQ does the diff." },
              { step: "03", title: "Apply with confidence", body: "Get your score, fix the gaps, and resubmit — all from one screen." },
            ].map(({ step, title, body }) => {
              const r = useScrollFadeIn();
              return (
                <div key={step} ref={r} className="flex flex-col gap-2">
                  <span className="text-violet-500 font-mono text-sm font-bold">{step}</span>
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent border border-violet-500/25 rounded-3xl px-8 py-16 text-center">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-violet-600/20 blur-[80px] pointer-events-none" />
          <div className="relative">
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-3">Start today</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop guessing. Start landing<br />interviews.
            </h2>
            <p className="text-gray-400 text-base mb-8 max-w-sm mx-auto">
              Join 24,000+ job seekers who improved their ATS score on the first try.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-all hover:shadow-[0_0_32px_rgba(139,92,246,.45)] text-sm">
                Analyze my resume — free
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors px-4 py-3.5 underline underline-offset-4">
                See a sample report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/6 px-6 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-sm font-semibold">Interview<span className="text-violet-400">IQ</span></span>
        <p className="text-xs text-gray-600">© 2026 InterviewIQ. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}