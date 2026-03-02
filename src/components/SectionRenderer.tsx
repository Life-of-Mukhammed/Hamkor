
"use client";

import { Dashboard } from "@/components/sections/Dashboard";
import { AuctionHub } from "@/components/sections/AuctionHub";
import { LogisticsHub } from "@/components/sections/LogisticsHub";
import { AiSecurity } from "@/components/sections/AiSecurity";
import { EriWorkflow } from "@/components/sections/EriWorkflow";
import { Contracts } from "@/components/sections/Contracts";
import { Marketplace } from "@/components/sections/Marketplace";
import { Hammer } from "lucide-react";
import { ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";

interface SectionRendererProps {
  sectionId: string;
  onNavigate?: (id: string) => void;
  signedContracts?: ContractGenerationOutput[];
  onContractSigned?: (contract: ContractGenerationOutput) => void;
}

export function SectionRenderer({ 
  sectionId, 
  onNavigate, 
  signedContracts = [], 
  onContractSigned 
}: SectionRendererProps) {
  switch (sectionId) {
    case 'dashboard': return <Dashboard />;
    case 'marketplace': return <Marketplace />;
    case 'auction': return <AuctionHub onNavigate={onNavigate} />;
    case 'logistics': return <LogisticsHub />;
    case 'aiSecurity': return <AiSecurity />;
    case 'eri': return <EriWorkflow onContractSigned={onContractSigned} />;
    case 'contracts': return <Contracts contracts={signedContracts} />;
    default:
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Hammer size={48} className="text-muted-foreground opacity-20" />
          </div>
          <h2 className="text-2xl font-black text-muted-foreground">Тез орада...</h2>
          <p className="text-muted-foreground max-w-xs mt-2">
            Ушбу бўлим ҳозирда ишлаб чиқилмоқда ва тез орада фаоллаштирилади.
          </p>
        </div>
      );
  }
}
