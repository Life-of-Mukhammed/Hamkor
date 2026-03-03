"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutGrid, Gavel, FileText, ShoppingBag, 
  Settings, Truck, Sparkles, FolderOpen, 
  TrendingUp, BookOpen, Globe, Bell, ShoppingCart,
  Minus, Plus, X, ShoppingBasket, FileCheck, Wallet,
  LogOut,
  User,
  Search
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f0f2f5]">
      <div className="shrink-0 z-50">
        <TopAdBanner />
      </div>
      
      <SidebarProvider className="flex-1 overflow-hidden">
        <Sidebar className="border-none bg-[#0b4db1] shadow-2xl shrink-0 h-full">
          <SidebarHeader className="p-6 pt-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 rounded-[4px] border-2 border-[#0b4db1]" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-white">{t.appName}</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 mt-6">
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full px-4 py-6 rounded-xl transition-all duration-300 group border border-transparent",
                      activeSection === item.id 
                        ? "bg-white text-[#0b4db1] hover:bg-white hover:text-[#0b4db1] shadow-lg" 
                        : "text-blue-100/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5 transition-colors", activeSection === item.id ? "text-[#0b4db1]" : "text-blue-200/50 group-hover:text-white")} />
                      <span className="font-bold text-[13px] tracking-wide">{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-6 mb-4">
            <div className="bg-white/10 backdrop-blur-md rounded-[28px] p-6 text-center border border-white/10">
              <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-4">
                {t.labels.premiumServices}
              </p>
              <Button 
                className="w-full h-11 bg-white text-[#0b4db1] hover:bg-blue-50 rounded-xl font-black py-0 uppercase tracking-[0.15em] text-[10px] shadow-md"
              >
                {t.labels.premiumBtn}
              </Button>
            </div>
            
            <div className="mt-6 flex items-center gap-3 px-2">
              <Avatar className="h-9 w-9 border-2 border-white/20">
                <AvatarFallback className="bg-white/10 text-white font-black text-xs">SZ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black text-white truncate">sheyx2772</p>
                <p className="text-[9px] font-bold text-blue-200/50 uppercase">Premium User</p>
              </div>
              <Button variant="ghost" size="icon" className="text-blue-200/50 hover:text-white hover:bg-white/10 rounded-lg">
                <LogOut size={16} />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex flex-col min-w-0 bg-transparent h-full overflow-hidden">
          <header className="shrink-0 flex h-20 items-center gap-4 bg-white/80 backdrop-blur-xl px-10 border-b border-slate-200/60 z-30">
            <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-all" />
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <div className="flex-1">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                {[...menuItems].find(m => m.id === activeSection)?.label || "BOSH SAHIFA"}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder={t.labels.search}
                  className="bg-slate-100/50 border-none rounded-xl h-10 pl-10 pr-4 text-[12px] font-bold w-48 focus:w-64 transition-all focus:ring-2 focus:ring-[#0b4db1]/20 outline-none"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500">
                    <Bell size={20} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-85 rounded-2xl p-4 shadow-2xl border-slate-100">
                  <DropdownMenuLabel className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Xabarlar</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="space-y-4 mt-2 max-h-80 overflow-y-auto no-scrollbar">
                    <div className="flex gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0b4db1] shrink-0">
                        <ShoppingBasket size={16} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-slate-800 leading-tight">Yangi tender e'lon qilindi</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">UzAuto Motors • 2 min oldin</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500">
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute top-2 right-2 min-w-[18px] h-[18px] bg-[#0b4db1] text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-[480px] rounded-l-[40px] p-0 flex flex-col border-none shadow-2xl">
                  <SheetHeader className="p-10 border-b bg-slate-50/50">
                    <SheetTitle className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0b4db1] flex items-center justify-center text-white">
                        <ShoppingCart size={20} />
                      </div>
                      Savatingiz
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                          <ShoppingBag className="text-slate-200" size={48} />
                        </div>
                        <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.2em]">Savat bo'sh</h3>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mt-3">Xaridni boshlash uchun marketplace bo'limiga o'ting</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-6 p-5 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 transition-all group shadow-sm">
                          <div className="flex-1 space-y-2">
                            <p className="text-[12px] font-black text-slate-900 uppercase leading-tight tracking-tight">{item.title}</p>
                            <p className="text-[11px] font-black text-[#0b4db1] tracking-tighter">{formatCurrency(item.price)} UZS / {item.unit}</p>
                            
                            <div className="flex items-center gap-4 mt-4">
                              <button 
                                onClick={() => onUpdateQuantity?.(item.id, -1)}
                                className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-[12px] font-black w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity?.(item.id, 1)}
                                className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right flex flex-col justify-between items-end">
                            <button 
                              onClick={() => onRemoveFromCart?.(item.id)}
                              className="w-8 h-8 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                            >
                              <X size={20} />
                            </button>
                            <p className="text-[14px] font-black text-slate-900 tracking-tighter">{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <SheetFooter className="p-10 bg-slate-50 border-t flex-col gap-6">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Umumiy summa</span>
                        <span className="text-2xl font-black text-[#0b4db1] tracking-tighter">{formatCurrency(cartTotal)} UZS</span>
                      </div>
                      <Button className="w-full h-16 bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-blue-200">
                        Buyurtmani tasdiqlash
                      </Button>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>

              <div className="h-6 w-px bg-slate-200 mx-1" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-11 px-4 gap-3 rounded-xl hover:bg-slate-100 font-black text-[12px] text-slate-700 border border-transparent hover:border-slate-200">
                    <Globe size={18} className="text-[#0b4db1]" />
                    {lang.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 min-w-[120px] p-2 shadow-2xl">
                  <DropdownMenuItem onClick={() => setLang('uz')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer rounded-xl h-10">O'zbek</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLang('ru')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer rounded-xl h-10">Русский</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLang('en')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer rounded-xl h-10">English</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-[#f8fafc]">
            <main className="p-10 pb-20 max-w-[1600px] mx-auto">
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