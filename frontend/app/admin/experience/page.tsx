"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AdminShell from "@/components/AdminShell";
import { createExperience, deleteExperience, getExperiences, updateExperience } from "@/lib/api";

const empty = {
  company_name: "",
  position: "",
  start_date: "",
  end_date: "",
  location: "",
  description: "",
};

export default function AdminExperiencePage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = async () => {
    try {
      setItems(await getExperiences());
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) await updateExperience(editingId, form);
    else await createExperience(form);
    setForm(empty);
    setEditingId(null);
    await load();
  };

  const edit = (item: any) => {
    setEditingId(item.id);
    setForm({
      company_name: item.company_name ?? "",
      position: item.position ?? "",
      start_date: item.start_date ?? "",
      end_date: item.end_date ?? "",
      location: item.location ?? "",
      description: item.description ?? "",
    });
  };

  return (
    <>
      <Navbar />
      <AdminShell>
        <h1>Experience</h1>
        <form className="form" onSubmit={submit}>
          <div className="grid grid-2">
            <div className="field"><label>Company Name</label><input className="input" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} /></div>
<div className="field"><label>Position</label><input className="input" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
<div className="field"><label>Start Date</label><input className="input" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} /></div>
          </div>
          <div className="grid grid-2">
            <div className="field"><label>End Date</label><input className="input" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} /></div>
<div className="field"><label>Location</label><input className="input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
<div className="field"><label>Description</label><textarea className="textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
          <button className="btn primary" type="submit">{editingId ? "Update" : "Create"} Experienc</button>
        </form>

        <div className="section">
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.company_name}</td>
                  <td>
                    <div className="chips">
                      <button className="chip" onClick={() => edit(item)} type="button">Edit</button>
                      <button className="chip" onClick={async () => { await deleteExperience(item.id); await load(); }} type="button">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminShell>
    </>
  );
}
