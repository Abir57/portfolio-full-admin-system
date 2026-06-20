export default function ProjectCard({ project }: { project: any }) {
  return (
    <article className="card">
      {project.cover_url ? (
        <img className="thumb" src={project.cover_url} alt={project.title} />
      ) : null}

      <h3>{project.title}</h3>
      <p className="meta">{project.description}</p>

      {project.technologies?.length ? (
        <div className="chips">
          {project.technologies.map((tech: string) => (
            <span key={tech} className="chip">{tech}</span>
          ))}
        </div>
      ) : null}

      <div className="chips" style={{ marginTop: 12 }}>
        {project.demo_url ? (
          <a href={project.demo_url} target="_blank" rel="noreferrer" className="chip">
            Demo
          </a>
        ) : null}

        {project.github_url ? (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="chip">
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}