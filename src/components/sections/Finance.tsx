
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Lock, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  CreditCard, 
  Landmark, 
  History,
  ShieldCheck,
  Wallet,
  TrendingUp,
  BarChart3,
  Search,
  Download
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { translations, Language } from "@/lib/translations";

interface Contract {
  id: string;
  title: string;
  method: string;
  amount: number;
  status: 'Locked' | 'Released' | 'Disputed';
  timeLeft: string;
}

const INITIAL_CONTRACTS: Contract[] = [
  { 
    id: 'CTR-2026-001', 
    title: 'Ofis mebellari yetkazib berish', 
    method: 'Bank o\'tkazmasi', 
    amount: 15000000, 
    status: 'Locked', 
    timeLeft: '2 kun qoldi' 
  },
  { 
    id: 'CTR-2026-002', 
    title: 'IT xizmatlari (Vebsayt)', 
    method: 'Karta (Click)', 
    amount: 8500000, 
    status: 'Locked', 
    timeLeft: '5 kun qoldi' 
  },
];

interface FinanceProps {
  lang?: Language;
}

export function Finance({ lang = 'uz' }: FinanceProps) {
  const t = translations[lang];
  const { toast } = useToast();
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  const handleAccept = (id: string) => {
    setContracts(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'Released' } : c
    ));
    toast({
      title: "Muvaffaqiyatli",
      description: "Ish qabul qilindi va mablag'lar sotuvchiga o'tkazildi.",
    });
  };

  const handleDispute = (id: string) => {
    toast({
      variant: "destructive",
      title: "Disput ochildi",
      description: "Ushbu shartnoma bo'yicha moderatorlar 24 soat ichida bog'lanishadi.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-700 pb-20">
      <div className="mb-10">
        <h1 className="text-[32px] font-black text-slate-900 tracking-tight leading-tight">To'lovlar va Escrow</h1>
        <p className="text-[13px] font-medium text-slate-400 mt-2 max-w-2xl">
          Platformada pullar xavfsiz saqlanadi va faqat ish tasdiqlangandan so'ng yuridik va jismoniy shaxslarga o'tkaziladi.
        </p>
      </div>

      <Tabs defaultValue="methods" className="w-full">
        <div className="border-b border-slate-100 mb-10">
          <TabsList className="bg-transparent h-12 p-0 gap-12">
            <TabsTrigger 
              value="contracts" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              Mening Shartnomalarim
            </TabsTrigger>
            <TabsTrigger 
              value="status" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              Escrow Holati
            </TabsTrigger>
            <TabsTrigger 
              value="methods" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              To'lov Usullari
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              Tarix
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="contracts" className="m-0 space-y-6">
          {contracts.map((contract) => (
            <Card key={contract.id} className="border border-slate-100 shadow-sm rounded-[32px] bg-white overflow-hidden flex relative group hover:shadow-md transition-all">
              <div className="w-2 bg-[#0b4db1] shrink-0" />
              <div className="flex-1 p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {contract.id} • {contract.method}
                    </p>
                    <h3 className="text-xl font-black text-slate-900 mt-2 uppercase tracking-tight">{contract.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Badge className="bg-[#ecfdf5] text-[#10b981] hover:bg-[#ecfdf5] border-none px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase">
                      <Lock size={14} fill="currentColor" /> Puli muzlatildi
                    </Badge>
                    <div className="flex items-center gap-2 px-4 py-2 text-amber-500 font-black text-[10px] uppercase tracking-widest">
                      <Clock size={14} /> Ish tugashiga: {contract.timeLeft}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-6">
                  <p className="text-[28px] font-black text-slate-900 tracking-tighter">
                    {formatCurrency(contract.amount)} UZS
                  </p>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => handleDispute(contract.id)}
                      className="h-12 px-8 rounded-2xl border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100 font-black text-[11px] uppercase tracking-widest transition-all"
                    >
                      Muammo bor (Disput)
                    </Button>
                    <Button 
                      onClick={() => handleAccept(contract.id)}
                      disabled={contract.status === 'Released'}
                      className={cn(
                        "h-12 px-10 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white shadow-xl transition-all",
                        contract.status === 'Released' ? "bg-slate-100 text-slate-400 shadow-none" : "bg-[#10b981] hover:bg-[#059669] shadow-emerald-100"
                      )}
                    >
                      {contract.status === 'Released' ? <CheckCircle2 size={16} /> : "Qabul qildim"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="status" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-10 border border-slate-100 shadow-sm rounded-[40px] bg-white text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center text-[#0b4db1] mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Escrow Xavfsizligi</h3>
              <p className="text-[18px] font-black text-slate-900 uppercase">100% HIMOYALANGAN</p>
            </Card>
            <Card className="p-10 border border-slate-100 shadow-sm rounded-[40px] bg-white text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-[24px] flex items-center justify-center text-amber-600 mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Muzlatilgan summa</h3>
              <p className="text-[18px] font-black text-slate-900 uppercase">23 500 000 UZS</p>
            </Card>
            <Card className="p-10 border border-slate-100 shadow-sm rounded-[40px] bg-white text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-[24px] flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Muvaffaqiyatli bitimlar</h3>
              <p className="text-[18px] font-black text-slate-900 uppercase">124 ta</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="methods" className="m-0 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-12 border border-slate-100 shadow-sm rounded-[40px] bg-white flex items-center gap-8 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-20 h-20 bg-blue-50 rounded-[28px] flex items-center justify-center text-[#0b4db1]">
                <Landmark size={40} />
              </div>
              <div className="space-y-1">
                <h3 className="text-[16px] font-black uppercase tracking-[0.1em] text-slate-900">Bank o'tkazmasi</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Yuridik shaxslar uchun (Aloqa Bank)</p>
              </div>
            </Card>
            <Card className="p-12 border border-slate-100 shadow-sm rounded-[40px] bg-white flex items-center gap-8 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-20 h-20 bg-emerald-50 rounded-[28px] flex items-center justify-center text-emerald-600">
                <CreditCard size={40} />
              </div>
              <div className="space-y-1">
                <h3 className="text-[16px] font-black uppercase tracking-[0.1em] text-slate-900">Onlayn To'lov</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Click / Payme / Uzum Pay</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="m-0">
          <Card className="border border-slate-100 shadow-sm rounded-[40px] bg-white p-10">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0b4db1]">
                  <History size={24} />
                </div>
                <h2 className="text-[14px] font-black uppercase tracking-[0.2em]">Amallar Tarixi</h2>
              </div>
              <div className="flex gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <Input placeholder="TRX ID bo'yicha..." className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 text-[11px] font-bold" />
                </div>
                <Button variant="outline" className="h-11 rounded-xl border-slate-100 text-[11px] font-black uppercase tracking-widest gap-2">
                  <Download size={14} /> Eksport
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Kirim (Lot #251)", amount: "+ 15,000,000 UZS", date: "Bugun, 10:45", status: "Muzlatildi", id: "TRX-99821" },
                { label: "Chiqim (Logistika)", amount: "- 1,200,000 UZS", date: "Kecha, 16:20", status: "O'tkazildi", id: "TRX-99820" },
                { label: "Kirim (Xizmatlar)", amount: "+ 8,500,000 UZS", date: "24.10.2025", status: "Muzlatildi", id: "TRX-99819" },
              ].map((h, i) => (
                <div key={i} className="flex justify-between items-center p-6 rounded-[24px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-[#0b4db1] transition-colors">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-black text-slate-900 uppercase">{h.label}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{h.date} • {h.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-[15px] font-black tracking-tighter", h.amount.startsWith('+') ? "text-[#0b4db1]" : "text-slate-900")}>
                      {h.amount}
                    </p>
                    <p className={cn("text-[9px] font-black uppercase mt-1", h.status === 'Muzlatildi' ? "text-amber-500" : "text-emerald-600")}>
                      {h.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
        <Card className="lg:col-span-7 border-none shadow-xl rounded-[48px] bg-[#0f172a] p-12 text-white relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-400">AI Moliya Tahlili</h3>
              </div>
              <p className="text-[13px] font-medium text-white/50 leading-relaxed max-w-sm">
                Xarajatlar va daromadlarni AI yordamida professional tarzda prognozlang.
              </p>
            </div>
            <div className="mt-12">
              <Button className="bg-white text-slate-900 hover:bg-slate-50 rounded-2xl h-16 px-12 font-black uppercase tracking-widest text-[11px] shadow-2xl">
                Tahlilni ko'rish
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 p-12 opacity-10">
            <BarChart3 size={180} />
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </Card>

        <Card className="lg:col-span-5 border border-slate-100 shadow-sm rounded-[48px] bg-white p-12 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]">Umumiy Balans</h3>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <Wallet size={20} />
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jami Mablag'</p>
                <p className="text-[36px] font-black text-slate-900 tracking-tighter">45 800 000 UZS</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[11px] px-3 py-1.5 rounded-full">+ 12.4%</Badge>
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <div className="h-full bg-[#0b4db1] w-[65%] rounded-full shadow-lg shadow-blue-200" />
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Ishlatilgan: 35%</span>
                <span>Zaxira: 65%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
