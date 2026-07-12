import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import * as api from "../api/user.api";
import { ROLES } from "../utils/constants";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

const emptyUser = { name: "", email: "", password: "", phone: "", role: "DRIVER" };

function UsersPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyUser);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.getUsers();
      setList(res?.data || []);
    } catch (e) { setErr(e?.message); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createUser(form);
      setOpen(false); setForm(emptyUser); load();
    } catch (e) { setErr(e?.message); }
  };

  return (
    <AdminLayout title="Users">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/60">{list.length} employees</p>
        <Button onClick={() => setOpen(true)}>+ Add Employee</Button>
      </div>
      {err && <div className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-sm text-red-200">{err}</div>}
      {loading ? <Loader /> : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase text-white/50">
              <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Role</th></tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u._id} className="border-t border-white/5 text-white/80">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3"><span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-200">{u.role}</span></td>
                </tr>
              ))}
              {list.length === 0 && (<tr><td colSpan={4} className="p-6 text-center text-white/50">No employees yet.</td></tr>)}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Create Employee">
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <label className="col-span-2 flex flex-col gap-1.5 text-sm">
            <span className="text-white/70">Role</span>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none">
              {Object.values(ROLES).map((r) => <option key={r} value={r} className="bg-slate-900">{r}</option>)}
            </select>
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