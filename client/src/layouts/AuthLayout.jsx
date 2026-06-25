import { motion } from "framer-motion";
import { IconCheckCircle, IconSearch, IconLightbulb } from "../components/ui/icons";

const highlights = [
  { icon: IconCheckCircle, text: "Instant ATS scoring" },
  { icon: IconSearch, text: "Keyword gap analysis" },
  { icon: IconLightbulb, text: "Actionable rewrite suggestions" },
];

/**
 * AuthLayout
 * Shared shell for Login and Register. Left panel shows a static mock of
 * the actual product output (the analysis report) instead of decorative
 * gradient orbs — same idea Linear/Vercel use on their auth screens: show
 * the thing, don't decorate around it.
 */
function AuthLayout({ title, description, children, footer }) {
  return (
    <div className="min-h-screen flex bg-canvas">
      {/* LEFT — product preview, desktop only */}
      <div className="hidden lg:flex w-1/2 border-r border-border relative items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center text-white text-[13px] font-bold">
              IQ
            </div>
            <span className="text-[15px] font-semibold text-ink-primary tracking-tight">
              InterviewIQ
            </span>
          </div>

          <h1 className="text-[30px] font-semibold text-ink-primary leading-[1.15] tracking-tight mb-3 max-w-[19rem]">
            Land your dream job with AI
          </h1>
          <p className="text-[14.5px] text-ink-tertiary leading-relaxed max-w-[20rem] mb-10">
            Resume analysis, ATS scoring, and interview practice — built for
            people who'd rather ship than guess.
          </p>

          {/* Static mock report card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-surface border border-border rounded-xl p-4 mb-8"
          >
            <div className="flex items-center gap-2 mb-3.5 pb-3.5 border-b border-border">
              <span className="w-2 h-2 rounded-full bg-error-border" />
              <span className="w-2 h-2 rounded-full bg-warning-border" />
              <span className="w-2 h-2 rounded-full bg-success-border" />
              <span className="ml-auto text-[10.5px] text-ink-quaternary font-mono">
                ats_report.json
              </span>
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] text-ink-tertiary">ATS Score</span>
              <span className="text-[12px] font-semibold text-success">87 / 100</span>
            </div>
            <div className="h-1.5 rounded-full bg-border-strong overflow-hidden mb-3">
              <div className="h-full w-[87%] rounded-full bg-success" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "REST APIs", "PostgreSQL"].map((kw) => (
                <span
                  key={kw}
                  className="text-[10.5px] px-2 py-0.5 rounded-full bg-success-bg text-success border border-success-border"
                >
                  {kw}
                </span>
              ))}
              <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-error-bg text-error border border-error-border line-through">
                Docker
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-border-strong flex items-center justify-center text-brand-300 shrink-0 [&>svg]:w-3 [&>svg]:h-3">
                  <Icon />
                </div>
                <span className="text-[13px] text-ink-secondary">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[380px]"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center text-white text-[13px] font-bold">
              IQ
            </div>
            <span className="text-[15px] font-semibold text-ink-primary tracking-tight">
              InterviewIQ
            </span>
          </div>

          <div className="mb-7">
            <h2 className="text-[22px] font-semibold text-ink-primary tracking-tight mb-1.5">
              {title}
            </h2>
            <p className="text-[13.5px] text-ink-tertiary">{description}</p>
          </div>

          {children}

          {footer && <div className="mt-6">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;
