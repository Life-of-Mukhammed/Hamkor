
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  LayoutGrid, Gavel, FileText, ShoppingBag, 
  Settings, Truck, Globe, Bell, ShoppingCart,
  Minus, Plus, X, ShoppingBasket, FileCheck, Wallet,
  LogOut, Search
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const router = useRouter();

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

  const handleLogout = () => {
    toast({
      title: t.labels.logout,
      description: lang === 'uz' ? "Tizimdan muvaffaqiyatli chiqdingiz." : lang === 'ru' ? "Вы успешно вышли из системы." : "You have successfully logged out.",
    });
    
    // 1.5 soniyadan so'ng login sahifasiga yo'naltirish
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white font-body">
      <div className="shrink-0 z-50">
        <TopAdBanner />
      </div>
      
      <SidebarProvider className="flex-1 overflow-hidden">
        <Sidebar className="border-r border-[#001529]/5 bg-white shrink-0 h-full">
          <SidebarHeader className="p-6 pt-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0b5dbb] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/10">
                <div className="w-5 h-5 rounded-[4px] border-2 border-white" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-[#001529]">{t.appName}</h1>
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
                      "w-full px-4 py-6 rounded-2xl transition-all duration-300 group border border-transparent",
                      activeSection === item.id 
                        ? "bg-[#0b5dbb] text-white shadow-xl shadow-blue-600/40" 
                        : "text-[#001529]/60 hover:bg-[#0b5dbb]/5 hover:text-[#0b5dbb]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5 transition-colors", activeSection === item.id ? "text-white" : "text-[#001529]/40 group-hover:text-[#0b5dbb]")} />
                      <span className="font-black text-[12px] tracking-wide uppercase">{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-6 mb-4">
            <div className="bg-[#001529]/5 rounded-[32px] p-6 text-center border border-[#001529]/5">
              <p className="text-[10px] font-bold text-[#001529]/40 uppercase tracking-widest mb-4 leading-relaxed px-2">
                {t.labels.premiumServices}
              </p>
              <Button 
                className="w-full h-12 bg-[#001529] text-white hover:bg-black rounded-xl font-black py-0 uppercase tracking-[0.1em] text-[11px] shadow-lg"
              >
                {t.labels.premiumBtn}
              </Button>
            </div>
            
            <div className="mt-6 flex items-center gap-3 px-2">
              <Avatar className="h-10 w-10 border-2 border-[#001529]/5">
                <AvatarFallback className="bg-[#001529]/5 text-[#001529] font-black text-xs">SZ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-[#001529] truncate">sheyx2772</p>
                <p className="text-[9px] font-bold text-[#001529]/40 uppercase tracking-tighter">Premium User</p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="icon" 
                className="text-[#001529]/30 hover:text-[#001529] hover:bg-[#001529]/5 rounded-lg transition-all active:scale-90"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex flex-col min-w-0 bg-transparent h-full overflow-hidden">
          <header className="shrink-0 flex h-20 items-center gap-4 bg-white/80 backdrop-blur-xl px-10 border-b border-[#001529]/5 z-30">
            <SidebarTrigger className="hover:bg-[#001529]/5 p-2 rounded-xl transition-all text-[#001529]/50" />
            <div className="h-6 w-px bg-[#001529]/5 mx-2" />
            <div className="flex-1">
              <p className="text-[11px] font-black text-[#001529] uppercase tracking-[0.25em]">
                {[...menuItems].find(m => m.id === activeSection)?.label || "BOSH SAHIFA"}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#001529]/30 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder={t.labels.search}
                  className="bg-[#001529]/5 border-none rounded-xl h-10 pl-10 pr-4 text-[12px] font-bold w-48 focus:w-64 transition-all focus:ring-2 focus:ring-[#0b5dbb]/10 outline-none text-[#001529]"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-[#001529]/5 text-[#001529]/40">
                    <Bell size={20} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#0b5dbb] rounded-full border-2 border-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 rounded-2xl p-4 shadow-2xl border-[#001529]/5 bg-white">
                  <DropdownMenuLabel className="text-[11px] font-black uppercase tracking-widest text-[#001529]/40 mb-2">Xabarlar</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="space-y-4 mt-2 max-h-80 overflow-y-auto no-scrollbar">
                    <div className="flex gap-4 p-2 rounded-xl hover:bg-[#001529]/5 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#001529] shrink-0">
                        <ShoppingBasket size={16} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-[#001529] leading-tight">Yangi tender e'lon qilindi</p>
                        <p className="text-[10px] text-[#001529]/40 mt-1 font-bold uppercase">UzAuto Motors • 2 min oldin</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-[#001529]/5 text-[#001529]/40">
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute top-2 right-2 min-w-[18px] h-[18px] bg-[#0b5dbb] text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-[480px] rounded-l-[40px] p-0 flex flex-col border-none shadow-2xl bg-white">
                  <SheetHeader className="p-10 border-b bg-[#001529]/5">
                    <SheetTitle className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 text-[#001529]">
                      <div className="w-10 h-10 rounded-xl bg-[#0b5dbb] flex items-center justify-center text-white">
                        <ShoppingCart size={20} />
                      </div>
                      Savatingiz
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-[#001529]/5 rounded-full flex items-center justify-center mb-8 text-[#001529]/20">
                          <ShoppingBag size={48} />
                        </div>
                        <h3 className="text-sm font-black text-[#001529]/30 uppercase tracking-[0.2em]">Savat bo'sh</h3>
                        <p className="text-[11px] font-bold text-[#001529]/40 uppercase mt-3">Xaridni boshlash uchun marketplace bo'limiga o'ting</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-6 p-5 rounded-3xl bg-white border border-[#001529]/5 hover:border-blue-100 transition-all group shadow-sm">
                          <div className="flex-1 space-y-2">
                            <p className="text-[12px] font-black text-[#001529] uppercase leading-tight tracking-tight">{item.title}</p>
                            <p className="text-[11px] font-black text-[#001529] tracking-tighter">{formatCurrency(item.price)} UZS / {item.unit}</p>
                            
                            <div className="flex items-center gap-4 mt-4">
                              <button 
                                onClick={() => onUpdateQuantity?.(item.id, -1)}
                                className="w-8 h-8 rounded-lg bg-[#001529]/5 flex items-center justify-center text-[#001529]/40 hover:bg-[#0b5dbb] hover:text-white transition-all"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-[12px] font-black w-6 text-center text-[#001529]">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity?.(item.id, 1)}
                                className="w-8 h-8 rounded-lg bg-[#001529]/5 flex items-center justify-center text-[#001529]/40 hover:bg-[#0b5dbb] hover:text-white transition-all"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right flex flex-col justify-between items-end">
                            <button 
                              onClick={() => onRemoveFromCart?.(item.id)}
                              className="w-8 h-8 rounded-lg text-[#001529]/20 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                            >
                              <X size={20} />
                            </button>
                            <p className="text-[14px] font-black text-[#001529] tracking-tighter">{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <SheetFooter className="p-10 bg-[#001529]/5 border-t flex-col gap-6">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[11px] font-black text-[#001529]/40 uppercase tracking-widest">Umumiy summa</span>
                        <span className="text-2xl font-black text-[#001529] tracking-tighter">{formatCurrency(cartTotal)} UZS</span>
                      </div>
                      <Button className="w-full h-16 bg-[#0b5dbb] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-blue-900/20">
                        Buyurtmani tasdiqlash
                      </Button>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>

              <div className="h-6 w-px bg-[#001529]/5 mx-1" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-11 px-4 gap-3 rounded-xl hover:bg-[#001529]/5 font-black text-[12px] text-[#001529] border border-transparent">
                    <Globe size={18} />
                    {lang.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl border-[#001529]/5 min-w-[120px] p-2 shadow-2xl bg-white">
                  <DropdownMenuItem onClick={() => setLang('uz')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer rounded-xl h-10 text-[#001529]/60 hover:text-[#0b5dbb]">O'zbek</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLang('ru')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer rounded-xl h-10 text-[#001529]/60 hover:text-[#0b5dbb]">Русский</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLang('en')} className="text-[11px] font-black uppercase tracking-widest cursor-pointer rounded-xl h-10 text-[#001529]/60 hover:text-[#0b5dbb]">English</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-white">
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
