import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import InterviewReport from "../components/InterviewReport";
import { SectionHeader, Panel, Input, Select, Textarea, Button } from "../components/ui";

function InterviewSimulatorPage() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [report, setReport] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [answers, setAnswers] = useState([]);
  const [interviewType, setInterviewType] = useState("Mixed");
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    try {
      setLoading(true);
      const response = await api.post("/interview/start", {
        resumeId: id,
        company,
        role,
        interviewType,
      });

      setQuestions(response.data.session.questions);
      setSessionId(response.data.session.id);
      setCurrentQuestion(0);
      setAnswer("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInterview = async (finalAnswers) => {
    try {
      const response = await api.post("/interview/submit", {
        sessionId,
        answers: finalAnswers,
      });
      setReport(response.data.report);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...answers, { question: questions[currentQuestion], answer }];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
    } else {
      handleSubmitInterview(updatedAnswers);
    }
  };

  // Unused in the current flow (report is set directly by
  // handleSubmitInterview) — kept available as before this redesign in
  // case a "regenerate report" action is wired up later.
  // eslint-disable-next-line no-unused-vars
  const handleGenerateReport = async () => {
    try {
      const response = await api.get(`/interview/report/${sessionId}`);
      setReport(response.data.report);
    } catch (error) {
      console.error(error);
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <DashboardLayout>
      <div className="flex gap-6 items-start">
        <ResumeWorkspaceSidebar />

        <div className="flex-1 min-w-0">
          <SectionHeader
            eyebrow="Practice mode"
            title="Interview Simulator"
            description="Practice company-specific interviews powered by AI."
            size="md"
            className="mb-6"
          />

          {/* Configure interview — always visible until report exists */}
          {!report && (
            <Panel className="mb-5">
              <p className="text-[13.5px] font-semibold text-ink-primary mb-4">Configure interview</p>
              <div className="grid sm:grid-cols-[1fr_1fr_160px_auto] gap-3 items-end">
                <Input
                  label="Company"
                  placeholder="Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <Input
                  label="Role"
                  placeholder="Frontend Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <Select
                  label="Type"
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                >
                  <option>Mixed</option>
                  <option>Technical</option>
                  <option>HR</option>
                  <option>Behavioral</option>
                </Select>
                <Button onClick={handleStartInterview} loading={loading} className="h-9">
                  {loading ? "Generating" : "Start interview"}
                </Button>
              </div>
            </Panel>
          )}

          <AnimatePresence mode="wait">
            {report ? (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <InterviewReport report={report} />
              </motion.div>
            ) : (
              questions.length > 0 && (
                <motion.div
                  key={`question-${currentQuestion}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Panel>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary">
                        Question {currentQuestion + 1} of {questions.length}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 rounded-full bg-border-strong overflow-hidden mb-5">
                      <motion.div
                        className="h-full bg-brand-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <p className="text-[16px] text-ink-primary leading-relaxed mb-5">
                      {questions[currentQuestion]}
                    </p>

                    <Textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Write your answer here..."
                      rows={7}
                    />

                    <Button onClick={handleNextQuestion} disabled={!answer.trim()} className="mt-4">
                      {isLastQuestion ? "Submit interview" : "Next question"}
                    </Button>
                  </Panel>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewSimulatorPage;
