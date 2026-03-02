
"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { SectionRenderer } from "@/components/SectionRenderer";
import { ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [signedContracts, setSignedContracts] = useState<ContractGenerationOutput[]>([]);

  const handleContractSigned = (contract: ContractGenerationOutput) => {
    setSignedContracts((prev) => [contract, ...prev]);
  };

  return (
    <Shell activeSection={activeSection} onNavigate={setActiveSection}>
      <SectionRenderer 
        sectionId={activeSection} 
        onNavigate={setActiveSection} 
        signedContracts={signedContracts}
        onContractSigned={handleContractSigned}
      />
    </Shell>
  );
}
