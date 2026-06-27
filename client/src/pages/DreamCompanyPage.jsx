import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import {
  ScoreRingCard,
  GaugeCard,
  CategoryBar,
  ScoreDonut,
  buildScoreDistribution,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "../components/DreamCompanyCharts";
import { SectionHeader, Panel, Card, Input, Button, IconLock, IconCheckCircle, IconAlertTriangle } from "../components/ui";

function DreamCompanyPage() {
  const [analysis, setAnalysis] = useState(null);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const handleAnalyze = async () => {
    if (!company.trim() || !role.trim()) {
      setError("Enter a company and role to analyze.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/company-analysis", {
        resumeId: id,
        company,
        role,
      });

      setAnalysis(response.data.analysis);
    } catch (err) {
      console.error(err);
      setError("Couldn't run the analysis. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const result = analysis?.result;
  const distribution = result ? buildScoreDistribution(result.categoryScores) : null;
  const analyzedDate = analysis?.createdAt
    ? new Date(analysis.createdAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <DashboardLayout>
      <div className="flex gap-6 items-start">
        <ResumeWorkspaceSidebar />

        <div className="flex-1 min-w-0">
          <SectionHeader
            eyebrow="Fit analysis"
            title="Dream Company Analyzer"
            description="Analyze your profile fit, strengths, gaps, and roadmap for any company and role."
            size="md"
            className="mb-6"
          />

          {/* Input card */}
          <Panel className="mb-6">
            <p className="text-[13.5px] font-semibold text-ink-primary mb-4">Enter company &amp; role</p>
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <Input
                label="Company name"
                placeholder="Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Input
                label="Target role"
                placeholder="Frontend Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Button onClick={handleAnalyze} loading={loading} className="h-9">
                {loading ? "Analyzing" : "Analyze profile"}
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {error ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[13px] text-error mt-3"
                >
                  {error}
                </motion.p>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 text-[11.5px] text-ink-quaternary mt-3"
                >
                  <IconLock className="w-3 h-3" />
                  Your data is secure and private
                </motion.p>
              )}
            </AnimatePresence>
          </Panel>

          {/* Analysis summary header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span className="text-[13px] font-semibold text-brand-300">Analysis summary</span>
            </div>
            {analyzedDate && (
              <span className="text-[12px] text-ink-quaternary">Analyzed on {analyzedDate}</span>
            )}
          </div>

          {/* Score rings */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <ScoreRingCard
              label="Overall match"
              value={result?.overallScore}
              color="var(--color-brand-400)"
              sublabel={result ? "You have a strong match for this role." : "Overall profile fit"}
              tooltip="How closely your profile matches this role overall"
            />
            <ScoreRingCard
              label="Shortlist chance"
              value={result?.shortlistChance}
              color="var(--color-success)"
              sublabel={result ? "Good probability of getting shortlisted." : "Shortlist chance based on your profile"}
              tooltip="Estimated likelihood of being shortlisted"
            />
            <ScoreRingCard
              label="Profile strength"
              value={result?.profileStrength}
              color="#3b82f6"
              sublabel={result ? "Your profile is strong in key areas." : "Profile strength based on your qualifications"}
              tooltip="Overall strength of your qualifications"
            />
            <GaugeCard
              label="Competition level"
              value={result?.competitionLevel}
              color="var(--color-warning)"
              sublabel={
                result
                  ? `${result.competitionLevel} competition for this role${company ? ` at ${company}` : ""}.`
                  : "Competition level based on market analysis"
              }
              tooltip="How competitive this role is in the current market"
            />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-5">
            <Panel>
              <p className="text-[13.5px] font-semibold text-ink-primary mb-4">Category-wise scores</p>
              {result?.categoryScores ? (
                <div>
                  {Object.entries(result.categoryScores).map(([key, score]) => (
                    <CategoryBar
                      key={key}
                      label={CATEGORY_LABELS[key] || key}
                      score={score}
                      color={CATEGORY_COLORS[key] || "var(--color-brand-400)"}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-ink-quaternary">Bar chart will be shown here after analysis.</p>
              )}
            </Panel>

            <Panel>
              <p className="text-[13.5px] font-semibold text-ink-primary mb-4">Score distribution</p>
              {distribution ? (
                <ScoreDonut segments={distribution} />
              ) : (
                <p className="text-[13px] text-ink-quaternary">Donut chart will be shown here after analysis.</p>
              )}
            </Panel>
          </div>

          {/* Insight cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <Card className="p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <IconCheckCircle className="w-3.5 h-3.5 text-success" />
                <p className="text-[13px] font-semibold text-ink-primary">Top strengths</p>
              </div>
              <div className="flex flex-col gap-1.5">
                {result?.strengths?.map((item, index) => (
                  <p key={index} className="text-[12.5px] text-success leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <IconAlertTriangle className="w-3.5 h-3.5 text-error" />
                <p className="text-[13px] font-semibold text-ink-primary">Skills to improve</p>
              </div>
              <div className="flex flex-col gap-1.5">
                {result?.missingSkills?.map((item, index) => (
                  <p key={index} className="text-[12.5px] text-error leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-[13px] font-semibold text-ink-primary mb-3">Key focus areas</p>
              <div className="flex flex-col gap-1.5">
                {result?.focusAreas?.map((item, index) => (
                  <p key={index} className="text-[12.5px] text-brand-300 leading-relaxed">
                    {index + 1}. {item}
                  </p>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-[13px] font-semibold text-brand-300 mb-3">Recruiter's verdict</p>
              <p className="text-[12.5px] text-ink-secondary leading-relaxed mb-2.5">
                {result ? result.verdict : "Waiting for analysis"}
              </p>
              {result && <p className="text-[12px] font-semibold text-success">Verdict: Good Potential</p>}
            </Card>
          </div>

          {/* Roadmap */}
          <Panel>
            <p className="text-[13.5px] font-semibold text-ink-primary mb-1">30-day action plan</p>

            {result?.roadmap && (
              <div
                className="grid gap-4 mt-5 relative"
                style={{ gridTemplateColumns: `repeat(${result.roadmap.length}, 1fr)` }}
              >
                <div className="absolute top-[15px] left-[6%] right-[6%] h-px bg-border-strong z-0" />
                {result.roadmap.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.08 }}
                    className="relative z-10"
                  >
                    <p className="text-[11px] text-ink-quaternary mb-2">Week {index + 1}</p>
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-400 mb-2.5 ring-4 ring-surface" />
                    <p className="text-[13px] text-ink-secondary leading-relaxed">{step}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DreamCompanyPage;
