import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * SidebarItem
 * Single nav-row implementation shared by the primary app Sidebar and
 * ResumeWorkspaceSidebar. Active state is a solid soft-brand fill with a
 * left rail mark — no gradient pill, no box-shadow.
 */
function SidebarItem({ to, icon, label, active, collapsed = false, onClick, badge }) {
  const content = (
    <>
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-full transition-opacity duration-150 ${
          active ? "bg-brand-400 opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={`inline-flex shrink-0 [&>svg]:w-[17px] [&>svg]:h-[17px] ${
          active ? "text-brand-300" : "text-ink-tertiary group-hover:text-ink-secondary"
        }`}
      >
        {icon}
      </span>
      {!collapsed && (
        <span className={`truncate ${active ? "text-ink-primary" : "text-ink-secondary group-hover:text-ink-primary"}`}>
          {label}
        </span>
      )}
      {!collapsed && badge && <span className="ml-auto shrink-0">{badge}</span>}
    </>
  );

  const sharedClass = `
    group relative flex items-center gap-2.5 pl-3.5 pr-2.5 py-2 rounded-lg
    text-[13px] font-medium transition-colors duration-150
    ${active ? "bg-brand-500/[0.08]" : "hover:bg-white/[0.04]"}
  `;

  if (onClick) {
    return (
      <motion.button onClick={onClick} className={`w-full text-left ${sharedClass}`} whileTap={{ scale: 0.98 }}>
        {content}
      </motion.button>
    );
  }

  return (
    <Link to={to} className={sharedClass}>
      {content}
    </Link>
  );
}

export default SidebarItem;
