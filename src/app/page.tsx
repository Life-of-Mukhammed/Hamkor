
"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { SectionRenderer } from "@/components/SectionRenderer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <Shell activeSection={activeSection} onNavigate={setActiveSection}>
      <SectionRenderer sectionId={activeSection} />
    </Shell>
  );
}
