import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ATSScoreCard from "../components/ATSScoreCard";
import AnalysisListCard from "../components/AnalysisListCard";
import Loader from "../components/Loader";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import { SectionHeader, IconCheckCircle, IconAlertTriangle, IconSearch, IconLightbulb } from "../components/ui";

function ResumeDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resume/${id}`);
        setResume(response.data.resume);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, [id]);

  if (!resume) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex gap-6 items-start">
        <ResumeWorkspaceSidebar />

        <div className="flex-1 max-w-[900px] min-w-0">
          <SectionHeader
            eyebrow="Analysis report"
            title="Resume Analysis"
            description="Detailed ATS evaluation and recommendations."
            size="md"
            className="mb-6"
          />

          <ATSScoreCard score={resume.analysis.atsScore} />

          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <AnalysisListCard
              icon={<IconCheckCircle />}
              title="Strengths"
              tone="success"
              items={resume.analysis.strengths}
            />
            <AnalysisListCard
              icon={<IconAlertTriangle />}
              title="Weaknesses"
              tone="warning"
              items={resume.analysis.weaknesses}
            />
          </div>

          <div className="mb-3">
            <AnalysisListCard
              icon={<IconSearch />}
              title="Missing Keywords"
              tone="brand"
              items={resume.analysis.missingKeywords}
            />
          </div>

          <AnalysisListCard
            icon={<IconLightbulb />}
            title="Suggestions"
            tone="brand"
            items={resume.analysis.suggestions}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResumeDetails;
