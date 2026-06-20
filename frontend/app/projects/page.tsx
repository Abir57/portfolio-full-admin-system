"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import { getProjects } from "@/lib/api";

export default function ProjectsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="page container">
        <SectionHeader
          title="Projects"
          subtitle="Each project can include multiple images, videos, technologies and links."
        />

        {loading ? (
          <div className="card">Loading projects...</div>
        ) : items.length === 0 ? (
          <div className="card">No projects found.</div>
        ) : (
          <div className="grid grid-2">
            {items.map((project) => (
              <div key={project.id} className="card">
                {project.cover_url ? (
                  <img
                    src={project.cover_url}
                    alt={project.title}
                    className="thumb"
                  />
                ) : null}

                <h3>{project.title}</h3>
                <p className="meta">{project.description}</p>

                {project.technologies?.length ? (
                  <div className="chips">
                    {project.technologies.map((tech: string) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="section">
                  {project.demo_url ? (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn primary"
                      style={{ marginRight: 10 }}
                    >
                      View Demo
                    </a>
                  ) : null}

                  {project.github_url ? (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn"
                    >
                      GitHub
                    </a>
                  ) : null}
                </div>

                {project.media?.length ? (
                  <div className="section">
                    <div className="grid grid-2">
                      {project.media.map((m: any, index: number) =>
                        m.media_type === "video" ? (
                          <video
                            key={index}
                            controls
                            src={m.media_url}
                            className="thumb"
                          />
                        ) : (
                          <img
                            key={index}
                            src={m.media_url}
                            alt={m.caption || project.title}
                            className="thumb"
                          />
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}