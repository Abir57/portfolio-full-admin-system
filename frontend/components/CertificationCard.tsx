export default function CertificationCard({ item }: { item: any }) {
  return (
    <article className="card">
      {item.image_url ? (
        <img className="thumb" src={item.image_url} alt={item.title} />
      ) : null}

      <h3>{item.title}</h3>
      <p className="meta">{item.issuer}</p>
      <p className="meta">{item.issue_date}</p>

      {item.certificate_url ? (
        <a
          href={item.certificate_url}
          target="_blank"
          rel="noreferrer"
          className="btn primary"
        >
          View Certificate
        </a>
      ) : null}
    </article>
  );
}