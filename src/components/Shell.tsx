
"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, Gavel, Truck, ShieldCheck, Landmark, FileText, 
  ShoppingCart, Boxes, BarChart3, Users, UserCog, Megaphone, 
  Scale, Calculator, Globe, Briefcase, Headphones, Archive, 
  Settings, MessageSquare, Bell, FileSpreadsheet, Calendar, BookOpen,
  LogOut, UserCircle
} from "lucide-react";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: 'dashboard', label: dict.sections.dashboard, icon: LayoutDashboard },
  { id: 'auction', label: dict.sections.auction, icon: Gavel },
  { id: 'logistics', label: dict.sections.logistics, icon: Truck },
  { id: 'aiSecurity', label: dict.sections.aiSecurity, icon: ShieldCheck },
  { id: 'finance', label: dict.sections.finance, icon: Landmark },
  { id: 'eri', label: dict.sections.eri, icon: FileText },
  { id: 'tenders', label: dict.sections.tenders, icon: ShoppingCart },
  { id: 'inventory', label: dict.sections.inventory, icon: Boxes },
  { id: 'analytics', label: dict.sections.analytics, icon: BarChart3 },
  { id: 'crm', label: dict.sections.crm, icon: Users },
  { id: 'hr', label: dict.sections.hr, icon: UserCog },
  { id: 'marketing', label: dict.sections.marketing, icon: Megaphone },
  { id: 'legal', label: dict.sections.legal, icon: Scale },
  { id: 'tax', label: dict.sections.tax, icon: Calculator },
  { id: 'customs', label: dict.sections.customs, icon: Globe },
  { id: 'procurement', label: dict.sections.procurement, icon: Briefcase },
  { id: 'support', label: dict.sections.support, icon: Headphones },
  { id: 'archive', label: dict.sections.archive, icon: Archive },
  { id: 'settings', label: dict.sections.settings, icon: Settings },
  { id: 'messages', label: dict.sections.messages, icon: MessageSquare },
  { id: 'notifications', label: dict.sections.notifications, icon: Bell },
  { id: 'reports', label: dict.sections.reports, icon: FileSpreadsheet },
  { id: 'events', label: dict.sections.events, icon: Calendar },
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
      <Sidebar className="border-r border-border bg-white neo-shadow">
        <SidebarHeader className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="text-2xl font-black italic">I</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-primary">{dict.appName}</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Supreme v26</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={activeSection === item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full px-4 py-2 rounded-xl transition-all duration-200 group",
                    activeSection === item.id 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", activeSection === item.id ? "text-white" : "group-hover:scale-110 transition-transform")} />
                  <span className="font-medium text-sm ml-2">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <UserCircle className="w-8 h-8 text-primary" />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Premium User</p>
              <p className="text-[10px] text-muted-foreground truncate">ID: 887129</p>
            </div>
            <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive cursor-pointer" />
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-6">
          <SidebarTrigger />
          <div className="h-4 w-px bg-border" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {menuItems.find(m => m.id === activeSection)?.label}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">3</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-bold">UZ</span>
            </div>
          </div>
        </header>
        <main className="p-8 pb-16 max-w-[1600px] mx-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
