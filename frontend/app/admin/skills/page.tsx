"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AdminShell from "@/components/AdminShell";
import { createSkill, deleteSkill, getSkills, updateSkill } from "@/lib/api";

const empty = {
  name: "",
  category: "",
  level: "",
};

export default function AdminSkillsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = async () => {
    try {
      setItems(await getSkills());
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) await updateSkill(editingId, form);
    else await createSkill(form);
    setForm(empty);
    setEditingId(null);
    await load();
  };

  const edit = (item: any) => {
    setEditingId(item.id);
    setForm({
      name: item.name ?? "",
      category: item.category ?? "",
      level: item.level ?? "",
    });
  };

  return (
    <>
      <Navbar />
      <AdminShell>
        <h1>Skills</h1>
        <form className="form" onSubmit={submit}>
          <div className="grid grid-2">
            <div className="field"><label>Skill Name</label><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          </div>
          <div className="grid grid-2">
            <div className="field"><label>Category</label><input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
<div className="field"><label>Level</label><input className="input" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} /></div>
          </div>
          <button className="btn primary" type="submit">{editingId ? "Update" : "Create"} Skill</button>
        </form>

        <div className="section">
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <div className="chips">
                      <button className="chip" onClick={() => edit(item)} type="button">Edit</button>
                      <button className="chip" onClick={async () => { await deleteSkill(item.id); await load(); }} type="button">Delete</button>
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
