"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import ExperienceCard from "@/components/ExperienceCard";
import { getExperiences } from "@/lib/api";

export default function ExperiencePage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getExperiences().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <>
      <Navbar />
      <main className="page container">
        <SectionHeader title="Professional experience" subtitle="Experience loaded from backend." />
        <div className="grid grid-2">
          {items.map((item) => <ExperienceCard key={item.id} item={item} />)}
        </div>
      </main>
    </>
  );
}
