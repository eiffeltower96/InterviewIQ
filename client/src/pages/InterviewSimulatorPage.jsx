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
const [report,setReport] = useState(null);
const [currentQuestion, setCurrentQuestion] = useState(0);

const [answer, setAnswer] = useState("");
    const [company, setCompany] =
        useState("");

    const [role, setRole] =
        useState("");
    
    const [answers,
setAnswers] =
useState([]);

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

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

        };
    const handleSubmitInterview =
async (finalAnswers) => {

    try {

        const response =
            await api.post(
                "/interview/submit",
                {
                    sessionId,
                    answers: finalAnswers
                }
            );

        setReport(
            response.data.report
        );

    } catch(error) {

        console.error(error);

    }

};

const handleNextQuestion = () => {

    const updatedAnswers = [

        ...answers,

        {
            question:
                questions[currentQuestion],

            answer
        }

    ];

    setAnswers(updatedAnswers);

    if (
        currentQuestion <
        questions.length - 1
    ) {

        setCurrentQuestion(
            prev => prev + 1
        );

        setAnswer("");

    } else {

        handleSubmitInterview(
            updatedAnswers
        );

    }

};
const handleGenerateReport =
async () => {

    try {

        const response =
        await api.get(
            `/interview/report/${sessionId}`
        );
console.log(response.data);
        setReport(
            response.data.report
        );

    } catch(error){

        console.error(error);

    }

};
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

        <button
    onClick={
        handleNextQuestion
    }
    disabled={
        !answer.trim()
    }
    style={{
        marginTop: 16
    }}
>
    {
        currentQuestion <
        questions.length - 1

            ? "Next Question"

            : "Submit Interview"
    }
</button>

        
{
    report && (

        <div
            style={{
                marginTop: 32,
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 16,
                padding: 24
            }}
        >

            <h2
                style={{
                    color: "white",
                    marginBottom: 24
                }}
            >
                Interview Report
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(200px,1fr))",
                    gap: 16
                }}
            >

                <div
                    style={{
                        background: "#0f172a",
                        padding: 20,
                        borderRadius: 12
                    }}
                >
                    <h3
                        style={{
                            color: "#22c55e"
                        }}
                    >
                        Overall Score
                    </h3>

                    <h1
                        style={{
                            color: "white"
                        }}
                    >
                        {report.overallScore}
                    </h1>
                </div>

                <div
                    style={{
                        background: "#0f172a",
                        padding: 20,
                        borderRadius: 12
                    }}
                >
                    <h3
                        style={{
                            color: "#60a5fa"
                        }}
                    >
                        Technical
                    </h3>

                    <h1
                        style={{
                            color: "white"
                        }}
                    >
                        {report.technicalScore}
                    </h1>
                </div>

                <div
                    style={{
                        background: "#0f172a",
                        padding: 20,
                        borderRadius: 12
                    }}
                >
                    <h3
                        style={{
                            color: "#f59e0b"
                        }}
                    >
                        Communication
                    </h3>

                    <h1
                        style={{
                            color: "white"
                        }}
                    >
                        {report.communicationScore}
                    </h1>
                </div>

            </div>
<div
    style={{
        marginTop: 24
    }}
>

    <h3
        style={{
            color: "white",
            marginBottom: 16
        }}
    >
        Question Breakdown
    </h3>

    {
        report?.questionEvaluations?.map(
            (item) => (

                <div
                    key={item.questionNumber}
                    style={{
                        background: "#0f172a",
                        padding: 16,
                        borderRadius: 12,
                        marginBottom: 12
                    }}
                >

                    <h4>
                        Question {item.questionNumber}
                    </h4>

                    <p>
                        Score: {item.score}/10
                    </p>

                    <p>
                        {item.feedback}
                    </p>

                </div>

            )
        )
    }

</div>
            <div
                style={{
                    marginTop: 24
                }}
            >

                
                <h3
                    style={{
                        color: "#22c55e"
                    }}
                >
                    Strongest Area
                </h3>

                <p
                    style={{
                        color: "#d1d5db"
                    }}
                >
                    {report.strongestArea}
                </p>

                <h3
                    style={{
                        color: "#ef4444",
                        marginTop: 16
                    }}
                >
                    Weakest Area
                </h3>

                <p
                    style={{
                        color: "#d1d5db"
                    }}
                >
                    {report.weakestArea}
                </p>

            </div>

            <div
                style={{
                    marginTop: 24
                }}
            >

                <h3
                    style={{
                        color: "white"
                    }}
                >
                    Recommended Topics
                </h3>

                {
                    report?.recommendedTopics?.map(
                        (
                            topic,
                            index
                        ) => (

                            <p
                                key={index}
                                style={{
                                    color:
                                        "#86efac"
                                }}
                            >
                                ✓ {topic}
                            </p>

                        )
                    )
                }

            </div>

            <div
                style={{
                    marginTop: 24
                }}
            >

                <h3
                    style={{
                        color: "white"
                    }}
                >
                    AI Summary
                </h3>

                <p
                    style={{
                        color: "#d1d5db",
                        lineHeight: 1.7
                    }}
                >
                    {report.summary}
                </p>

            </div>

        </div>

    )
}
      </div>

    </div>

  )
}

                </div>

            </div>

        </DashboardLayout>
    );


export default InterviewSimulatorPage;