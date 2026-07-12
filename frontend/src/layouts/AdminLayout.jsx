import { Navigate } from "@tanstack/react-router";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ title, children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(217,70,239,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.2),transparent_40%),linear-gradient(180deg,#0b0716,#0a0a1a)] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}