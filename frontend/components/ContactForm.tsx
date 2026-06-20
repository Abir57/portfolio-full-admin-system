"use client";

import { useState } from "react";
import { sendMessage } from "@/lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDone("");
    try {
      await sendMessage(form);
      setDone("Message sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setDone("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <div className="field">
        <label>Name</label>
        <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="field">
        <label>Email</label>
        <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="field">
        <label>Message</label>
        <textarea className="textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
      {done ? <div className="notice">{done}</div> : null}
    </form>
  );
}
