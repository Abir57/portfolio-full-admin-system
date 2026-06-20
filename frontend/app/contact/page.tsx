import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import { Mail, GitBranch, Link, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const profile = {
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
    email: "your@email.com",
    whatsapp_url: "https://wa.me/0000000000",
  };

  return (
    <>
      <Navbar />

      <main className="page container">
        <SectionHeader
          title="Contact"
          subtitle="Internships, cybersecurity projects, collaborations."
        />

        <div className="grid grid-2">

          {/* LEFT MODERN CARD */}
          <div className="card contact-media-card">

            {/* IMAGE CYBER EN HAUT */}
            <div className="contact-image">
              <img
                src="/cyber.jpg"
                alt="Cyber Security"
              />
            </div>

            {/* ICONS EN BAS */}
            <div className="contact-icons-only">
              <a href={profile.linkedin_url} target="_blank">
                <Link size={18} />
              </a>

              <a href={profile.github_url} target="_blank">
                <GitBranch size={18} />
              </a>

              <a href={`mailto:${profile.email}`}>
                <Mail size={18} />
              </a>

              <a href={profile.whatsapp_url} target="_blank">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* FORM */}
          <div className="card">
            <ContactForm />
          </div>

        </div>
      </main>
    </>
  );
}