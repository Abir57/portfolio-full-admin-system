export default function SkillCard({ item }: { item: any }) {
  return (
    <article className="card">
      <h3>{item.name}</h3>
      <p className="meta">{item.category}</p>
      <div className="chips">
        <span className="chip">{item.level}%</span>
      </div>
    </article>
  );
}
