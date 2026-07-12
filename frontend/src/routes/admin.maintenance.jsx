import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import * as api from "../api/maintenance.api";

export const Route = createFileRoute("/admin/maintenance")({ component: MaintenancePage });

const empty = { vehicleId: "", maintenanceType: "Engine", description: "", cost: 0, scheduledDate: "" };

function MaintenancePage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try { const res = await api.getMaintenance(); setList(res?.data || []); }
    catch (e) { setErr(e?.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try { await api.createMaintenance({ ...form, cost: Number(form.cost) }); setOpen(false); setForm(empty); load(); }
    catch (e) { setErr(e?.message); }
  };

  return (
    <AdminLayout title="Maintenance">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/60">{list.length} maintenance records</p>
        <Button onClick={() => setOpen(true)}>+ Schedule</Button>
      </div>
      {err && <div className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-sm text-red-200">{err}</div>}
      {loading ? <Loader /> : (
        <div className="grid gap-3">
          {list.map((m) => (
            <div key={m._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div>
                <div className="font-semibold text-white">{m.maintenanceType} · ₹{m.cost}</div>
                <div className="text-xs text-white/50">{m.description} · {m.status}</div>
              </div>
              {m.status !== "Completed" && (
                <Button onClick={async () => { await api.completeMaintenance(m._id); load(); }}>Complete</Button>
              )}
            </div>
          ))}
          {list.length === 0 && <p className="text-white/50">Nothing scheduled.</p>}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Schedule Maintenance">
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <Input label="Vehicle ID" value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} required />
          <Input label="Type" value={form.maintenanceType} onChange={(e) => setForm({ ...form, maintenanceType: e.target.value })} />
          <Input label="Cost (₹)" type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
          <Input label="Scheduled Date" type="date" value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} />
          <label className="col-span-2 flex flex-col gap-1.5 text-sm">
            <span className="text-white/70">Description</span>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none" rows={3} />
          </label>
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}