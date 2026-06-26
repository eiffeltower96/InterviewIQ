import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import CoachSidebar from "../components/CoachSidebar";
import CoachEmptyState from "../components/CoachEmptyState";
import MessageList from "../components/MessageList";
import Composer from "../components/Composer";
import Badge from "../components/ui/Badge";
import { IconChevronLeft } from "../components/ui/icons";

let idCounter = 0;
const nextId = () => `m_${Date.now()}_${idCounter++}`;

function CareerCoachPage() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeMode, setActiveMode] = useState("general");
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatId, setChatId] = useState(null);

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

  const fetchChats = async () => {
    try {
      const response = await api.get(`/chat/resume/${id}`);
      setConversations(
        response.data.chats.map((chat) => ({
          id: chat.id,
          title: chat.title,
          timeLabel: "",
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [id]);

  const createChat = async () => {
    try {
      const response = await api.post("/chat/create", { resumeId: id });
      const chat = response.data.chat;

      setChatId(chat.id);
      setMessages([]);
      setConversations((prev) => [
        { id: chat.id, title: chat.title, timeLabel: "Just now" },
        ...prev,
      ]);
      setActiveConversationId(chat.id);

      return chat.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setChatId(null);
    setMessages([]);
    setDraft("");
  };

  const handleSelectConversation = async (conversationId) => {
    try {
      setActiveConversationId(conversationId);
      setChatId(conversationId);

      const response = await api.get(`/chat/${conversationId}`);

      const loadedMessages = response.data.messages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
      }));

      setMessages(loadedMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? draft).trim();
    if (!text || isSending) return;

    let convId = chatId;

    if (!convId) {
      convId = await createChat();
      if (!convId) return;
    }

    const userMsg = { id: nextId(), role: "user", content: text };
    const streamingMsg = { id: nextId(), role: "assistant", content: "", isStreaming: true };

    setMessages((prev) => [...prev, userMsg, streamingMsg]);
    setDraft("");
    setIsSending(true);

    // Update conversation title from the first message.
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId && c.title === "New conversation" ? { ...c, title: text.slice(0, 48) } : c
      )
    );

    try {
      // Expected backend contract — adjust to match your actual route.
      // POST /coach/:resumeId/message  { mode, message }
      // -> { reply: string, referenceChip?: string }
      const response = await api.post("/chat", {
        resumeId: id,
        question: text,
        chatId: convId,
      });

      const answer = response.data.answer;
      await fetchChats();
      setActiveConversationId(convId);
      setMessages((prev) =>
        prev.map((m) => (m.id === streamingMsg.id ? { ...m, content: answer, isStreaming: false } : m))
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingMsg.id
            ? { ...m, content: "I couldn't reach the coach just now. Try again in a moment.", isStreaming: false }
            : m
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteChat = async (chatIdToDelete) => {
    try {
      await api.delete(`/chat/${chatIdToDelete}`);
      setConversations((prev) => prev.filter((chat) => chat.id !== chatIdToDelete));

      if (activeConversationId === chatIdToDelete) {
        setActiveConversationId(null);
        setChatId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  if (!resume) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  const score = resume?.analysis?.atsScore;

  return (
    <DashboardLayout>
      <div className="flex rounded-xl border border-border overflow-hidden bg-canvas h-[calc(100vh-9.5rem)]">
        {/* Desktop sidebar */}
        <div className="hidden min-[900px]:block">
          <CoachSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
            activeMode={activeMode}
            onSelectMode={setActiveMode}
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteChat}
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: -272 }}
                animate={{ x: 0 }}
                exit={{ x: -272 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 h-full"
                onClick={(e) => e.stopPropagation()}
              >
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
                  onDeleteConversation={handleDeleteChat}
                  onNewConversation={() => {
                    handleNewConversation();
                    setMobileSidebarOpen(false);
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="min-[900px]:hidden w-[34px] h-[34px] rounded-md bg-white/[0.04] border border-border-strong text-ink-tertiary flex items-center justify-center shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <Link
                to={`/resume/${id}`}
                className="flex items-center gap-1.5 text-ink-tertiary text-[13px] font-medium hover:text-ink-secondary transition-colors shrink-0"
              >
                <IconChevronLeft className="w-3.5 h-3.5" />
                Back
              </Link>

              <div className="w-px h-[18px] bg-border-strong shrink-0" />

              <span className="text-[14px] font-semibold text-ink-primary truncate">
                {resume?.fileName || "Your resume"}
              </span>
            </div>

            {score !== undefined && <Badge tone="brand">ATS {score}</Badge>}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">

    {messages.length === 0 ? (
        <CoachEmptyState
            resume={resume}
            onSelectPrompt={(p) => sendMessage(p)}
        />
    ) : (
        <MessageList messages={messages} />
    )}

</div>

<Composer
    value={draft}
    onChange={setDraft}
    onSend={() => sendMessage()}
    activeMode={activeMode}
    disabled={isSending}
/>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CareerCoachPage;
