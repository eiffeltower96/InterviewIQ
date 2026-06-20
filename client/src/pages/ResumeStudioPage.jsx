import React from 'react'
import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
const ResumeStudioPage = () => {
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
                    <h1>Resume Studio</h1>
                    <p>Coming soon...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ResumeStudioPage