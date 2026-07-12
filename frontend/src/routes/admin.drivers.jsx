import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import * as api from "../api/driver.api";

export const Route = createFileRoute("/admin/drivers")({ component: DriversPage });

function DriversPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { const res = await api.getDrivers(); setList(res?.data || []); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <AdminLayout title="Drivers">
      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <div key={d._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 font-bold">
                  {d.name?.[0]}
                </div>
                <div>
                  <div className="font-bold text-white">{d.name}</div>
                  <div className="text-xs text-white/50">{d.email}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/60">📞 {d.phone}</div>
            </div>
          ))}
          {list.length === 0 && <p className="text-white/50">No drivers yet.</p>}
        </div>
      )}
    </AdminLayout>
  );
}