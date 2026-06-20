"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { loginAdmin } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginAdmin(form);
      saveToken(data.access_token);
      window.location.href = "/admin/dashboard";
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <Navbar />
      <main className="page container">
        <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
          <h1>Admin Login</h1>
          <form className="form" onSubmit={submit}>
            <div className="field">
              <label>Email</label>
              <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field">
              <label>Password</label>
              <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <button className="btn primary" type="submit">Login</button>
            {error ? <div className="notice">{error}</div> : null}
          </form>
        </div>
      </main>
    </>
  );
}
