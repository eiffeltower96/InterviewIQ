import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./ui/Modal";
import { IconPlus, IconChevronLeft, IconTrash } from "./ui/icons";

const ICONS = {
  spark: <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />,
  flame: <path d="M12 2c1 3-3 4-3 7a3 3 0 006 0c1-1 1-2 0-3 1.5.5 3 2.5 3 5a6 6 0 11-12 0c0-4 3-6 6-9z" fill="currentColor" />,
  filter: <path d="M4 5h16M7 12h10M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  map: <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
};

/**
 * CoachSidebar
 * Same props and behavior as before: collapsible desktop panel, mode
 * shortcuts (visual only — selection doesn't change the API call, same
 * as before this redesign), and conversation history with delete. The
 * delete confirmation now goes through the Modal primitive instead of
 * window.confirm.
 */
function CoachSidebar({
  collapsed,
  onToggleCollapse,
  activeMode,
  onSelectMode,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}) {
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  if (collapsed) {
    return (
      <div className="w-[60px] shrink-0 border-r border-border bg-surface flex flex-col items-center pt-4 gap-3">
        <button
          onClick={onToggleCollapse}
          title="Expand sidebar"
          className="w-9 h-9 rounded-lg border border-border-strong bg-white/[0.03] text-ink-tertiary flex items-center justify-center hover:text-ink-secondary transition-colors"
        >
          <IconChevronLeft className="w-4 h-4 rotate-180" />
        </button>
        <button
          onClick={onNewConversation}
          title="New conversation"
          className="w-9 h-9 rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-300 flex items-center justify-center hover:bg-brand-500/15 transition-colors"
        >
          <IconPlus className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[272px] shrink-0 border-r border-border bg-surface flex flex-col h-full">
      {/* Header */}
      <div className="px-3.5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-300">
            Career Coach
          </span>
        </div>
        <button
          onClick={onToggleCollapse}
          title="Collapse sidebar"
          className="text-ink-quaternary hover:text-ink-secondary transition-colors p-1"
        >
          <IconChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* New conversation */}
      <div className="px-3.5 pb-3.5">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-brand-500 text-white text-[13px] font-semibold hover:bg-brand-600 transition-colors"
        >
          <IconPlus className="w-3.5 h-3.5" />
          New conversation
        </button>
      </div>

      
      {/* Conversation history */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3.5 mt-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-quaternary px-2 pb-2">
          History
        </div>
        {conversations.length === 0 ? (
          <p className="text-[12.5px] text-ink-quaternary px-2 leading-relaxed">
            Your conversations about this resume will show up here.
          </p>
        ) : (
          <div className="flex flex-col gap-0.5">
            <AnimatePresence initial={false}>
              {conversations.map((conv) => {
                const isActive = conv.id === activeConversationId;
                return (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative group"
                  >
                    <button
                      onClick={() => onSelectConversation(conv.id)}
                      className={`w-full text-left pl-2.5 pr-8 py-2 rounded-md transition-colors ${
                        isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className={`text-[13px] font-medium truncate ${isActive ? "text-ink-primary" : "text-ink-secondary"}`}>
                        {conv.title}
                      </div>
                      {conv.timeLabel && (
                        <div className="text-[11px] text-ink-quaternary mt-0.5">{conv.timeLabel}</div>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPendingDeleteId(conv.id);
                      }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-ink-quaternary opacity-0 group-hover:opacity-100 hover:text-error hover:bg-error-bg transition-all"
                      aria-label="Delete conversation"
                    >
                      <IconTrash className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Modal
        open={!!pendingDeleteId}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={() => onDeleteConversation(pendingDeleteId)}
        title="Delete this conversation?"
        description="This will permanently remove the conversation history. This can't be undone."
        confirmLabel="Delete"
      />
      <div className="px-4 py-3 border-t border-border">
    <p className="text-xs text-ink-quaternary">
        AI responses may be inaccurate. Verify important information.
    </p>
</div>
    </div>
    
  );
}

export default CoachSidebar;
