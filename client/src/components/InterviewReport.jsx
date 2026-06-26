import { useState } from "react";
import { motion } from "framer-motion";
import { Card, Panel, MetricCard, Badge, ScoreRing } from "./ui";
import { scoreTone } from "./ui/scoreTone";
import { IconCheckCircle, IconAlertTriangle, IconLightbulb } from "./ui/icons";

/**
 * QuestionRow
 * Expandable per-question breakdown row. Score badge collapsed by
 * default; click to expand the full feedback text. Same questionNumber /
 * score / feedback fields as the original report shape.
 */
function QuestionRow({ item, index }) {
  const [open, setOpen] = useState(false);
  const tone = scoreTone(item.score * 10); // score is /10, scoreTone expects /100

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="border border-border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[13px] font-semibold text-ink-tertiary font-mono shrink-0">
            Q{item.questionNumber}
          </span>
          <Badge tone={tone}>{item.score}/10</Badge>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className={`text-ink-quaternary shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="px-4 pb-3.5 pt-0.5 border-t border-border"
        >
          <p className="text-[13px] text-ink-secondary leading-relaxed pt-3">{item.feedback}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * InterviewReport
 * Same report shape as before: overallScore, technicalScore,
 * communicationScore, questionEvaluations[] ({questionNumber, score,
 * feedback}), strongestArea, weakestArea, recommendedTopics[], summary.
 * No data transformation — just structured presentation.
 */
function InterviewReport({ report }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Executive summary */}
      <Panel className="flex items-center gap-7 flex-wrap">
        <ScoreRing score={report.overallScore} size={104} strokeWidth={7} suffix="/100" />
        <div className="flex-1 min-w-[200px]">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-tertiary mb-1.5">
            Interview Report
          </p>
          <h2 className="text-xl font-semibold text-ink-primary tracking-tight mb-2">
            Overall performance
          </h2>
          <p className="text-[13px] text-ink-tertiary leading-relaxed max-w-md">{report.summary}</p>
        </div>
      </Panel>

      {/* KPI cards */}
      <div className="grid sm:grid-cols-3 gap-3">
        <MetricCard label="Overall score" value={report.overallScore} unit="/100" tone={scoreTone(report.overallScore)} />
        <MetricCard label="Technical" value={report.technicalScore} unit="/100" tone={scoreTone(report.technicalScore)} />
        <MetricCard label="Communication" value={report.communicationScore} unit="/100" tone={scoreTone(report.communicationScore)} />
      </div>

      {/* Strongest / weakest */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Card className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-success-bg border border-success-border flex items-center justify-center text-success shrink-0 [&>svg]:w-4 [&>svg]:h-4">
            <IconCheckCircle />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary mb-1">
              Strongest area
            </p>
            <p className="text-[13.5px] text-ink-primary leading-relaxed">{report.strongestArea}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-error-bg border border-error-border flex items-center justify-center text-error shrink-0 [&>svg]:w-4 [&>svg]:h-4">
            <IconAlertTriangle />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary mb-1">
              Weakest area
            </p>
            <p className="text-[13.5px] text-ink-primary leading-relaxed">{report.weakestArea}</p>
          </div>
        </Card>
      </div>

      {/* Question breakdown */}
      {report.questionEvaluations?.length > 0 && (
        <Panel>
          <p className="text-[13.5px] font-semibold text-ink-primary mb-3">Question breakdown</p>
          <div className="flex flex-col gap-2">
            {report.questionEvaluations.map((item, i) => (
              <QuestionRow key={item.questionNumber} item={item} index={i} />
            ))}
          </div>
        </Panel>
      )}

      {/* Recommended topics */}
      {report.recommendedTopics?.length > 0 && (
        <Panel>
          <div className="flex items-center gap-2 mb-3">
            <IconLightbulb className="w-4 h-4 text-brand-300" />
            <p className="text-[13.5px] font-semibold text-ink-primary">Recommended topics</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {report.recommendedTopics.map((topic, i) => (
              <Badge key={i} tone="brand">
                {topic}
              </Badge>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

export default InterviewReport;
