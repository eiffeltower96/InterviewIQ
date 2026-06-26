import { motion } from "framer-motion";

/**
 * CoachEmptyState
 * Same dynamic-prompt logic as before: every starter prompt is generated
 * from the resume's own analysis fields (atsScore, weaknesses[0],
 * missingKeywords[0], strengths[0]) with the same fallback copy when a
 * field is missing. onSelectPrompt contract unchanged.
 */
function CoachEmptyState({ resume, onSelectPrompt }) {
  const score = resume?.analysis?.atsScore;
  const weakness = resume?.analysis?.weaknesses?.[0];
  const missingKeyword = resume?.analysis?.missingKeywords?.[0];
  const strength = resume?.analysis?.strengths?.[0];

  const prompts = [
    {
      label: "Explain my score",
      prompt:
        score !== undefined
          ? `Why is my ATS score ${score}, and what would move it up fastest?`
          : "What does my ATS score mean and how can I improve it?",
    },
    {
      label: "Fix my biggest weakness",
      prompt: weakness
        ? `How do I fix this weakness: "${weakness}"?`
        : "What's the single biggest weakness in my resume?",
    },
    {
      label: "Add missing keywords",
      prompt: missingKeyword
        ? `How do I naturally add "${missingKeyword}" to my resume without keyword-stuffing?`
        : "How do I add missing keywords without sounding stuffed?",
    },
    {
      label: "Find my best-fit role",
      prompt: strength
        ? `Given my strength in "${strength}", which roles should I target?`
        : "Based on this resume, which roles suit me most?",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center mb-5"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="var(--color-brand-400)" />
        </svg>
      </motion.div>

      <h2 className="text-2xl font-semibold text-ink-primary tracking-tight">
        {resume ? "Let's talk about your resume" : "Your AI Career Coach"}
      </h2>
      <p className="text-[14.5px] text-ink-tertiary mt-2 max-w-[420px] leading-relaxed">
        {score !== undefined
          ? `I've read your analysis — score of ${score} with ${
              resume?.analysis?.missingKeywords?.length || 0
            } keyword gaps. Ask me anything, or start here:`
          : "Ask me anything about your resume, your fit for a role, or how to improve your score."}
      </p>

      <div className="grid sm:grid-cols-2 gap-2.5 mt-7 w-full max-w-[640px]">
        {prompts.map((p, i) => (
          <motion.button
            key={p.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            whileHover={{ y: -1 }}
            onClick={() => onSelectPrompt(p.prompt)}
            className="text-left p-4 rounded-xl border border-border bg-white/[0.015] hover:border-brand-500/30 hover:bg-brand-500/[0.04] transition-colors duration-150"
          >
            <div className="text-[13px] font-semibold text-ink-primary mb-1">{p.label}</div>
            <div className="text-[12.5px] text-ink-tertiary leading-relaxed line-clamp-2">
              {p.prompt}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default CoachEmptyState;
