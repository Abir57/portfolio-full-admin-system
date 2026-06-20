import Image from "next/image";
import {
  ShieldCheck,
  GitBranch,
  Mail,
  MessageCircle,
  Link,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">

        <div className="hero-card fade-up">

          <div>

            <div className="kicker">
              <ShieldCheck size={18} />
              Cyber Security Engineer
            </div>

            <h1 className="title">
              Abir Baya
            </h1>

            <p className="subtitle">
              I am a Cyber Security Engineer passionate about securing
              applications, protecting digital infrastructures and
              developing innovative solutions that combine security,
              performance and modern technologies.
            </p>

            <div className="chips">
              <span className="chip">Cyber Security</span>
              <span className="chip">Web Security</span>
              <span className="chip">Cloud Security</span>
              <span className="chip">AI Security</span>
              <span className="chip">Mobile Security</span>
              <span className="chip">Secure Development</span>
            </div>

            <div className="actions">
              <a href="/projects" className="btn primary">
                My Projects
              </a>

              <a href="/contact" className="btn">
                Contact Me
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "25px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://linkedin.com/in/YOUR-LINKEDIN"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                <Link size={18} />
              </a>

              <a
                href="https://github.com/YOUR-GITHUB"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                <GitBranch size={18} />
              </a>

              <a
                href="mailto:yourmail@gmail.com"
                className="btn"
              >
                <Mail size={18} />
              </a>

              <a
                href="https://wa.me/216XXXXXXXX"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                <MessageCircle size={18} />
              </a>
            </div>

            <div className="section">

              <div className="stats">

                <div className="stat">
                  <strong>Cyber Security</strong>
                  <span>Application & Web Security</span>
                </div>

                <div className="stat">
                  <strong>Cloud Security</strong>
                  <span>Infrastructure Protection</span>
                </div>

                <div className="stat">
                  <strong>AI Security</strong>
                  <span>Emerging Technologies</span>
                </div>

              </div>

            </div>

          </div>

          <div className="profile-wrapper">

            <div className="profile-glow"></div>

            <Image
              src="/profile.jpg"
              alt="Abir Baya"
              width={450}
              height={550}
              className="profile-image"
              priority
            />

          </div>

        </div>

      </div>
    </section>
  );
}