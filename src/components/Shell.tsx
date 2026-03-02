
"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutGrid, Gavel, FileText, ShoppingBag, 
  Settings, Truck, Mail, Sparkles, FolderOpen, 
  TrendingUp, BookOpen, Globe, Bell, ShoppingCart
} from "lucide-react";
import { translations, Language } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ShellProps {
  children: React.ReactNode;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Shell({ children, activeSection, onNavigate }: ShellProps) {
  const [lang, setLang] = React.useState<Language>('uz');
  const t = translations[lang];

  const menuItems = [
    { id: 'dashboard', label: t.sections.dashboard, icon: LayoutGrid },
    { id: 'marketplace', label: t.sections.marketplace, icon: ShoppingBag },
    { id: 'auction', label: t.sections.auction, icon: Gavel },
    { id: 'eri', label: t.sections.eri, icon: FileText },
    { id: 'logistics', label: t.sections.logistics, icon: Truck },
    { id: 'settings', label: t.sections.settings, icon: Settings },
  ];

  const premiumMenuItems = [
    { id: 'docs', label: t.sections.docs, icon: FolderOpen },
    { id: 'invest', label: t.sections.invest, icon: TrendingUp },
    { id: 'guide', label: t.sections.guide, icon: BookOpen },
  ];

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-slate-100 bg-white shadow-none">
        <SidebarHeader className="p-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0b4db1] rounded-lg flex items-center justify-center text-white">
              <div className="w-4 h-4 rounded-[3px] border-2 border-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#0b4db1]">{t.appName}</h1>
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
                    <span className="font-semibold text-[13px]">{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <div className="my-4 px-4">
              <div className="h-px bg-slate-50" />
            </div>

            {premiumMenuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  disabled
                  className="w-full px-4 py-6 rounded-lg cursor-not-allowed opacity-50 grayscale"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-slate-400" />
                      <span className="font-semibold text-[13px] text-slate-400">{item.label}</span>
                    </div>
                    <Sparkles size={14} className="text-amber-400" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 mt-auto mb-6">
          <div className="bg-[#0b4db1] rounded-[24px] p-6 text-center shadow-lg relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <p className="text-[11px] font-medium text-white leading-tight mb-4 px-2 relative z-10">
              {t.labels.premiumServices}
            </p>
            <Button 
              className="w-full h-11 bg-white text-[#0b4db1] hover:bg-slate-50 rounded-xl font-black py-0 uppercase tracking-widest text-[10px] shadow-sm relative z-10"
              onClick={() => {}}
            >
              {t.labels.premiumBtn}
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="bg-[#f8fafc] min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white/80 backdrop-blur-md px-8 border-b border-slate-100">
          <SidebarTrigger className="hover:bg-slate-100 p-1.5 rounded-lg transition-colors" />
          <div className="h-5 w-px bg-slate-100 mx-1" />
          <div className="flex-1">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {[...menuItems, ...premiumMenuItems].find(m => m.id === activeSection)?.label || "BOSH SAHIFA"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-slate-50 text-slate-400">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-slate-50 text-slate-400">
              <ShoppingCart size={18} />
              <span className="absolute top-1.5 right-1.5 min-w-[14px] h-3.5 bg-[#0b4db1] text-white text-[8px] font-bold rounded-full flex items-center justify-center px-1 border border-white">
                3
              </span>
            </Button>
            <div className="h-4 w-px bg-slate-100 mx-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-3 gap-2 rounded-xl hover:bg-slate-50 font-black text-[11px] text-slate-600">
                  <Globe size={16} />
                  {lang.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl border-slate-100 min-w-[100px]">
                <DropdownMenuItem onClick={() => setLang('uz')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer">UZBEK</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ru')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer">RUSSIAN</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer">ENGLISH</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="p-8 pb-20 max-w-[1600px] mx-auto">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, { lang, t });
            }
            return child;
          })}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
