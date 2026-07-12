import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "../layouts/AdminLayout";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/admin/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user, logout } = useAuth();
  return (
    <AdminLayout title="Profile">
      <div className="max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-2xl font-black">
            {(user?.username || user?.name || "U").slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="text-xl font-bold">{user?.username || user?.name}</div>
            <div className="text-sm text-white/60">{user?.email}</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-white/50 text-xs">ID</div>
            <div className="font-mono text-white/80 text-xs">{user?.id}</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-white/50 text-xs">Role</div>
            <div className="text-white/80">{user?.role || "—"}</div>
          </div>
        </div>
        <Button variant="danger" className="mt-6" onClick={logout}>Sign out</Button>
      </div>
    </AdminLayout>
  );
}