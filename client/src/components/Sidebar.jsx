import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/upload",    icon: "📄", label: "Upload Resume" },
    { to: "/profile",  icon: "👤", label: "Profile" },
  ];

  return (
    <div
      className="
        w-64 min-h-screen flex flex-col justify-between
        bg-[#0d0d14]
        border-r border-white/[0.06]
        relative overflow-hidden
      "
    >
      {/* Ambient glow top-left */}
      <div
        className="
          pointer-events-none absolute -top-16 -left-16
          w-64 h-64 rounded-full
          bg-violet-600/20 blur-3xl
        "
      />

      {/* Ambient glow bottom-right */}
      <div
        className="
          pointer-events-none absolute -bottom-16 -right-8
          w-48 h-48 rounded-full
          bg-indigo-500/10 blur-2xl
        "
      />

      {/* ── TOP SECTION ── */}
      <div className="relative z-10">

        {/* Brand */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-2.5 mb-1">
            {/* Logo mark */}
            <span
              className="
                w-8 h-8 rounded-lg
                bg-gradient-to-br from-violet-500 to-indigo-600
                flex items-center justify-center
                text-white text-sm font-bold shadow-lg shadow-violet-500/30
              "
            >
              IQ
            </span>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Interview<span className="text-violet-400">IQ</span>
            </h1>
          </div>
          <p className="text-xs text-gray-500 ml-[42px] tracking-wide uppercase">
            AI Resume Analyzer
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mx-6 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Nav */}
        <nav className="p-4 mt-2 space-y-1">
          {navItems.map(({ to, icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`
                  group flex items-center gap-3 px-4 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-violet-500/15 text-violet-300 shadow-sm shadow-violet-500/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }
                `}
              >
                {/* Active indicator pill */}
                <span
                  className={`
                    w-0.5 h-4 rounded-full transition-all duration-200
                    ${active ? "bg-violet-400 opacity-100" : "opacity-0"}
                    -ml-1
                  `}
                />

                <span className="text-base leading-none">{icon}</span>
                <span>{label}</span>

                {active && (
                  <span
                    className="
                      ml-auto w-1.5 h-1.5 rounded-full
                      bg-violet-400 shadow-sm shadow-violet-400/60
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── BOTTOM SECTION ── */}
      <div className="relative z-10 p-4">
        {/* Divider */}
        <div className="h-px mb-4 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <button
          onClick={handleLogout}
          className="
            group w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
            text-sm font-medium text-red-400/80
            border border-red-500/10
            bg-red-500/[0.04]
            hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/20
            transition-all duration-200
          "
        >
          <span className="text-base">🚪</span>
          <span>Logout</span>
          <span
            className="
              ml-auto opacity-0 group-hover:opacity-100
              text-red-400 text-xs transition-opacity
            "
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;