"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AdminShell from "@/components/AdminShell";

import {
  createCertification,
  deleteCertification,
  getCertifications,
  updateCertification,
  uploadImage,
  uploadDocument,
} from "@/lib/api";

const empty = {
  title: "",
  issuer: "",
  issue_date: "",
  certificate_url: "",
  image_url: "",
};

export default function AdminCertificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const load = async () => {
    try {
      const data = await getCertifications();
      setItems(data);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await updateCertification(editingId, form);
    } else {
      await createCertification(form);
    }

    setForm(empty);
    setEditingId(null);

    await load();
  };

  const edit = (item: any) => {
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      issuer: item.issuer || "",
      issue_date: item.issue_date || "",
      certificate_url: item.certificate_url || "",
      image_url: item.image_url || "",
    });
  };

  return (
    <>
      <Navbar />

      <AdminShell>
        <h1>Certifications</h1>

        <form className="form" onSubmit={submit}>
          <div className="grid grid-2">

            <div className="field">
              <label>Title</label>

              <input
                className="input"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Issuer</label>

              <input
                className="input"
                value={form.issuer}
                onChange={(e) =>
                  setForm({
                    ...form,
                    issuer: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="field">
            <label>Issue Date</label>

            <input
              type="date"
              className="input"
              value={form.issue_date}
              onChange={(e) =>
                setForm({
                  ...form,
                  issue_date: e.target.value,
                })
              }
            />
          </div>

          {/* Upload Image */}

          <div className="field">
            <label>Certificate Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                try {
                  setUploadingImage(true);

                  const result =
                    await uploadImage(file);

                  setForm((prev) => ({
                    ...prev,
                    image_url: result.url,
                  }));
                } finally {
                  setUploadingImage(false);
                }
              }}
            />

            {uploadingImage && (
              <p>Uploading image...</p>
            )}

            {form.image_url && (
              <img
                src={form.image_url}
                alt=""
                style={{
                  width: 200,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              />
            )}
          </div>

          {/* Upload PDF */}

          <div className="field">
            <label>Certificate PDF</label>

            <input
              type="file"
              accept=".pdf"
              onChange={async (e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                try {
                  setUploadingPdf(true);

                  const result =
                    await uploadDocument(file);

                  setForm((prev) => ({
                    ...prev,
                    certificate_url: result.url,
                  }));
                } finally {
                  setUploadingPdf(false);
                }
              }}
            />

            {uploadingPdf && (
              <p>Uploading PDF...</p>
            )}

            {form.certificate_url && (
              <a
                href={form.certificate_url}
                target="_blank"
                rel="noreferrer"
              >
                View uploaded certificate
              </a>
            )}
          </div>

          <button
            className="btn primary"
            type="submit"
          >
            {editingId
              ? "Update Certification"
              : "Create Certification"}
          </button>
        </form>

        <div className="section">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Issuer</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.title}</td>

                  <td>{item.issuer}</td>

                  <td>
                    <div className="chips">
                      <button
                        className="chip"
                        type="button"
                        onClick={() => edit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="chip"
                        type="button"
                        onClick={async () => {
                          await deleteCertification(
                            item.id
                          );

                          await load();
                        }}
                      >
                        Delete
                      </button>
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