import { useState } from "react";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className="flex-1 overflow-y-auto text-ink-primary">
        <div className="max-w-7xl mx-auto w-full p-8">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
