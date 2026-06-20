"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AdminShell from "@/components/AdminShell";
import { getProfile, updateProfile, uploadImage, uploadDocument } from "@/lib/api";
import {
  ShieldCheck,
  GraduationCap,
  BriefcaseBusiness,
  Sparkles,
  Mail,
  MessageCircle,
  Link,
} from "lucide-react";

export default function AdminAboutPage() {
  const [form, setForm] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  useEffect(() => {
    getProfile().then((data) => {
      setForm({
        ...data,
        focus_areas_text: (data.focus_areas || []).join("\n"),
        education_text: (data.education || [])
          .map((e: any) => `${e.school} | ${e.period} | ${e.degree}`)
          .join("\n"),
        experiences_text: (data.experiences || [])
          .map((e: any) => `${e.title} | ${e.period} | ${e.description}`)
          .join("\n"),
        skills_text: (data.skills || []).join("\n"),
        certifications_text: (data.certifications || []).join("\n"),
      });
    });
  }, []);

  if (!form) {
    return (
      <>
        <Navbar />
        <AdminShell>
          <div className="card">Loading...</div>
        </AdminShell>
      </>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      full_name: form.full_name,
      title: form.title,
      summary: form.summary,
      location: form.location,
      email: form.email,
      phone: form.phone,
      linkedin_url: form.linkedin_url,
      github_url: form.github_url,
      whatsapp_url: form.whatsapp_url,
      cv_url: form.cv_url,
      image_url: form.image_url,
      focus_areas: form.focus_areas_text
        .split("\n")
        .map((x: string) => x.trim())
        .filter(Boolean),
      education: form.education_text
        .split("\n")
        .map((line: string) => {
          const [school, period, degree] = line.split("|").map((x: string) => x.trim());
          return { school, period, degree };
        })
        .filter((x: any) => x.school && x.period && x.degree),
      experiences: form.experiences_text
        .split("\n")
        .map((line: string) => {
          const [title, period, description] = line.split("|").map((x: string) => x.trim());
          return { title, period, description };
        })
        .filter((x: any) => x.title && x.period && x.description),
      skills: form.skills_text.split("\n").map((x: string) => x.trim()).filter(Boolean),
      certifications: form.certifications_text.split("\n").map((x: string) => x.trim()).filter(Boolean),
    };

    await updateProfile(payload);
    setMessage("Profile updated successfully.");
  };

  return (
    <>
      <Navbar />

      <AdminShell>
        <div className="admin-about-page">
          <div className="admin-about-header">
            <div>
              <h1>About / CV Manager</h1>
              <p className="meta">
                Update your profile, CV, links, image and professional sections without touching code.
              </p>
            </div>

            <div className="admin-about-badge">
              <ShieldCheck size={18} />
              Cyber Security Profile
            </div>
          </div>

          <div className="admin-about-grid">
            <div className="card admin-about-form-card">
              <form className="form" onSubmit={submit}>
                <div className="grid grid-2">
                  <div className="field">
                    <label>Full Name</label>
                    <input
                      className="input"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Title</label>
                    <input
                      className="input"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Summary</label>
                  <textarea
                    className="textarea admin-textarea"
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  />
                </div>

                <div className="grid grid-2">
                  <div className="field">
                    <label>Email</label>
                    <input
                      className="input"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Phone</label>
                    <input
                      className="input"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-2">
                  <div className="field">
                    <label>
                      <Link size={14} /> LinkedIn URL
                    </label>
                    <input
                      className="input"
                      value={form.linkedin_url}
                      onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
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

                <div className="grid grid-2">
                  <div className="field">
                    <label>
                      <MessageCircle size={14} /> WhatsApp URL
                    </label>
                    <input
                      className="input"
                      value={form.whatsapp_url}
                      onChange={(e) => setForm({ ...form, whatsapp_url: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Location</label>
                    <input
                      className="input"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="upload-grid">
                  <div className="upload-card">
                    <div className="upload-card-title">
                      <span>CV PDF</span>
                      <small>Upload your CV in PDF format</small>
                    </div>

                    <label className="upload-button">
                      {uploadingCv ? "Uploading CV..." : "Upload CV PDF"}
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          try {
                            setUploadingCv(true);
                            const result = await uploadDocument(file);
                            setForm((prev: any) => ({
                              ...prev,
                              cv_url: result.url,
                            }));
                          } finally {
                            setUploadingCv(false);
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>

                    {form.cv_url ? (
                      <a
                        href={form.cv_url}
                        target="_blank"
                        rel="noreferrer"
                        className="upload-preview-link"
                      >
                        View uploaded CV
                      </a>
                    ) : null}
                  </div>

                  <div className="upload-card">
                    <div className="upload-card-title">
                      <span>Profile Image</span>
                      <small>Upload your profile picture</small>
                    </div>

                    <label className="upload-button">
                      {uploadingImage ? "Uploading image..." : "Upload Profile Image"}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          try {
                            setUploadingImage(true);
                            const result = await uploadImage(file);
                            setForm((prev: any) => ({
                              ...prev,
                              image_url: result.url,
                            }));
                          } finally {
                            setUploadingImage(false);
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>

                    {form.image_url ? (
                      <div className="upload-preview-image-wrap">
                        <Image
                          src={form.image_url}
                          alt="Profile preview"
                          width={220}
                          height={220}
                          className="upload-preview-image"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="field">
                  <label>Focus Areas (one per line)</label>
                  <textarea
                    className="textarea admin-textarea"
                    value={form.focus_areas_text}
                    onChange={(e) => setForm({ ...form, focus_areas_text: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label>Education (format: School | Period | Degree)</label>
                  <textarea
                    className="textarea admin-textarea"
                    value={form.education_text}
                    onChange={(e) => setForm({ ...form, education_text: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label>Experience Highlights (format: Title | Period | Description)</label>
                  <textarea
                    className="textarea admin-textarea"
                    value={form.experiences_text}
                    onChange={(e) => setForm({ ...form, experiences_text: e.target.value })}
                  />
                </div>

                <div className="grid grid-2">
                  <div className="field">
                    <label>
                      <Sparkles size={14} /> Skills (one per line)
                    </label>
                    <textarea
                      className="textarea admin-textarea"
                      value={form.skills_text}
                      onChange={(e) => setForm({ ...form, skills_text: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>
                      <BriefcaseBusiness size={14} /> Certifications (one per line)
                    </label>
                    <textarea
                      className="textarea admin-textarea"
                      value={form.certifications_text}
                      onChange={(e) => setForm({ ...form, certifications_text: e.target.value })}
                    />
                  </div>
                </div>

                <button className="btn primary admin-save-btn" type="submit">
                  Save Profile
                </button>

                {message ? <div className="notice">{message}</div> : null}
              </form>
            </div>

            <aside className="card admin-about-side">
              <div className="side-preview">
                <div className="side-preview-head">
                  <ShieldCheck size={18} />
                  Live preview
                </div>

                <h2>{form.full_name}</h2>
                <p className="meta">{form.title}</p>

                <div className="side-image-box">
                  {form.image_url ? (
                    <Image
                      src={form.image_url}
                      alt="preview"
                      width={300}
                      height={380}
                      className="side-image"
                    />
                  ) : (
                    <div className="side-image-placeholder">No image uploaded</div>
                  )}
                </div>

                <div className="side-link-box">
                  <div>
                    <strong>CV</strong>
                    <p className="meta">{form.cv_url ? "Uploaded" : "Not uploaded yet"}</p>
                  </div>
                  {form.cv_url ? (
                    <a href={form.cv_url} target="_blank" rel="noreferrer" className="chip">
                      Open CV
                    </a>
                  ) : null}
                </div>

                <div className="side-mini-grid">
                  <div className="mini-box">
                    <Mail size={14} />
                    <span>{form.email}</span>
                  </div>
                  <div className="mini-box">
                    <MessageCircle size={14} />
                    <span>{form.phone}</span>
                  </div>
                </div>

                <p className="meta" style={{ marginTop: 14 }}>
                  Use the upload buttons to replace the CV or profile image directly from the admin panel.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </AdminShell>
    </>
  );
}