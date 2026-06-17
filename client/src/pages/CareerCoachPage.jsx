import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import CoachSidebar from "../components/CoachSidebar";
import CoachEmptyState from "../components/CoachEmptyState";
import MessageList from "../components/MessageList";
import Composer from "../components/Composer";

let idCounter = 0;
const nextId = () => `m_${Date.now()}_${idCounter++}`;

function CareerCoachPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeMode, setActiveMode] = useState("general");
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resume/${id}`);
        setResume(response.data.resume);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, [id]);

  // Build a fresh, untitled conversation when none is active yet.
  const ensureConversation = useCallback(() => {
    if (activeConversationId) return activeConversationId;
    const newId = `c_${Date.now()}`;
    setConversations((prev) => [
      { id: newId, title: "New conversation", timeLabel: "Just now" },
      ...prev,
    ]);
    setActiveConversationId(newId);
    return newId;
  }, [activeConversationId]);

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setMessages([]);
    setDraft("");
  };

  const handleSelectConversation = (convId) => {
    setActiveConversationId(convId);
    // In a real implementation: fetch messages for this conversation.
    // Kept empty here since this is a UI/structure deliverable.
    setMessages([]);
  };

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? draft).trim();
    if (!text || isSending) return;

    const convId = ensureConversation();
    const userMsg = { id: nextId(), role: "user", content: text };
    const streamingMsg = { id: nextId(), role: "assistant", content: "", isStreaming: true };

    setMessages((prev) => [...prev, userMsg, streamingMsg]);
    setDraft("");
    setIsSending(true);

    // Update conversation title from the first message.
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId && c.title === "New conversation"
          ? { ...c, title: text.slice(0, 48) }
          : c
      )
    );

    try {
      // Expected backend contract — adjust to match your actual route.
      // POST /coach/:resumeId/message  { mode, message }
      // -> { reply: string, referenceChip?: string }
      const response = await api.post(
  "/chat",
  {
    resumeId: id,
    question: text
  }
);

     const answer =
    response.data.answer;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingMsg.id
            ? { ...m, content: answer,
isStreaming: false }
            : m
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingMsg.id
            ? {
                ...m,
                content: "I couldn't reach the coach just now. Try again in a moment.",
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  if (!resume) {
    return <Loader />;
  }

  const score = resume?.analysis?.atsScore;

  return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          display: "flex",
          height: "calc(100vh - 64px)" /* adjust to match DashboardLayout's header height */,
          background: "#0a0910",
          borderRadius: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Desktop sidebar */}
        <div className="coach-sidebar-desktop">
          <CoachSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
            activeMode={activeMode}
            onSelectMode={setActiveMode}
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* Mobile sidebar drawer */}
        {mobileSidebarOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 40,
            }}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div style={{ position: "absolute", inset: "0 auto 0 0", height: "100%" }} onClick={(e) => e.stopPropagation()}>
              <CoachSidebar
                collapsed={false}
                onToggleCollapse={() => setMobileSidebarOpen(false)}
                activeMode={activeMode}
                onSelectMode={(m) => {
                  setActiveMode(m);
                  setMobileSidebarOpen(false);
                }}
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={(c) => {
                  handleSelectConversation(c);
                  setMobileSidebarOpen(false);
                }}
                onNewConversation={() => {
                  handleNewConversation();
                  setMobileSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Main column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Header */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "#0d0c14",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              <button
                className="coach-mobile-menu-btn"
                onClick={() => setMobileSidebarOpen(true)}
                style={{
                  display: "none",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 9,
                  width: 34,
                  height: 34,
                  color: "#9ca3af",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <Link
                to={`/resume/${id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#6b7280",
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </Link>

              <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#e5e7eb",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {resume?.fileName || "Your resume"}
              </span>
            </div>

            {score !== undefined && (
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "#a78bfa",
                  background: "rgba(167,139,250,0.1)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  borderRadius: 999,
                  padding: "5px 12px",
                }}
              >
                ATS {score}
              </div>
            )}
          </div>

          {/* Conversation / empty state */}
          {messages.length === 0 ? (
            <CoachEmptyState resume={resume} onSelectPrompt={(p) => sendMessage(p)} />
          ) : (
            <MessageList messages={messages} />
          )}

          {/* Composer */}
          <Composer
            value={draft}
            onChange={setDraft}
            onSend={() => sendMessage()}
            activeMode={activeMode}
            disabled={isSending}
          />
        </div>
      </div>

      {/* Responsive rules: hide desktop sidebar / show mobile menu button below 900px */}
      <style>{`
        @media (max-width: 899px) {
          .coach-sidebar-desktop { display: none; }
          .coach-mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}

export default CareerCoachPage;