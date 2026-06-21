import Sidebar from "../components/Sidebar";
import { useState } from "react";
function DashboardLayout({ children }) {
const [sidebarCollapsed,
setSidebarCollapsed] =
useState(false);
    return (
        <div className="flex min-h-screen bg-[#0b0b0f]">

            <Sidebar collapsed={sidebarCollapsed}
  onToggle={() =>
    setSidebarCollapsed(
      !sidebarCollapsed
    )
  }/>

            <main className="flex-1 p-8 overflow-y-auto text-white">

                <div className="max-w-7xl mx-auto w-full">

                    {children}

                </div>

            </main>

        </div>
    );

}

export default DashboardLayout;