import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconCheckCircle,
  IconSearch,
  IconLightbulb,
  IconSparkle,
} from "../components/ui/icons";
import { Button } from "../components/ui";

const features = [
  {
    icon: IconCheckCircle,
    title: "ATS Score",
    desc: "Instant pass/fail prediction against applicant tracking systems. Know your odds before you apply.",
  },
  {
    icon: IconSearch,
    title: "Job Description Matching",
    desc: "Paste any posting. InterviewIQ maps your experience to every requirement and surfaces the gaps.",
  },
  {
    icon: IconLightbulb,
    title: "Missing Keyword Detection",
    desc: "Pinpoints high-value terms recruiters search for, ranked by how often they appear across postings.",
  },
  {
    icon: IconSparkle,
    title: "AI Rewrite Suggestions",
    desc: "Bullet-level rewrites that inject impact and keywords without changing your voice.",
  },
];

const steps = [
  { step: "01", title: "Upload your resume", body: "Drop a PDF. InterviewIQ parses it instantly." },
  { step: "02", title: "Add the job description", body: "Paste the posting text and let it run the diff." },
  { step: "03", title: "Apply with confidence", body: "Get your score, fix the gaps, and resubmit — all in one place." },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

/**
 * ReportMock
 * Reuses the same "fake JSON report" visual device introduced in
 * AuthLayout, scaled up for the hero. Consistent product visualization
 * across marketing + auth surfaces instead of two different metaphors.
 */
function ReportMock() {
  const keywords = [
    { label: "Python", found: true },
    { label: "CI/CD", found: true },
    { label: "Kubernetes", found: false },
    { label: "REST APIs", found: true },
    { label: "Docker", found: false },
    { label: "PostgreSQL", found: true },
  ];

  return (
    <div className="bg-surface border border-border rounded-xl p-5 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-error-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-warning-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-success-border" />
        <span className="ml-auto text-[11px] text-ink-quaternary font-mono">
          resume_analysis.json
        </span>
      </div>

      <div className="flex items-center gap-5 mb-5">
        <div className="relative w-20 h-20 shrink-0">
          <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-border-strong)" strokeWidth="7" />
            <motion.circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="7"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 214" }}
              whileInView={{ strokeDasharray: "186 214" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-success">87</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[11px] text-ink-tertiary mb-1">Job match</div>
          <div className="h-1.5 rounded-full bg-border-strong overflow-hidden mb-3">
            <div className="h-full w-[73%] rounded-full bg-brand-400" />
          </div>
          <div className="text-[11px] text-ink-tertiary mb-1">Impact score</div>
          <div className="h-1.5 rounded-full bg-border-strong overflow-hidden">
            <div className="h-full w-[91%] rounded-full bg-success" />
          </div>
        </div>
      </div>

      <div className="text-[11px] text-ink-tertiary mb-2">Keyword detection</div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {keywords.map((k) => (
          <span
            key={k.label}
            className={`text-[11px] px-2 py-0.5 rounded-full border ${
              k.found
                ? "bg-success-bg text-success border-success-border"
                : "bg-error-bg text-error border-error-border line-through"
            }`}
          >
            {k.label}
          </span>
        ))}
      </div>

      <div className="flex items-start gap-2.5 bg-brand-500/[0.06] border border-brand-500/20 rounded-lg p-3">
        <IconSparkle className="text-brand-300 w-4 h-4 mt-0.5 shrink-0" />
        <p className="text-[12px] text-ink-secondary leading-relaxed">
          Add <span className="text-brand-300 font-medium">Kubernetes</span> and{" "}
          <span className="text-brand-300 font-medium">Docker</span> to your skills section —
          they appear in 94% of similar postings.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-canvas text-ink-primary">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center text-white text-[13px] font-bold">
            IQ
          </div>
          <span className="text-[15px] font-semibold tracking-tight">InterviewIQ</span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-[13.5px] text-ink-tertiary">
          <a href="#features" className="hover:text-ink-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-ink-primary transition-colors">How it works</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-[13.5px] text-ink-tertiary hover:text-ink-primary transition-colors">
            Sign in
          </Link>
          <Button to="/register" size="sm">
            Get started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/25 rounded-full px-3 py-1.5 text-[12px] text-brand-300 font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              AI-powered resume intelligence
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-5">
              Land more interviews with AI-powered resume analysis
            </h1>

            <p className="text-ink-tertiary text-[16px] leading-relaxed mb-8 max-w-md">
              Upload your resume, match it against any job description, discover missing
              keywords, and improve your ATS score instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button to="/register" size="lg">
                Get started free
              </Button>
              <Button to="/login" variant="secondary" size="lg">
                Sign in
              </Button>
            </div>

            <div className="flex gap-8 pt-8 border-t border-border">
              {[
                { value: "ATS", label: "Resume scoring" },
                { value: "JD", label: "Job matching" },
                { value: "AI", label: "Suggestions" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-lg font-semibold">{s.value}</div>
                  <div className="text-[12px] text-ink-quaternary mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex justify-center"
          >
            <ReportMock />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-brand-300">
            What InterviewIQ does
          </span>
          <h2 className="text-3xl font-semibold mt-3 tracking-tight">Four tools. One edge.</h2>
          <p className="text-ink-tertiary text-[15px] mt-2 max-w-md mx-auto">
            Everything a hiring manager sees — surfaced before you hit send.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-300 mb-4 [&>svg]:w-[18px] [&>svg]:h-[18px]">
                <f.icon />
              </div>
              <h3 className="font-semibold text-[14.5px] mb-1.5">{f.title}</h3>
              <p className="text-ink-tertiary text-[13px] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 py-16">
        <motion.div {...fadeUp} className="bg-surface border border-border rounded-xl p-10">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-brand-300 mb-3">
            How it works
          </p>
          <h2 className="text-2xl font-semibold mb-8 tracking-tight">
            Three steps to a stronger resume
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ step, title, body }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <span className="text-brand-400 font-mono text-[13px] font-medium">{step}</span>
                <h3 className="font-semibold text-[14.5px]">{title}</h3>
                <p className="text-ink-tertiary text-[13px] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          {...fadeUp}
          className="relative bg-surface border border-border rounded-xl px-8 py-16 text-center overflow-hidden"
        >
          <div className="relative">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-brand-300 mb-3">
              Start today
            </p>
            <h2 className="text-3xl font-semibold mb-4 tracking-tight">
              Stop guessing. Start landing interviews.
            </h2>
            <p className="text-ink-tertiary text-[15px] mb-8 max-w-sm mx-auto">
              Join thousands of job seekers who improved their ATS score on the first try.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button to="/register" size="lg">
                Analyze my resume — free
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[13.5px] font-semibold">InterviewIQ</span>
        <p className="text-[12px] text-ink-quaternary">© 2026 InterviewIQ. All rights reserved.</p>
        <div className="flex gap-5 text-[12px] text-ink-tertiary">
          <a href="#" className="hover:text-ink-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-ink-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-ink-primary transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
