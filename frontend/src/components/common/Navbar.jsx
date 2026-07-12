import { useAuth } from "../../context/AuthContext";

export default function Navbar({ title }) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
      <h1 className="text-lg font-bold text-white">{title}</h1>
      <div className="flex items-center gap-3 text-sm text-white/70">
        <span className="hidden sm:inline">Hi, {user?.username || user?.name || "there"}</span>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 font-bold text-white">
          {(user?.username || user?.name || "U").slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
}