import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/vehicles", label: "Vehicles", icon: "🚚" },
  { to: "/admin/drivers", label: "Drivers", icon: "🧑‍✈️" },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/trips", label: "Trips", icon: "🛣️" },
  { to: "/admin/maintenance", label: "Maintenance", icon: "🛠️" },
  { to: "/admin/fuel-logs", label: "Fuel Logs", icon: "⛽" },
  { to: "/admin/reports", label: "Reports", icon: "📈" },
  { to: "/admin/profile", label: "Profile", icon: "🪪" },
];

export default function Sidebar() {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const { user, logout } = useAuth();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2 p-4 border-r border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mb-4">
        <div className="text-xl font-black tracking-tight bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
          TransitOps
        </div>
        <div className="text-xs text-white/50">Fleet Ops Console</div>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV.map((n) => {
          const active = pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all ${
                active
                  ? "bg-white/15 text-white shadow-lg shadow-fuchsia-500/10"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
        <div className="truncate font-semibold text-white">{user?.username || user?.name || "User"}</div>
        <div className="truncate text-white/50">{user?.email}</div>
        <button
          onClick={logout}
          className="mt-2 w-full rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 px-3 py-1.5 text-white font-semibold hover:opacity-90"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}