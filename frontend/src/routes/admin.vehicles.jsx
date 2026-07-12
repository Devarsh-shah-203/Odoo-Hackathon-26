import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import * as api from "../api/vehicle.api";

export const Route = createFileRoute("/admin/vehicles")({ component: VehiclesPage });

const empty = {
  registrationNumber: "",
  vehicleName: "",
  vehicleType: "Truck",
  maximumLoadCapacity: 0,
  odometer: 0,
  acquisitionCost: 0,
};

function VehiclesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.getVehicles();
      setList(res?.data || []);
    } catch (e) {
      setErr(e?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createVehicle({
        ...form,
        maximumLoadCapacity: Number(form.maximumLoadCapacity),
        odometer: Number(form.odometer),
        acquisitionCost: Number(form.acquisitionCost),
      });
      setOpen(false);
      setForm(empty);
      load();
    } catch (e) { setErr(e?.message); }
  };

  const remove = async (id) => {
    if (!confirm("Delete vehicle?")) return;
    await api.deleteVehicle(id);
    load();
  };

  return (
    <AdminLayout title="Vehicles">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/60">{list.length} vehicles registered</p>
        <Button onClick={() => setOpen(true)}>+ Add Vehicle</Button>
      </div>
      {err && <div className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-sm text-red-200">{err}</div>}
      {loading ? <Loader /> : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase text-white/50">
              <tr>
                <th className="p-3">Reg #</th><th className="p-3">Name</th><th className="p-3">Type</th>
                <th className="p-3">Status</th><th className="p-3">Odometer</th><th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((v) => (
                <tr key={v._id} className="border-t border-white/5 text-white/80">
                  <td className="p-3 font-mono">{v.registrationNumber}</td>
                  <td className="p-3">{v.vehicleName}</td>
                  <td className="p-3">{v.vehicleType}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-xs text-fuchsia-200">{v.status}</span>
                  </td>
                  <td className="p-3">{v.odometer?.toLocaleString?.() || "—"}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => remove(v._id)} className="text-red-300 hover:text-red-200">Delete</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-white/50">No vehicles yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Register Vehicle">
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <Input label="Registration Number" value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} required />
          <Input label="Name" value={form.vehicleName} onChange={(e) => setForm({ ...form, vehicleName: e.target.value })} required />
          <Input label="Type" value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })} />
          <Input label="Load Capacity (kg)" type="number" value={form.maximumLoadCapacity} onChange={(e) => setForm({ ...form, maximumLoadCapacity: e.target.value })} />
          <Input label="Odometer (km)" type="number" value={form.odometer} onChange={(e) => setForm({ ...form, odometer: e.target.value })} />
          <Input label="Acquisition Cost (₹)" type="number" value={form.acquisitionCost} onChange={(e) => setForm({ ...form, acquisitionCost: e.target.value })} />
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}