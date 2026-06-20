import Link from "next/link";

const items = [
  ["/admin/dashboard", "Dashboard"],
  ["/admin/about", "About / CV"],
  ["/admin/projects", "Projects"],
  ["/admin/experience", "Experience"],
  ["/admin/skills", "Skills"],
  ["/admin/certifications", "Certifications"],
  ["/admin/messages", "Messages"],
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <div className="container admin-shell">
        <aside className="card sidebar">
          <div className="brand" style={{ marginBottom: 18 }}>
            <span className="brand-badge" />
            <span>Admin Panel</span>
          </div>

          {items.map(([href, label]) => (
            <Link key={href} href={href as string}>
              {label}
            </Link>
          ))}
        </aside>

        <main className="card panel">{children}</main>
      </div>
    </div>
  );
}