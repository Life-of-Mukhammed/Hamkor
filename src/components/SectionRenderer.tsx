
"use client";

import { Dashboard } from "@/components/sections/Dashboard";
import { AuctionHub } from "@/components/sections/AuctionHub";
import { LogisticsHub } from "@/components/sections/LogisticsHub";
import { AiSecurity } from "@/components/sections/AiSecurity";
import { EriWorkflow } from "@/components/sections/EriWorkflow";
import { Contracts } from "@/components/sections/Contracts";
import { Marketplace } from "@/components/sections/Marketplace";
import { Offers } from "@/components/sections/Offers";
import { Inventory } from "@/components/sections/Inventory";
import { Finance } from "@/components/sections/Finance";
import { Settings } from "@/components/sections/Settings";
import { Hammer } from "lucide-react";
import { ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";
import { Language } from "@/lib/translations";

interface SectionRendererProps {
  sectionId: string;
  onNavigate?: (id: string) => void;
  signedContracts?: ContractGenerationOutput[];
  onContractSigned?: (contract: ContractGenerationOutput) => void;
  lang?: Language;
  t?: any;
}

export function SectionRenderer({ 
  sectionId, 
  onNavigate, 
  signedContracts = [], 
  onContractSigned,
  lang = 'uz',
  t
}: SectionRendererProps) {
  switch (sectionId) {
    case 'dashboard': return <Dashboard lang={lang} />;
    case 'marketplace': return <Marketplace t={t} />;
    case 'auction': return <AuctionHub onNavigate={onNavigate} />;
    case 'logistics': return <LogisticsHub lang={lang} />;
    case 'aiSecurity': return <AiSecurity t={t} />;
    case 'eri': return <EriWorkflow onContractSigned={onContractSigned} t={t} />;
    case 'contracts': return <Contracts contracts={signedContracts} />;
    case 'offers': return <Offers />;
    case 'inventory': return <Inventory />;
    case 'finance': return <Finance />;
    case 'settings': return <Settings lang={lang} />;
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
