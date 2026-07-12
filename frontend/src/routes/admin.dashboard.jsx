import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import * as dash from "../api/dashboard.api";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
      <div className={`mt-2 text-3xl font-black ${accent || "text-white"}`}>{value}</div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [s, t] = await Promise.all([
          dash.getDashboardStats().catch(() => null),
          dash.getRecentTrips().catch(() => ({ data: [] })),
        ]);
        setStats(s?.data || s);
        setTrips(t?.data || []);
      } catch (e) {
        setErr(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          {err && <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{err}</div>}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Vehicles" value={stats?.totalVehicles ?? "—"} accent="text-fuchsia-300" />
            <StatCard label="Active Trips" value={stats?.activeTrips ?? "—"} accent="text-cyan-300" />
            <StatCard label="Drivers" value={stats?.totalDrivers ?? "—"} accent="text-pink-300" />
            <StatCard label="Maintenance" value={stats?.pendingMaintenance ?? "—"} accent="text-amber-300" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <h3 className="mb-3 text-lg font-bold text-white">Recent Trips</h3>
            {trips.length === 0 ? (
              <p className="text-sm text-white/50">No recent trips yet.</p>
            ) : (
              <ul className="divide-y divide-white/5">
                {trips.map((t) => (
                  <li key={t._id} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-white">{t.source} → {t.destination}</span>
                    <span className="text-white/50">{t.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}