"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutGrid, Gavel, FileText, ShoppingBag, 
  Settings, Truck, Sparkles, FolderOpen, 
  TrendingUp, BookOpen, Globe, Bell, ShoppingCart,
  Minus, Plus, X, ShoppingBasket, FileCheck, Wallet
} from "lucide-react";
import { translations, Language } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { TopAdBanner } from "@/components/TopAdBanner";

interface ShellProps {
  children: React.ReactNode;
  activeSection: string;
  onNavigate: (id: string) => void;
  cart?: any[];
  onRemoveFromCart?: (id: number) => void;
  onUpdateQuantity?: (id: number, delta: number) => void;
}

export function Shell({ 
  children, 
  activeSection, 
  onNavigate,
  cart = [],
  onRemoveFromCart,
  onUpdateQuantity
}: ShellProps) {
  const [lang, setLang] = React.useState<Language>('uz');
  const t = translations[lang];

  const menuItems = [
    { id: 'dashboard', label: t.sections.dashboard, icon: LayoutGrid },
    { id: 'marketplace', label: t.sections.marketplace, icon: ShoppingBag },
    { id: 'auction', label: t.sections.auction, icon: Gavel },
    { id: 'eri', label: t.sections.eri, icon: FileText },
    { id: 'contracts', label: t.sections.contracts, icon: FileCheck },
    { id: 'finance', label: t.sections.finance, icon: Wallet },
    { id: 'logistics', label: t.sections.logistics, icon: Truck },
    { id: 'settings', label: t.sections.settings, icon: Settings },
  ];

  const premiumMenuItems = [
    { id: 'docs', label: t.sections.docs, icon: FolderOpen },
    { id: 'invest', label: t.sections.invest, icon: TrendingUp },
    { id: 'guide', label: t.sections.guide, icon: BookOpen },
  ];

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f8fafc]">
      <div className="shrink-0 z-50">
        <TopAdBanner />
      </div>
      
      <SidebarProvider className="flex-1 overflow-hidden">
        <Sidebar className="border-r border-slate-100 bg-white shadow-none shrink-0 h-full">
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
                      "w-full px-4 py-6 rounded-lg transition-all duration-200 group relative border border-transparent",
                      activeSection === item.id 
                        ? "bg-[#0b4db1] text-white hover:bg-[#0b4db1] hover:text-white shadow-xl shadow-blue-100 border-[#0b4db1]" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#0b4db1]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", activeSection === item.id ? "text-white" : "text-slate-500 group-hover:text-[#0b4db1]")} />
                      <span className="font-semibold text-[13px]">{item.label}</span>
                    </div>
                    {activeSection === item.id && (
                      <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
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
        
        <SidebarInset className="flex flex-col min-w-0 bg-transparent h-full overflow-hidden">
          <header className="shrink-0 flex h-16 items-center gap-4 bg-white/80 backdrop-blur-md px-8 border-b border-slate-100 z-30">
            <SidebarTrigger className="hover:bg-slate-100 p-1.5 rounded-lg transition-colors" />
            <div className="h-5 w-px bg-slate-100 mx-1" />
            <div className="flex-1">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {[...menuItems, ...premiumMenuItems].find(m => m.id === activeSection)?.label || "BOSH SAHIFA"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-slate-50 text-slate-400">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 rounded-2xl p-4 shadow-2xl border-slate-100">
                  <DropdownMenuLabel className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">So'nggi bildirishnomalar</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="space-y-4 mt-2">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <ShoppingBasket size={14} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-700">UzAuto Motors yangi tender e'lon qildi</p>
                        <p className="text-[9px] text-slate-400">5 daqiqa oldin</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                        <FileText size={14} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-700">Artel bilan shartnoma imzolandi</p>
                        <p className="text-[9px] text-slate-400">1 soat oldin</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-slate-50 text-slate-400">
                    <ShoppingCart size={18} />
                    {cartCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 min-w-[14px] h-3.5 bg-[#0b4db1] text-white text-[8px] font-bold rounded-full flex items-center justify-center px-1 border border-white">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-[450px] rounded-l-[32px] p-0 flex flex-col border-none shadow-2xl">
                  <SheetHeader className="p-8 border-b bg-slate-50/50">
                    <SheetTitle className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                      <ShoppingCart className="text-[#0b4db1]" size={20} /> Savatingiz
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                          <ShoppingBag className="text-slate-200" size={40} />
                        </div>
                        <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest">Savat bo'sh</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Xaridni davom ettiring</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-50 hover:border-blue-100 transition-all group">
                          <div className="flex-1 space-y-1">
                            <p className="text-[11px] font-black text-slate-900 uppercase leading-tight">{item.title}</p>
                            <p className="text-[10px] font-bold text-[#0b4db1] tracking-tighter">{formatCurrency(item.price)} UZS / {item.unit}</p>
                            
                            <div className="flex items-center gap-3 mt-3">
                              <button 
                                onClick={() => onUpdateQuantity?.(item.id, -1)}
                                className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-[11px] font-black w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity?.(item.id, 1)}
                                className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right flex flex-col justify-between items-end">
                            <button 
                              onClick={() => onRemoveFromCart?.(item.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X size={18} />
                            </button>
                            <p className="text-[12px] font-black text-slate-900 tracking-tighter">{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <SheetFooter className="p-8 bg-slate-50 border-t flex-col gap-4">
                      <div className="flex justify-between items-center w-full mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Umumiy summa:</span>
                        <span className="text-xl font-black text-[#0b4db1] tracking-tighter">{formatCurrency(cartTotal)} UZS</span>
                      </div>
                      <Button className="w-full h-14 bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-blue-100">
                        Buyurtmani tasdiqlash
                      </Button>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>

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
          
          <div className="flex-1 overflow-y-auto">
            <main className="p-8 pb-20 max-w-[1600px] mx-auto">
              {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child as React.ReactElement<any>, { lang, t });
                }
                return child;
              })}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
