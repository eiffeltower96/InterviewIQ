import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import { SectionHeader, Panel, Button, IconSparkle, IconCheckCircle } from "../components/ui";
import Loader from "../components/Loader";

// Same four static section labels as before — buttons are intentionally
// inert (no onClick in the original), kept visual-only here too.
const SECTIONS = ["Projects", "Skills", "Experience", "Education"];

// Same static suggestion copy as before — not derived from
// resume.analysis, just generic guidance shown in every studio session.
const SUGGESTIONS = [
  "Add measurable impact wherever possible",
  "Use stronger action verbs",
  "Add role-specific keywords",
  "Quantify project achievements",
  "Highlight technical depth",
];

function ResumeStudioPage() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rewrittenResume, setRewrittenResume] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // "saved" | "error" | null

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resume/${id}/studio`);
        setResume(response.data.resume);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  const handleRewrite = async () => {
    try {
      setIsRewriting(true);
      const response = await api.post(`/resume/${id}/rewrite`);
      setRewrittenResume(response.data.rewritten);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRewriting(false);
    }
  };

  const handleSaveRewrite = async () => {
    try {
      await api.put(`/resume/${id}/save-rewrite`, { rewrittenText: rewrittenResume });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/resume/${id}/download`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex gap-6 items-start">
        <ResumeWorkspaceSidebar />

        <div className="flex-1 min-w-0">
          <SectionHeader
            eyebrow="Editor"
            title="Resume Studio"
            description="Improve, optimize and prepare your resume for interviews."
            size="md"
            className="mb-6"
          />

          {loading ? (
            <Loader message="Loading resume…" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-5">
              {/* LEFT — Sections */}
              <Panel className="lg:sticky lg:top-6 h-fit">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary mb-3.5">
                  Sections
                </p>
                <div className="flex flex-col gap-1">
                  {SECTIONS.map((section) => (
                    <button
                      key={section}
                      className="text-left px-3 py-2 rounded-md text-[13px] font-medium text-ink-secondary hover:bg-white/[0.04] hover:text-ink-primary transition-colors"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </Panel>

              {/* CENTER — Resume content */}
              <Panel>
                <p className="text-[13.5px] font-semibold text-ink-primary mb-4">Resume content</p>
                <textarea
                  value={resume?.extractedText || ""}
                  readOnly
                  className="w-full min-h-[640px] bg-surface-raised text-ink-secondary text-[13.5px] leading-relaxed border border-border-strong rounded-lg p-4 font-mono resize-none outline-none"
                />
              </Panel>

              {/* RIGHT — AI assistant */}
              <Panel>
                <div className="flex items-center gap-2 mb-3.5">
                  <IconSparkle className="w-3.5 h-3.5 text-brand-300" />
                  <p className="text-[13.5px] font-semibold text-ink-primary">AI suggestions</p>
                </div>

                <div className="flex flex-col gap-2.5 mb-5">
                  {SUGGESTIONS.map((s) => (
                    <div key={s} className="flex items-start gap-2">
                      <IconCheckCircle className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                      <span className="text-[12.5px] text-ink-secondary leading-relaxed">{s}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={handleRewrite} loading={isRewriting} icon={!isRewriting && <IconSparkle />}>
                    {isRewriting ? "Rewriting" : "AI rewrite resume"}
                  </Button>
                  <Button onClick={handleDownload} variant="secondary">
                    Download resume
                  </Button>
                  <Button onClick={handleSaveRewrite} variant="ghost" disabled={!rewrittenResume}>
                    Save rewrite
                  </Button>
                </div>

                <AnimatePresence>
                  {saveStatus && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-[12px] font-medium mt-2.5 text-center ${
                        saveStatus === "saved" ? "text-success" : "text-error"
                      }`}
                    >
                      {saveStatus === "saved" ? "Resume updated successfully" : "Couldn't save — try again"}
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {rewrittenResume && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                      className="mt-5 pt-5 border-t border-border"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <IconCheckCircle className="w-3.5 h-3.5 text-success" />
                        <p className="text-[13px] font-semibold text-ink-primary">Improved resume</p>
                      </div>
                      <textarea
                        value={rewrittenResume}
                        readOnly
                        className="w-full min-h-[280px] bg-surface-raised text-ink-secondary text-[12.5px] leading-relaxed border border-border-strong rounded-lg p-3.5 font-mono resize-none outline-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Panel>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResumeStudioPage;
