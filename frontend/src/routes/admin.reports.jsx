import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Button from "../components/common/Button";
import * as api from "../api/report.api";

export const Route = createFileRoute("/admin/reports")({ component: ReportsPage });

const REPORTS = [
  { key: "trips", label: "Trip Report", fn: api.getTripReport },
  { key: "maintenance", label: "Maintenance Report", fn: api.getMaintenanceReport },
  { key: "fuel", label: "Fuel Report", fn: api.getFuelReport },
  { key: "expenses", label: "Expense Report", fn: api.getExpenseReport },
  { key: "fleet", label: "Fleet Summary", fn: api.getFleetSummaryReport },
];

function ReportsPage() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (r) => {
    setLoading(true); setActive(r.key);
    try { const res = await r.fn(); setData(res?.data || res); }
    catch (e) { setData({ error: e?.message }); } finally { setLoading(false); }
  };

  return (
    <AdminLayout title="Reports">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {REPORTS.map((r) => (
          <Button key={r.key} variant={active === r.key ? "primary" : "ghost"} onClick={() => run(r)}>
            {r.label}
          </Button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        {loading ? <p className="text-white/60">Loading report...</p> :
          data ? <pre className="max-h-[60vh] overflow-auto text-xs text-white/80">{JSON.stringify(data, null, 2)}</pre>
            : <p className="text-white/50">Pick a report to view.</p>}
      </div>
    </AdminLayout>
  );
}