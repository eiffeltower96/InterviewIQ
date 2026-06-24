import React, {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
import api from "../services/api";

const ResumeStudioPage = () => {

    const { id } = useParams();

    const [resume, setResume] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [rewrittenResume,
setRewrittenResume] =
useState("");
    useEffect(() => {

        const fetchResume =
            async () => {

                try {

                    const response =
                        await api.get(
                            `/resume/${id}/studio`
                        );

                    setResume(
                        response.data.resume
                    );

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }

            };

        fetchResume();

    }, [id]);
const handleRewrite =
async () => {

    try {

        const response =
        await api.post(
            `/resume/${id}/rewrite`
        );

        setRewrittenResume(
            response.data.rewritten
        );

    } catch(error){

        console.error(error);

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

                <div
                    style={{
                        flex: 1
                    }}
                >

                    <div
                        style={{
                            marginBottom: 24
                        }}
                    >
                        <h1
                            style={{
                                color: "white",
                                fontSize: 36,
                                fontWeight: 800
                            }}
                        >
                            Resume Studio
                        </h1>

                        <p
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Improve, optimize and prepare your resume for interviews.
                        </p>
                    </div>

                    {
                        loading
                            ? (
                                <p
                                    style={{
                                        color: "white"
                                    }}
                                >
                                    Loading...
                                </p>
                            )
                            : (

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "250px 1fr 320px",
                                        gap: 24
                                    }}
                                >

                                    {/* LEFT PANEL */}

                                    <div
                                        style={{
                                            background:
                                                "#111827",
                                            border:
                                                "1px solid #1f2937",
                                            borderRadius:
                                                16,
                                            padding:
                                                20
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color:
                                                    "#a855f7"
                                            }}
                                        >
                                            Sections
                                        </h3>

                                        <div
                                            style={{
                                                marginTop:
                                                    20,
                                                display:
                                                    "flex",
                                                flexDirection:
                                                    "column",
                                                gap: 12
                                            }}
                                        >

                                            <button>
                                                Projects
                                            </button>

                                            <button>
                                                Skills
                                            </button>

                                            <button>
                                                Experience
                                            </button>

                                            <button>
                                                Education
                                            </button>

                                        </div>

                                    </div>

                                    {/* CENTER PANEL */}

                                    <div
                                        style={{
                                            background:
                                                "#111827",
                                            border:
                                                "1px solid #1f2937",
                                            borderRadius:
                                                16,
                                            padding:
                                                24
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color:
                                                    "#60a5fa",
                                                marginBottom:
                                                    20
                                            }}
                                        >
                                            Resume Content
                                        </h3>

                                        <textarea
                                            value={
                                                resume?.extractedText ||
                                                ""
                                            }
                                            readOnly
                                            style={{
                                                width:
                                                    "100%",
                                                minHeight:
                                                    "700px",
                                                background:
                                                    "#0f172a",
                                                color:
                                                    "white",
                                                border:
                                                    "1px solid #374151",
                                                borderRadius:
                                                    12,
                                                padding:
                                                    16
                                            }}
                                        />

                                    </div>

                                    {/* RIGHT PANEL */}

                                    <div
                                        style={{
                                            background:
                                                "#111827",
                                            border:
                                                "1px solid #1f2937",
                                            borderRadius:
                                                16,
                                            padding:
                                                20
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color:
                                                    "#22c55e"
                                            }}
                                        >
                                            AI Suggestions
                                        </h3>

                                        <div
                                            style={{
                                                marginTop:
                                                    20,
                                                display:
                                                    "flex",
                                                flexDirection:
                                                    "column",
                                                gap: 14
                                            }}
                                        >

                                            <div>
                                                ✓ Add measurable impact wherever possible
                                            </div>

                                            <div>
                                                ✓ Use stronger action verbs
                                            </div>

                                            <div>
                                                ✓ Add role-specific keywords
                                            </div>

                                            <div>
                                                ✓ Quantify project achievements
                                            </div>

                                            <div>
                                                ✓ Highlight technical depth
                                            </div>

                                        </div>

                                        <button
    onClick={
        handleRewrite
    }
    style={{
        width:
            "100%",
        marginTop:
            24,
        padding:
            12,
        borderRadius:
            10
    }}
>
    AI Rewrite Resume
</button>

                                        <button
                                            style={{
                                                width:
                                                    "100%",
                                                marginTop:
                                                    12,
                                                padding:
                                                    12,
                                                borderRadius:
                                                    10
                                            }}
                                        >
                                            Download Resume
                                        </button>

                                        
                                        {
    rewrittenResume && (

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
                Improved Resume
            </h3>

            <textarea
                value={
                    rewrittenResume
                }
                readOnly
                style={{
                    width:"100%",
                    minHeight:"700px"
                }}
            />

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

};

export default ResumeStudioPage;