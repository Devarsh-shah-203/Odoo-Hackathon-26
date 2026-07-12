import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import * as api from "../api/trip.api";

export const Route = createFileRoute("/admin/trips")({ component: TripsPage });

const empty = { vehicleId: "", driverId: "", source: "", destination: "", cargoWeight: 0, plannedDistance: 0 };

function TripsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try { const res = await api.getTrips(); setList(res?.data || []); }
    catch (e) { setErr(e?.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createTrip({
        ...form,
        cargoWeight: Number(form.cargoWeight),
        plannedDistance: Number(form.plannedDistance),
      });
      setOpen(false); setForm(empty); load();
    } catch (e) { setErr(e?.message); }
  };

  const act = async (fn, id) => { try { await fn(id); load(); } catch (e) { setErr(e?.message); } };

  return (
    <AdminLayout title="Trips">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/60">{list.length} trips</p>
        <Button onClick={() => setOpen(true)}>+ Plan Trip</Button>
      </div>
      {err && <div className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-sm text-red-200">{err}</div>}
      {loading ? <Loader /> : (
        <div className="grid gap-3">
          {list.map((t) => (
            <div key={t._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div>
                <div className="font-semibold text-white">{t.source} → {t.destination}</div>
                <div className="text-xs text-white/50">Status: {t.status} · Distance: {t.plannedDistance}km</div>
              </div>
              <div className="flex gap-2">
                {t.status === "Planned" && <Button variant="ghost" onClick={() => act(api.dispatchTrip, t._id)}>Dispatch</Button>}
                {t.status === "Dispatched" && <Button onClick={() => act((id) => api.completeTrip(id, { fuelUsed: 0, finalOdometer: 0 }), t._id)}>Complete</Button>}
                {t.status !== "Completed" && t.status !== "Cancelled" && <Button variant="danger" onClick={() => act(api.cancelTrip, t._id)}>Cancel</Button>}
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-white/50">No trips yet.</p>}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Plan a Trip">
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <Input label="Vehicle ID" value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} required />
          <Input label="Driver ID" value={form.driverId} onChange={(e) => setForm({ ...form, driverId: e.target.value })} required />
          <Input label="Source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} required />
          <Input label="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
          <Input label="Cargo Weight (kg)" type="number" value={form.cargoWeight} onChange={(e) => setForm({ ...form, cargoWeight: e.target.value })} />
          <Input label="Planned Distance (km)" type="number" value={form.plannedDistance} onChange={(e) => setForm({ ...form, plannedDistance: e.target.value })} />
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}