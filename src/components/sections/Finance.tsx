
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
  BarChart3
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
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">To'lovlar va Escrow</h1>
        <p className="text-[13px] font-medium text-slate-400 mt-1">
          Platformada pullar xavfsiz saqlanadi va faqat ish tasdiqlangandan so'ng o'tkaziladi
        </p>
      </div>

      <Tabs defaultValue="contracts" className="w-full">
        <div className="border-b border-slate-100 mb-8">
          <TabsList className="bg-transparent h-12 p-0 gap-10">
            <TabsTrigger 
              value="contracts" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[12px] font-bold text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              Mening Shartnomalarim
            </TabsTrigger>
            <TabsTrigger 
              value="status" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[12px] font-bold text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              Escrow Holati
            </TabsTrigger>
            <TabsTrigger 
              value="methods" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[12px] font-bold text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              To'lov Usullari
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0b4db1] rounded-none h-full px-0 text-[12px] font-bold text-slate-400 data-[state=active]:text-[#0b4db1]"
            >
              Tarix
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="contracts" className="m-0 space-y-6">
          {contracts.map((contract) => (
            <Card key={contract.id} className="border-none shadow-sm rounded-[24px] bg-white overflow-hidden flex relative group hover:shadow-md transition-all">
              {/* Blue indicator strip */}
              <div className="w-1.5 bg-[#0b4db1] shrink-0" />
              
              <div className="flex-1 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                      {contract.id} • {contract.method}
                    </p>
                    <h3 className="text-xl font-black text-slate-900 mt-1">{contract.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-[#ecfdf5] text-[#10b981] hover:bg-[#ecfdf5] border-none px-3 py-1.5 rounded-lg flex items-center gap-2 text-[11px] font-black">
                      <Lock size={14} fill="currentColor" /> Puli muzlatildi
                    </Badge>
                    <div className="flex items-center gap-2 px-3 py-1.5 text-amber-500 font-bold text-[11px]">
                      <Clock size={14} /> Ish tugashiga: {contract.timeLeft}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-6">
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">
                    {formatCurrency(contract.amount)} UZS
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => handleDispute(contract.id)}
                      className="h-12 px-6 rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 font-black text-[11px] transition-all"
                    >
                      Muammo bor (Disput)
                    </Button>
                    <Button 
                      onClick={() => handleAccept(contract.id)}
                      disabled={contract.status === 'Released'}
                      className={cn(
                        "h-12 px-8 rounded-xl font-black text-[11px] text-white shadow-lg transition-all",
                        contract.status === 'Released' ? "bg-slate-100 text-slate-400" : "bg-[#10b981] hover:bg-[#059669] shadow-emerald-100"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 border-none shadow-sm rounded-[32px] bg-white text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-2">Escrow Xavfsizligi</h3>
              <p className="text-[14px] font-bold text-slate-900">Mablag'lar 100% himoyalangan</p>
            </Card>
            <Card className="p-8 border-none shadow-sm rounded-[32px] bg-white text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-4">
                <Lock size={28} />
              </div>
              <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-2">Muzlatilgan summa</h3>
              <p className="text-[14px] font-bold text-slate-900">23 500 000 UZS</p>
            </Card>
            <Card className="p-8 border-none shadow-sm rounded-[32px] bg-white text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-2">Muvaffaqiyatli bitimlar</h3>
              <p className="text-[14px] font-bold text-slate-900">124 ta</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="methods" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 border-none shadow-sm rounded-[32px] bg-white flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Landmark size={32} />
              </div>
              <div>
                <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900">Bank o'tkazmasi</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">Yuridik shaxslar uchun (Aloqa Bank)</p>
              </div>
            </Card>
            <Card className="p-8 border-none shadow-sm rounded-[32px] bg-white flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <CreditCard size={32} />
              </div>
              <div>
                <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-900">Onlayn To'lov</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">Click / Payme / Uzum Pay</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="m-0">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-3 mb-8">
              <History className="text-[#0b4db1]" size={20} />
              <h2 className="text-[12px] font-black uppercase tracking-widest">Amallar Tarixi</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Kirim (Mebellar)", amount: "+ 15 000 000 UZS", date: "Bugun, 10:45", status: "Muzlatildi" },
                { label: "Chiqim (Logistika)", amount: "- 1 200 000 UZS", date: "Kecha, 16:20", status: "O'tkazildi" },
              ].map((h, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-[11px] font-black text-slate-900 uppercase">{h.label}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{h.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-black text-[#0b4db1]">{h.amount}</p>
                    <p className="text-[9px] font-black text-emerald-600 uppercase mt-0.5">{h.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Stats Summary at Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card className="border-none shadow-sm rounded-[40px] bg-[#0f172a] p-10 text-white relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight uppercase">AI Moliya Tahlili</h3>
              <p className="text-[12px] font-medium text-white/50 leading-relaxed max-w-sm">
                Xarajatlar va daromadlarni AI yordamida prognozlang.
              </p>
              <Button className="bg-white text-slate-900 hover:bg-blue-50 rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[11px] shadow-2xl">
                Tahlilni ko'rish
              </Button>
            </div>
            <BarChart3 size={64} className="text-blue-400 opacity-20 hidden md:block" />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </Card>

        <Card className="border-none shadow-sm rounded-[40px] bg-white p-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Umumiy Balans</h3>
            <Wallet className="text-blue-600" size={20} />
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Jami Mablag'</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">45 800 000 UZS</p>
              </div>
              <div className="text-right">
                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">+ 12.4%</Badge>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0b4db1] w-[65%]" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

