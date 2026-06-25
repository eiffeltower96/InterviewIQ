import { useNavigate, useParams, useLocation } from "react-router-dom";
import SidebarItem from "./ui/SidebarItem";

// Same inline icon set as before, kept local since these are specific to
// the resume workspace sub-nav and don't belong in the shared icon file.
const icons = {
  ats: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 17l4-6 4 3 5-8 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  coach: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  dreamCompany: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 9h2M8 13h2M14 9h2M14 13h2M10 20v-3h4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  interview: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  studio: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 21h16M6 18V8l6-5 6 5v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/**
 * ResumeWorkspaceSidebar
 * Secondary navigation across the 5 per-resume tools. Same routes and
 * navigate() behavior as before, rebuilt on the shared SidebarItem so it
 * shares an active-state visual language with the main app Sidebar
 * instead of its own bespoke gradient button.
 */
function ResumeWorkspaceSidebar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "ATS Analysis", path: `/resume/${id}`, icon: icons.ats },
    { label: "Career Coach", path: `/resume/${id}/coach`, icon: icons.coach },
    { label: "Dream Company", path: `/resume/${id}/dream-company`, icon: icons.dreamCompany },
    { label: "Interview Simulator", path: `/resume/${id}/interview`, icon: icons.interview },
    { label: "Resume Studio", path: `/resume/${id}/studio`, icon: icons.studio },
  ];

  return (
    <div className="w-[220px] shrink-0 bg-surface border border-border rounded-xl p-3 sticky top-6 self-start">
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-ink-tertiary px-2 pt-1 pb-2.5">
        Resume workspace
      </h3>
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>
    </div>
  );
}

export default ResumeWorkspaceSidebar;
