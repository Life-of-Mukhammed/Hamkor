
"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutGrid, Gavel, FileText, ShoppingBag, Briefcase, 
  Box, BarChart, Camera, Building2, BookOpen, 
  X, Sparkles, ChevronRight, Handshake
} from "lucide-react";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { id: 'dashboard', label: dict.sections.dashboard, icon: LayoutGrid },
  { id: 'marketplace', label: dict.sections.marketplace, icon: ShoppingBag },
  { id: 'auction', label: dict.sections.auction, icon: Gavel },
  { id: 'contracts', label: dict.sections.contracts, icon: FileText },
  { id: 'offers', label: dict.sections.offers, icon: Briefcase },
  { id: 'inventory', label: dict.sections.inventory, icon: Box },
  { id: 'finance', label: dict.sections.finance, icon: BarChart },
  { id: 'documents', label: dict.sections.documents, icon: Camera },
  { id: 'investments', label: dict.sections.investments, icon: Building2 },
  { id: 'guide', label: dict.sections.guide, icon: BookOpen },
];

interface ShellProps {
  children: React.ReactNode;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Shell({ children, activeSection, onNavigate }: ShellProps) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r border-slate-100 bg-white shadow-none">
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Handshake size={22} />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-[#2563eb]">{dict.appName}</h1>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3 mt-2">
          <SidebarMenu className="gap-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={activeSection === item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full px-4 py-5 rounded-xl transition-all duration-300 group",
                    activeSection === item.id 
                      ? "bg-[#2563eb] text-white shadow-lg shadow-blue-400/30" 
                      : "hover:bg-slate-50 text-slate-500 hover:text-[#2563eb]"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", activeSection === item.id ? "text-white" : "text-slate-400 group-hover:text-[#2563eb]")} />
                  <span className="font-bold text-[10px] ml-2 uppercase tracking-wider">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <div className="mt-6 px-2">
            <div className="relative bg-[#3b59f8] rounded-[24px] p-5 text-white overflow-hidden shadow-xl shadow-blue-500/20">
              <button className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors">
                <X size={14} />
              </button>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="text-[11px] font-black mb-1 uppercase tracking-tighter">
                🚀 ПРЕМИУМГА ЎТИНГ
              </h3>
              <p className="text-[9px] font-medium text-white/70 leading-tight mb-4 uppercase tracking-tight">
                AI инструментлари ва таҳлилни фаоллаштиринг
              </p>
              <Button 
                variant="secondary" 
                className="w-full h-10 bg-white text-[#3b59f8] hover:bg-white/90 rounded-xl font-black py-0 uppercase tracking-widest text-[10px]"
              >
                БАТАФСИЛ
              </Button>
            </div>
          </div>
        </SidebarContent>

        <SidebarFooter className="p-4 mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white text-sm font-black shadow-md">
              N
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[11px] font-black text-slate-800 truncate uppercase">Nodirbek A.</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ADMIN</p>
            </div>
            <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-500" />
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="bg-[#f8fafc] min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white/80 backdrop-blur-md px-8 border-b border-slate-100">
          <SidebarTrigger className="hover:bg-slate-100 p-1.5 rounded-lg transition-colors" />
          <div className="h-5 w-px bg-slate-100 mx-1" />
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {menuItems.find(m => m.id === activeSection)?.label}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 font-black text-[10px]">
              UZ
            </div>
          </div>
        </header>
        <main className="p-8 pb-20 max-w-[1600px] mx-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
