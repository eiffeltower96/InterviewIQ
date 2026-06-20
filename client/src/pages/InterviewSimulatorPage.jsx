import React from 'react'
import DashboardLayout from "../layouts/DashboardLayout";
import ResumeWorkspaceSidebar from "../components/ResumeWorkspaceSidebar";
const InterviewSimulatorPage = () => {
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
                    <h1>Interview Simulator</h1>
                    <p>Coming soon...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default InterviewSimulatorPage