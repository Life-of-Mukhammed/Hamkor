
"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutGrid, Gavel, FileText, ShoppingBag, 
  Settings, Truck, Mail, Square
} from "lucide-react";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { id: 'dashboard', label: dict.sections.dashboard, icon: LayoutGrid },
  { id: 'marketplace', label: dict.sections.marketplace, icon: ShoppingBag },
  { id: 'auction', label: dict.sections.auction, icon: Gavel },
  { id: 'contracts', label: dict.sections.contracts, icon: FileText },
  { id: 'offers', label: dict.sections.payments, icon: Mail },
  { id: 'logistics', label: dict.sections.logistics, icon: Truck },
  { id: 'settings', label: dict.sections.settings, icon: Settings },
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
        <SidebarHeader className="p-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0b4db1] rounded-lg flex items-center justify-center text-white">
              <div className="w-4 h-4 rounded-[3px] border-2 border-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#0b4db1]">{dict.appName}</h1>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3 mt-4">
          <SidebarMenu className="gap-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={activeSection === item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full px-4 py-6 rounded-lg transition-all duration-200 group relative",
                    activeSection === item.id 
                      ? "bg-[#0b4db1] text-white hover:bg-[#0b4db1] hover:text-white shadow-lg" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-5 h-5", activeSection === item.id ? "text-white" : "text-slate-500 group-hover:text-slate-800")} />
                    <span className="font-semibold text-[14px]">{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 mt-auto mb-6">
          <div className="bg-[#0088cc] rounded-[15px] p-6 text-center shadow-lg">
            <p className="text-[11px] font-medium text-white leading-tight mb-4 px-2">
              Buxgalteriya - HR - Bojxona - Soliq - Boshqa xizmatlar
            </p>
            <Button 
              className="w-full h-10 bg-white text-[#0088cc] hover:bg-white/95 rounded-lg font-bold py-0 uppercase tracking-tight text-[11px]"
              onClick={() => {}}
            >
              PREMIUMGA O'TING
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="bg-[#f8fafc] min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white/80 backdrop-blur-md px-8 border-b border-slate-100">
          <SidebarTrigger className="hover:bg-slate-100 p-1.5 rounded-lg transition-colors" />
          <div className="h-5 w-px bg-slate-100 mx-1" />
          <div className="flex-1">
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
              {menuItems.find(m => m.id === activeSection)?.label || "Bosh sahifa"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 font-bold text-[10px] cursor-pointer hover:bg-slate-100">
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
