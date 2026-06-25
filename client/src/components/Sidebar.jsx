import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SidebarItem from "./ui/SidebarItem";
import { IconGrid, IconUpload, IconUser, IconLogout, IconChevronLeft } from "./ui/icons";

/**
 * Sidebar
 * Primary app navigation. Same three routes and logout behavior as
 * before — localStorage token removal + redirect to "/" — restyled onto
 * the flat neutral surface with no gradient glow blobs or emoji icons.
 */
function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", icon: <IconGrid />, label: "Dashboard" },
    { to: "/upload", icon: <IconUpload />, label: "Upload Resume" },
    { to: "/profile", icon: <IconUser />, label: "Profile" },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col justify-between bg-surface border-r border-border shrink-0 overflow-hidden"
    >
      <div>
        {/* Brand */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-[26px] h-[26px] rounded-md bg-brand-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              IQ
            </div>
            {!collapsed && (
              <span className="text-[14px] font-semibold text-ink-primary truncate">
                InterviewIQ
              </span>
            )}
          </div>
          <button
            onClick={onToggle}
            className="text-ink-quaternary hover:text-ink-secondary transition-colors p-1 shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <IconChevronLeft
              className={`w-3.5 h-3.5 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex flex-col gap-0.5">
          {navItems.map(({ to, icon, label }) => (
            <SidebarItem
              key={to}
              to={to}
              icon={icon}
              label={label}
              active={location.pathname === to}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <SidebarItem
          icon={<IconLogout />}
          label="Log out"
          collapsed={collapsed}
          onClick={handleLogout}
        />
      </div>
    </motion.div>
  );
}

export default Sidebar;
