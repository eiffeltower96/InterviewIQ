import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { SectionHeader, Panel, Textarea, Button, IconUpload, IconSparkle, IconLock, IconX, IconPaperclip } from "../components/ui";

const STEPS = [
  { icon: <IconUpload />, label: "Upload PDF" },
  { icon: <IconSparkle />, label: "AI parsing" },
  { icon: <IconSparkle />, label: "ATS score" },
];

function UploadResume() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      setLoadingText("Uploading resume…");
      const uploadResponse = await api.post("/resume/upload", formData);
      const resumeId = uploadResponse.data.resumeId;
      setLoadingText("Generating ATS analysis…");
      await api.post("/analysis/ats", { resumeId });
      navigate(`/resume/${resumeId}`);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
      setError("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <DashboardLayout>
      <div className="max-w-[640px] mx-auto">
        <SectionHeader eyebrow="New analysis" title="Upload Resume" description="Get an instant AI-powered ATS score and targeted improvement tips." className="mb-7" />

        <Panel className="p-7">
          {/* Steps */}
          <div className="flex items-center mb-8">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-full bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-300 [&>svg]:w-4 [&>svg]:h-4">
                    {step.icon}
                  </div>
                  <span className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-quaternary">
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className="flex-1 h-px bg-border-strong -mt-5" />}
              </div>
            ))}
          </div>

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative rounded-xl border-2 border-dashed px-6 py-12 text-center cursor-pointer transition-colors duration-150 ${
              dragOver ? "border-brand-500/70 bg-brand-500/[0.06]" : "border-brand-500/30 bg-brand-500/[0.02] hover:border-brand-500/50"
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setError("");
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-14 h-14 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4 pointer-events-none text-brand-300 [&>svg]:w-6 [&>svg]:h-6">
              <IconUpload />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-primary mb-1.5 pointer-events-none">
              Drop your PDF here
            </h2>
            <p className="text-[13px] text-ink-quaternary pointer-events-none">
              or <span className="text-brand-300 font-semibold">click to browse</span> — PDF only
            </p>
          </div>

          {file && (
            <div className="flex justify-center mt-4">
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2.5 bg-brand-500/10 border border-brand-500/25 rounded-full px-3.5 py-1.5 max-w-full"
              >
                <IconPaperclip className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                <span className="text-[13px] font-medium text-brand-300 truncate">{file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  className="w-5 h-5 rounded-full bg-error-bg text-error flex items-center justify-center shrink-0 hover:bg-error-border transition-colors"
                  aria-label="Remove file"
                >
                  <IconX className="w-2.5 h-2.5" />
                </button>
              </motion.div>
            </div>
          )}

          {error && (
            <p className="text-[13px] text-error text-center mt-3">{error}</p>
          )}

          <div className="h-px bg-border my-6" />

          {/* Job description */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary">
                Job description
              </label>
              <span className="text-[11px] text-ink-quaternary">Optional — boosts match accuracy</span>
            </div>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to get a tailored ATS score…"
              rows={6}
            />
          </div>

          <Button onClick={handleUpload} loading={loading} className="w-full" size="lg" icon={!loading && <IconSparkle />}>
            {loading ? loadingText : "Analyze resume"}
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-[11.5px] text-ink-quaternary mt-3.5">
            <IconLock className="w-3 h-3" />
            Your data is processed securely and never shared
          </p>
        </Panel>
      </div>
    </DashboardLayout>
  );
}

export default UploadResume;
