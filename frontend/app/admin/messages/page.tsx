"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AdminShell from "@/components/AdminShell";
import { getMessages } from "@/lib/api";

export default function AdminMessagesPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getMessages().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <>
      <Navbar />
      <AdminShell>
        <h1>Messages</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Message</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminShell>
    </>
  );
}
