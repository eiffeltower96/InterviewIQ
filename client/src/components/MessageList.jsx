import { useEffect, useRef } from "react";

/**
 * AssistantMessage
 * When the assistant references a specific analysis field (score, a
 * weakness, a keyword), it's rendered as a small reference chip rather
 * than buried in prose — a lightweight way to keep tying answers back to
 * the report the user already trusts.
 */
function AssistantMessage({ message }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "18px 0", alignItems: "flex-start" }}>
      <div
        style={{
          flexShrink: 0,
          width: 30,
          height: 30,
          borderRadius: 9,
          background: "rgba(167,139,250,0.12)",
          border: "1px solid rgba(167,139,250,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#a78bfa" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {message.referenceChip && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11.5,
              fontWeight: 600,
              color: "#a78bfa",
              background: "rgba(167,139,250,0.08)",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: 999,
              padding: "3px 10px",
              marginBottom: 8,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa" }} />
            {message.referenceChip}
          </div>
        )}
        {message.isStreaming ? (
          <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#6b7280",
                  animation: `coachPulse 1.1s ${i * 0.15}s infinite ease-in-out`,
                }}
              />
            ))}
            <style>{`@keyframes coachPulse {0%,80%,100%{opacity:0.25;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)}}`}</style>
          </div>
        ) : (
          <p style={{ fontSize: 14.5, color: "#e5e7eb", lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap" }}>
            {message.content}
          </p>
        )}
      </div>
    </div>
  );
}

function UserMessage({ message }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 0" }}>
      <div
        style={{
          maxWidth: "75%",
          background: "rgba(167,139,250,0.14)",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: "16px 16px 4px 16px",
          padding: "10px 16px",
        }}
      >
        <p style={{ fontSize: 14.5, color: "#f3f4f6", margin: 0, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
          {message.content}
        </p>
      </div>
    </div>
  );
}

function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 8px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
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