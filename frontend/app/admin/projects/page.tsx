"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AdminShell from "@/components/AdminShell";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  uploadImage,
  uploadVideo,
} from "@/lib/api";

const empty = {
  title: "",
  description: "",
  technologies_text: "",
  github_url: "",
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [coverImage, setCoverImage] = useState<string>("");
  const [demoVideo, setDemoVideo] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const load = async () => {
    try {
      setItems(await getProjects());
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const parseList = (txt: string) =>
    txt.split(",").map((s) => s.trim()).filter(Boolean);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingUpload(true);
    try {
      const res = await uploadImage(file);
      setCoverImage(res.url);
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const handleDemoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingUpload(true);
    try {
      const res = await uploadVideo(file);
      setDemoVideo(res.url);
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setLoadingUpload(true);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const res = await uploadImage(file);
        uploaded.push(res.url);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const handleVideosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setLoadingUpload(true);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const res = await uploadVideo(file);
        uploaded.push(res.url);
      }
      setVideos((prev) => [...prev, ...uploaded]);
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      cover_url: coverImage || null,
      technologies: parseList(form.technologies_text),
      demo_url: demoVideo || null,
      github_url: form.github_url || null,
      media: [
        ...images.map((url) => ({
          media_type: "image",
          media_url: url,
          caption: "",
        })),
        ...videos.map((url) => ({
          media_type: "video",
          media_url: url,
          caption: "",
        })),
      ],
    };

    if (editingId) await updateProject(editingId, payload);
    else await createProject(payload);

    setForm(empty);
    setEditingId(null);
    setCoverImage("");
    setDemoVideo("");
    setImages([]);
    setVideos([]);
    await load();
  };

  const edit = (p: any) => {
    setEditingId(p.id);
    setForm({
      title: p.title || "",
      description: p.description || "",
      technologies_text: (p.technologies || []).join(", "),
      github_url: p.github_url || "",
    });

    setCoverImage(p.cover_url || "");
    setDemoVideo(p.demo_url || "");

    setImages((p.media || []).filter((m: any) => m.media_type === "image").map((m: any) => m.media_url));
    setVideos((p.media || []).filter((m: any) => m.media_type === "video").map((m: any) => m.media_url));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      <AdminShell>
        <h1>Projects</h1>

        <form className="form" onSubmit={submit}>
          <div className="grid grid-2">
            <div className="field">
              <label>Title</label>
              <input
                className="input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="field">
              <label>GitHub URL</label>
              <input
                className="input"
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              className="textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Technologies (comma separated)</label>
            <input
              className="input"
              value={form.technologies_text}
              onChange={(e) =>
                setForm({ ...form, technologies_text: e.target.value })
              }
            />
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label>Upload Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="input"
              />
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="cover"
                  className="thumb"
                  style={{ marginTop: 12 }}
                />
              ) : null}
            </div>

            <div className="field">
              <label>Upload Demo Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleDemoUpload}
                className="input"
              />
              {demoVideo ? (
                <video
                  src={demoVideo}
                  controls
                  className="thumb"
                  style={{ marginTop: 12 }}
                />
              ) : null}
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label>Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesUpload}
                className="input"
              />
            </div>

            <div className="field">
              <label>Upload Videos</label>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleVideosUpload}
                className="input"
              />
            </div>
          </div>

          {loadingUpload ? (
            <div className="notice">Uploading files...</div>
          ) : null}

          {images.length > 0 ? (
            <div className="section">
              <h3>Project Images</h3>
              <div className="grid grid-3">
                {images.map((url, index) => (
                  <div key={url + index} className="card">
                    <img src={url} alt={`image-${index}`} className="thumb" />
                    <button
                      type="button"
                      className="chip"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {videos.length > 0 ? (
            <div className="section">
              <h3>Project Videos</h3>
              <div className="grid grid-2">
                {videos.map((url, index) => (
                  <div key={url + index} className="card">
                    <video src={url} controls className="thumb" />
                    <button
                      type="button"
                      className="chip"
                      onClick={() => removeVideo(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <button className="btn primary" type="submit">
            {editingId ? "Update Project" : "Create Project"}
          </button>
        </form>

        <div className="section">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>
                    <div className="chips">
                      <button
                        className="chip"
                        onClick={() => edit(p)}
                        type="button"
                      >
                        Edit
                      </button>

                      <button
                        className="chip"
                        onClick={async () => {
                          await deleteProject(p.id);
                          await load();
                        }}
                        type="button"
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