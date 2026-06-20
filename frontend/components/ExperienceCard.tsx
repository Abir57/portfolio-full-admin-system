export default function ExperienceCard({ item }: { item: any }) {
  return (
    <article className="card">
      <h3>{item.company_name}</h3>
      <p className="meta">
        <strong>{item.position}</strong><br />
        {item.start_date} — {item.end_date || "Present"}
      </p>
      <p className="meta">{item.description}</p>
    </article>
  );
}
