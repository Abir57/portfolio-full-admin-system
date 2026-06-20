"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import { getCertifications } from "@/lib/api";

export default function CertificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="page container">
        <SectionHeader
          title="Certifications"
          subtitle="Validated certificates, training and technical achievements."
        />

        {loading ? (
          <div className="card">Loading certifications...</div>
        ) : items.length === 0 ? (
          <div className="card">No certifications found.</div>
        ) : (
          <div className="grid grid-3">
            {items.map((item) => (
              <div key={item.id} className="card">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="thumb"
                  />
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
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}