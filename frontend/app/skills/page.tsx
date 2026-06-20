"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import SkillCard from "@/components/SkillCard";
import { getSkills } from "@/lib/api";

export default function SkillsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getSkills().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <>
      <Navbar />
      <main className="page container">
        <SectionHeader title="Skills" subtitle="Technical and professional skills." />
        <div className="grid grid-3">
          {items.map((item) => <SkillCard key={item.id} item={item} />)}
        </div>
      </main>
    </>
  );
}
