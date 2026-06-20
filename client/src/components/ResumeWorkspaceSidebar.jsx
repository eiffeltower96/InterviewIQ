import { useNavigate, useParams, useLocation } from "react-router-dom";

function ResumeWorkspaceSidebar() {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            label: "ATS Analysis",
            path: `/resume/${id}`
        },
        {
            label: "Career Coach",
            path: `/resume/${id}/coach`
        },
        {
            label: "Dream Company",
            path: `/resume/${id}/dream-company`
        },
        {
            label: "Interview Simulator",
            path: `/resume/${id}/interview`
        },
        {
            label: "Resume Studio",
            path: `/resume/${id}/studio`
        }
    ];

    return (
        <div
            style={{
                width: 240,
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 16,
                padding: 12,
                position: "sticky",
                top: 24
            }}
        >

            <h3
                style={{
                    color: "#fff",
                    fontSize: 15,
                    marginBottom: 12
                }}
            >
                Resume Workspace
            </h3>

            {items.map((item) => {

                const active =
                    location.pathname === item.path;

                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "12px",
                            marginBottom: 6,
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            background:
                                active
                                    ? "#6d28d9"
                                    : "transparent",
                            color:
                                active
                                    ? "#fff"
                                    : "#9ca3af"
                        }}
                    >
                        {item.label}
                    </button>
                );

            })}
        </div>
    );
}

export default ResumeWorkspaceSidebar;