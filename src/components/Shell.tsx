
"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutGrid, Gavel, FileText, ShoppingBag, Briefcase, 
  Box, BarChart, Camera, Building2, BookOpen, 
  X, Sparkles, ChevronRight, LogOut, Handshake
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
        <SidebarHeader className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2563eb] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <Handshake size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#2563eb]">{dict.appName}</h1>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-4 mt-4">
          <SidebarMenu className="gap-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={activeSection === item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full px-5 py-6 rounded-2xl transition-all duration-300 group",
                    activeSection === item.id 
                      ? "bg-[#2563eb] text-white shadow-xl shadow-blue-400/30" 
                      : "hover:bg-slate-50 text-slate-500 hover:text-[#2563eb]"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", activeSection === item.id ? "text-white" : "text-slate-400 group-hover:text-[#2563eb]")} />
                  <span className="font-bold text-sm ml-3 uppercase tracking-wide">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          {/* Premium Card Placeholder - Matches Image */}
          <div className="mt-8 px-2">
            <div className="relative bg-[#3b59f8] rounded-[30px] p-6 text-white overflow-hidden shadow-2xl shadow-blue-500/20">
              <button className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
                <X size={16} />
              </button>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-sm font-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                🚀 ПРЕМИУМГА ЎТИНГ
              </h3>
              <p className="text-[10px] font-medium text-white/70 leading-relaxed mb-6 uppercase tracking-tight">
                СИ (AI) инструментлари ва таҳлилни фаоллаштиринг
              </p>
              <Button 
                variant="secondary" 
                className="w-full bg-white text-[#3b59f8] hover:bg-white/90 rounded-2xl font-black py-6 uppercase tracking-widest text-[11px]"
              >
                БАТАФСИЛ
              </Button>
            </div>
          </div>
        </SidebarContent>

        <SidebarFooter className="p-6 mt-auto">
          <div className="flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white text-lg font-black shadow-lg">
              N
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black text-slate-800 truncate uppercase">asdasd asdasd</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ADMIN</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="bg-[#f8fafc] min-h-screen">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 bg-white/80 backdrop-blur-md px-10 border-b border-slate-100">
          <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-colors" />
          <div className="h-6 w-px bg-slate-100 mx-2" />
          <div className="flex-1">
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
              {menuItems.find(m => m.id === activeSection)?.label}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 font-black text-xs">
              UZ
            </div>
          </div>
        </header>
        <main className="p-10 pb-20 max-w-[1800px] mx-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
