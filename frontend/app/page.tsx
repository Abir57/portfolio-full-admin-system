import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="page">

        <Hero />

        <section className="container section">

          <SectionHeader
            title="About Me"
            subtitle="Cyber Security Engineer passionate about protecting systems, securing applications and building reliable digital solutions."
          />

          <div className="grid grid-3">

            <div className="card">
              <h3>Cyber Security</h3>

              <p className="meta">
                Specialized in application security,
                secure coding practices, vulnerability assessment
                and web security.
              </p>
            </div>

            <div className="card">
              <h3>Cloud & AI Security</h3>

              <p className="meta">
                Interested in cloud security,
                infrastructure protection,
                AI security and modern cybersecurity challenges.
              </p>
            </div>

            <div className="card">
              <h3>Continuous Learning</h3>

              <p className="meta">
                Always improving my knowledge through
                certifications, practical projects,
                research and hands-on experience.
              </p>
            </div>

          </div>

        </section>

      </main>
    </>
  );
}