import { useNavigate, useParams, useLocation } from "react-router-dom";

// Lightweight inline icon set so we don't introduce a new dependency.
// Each icon is a small stroke-based SVG sized to sit inline with the label.
const icons = {
    ats: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M3 17l4-6 4 3 5-8 5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    coach: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    dreamCompany: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M8 9h2M8 13h2M14 9h2M14 13h2M10 20v-3h4v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    interview: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <path
                d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    studio: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M4 21h16M6 18V8l6-5 6 5v10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
};

function ResumeWorkspaceSidebar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: "ATS Analysis", path: `/resume/${id}`, icon: icons.ats },
        { label: "Career Coach", path: `/resume/${id}/coach`, icon: icons.coach },
        {
            label: "Dream Company",
            path: `/resume/${id}/dream-company`,
            icon: icons.dreamCompany
        },
        {
            label: "Interview Simulator",
            path: `/resume/${id}/interview`,
            icon: icons.interview
        },
        { label: "Resume Studio", path: `/resume/${id}/studio`, icon: icons.studio }
    ];

    return (
        <div
            style={{
                width: 232,
                flexShrink: 0,
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 16,
                padding: 16,
                position: "sticky",
                top: 24,
                alignSelf: "flex-start"
            }}
        >
            <h3
                style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    margin: "4px 4px 14px",
                    letterSpacing: 0.2
                }}
            >
                Resume Workspace
            </h3>

            {items.map((item) => {
                const active = location.pathname === item.path;

                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            textAlign: "left",
                            padding: "11px 12px",
                            marginBottom: 4,
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            fontSize: 14,
                            fontWeight: active ? 600 : 500,
                            background: active
                                ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
                                : "transparent",
                            color: active ? "#fff" : "#9ca3af",
                            transition: "background 0.15s ease, color 0.15s ease"
                        }}
                        onMouseEnter={(e) => {
                            if (!active) e.currentTarget.style.background = "#1f2937";
                        }}
                        onMouseLeave={(e) => {
                            if (!active) e.currentTarget.style.background = "transparent";
                        }}
                    >
                        <span
                            style={{
                                display: "inline-flex",
                                color: active ? "#fff" : "#7c8aa0"
                            }}
                        >
                            {item.icon}
                        </span>
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
}

export default ResumeWorkspaceSidebar;