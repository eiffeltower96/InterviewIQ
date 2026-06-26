import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * AssistantMessage
 * When the assistant references a specific analysis field (score, a
 * weakness, a keyword), it's rendered as a small reference chip rather
 * than buried in prose — same referenceChip contract as before.
 */
function AssistantMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 py-4.5 items-start"
    >
      <div className="shrink-0 w-[30px] h-[30px] rounded-md bg-brand-500/10 border border-brand-500/25 flex items-center justify-center">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="var(--color-brand-400)" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        {message.referenceChip && (
          <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-brand-300 bg-brand-500/[0.08] border border-brand-500/20 rounded-full px-2.5 py-1 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            {message.referenceChip}
          </div>
        )}
        {message.isStreaming ? (
          <div className="flex gap-1 py-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-ink-quaternary"
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 1.1, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        ) : (
          <p className="text-[14.5px] text-ink-primary leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function UserMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-end py-2.5"
    >
      <div className="max-w-[75%] bg-brand-500/[0.1] border border-brand-500/20 rounded-2xl rounded-br-md px-4 py-2.5">
        <p className="text-[14.5px] text-ink-primary leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * MessageList
 * Same auto-scroll-on-new-message effect as before.
 */
function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-5 pb-2">
      <div className="max-w-[720px] mx-auto">
        {messages.map((m) =>
          m.role === "user" ? (
            <UserMessage key={m.id} message={m} />
          ) : (
            <AssistantMessage key={m.id} message={m} />
          )
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default MessageList;
