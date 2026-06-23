import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import { useState } from "react";
import api from "../services/api";
import {
    useParams
} from "react-router-dom";
function InterviewSimulatorPage() {
  const { id } = useParams();
const [questions,
setQuestions] =
        useState([]);
    const [sessionId, setSessionId] = useState(null);

const [currentQuestion, setCurrentQuestion] = useState(0);

const [answer, setAnswer] = useState("");

const [evaluation, setEvaluation] = useState(null);

const [evaluating, setEvaluating] = useState(false);
    const [company, setCompany] =
        useState("");

    const [role, setRole] =
        useState("");

    const [interviewType, setInterviewType] =
        useState("Mixed");

    const [loading, setLoading] =
        useState(false);
const handleStartInterview =
async () => {

    try {

        setLoading(true);

        const response =
            await api.post(
                "/interview/start",
                {
                    resumeId: id,
                    company,
                    role,
                    interviewType
                }
            );

        setQuestions(
    response.data.session.questions
);

setSessionId(
    response.data.session.id
);

setCurrentQuestion(0);
setAnswer("");
setEvaluation(null);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

        };
    const handleEvaluate =
async () => {

    try {

        setEvaluating(true);

        const response =
            await api.post(
                "/interview/evaluate",
                {
                    sessionId,
                    questionIndex:
                        currentQuestion,

                    question:
                        questions[currentQuestion],

                    answer,

                    company,
                    role
                }
            );

        setEvaluation(
            response.data.evaluation
        );

    } catch (error) {

        console.error(error);

    } finally {

        setEvaluating(false);

    }

};
    return (
        <DashboardLayout>

            <div
                style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start"
                }}
            >

                <ResumeWorkspaceSidebar />

                <div style={{ flex: 1 }}>

                    <div
                        style={{
                            marginBottom: 32
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 36,
                                fontWeight: 800,
                                color: "#fff"
                            }}
                        >
                            Interview Simulator
                        </h1>

                        <p
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Practice company-specific interviews powered by AI.
                        </p>
                    </div>

                    <div
                        style={{
                            background: "#111827",
                            border: "1px solid #1f2937",
                            borderRadius: 16,
                            padding: 24
                        }}
                    >

                        <h3
                            style={{
                                color: "#a855f7",
                                marginBottom: 20
                            }}
                        >
                            Configure Interview
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "1fr 1fr 1fr auto",
                                gap: 16
                            }}
                        >

                            <input
                                type="text"
                                placeholder="Google"
                                value={company}
                                onChange={(e) =>
                                    setCompany(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="text"
                                placeholder="Frontend Engineer"
                                value={role}
                                onChange={(e) =>
                                    setRole(
                                        e.target.value
                                    )
                                }
                            />

                            <select
                                value={interviewType}
                                onChange={(e) =>
                                    setInterviewType(
                                        e.target.value
                                    )
                                }
                            >
                                <option>
                                    Mixed
                                </option>

                                <option>
                                    Technical
                                </option>

                                <option>
                                    HR
                                </option>

                                <option>
                                    Behavioral
                                </option>
                            </select>

                            <button
    onClick={
        handleStartInterview
    }
>
                                {
                                    loading
                                        ? "Generating..."
                                        : "Start Interview"
                                }
                            </button>

                        </div>

            </div>
            {
  questions.length > 0 && (

    <div
      style={{
        marginTop: 24
      }}
    >

      <div
        style={{
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: 16,
          padding: 24
        }}
      >

        <h2
          style={{
            color: "white"
          }}
        >
          Question {currentQuestion + 1} of {questions.length}
        </h2>

        <p
          style={{
            color: "#e5e7eb",
            fontSize: 18,
            marginTop: 12
          }}
        >
          {questions[currentQuestion]}
        </p>

        <textarea
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          placeholder="Write your answer here..."
          style={{
            width: "100%",
            minHeight: 160,
            marginTop: 20,
            padding: 12,
            borderRadius: 10,
            background: "#0f172a",
            color: "white",
            border: "1px solid #374151"
          }}
        />

        {!evaluation && (
          <button
            onClick={handleEvaluate}
            disabled={
              evaluating ||
              !answer.trim()
            }
            style={{
              marginTop: 16
            }}
          >
            {
              evaluating
                ? "Evaluating..."
                : "Evaluate Answer"
            }
          </button>
        )}

        {evaluation && (

          <div
            style={{
              marginTop: 24,
              padding: 20,
              borderRadius: 12,
              background: "#0f172a"
            }}
          >

            <h3
              style={{
                color: "#22c55e"
              }}
            >
              Score: {evaluation.score}/10
            </h3>

            <h4
              style={{
                color: "white"
              }}
            >
              Strengths
            </h4>

            {evaluation.strengths.map(
              (item, index) => (
                <p
                  key={index}
                  style={{
                    color: "#86efac"
                  }}
                >
                  ✓ {item}
                </p>
              )
            )}

            <h4
              style={{
                color: "white",
                marginTop: 16
              }}
            >
              Improvements
            </h4>

            {evaluation.improvements.map(
              (item, index) => (
                <p
                  key={index}
                  style={{
                    color: "#fca5a5"
                  }}
                >
                  ✗ {item}
                </p>
              )
            )}

            <p
              style={{
                color: "#d1d5db",
                marginTop: 16
              }}
            >
              {evaluation.overallFeedback}
            </p>

            {currentQuestion <
              questions.length - 1 && (

              <button
                onClick={() => {

                  setCurrentQuestion(
                    prev => prev + 1
                  );

                  setAnswer("");

                  setEvaluation(
                    null
                  );

                }}
                style={{
                  marginTop: 20
                }}
              >
                Next Question
              </button>

            )}

          </div>

        )}

      </div>

    </div>

  )
}

                </div>

            </div>

        </DashboardLayout>
    );
}

export default InterviewSimulatorPage;