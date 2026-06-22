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

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

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

            <h2
                style={{
                    color: "white",
                    marginBottom: 20
                }}
            >
                Interview Questions
            </h2>

            {
                questions.map(
                    (question, index) => (

                        <div
                            key={index}
                            style={{
                                background:
                                    "#111827",
                                border:
                                    "1px solid #1f2937",
                                borderRadius:
                                    12,
                                padding:
                                    20,
                                marginBottom:
                                    12,
                                color:
                                    "white"
                            }}
                        >
                            <strong>
                                Question {index + 1}
                            </strong>

                            <p>
                                {question}
                            </p>

                        </div>

                    )
                )
            }

        </div>

    )
}

                </div>

            </div>

        </DashboardLayout>
    );
}

export default InterviewSimulatorPage;