import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  SectionHeader,
  MetricCard,
  Card,
  Badge,
  Button,
  Modal,
  EmptyState,
  ScoreRing,
  scoreTone,
  IconDocument,
  IconUpload,
  IconTrash,
  IconArrowRight,
} from "../components/ui";

const scoreLabel = (score) => {
  if (score === null || score === undefined) return null;
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs work";
};

const badgeTone = (score) => {
  const tone = scoreTone(score);
  return tone === "neutral" ? "neutral" : tone;
};

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const totalResumes = resumes.length;

  const analyzedResumes = resumes.filter((resume) => resume.atsScore !== null);

  const averageATS =
    analyzedResumes.length > 0
      ? Math.round(
          analyzedResumes.reduce((sum, resume) => sum + resume.atsScore, 0) /
            analyzedResumes.length
        )
      : 0;

  const bestATS =
    analyzedResumes.length > 0
      ? Math.max(...analyzedResumes.map((resume) => resume.atsScore))
      : 0;

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get("/resume");
        setResumes(response.data.resumes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/resume/${id}`);
      setResumes(resumes.filter((resume) => resume.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <SectionHeader
        eyebrow="Resume intelligence"
        title="Dashboard"
        description="Track, analyze, and improve your resume performance."
        action={
          resumes.length > 0 && (
            <Button to="/upload" icon={<IconUpload />}>
              New upload
            </Button>
          )
        }
      />

      {/* Stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 mb-10">
        <MetricCard label="Total resumes" value={totalResumes} caption="uploaded" />
        <MetricCard
          label="Average ATS"
          value={averageATS}
          unit="/100"
          tone="brand"
          caption="across all resumes"
        />
        <MetricCard
          label="Best ATS"
          value={bestATS}
          unit="/100"
          tone="success"
          caption="personal best"
        />
      </div>

      {/* Resume list */}
      <p className="text-[11px] font-medium text-ink-tertiary uppercase tracking-wide mb-3">
        Your resumes
      </p>

      {resumes.length === 0 ? (
        <Card>
          <EmptyState
            icon={<IconDocument />}
            title="No resumes yet"
            description="Upload your first resume to get an AI-powered ATS score and detailed feedback."
            action={
              <Button to="/upload" icon={<IconUpload />}>
                Upload resume
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {resumes.map((resume) => {
              const label = scoreLabel(resume.atsScore);
              return (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    interactive
                    className="flex items-center gap-5 px-5 py-4"
                  >
                    <ScoreRing score={resume.atsScore} size={56} strokeWidth={4} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[14.5px] font-semibold text-ink-primary">
                          Resume analysis
                        </span>
                        {label && <Badge tone={badgeTone(resume.atsScore)}>{label}</Badge>}
                      </div>
                      <p className="text-[12px] text-ink-quaternary font-mono mt-1">
                        {resume.id.slice(0, 8)}…
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button to={`/resume/${resume.id}`} variant="secondary" size="sm" iconRight={<IconArrowRight />}>
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPendingDeleteId(resume.id)}
                        icon={<IconTrash />}
                        aria-label="Delete resume"
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <Modal
        open={!!pendingDeleteId}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={() => handleDelete(pendingDeleteId)}
        title="Delete this resume?"
        description="This will permanently remove the resume and its analysis. This can't be undone."
        confirmLabel="Delete"
      />
    </DashboardLayout>
  );
}

export default Dashboard;
