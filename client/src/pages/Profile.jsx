import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import {
  SectionHeader,
  MetricCard,
  Card,
  IconCalendar,
  IconDocument,
  IconArrowRight,
} from "../components/ui";
import { scoreTone } from "../components/ui/scoreTone";
import Loader from "../components/Loader";

const scoreLabel = (score) => {
  if (!score) return "—";
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs work";
};

function Profile() {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [stats, setStats] = useState({ totalResumes: 0, averageATS: 0, bestATS: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userResponse = await api.get("/auth/me");
        const statsResponse = await api.get("/auth/stats");
        setUser(userResponse.data.user);
        setStats(statsResponse.data.stats);
        const resumeResponse = await api.get("/resume/history");
        setResumes(resumeResponse.data.resumes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <DashboardLayout>
        <Loader message="Loading profile…" />
      </DashboardLayout>
    );
  }

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "??";

  return (
    <DashboardLayout>
      <div className="max-w-[780px] mx-auto">
        <SectionHeader eyebrow="Account" title="Profile" className="mb-8" />

        {/* User card */}
        <Card className="flex items-center gap-7 p-7 mb-4 flex-wrap">
          <div className="w-[72px] h-[72px] rounded-full bg-brand-500 flex items-center justify-center text-2xl font-semibold text-white tracking-tight shrink-0">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-ink-primary tracking-tight mb-1">{user.name}</h2>
            <p className="text-[13.5px] text-ink-tertiary mb-2.5">{user.email}</p>
            <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-border-strong rounded-full px-3 py-1">
              <IconCalendar className="w-3 h-3 text-ink-quaternary" />
              <span className="text-[12px] text-ink-tertiary font-medium">
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <MetricCard label="Total resumes" value={stats.totalResumes} caption="uploaded" />
          <MetricCard
            label="Average ATS"
            value={stats.averageATS}
            unit="/100"
            tone="brand"
            caption="across all resumes"
          />
          <MetricCard label="Best ATS" value={stats.bestATS} unit="/100" tone="success" caption="personal best" />
        </div>

        {/* Resume history */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-medium text-ink-tertiary uppercase tracking-wide">Resume history</p>
          <span className="text-[12px] text-ink-quaternary font-medium">
            {resumes.length} {resumes.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <Card className="overflow-hidden">
          {resumes.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[13.5px] text-ink-quaternary">No resume history yet.</p>
              <Link
                to="/upload"
                className="inline-block mt-3 text-[13px] font-semibold text-brand-300 hover:text-brand-200"
              >
                Upload your first resume →
              </Link>
            </div>
          ) : (
            resumes.map((resume, index) => {
              const score = resume.analysis?.atsScore;
              const tone = score ? scoreTone(score) : "neutral";
              return (
                <div
                  key={resume.id}
                  className={`flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors ${
                    index !== resumes.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-300 shrink-0 [&>svg]:w-4 [&>svg]:h-4">
                      <IconDocument />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-ink-primary truncate">Resume analysis</p>
                      <p className="text-[12px] text-ink-quaternary mt-0.5">
                        {new Date(resume.uploadedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span
                        className="text-[17px] font-semibold"
                        style={{ color: tone === "neutral" ? "var(--color-ink-quaternary)" : `var(--color-${tone})` }}
                      >
                        {score ?? "—"}
                      </span>
                      <p className="text-[11px] text-ink-quaternary font-semibold tracking-wide mt-0.5">
                        {scoreLabel(score)}
                      </p>
                    </div>
                    <Link
                      to={`/resume/${resume.id}`}
                      className="inline-flex items-center gap-1.5 bg-brand-500/10 border border-brand-500/25 text-brand-300 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-brand-500/15 transition-colors"
                    >
                      View
                      <IconArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
