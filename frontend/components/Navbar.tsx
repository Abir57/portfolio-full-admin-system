import Link from "next/link";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/experience", "Experience"],
  ["/projects", "Projects"],
  ["/skills", "Skills"],
  ["/certifications", "Certifications"],
  ["/contact", "Contact"],
  
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span className="brand-badge" />
          <span>Portfolio</span>
        </Link>
        <nav className="nav-links">
          {links.map(([href, label]) => (
            <Link key={href} href={href as string}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
