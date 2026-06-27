import { useState } from "react";
import Sidebar from "../components/Sidebar";

/**
 * DashboardLayout
 * `fullBleed` is opt-in per page (default false, so every existing page
 * keeps its current max-w-7xl + p-8 content slot unchanged). When true,
 * `children` renders edge-to-edge inside <main> with no padding or width
 * cap — used by pages like Career Coach that need to fill the entire
 * available viewport height/width themselves (e.g. a chat panel) rather
 * than sit inside a centered, padded column.
 */
function DashboardLayout({ children, fullBleed = false }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`flex-1 ${fullBleed ? "h-screen overflow-hidden" : "overflow-y-auto"} text-ink-primary`}>
        {fullBleed ? (
          <div className="h-full w-full">{children}</div>
        ) : (
          <div className="max-w-7xl mx-auto w-full p-8">{children}</div>
        )}
      </main>
    </div>
  );
}

export default DashboardLayout;
