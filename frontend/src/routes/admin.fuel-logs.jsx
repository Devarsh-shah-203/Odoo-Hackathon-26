import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import * as api from "../api/fuel.api";

export const Route = createFileRoute("/admin/fuel-logs")({ component: FuelPage });

const empty = { tripId: "", vehicleId: "", liters: 0, cost: 0 };

function FuelPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  const load = async () => {
    setLoading(true);
    try { const res = await api.getFuelLogs(); setList(res?.data || []); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.createFuelLog({ ...form, liters: Number(form.liters), cost: Number(form.cost) });
    setOpen(false); setForm(empty); load();
  };

  return (
    <AdminLayout title="Fuel Logs">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/60">{list.length} logs</p>
        <Button onClick={() => setOpen(true)}>+ Log Fuel</Button>
      </div>
      {loading ? <Loader /> : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase text-white/50">
              <tr><th className="p-3">Vehicle</th><th className="p-3">Trip</th><th className="p-3">Liters</th><th className="p-3">Cost</th></tr>
            </thead>
            <tbody>
              {list.map((f) => (
                <tr key={f._id} className="border-t border-white/5 text-white/80">
                  <td className="p-3 font-mono text-xs">{f.vehicleId}</td>
                  <td className="p-3 font-mono text-xs">{f.tripId}</td>
                  <td className="p-3">{f.liters} L</td>
                  <td className="p-3">₹{f.cost}</td>
                </tr>
              ))}
              {list.length === 0 && (<tr><td colSpan={4} className="p-6 text-center text-white/50">No fuel logs yet.</td></tr>)}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Log Fuel">
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <Input label="Trip ID" value={form.tripId} onChange={(e) => setForm({ ...form, tripId: e.target.value })} required />
          <Input label="Vehicle ID" value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} required />
          <Input label="Liters" type="number" value={form.liters} onChange={(e) => setForm({ ...form, liters: e.target.value })} />
          <Input label="Cost (₹)" type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}