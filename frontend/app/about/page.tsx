"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import { getProfile } from "@/lib/api";
import {
  Mail,
  MessageCircle,
  Link,
  GraduationCap,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  GitBranch,
} from "lucide-react";

export default function AboutPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="page container">
          <div className="card">Loading profile...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page container">
        <SectionHeader
          title="About Me"
          subtitle="Cyber Security Engineer passionate about secure systems, AI, cloud and professional digital solutions."
        />

        <div className="about-layout">
          <div className="card about-main">
            <div className="about-top">
              <div>
                <div className="kicker">
                  <ShieldCheck size={18} />
                  {profile.title}
                </div>

                <h1 className="about-name">{profile.full_name}</h1>

                <p className="meta">{profile.summary}</p>

                <div className="chips">
                  {profile.focus_areas?.map((item: string) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>

                <div className="actions" style={{ marginTop: "20px" }}>
                  <a href={profile.cv_url} download className="btn primary">
                    Download CV
                  </a>
                  <a href="/contact" className="btn">
                    Contact Me
                  </a>
                </div>

                <div className="contact-strip">
                  <a className="contact-pill" href={profile.linkedin_url} target="_blank" rel="noreferrer">
                    <Link size={16} /> LinkedIn
                  </a>
                  <a className="contact-pill" href={profile.github_url} target="_blank" rel="noreferrer">
                    <GitBranch size={16} /> GitHub
                  </a>
                  <a className="contact-pill" href={`mailto:${profile.email}`}>
                    <Mail size={16} /> Email
                  </a>
                  <a className="contact-pill" href={profile.whatsapp_url} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="profile-wrapper about-photo">
                <div className="profile-glow"></div>
                <Image
                  src={profile.image_url || "/profile.jpg"}
                  alt={profile.full_name}
                  width={460}
                  height={560}
                  className="profile-image"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="card">
              <h3 className="card-title">
                <GraduationCap size={18} /> Education
              </h3>

              <div className="timeline">
                {profile.education?.map((item: any) => (
                  <div key={item.school} className="timeline-item">
                    <strong>{item.school}</strong>
                    <div className="meta">{item.period}</div>
                    <div className="meta">{item.degree}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">
                <BriefcaseBusiness size={18} /> Professional Focus
              </h3>

              <p className="meta">
                Looking for a summer internship to strengthen threat analysis, anomaly detection,
                incident management, infrastructure protection, security auditing, and AI/cloud security solutions.
              </p>

              <div className="chips" style={{ marginTop: 14 }}>
                <span className="chip">Threat Analysis</span>
                <span className="chip">Incident Response</span>
                <span className="chip">Security Auditing</span>
                <span className="chip">AI / Cloud Security</span>
              </div>
            </div>
          </div>

          <div className="section">
            <SectionHeader
              title="Experience Highlights"
              subtitle="Key internships and practical work from the CV."
            />

            <div className="grid grid-2">
              {profile.experiences?.map((exp: any) => (
                <div key={exp.title + exp.period} className="card">
                  <h3>{exp.title}</h3>
                  <p className="meta"><strong>{exp.period}</strong></p>
                  <p className="meta">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="section grid grid-2">
            <div className="card">
              <h3 className="card-title">
                <Sparkles size={18} /> Skills
              </h3>

              <div className="chips">
                {profile.skills?.map((skill: string) => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">
                <ShieldCheck size={18} /> Certifications
              </h3>

              <div className="chips">
                {profile.certifications?.map((cert: string) => (
                  <span key={cert} className="chip">{cert}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}