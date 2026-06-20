"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import AdminShell from "@/components/AdminShell";
import {
  ShieldCheck,
  FolderKanban,
  BriefcaseBusiness,
  GraduationCap,
  MessageSquare,
  User,
  Award,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const cards = [
    {
      title: "About / CV",
      desc: "Manage profile, CV and personal information",
      icon: User,
      href: "/admin/about",
    },
    {
      title: "Projects",
      desc: "Manage portfolio projects and media",
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Experience",
      desc: "Manage professional experience",
      icon: BriefcaseBusiness,
      href: "/admin/experience",
    },
    {
      title: "Skills",
      desc: "Manage technical skills",
      icon: ShieldCheck,
      href: "/admin/skills",
    },
    {
      title: "Certifications",
      desc: "Manage certifications and training",
      icon: Award,
      href: "/admin/certifications",
    },
    {
      title: "Messages",
      desc: "View contact requests",
      icon: MessageSquare,
      href: "/admin/messages",
    },
  ];

  return (
    <>
      <Navbar />

      <AdminShell>
        <div className="dashboard-modern">

          <div className="dashboard-hero">
            <div>
              <span className="dashboard-badge">
                Cyber Security Portfolio
              </span>

              <h1>
                Admin Control Center
              </h1>

              <p>
                Manage your portfolio, projects, certifications,
                skills and professional profile from a single dashboard.
              </p>
            </div>

            <div className="dashboard-hero-icon">
              <ShieldCheck size={70} />
            </div>
          </div>

          <div className="dashboard-stats">

            <div className="stat-card">
              <h3>Projects</h3>
              <span>Portfolio Management</span>
            </div>

            <div className="stat-card">
              <h3>Experience</h3>
              <span>Career Timeline</span>
            </div>

            <div className="stat-card">
              <h3>Messages</h3>
              <span>Client Requests</span>
            </div>

            <div className="stat-card">
              <h3>Security</h3>
              <span>Cyber Profile</span>
            </div>

          </div>

          <h2 className="dashboard-section-title">
            Quick Access
          </h2>

          <div className="dashboard-grid">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="dashboard-card"
                >
                  <div className="dashboard-card-top">
                    <Icon size={28} />
                  </div>

                  <h3>{card.title}</h3>

                  <p>{card.desc}</p>

                  <span>
                    Open Module
                    <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </AdminShell>
    </>
  );
}