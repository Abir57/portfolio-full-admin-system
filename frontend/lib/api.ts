const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function request(path: string, options?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

/* ================= PROFILE ================= */

export const getProfile = () => request("/profile/");

export const updateProfile = (data: any) =>
  request("/profile/", {
    method: "PUT",
    body: JSON.stringify(data),
  });

/* ================= PROJECTS ================= */

export const getProjects = () => request("/projects/");

export const createProject = (data: any) =>
  request("/projects/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateProject = (id: number, data: any) =>
  request(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteProject = (id: number) =>
  request(`/projects/${id}`, {
    method: "DELETE",
  });

/* ================= EXPERIENCES ================= */

export const getExperiences = () => request("/experiences/");

export const createExperience = (data: any) =>
  request("/experiences/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateExperience = (id: number, data: any) =>
  request(`/experiences/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteExperience = (id: number) =>
  request(`/experiences/${id}`, {
    method: "DELETE",
  });

/* ================= SKILLS ================= */

export const getSkills = () => request("/skills/");

export const createSkill = (data: any) =>
  request("/skills/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateSkill = (id: number, data: any) =>
  request(`/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteSkill = (id: number) =>
  request(`/skills/${id}`, {
    method: "DELETE",
  });

/* ================= CERTIFICATIONS ================= */

export const getCertifications = () => request("/certifications/");

export const createCertification = (data: any) =>
  request("/certifications/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCertification = (id: number, data: any) =>
  request(`/certifications/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteCertification = (id: number) =>
  request(`/certifications/${id}`, {
    method: "DELETE",
  });

/* ================= CONTACT ================= */

export const sendMessage = (data: any) =>
  request("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getMessages = () => request("/messages");

/* ================= AUTH ================= */

export const loginAdmin = (data: any) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

/* ================= UPLOAD IMAGE ================= */

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API}/upload/image`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  return res.json();
}

/* ================= UPLOAD VIDEO ================= */

export async function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API}/upload/video`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Video upload failed");
  }

  return res.json();
}

/* ================= UPLOAD DOCUMENT ================= */

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API}/upload/document`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Document upload failed");
  }

  return res.json();
}