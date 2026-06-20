export default function MediaGallery({ media }: { media: any[] }) {
  if (!media?.length) return null;

  return (
    <div className="grid grid-2" style={{ marginTop: 12 }}>
      {media.map((m) => (
        <div key={m.id} className="card">
          {m.media_type === "video" ? (
            <video controls src={m.media_url} className="thumb" />
          ) : (
            <img src={m.media_url} className="thumb" alt={m.caption || "media"} />
          )}
          {m.caption ? <p className="meta">{m.caption}</p> : null}
        </div>
      ))}
    </div>
  );
}
