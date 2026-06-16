function Loader() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 0",
            gap: 16,
            fontFamily: "Inter, sans-serif",
        }}>
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse-ring {
                    0% { transform: scale(0.85); opacity: 0.6; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                    100% { transform: scale(0.85); opacity: 0.6; }
                }
            `}</style>
            <div style={{ position: "relative", width: 52, height: 52 }}>
                {/* Pulse ring */}
                <div style={{
                    position: "absolute", inset: -6,
                    borderRadius: "50%",
                    border: "1px solid rgba(124,58,237,0.3)",
                    animation: "pulse-ring 1.8s ease-in-out infinite",
                }} />
                {/* Spinner */}
                <div style={{
                    width: 52, height: 52,
                    border: "3px solid rgba(124,58,237,0.15)",
                    borderTopColor: "#a78bfa",
                    borderRadius: "50%",
                    animation: "spin 0.75s linear infinite",
                }} />
                {/* Center dot */}
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: "#7c3aed",
                        boxShadow: "0 0 10px #7c3aed",
                    }} />
                </div>
            </div>
            <p style={{ fontSize: 13, color: "#4b5563", fontWeight: 500, margin: 0 }}>
                Loading analysis…
            </p>
        </div>
    );
}

export default Loader;
