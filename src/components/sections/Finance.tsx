
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, TrendingUp, DollarSign, 
  ArrowUpRight, ArrowDownRight, 
  ShieldCheck, Lock, Clock, History, CreditCard, Wallet,
  Zap, Info, CheckCircle2, Plus, AlertTriangle, FileText,
  CreditCard as CardIcon, Landmark, HelpCircle
} from "lucide-react";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip as ShadcnChartTooltip } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { translations, Language } from "@/lib/translations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const chartData = [
  { name: "Yan", incoming: 450, outgoing: 320 },
  { name: "Fev", incoming: 520, outgoing: 380 },
  { name: "Mar", incoming: 480, outgoing: 410 },
  { name: "Apr", incoming: 610, outgoing: 390 },
  { name: "May", incoming: 590, outgoing: 440 },
  { name: "Iyun", incoming: 720, outgoing: 510 },
];

const chartConfig = {
  incoming: { label: "Kirim", color: "#2563eb" },
  outgoing: { label: "Chiqim", color: "#f43f5e" },
};

interface Transaction {
  id: string;
  vendor: string;
  amount: number;
  status: 'Locked' | 'Released' | 'Disputed';
  date: string;
  timeLeft?: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'ESC-291', vendor: 'UzAuto Motors', amount: 120500000, status: 'Locked', date: '24.10.2025', timeLeft: '2 kun' },
  { id: 'ESC-292', vendor: 'Artel Electronics', amount: 85000000, status: 'Released', date: '23.10.2025' },
  { id: 'ESC-293', vendor: 'Akfa Group', amount: 42300000, status: 'Locked', date: '22.10.2025', timeLeft: '5 soat' },
];

interface FinanceProps {
  lang?: Language;
}

export function Finance({ lang = 'uz' }: FinanceProps) {
  const t = translations[lang];
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  const handleReleaseFunds = (id: string) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === id ? { ...tx, status: 'Released', timeLeft: undefined } : tx
    ));
    toast({
      title: t.labels.completed,
      description: "Mablag'lar muvaffaqiyatli sotuvchiga o'tkazildi.",
    });
  };

  const handleOpenDispute = (id: string) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === id ? { ...tx, status: 'Disputed' } : tx
    ));
    toast({
      variant: "destructive",
      title: "Disput ochildi",
      description: "Moderatorlar 24 soat ichida bog'lanishadi.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-700 pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0f172a] rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-slate-200">
            <Wallet size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{t.sections.finance}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Xavfsiz to'lovlar va moliyaviy tahlil</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-100 font-black uppercase tracking-widest text-[10px] gap-2">
            <History size={16} /> {lang === 'uz' ? 'Tarix' : 'История'}
          </Button>
          
          <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 px-8 bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-blue-100">
                <Plus size={16} /> {t.labels.paymentMethod}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[32px]">
              <DialogHeader>
                <DialogTitle className="text-[14px] font-black uppercase tracking-widest">To'lov Usulini Tanlang</DialogTitle>
                <DialogDescription className="text-[11px] font-bold text-slate-400 uppercase">
                  Escrow hisobingizni to'ldiring va xaridni tasdiqlang.
                </DialogDescription>
              </DialogHeader>
              <div className="py-6">
                <RadioGroup defaultValue="bank" onValueChange={setPaymentMethod} className="grid gap-4">
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 cursor-pointer transition-all">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex flex-1 items-center gap-3 cursor-pointer">
                      <Landmark className="text-blue-600" size={20} />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase">{t.labels.bankTransfer}</span>
                        <span className="text-[9px] text-slate-400 uppercase">Yuridik shaxslar uchun</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 cursor-pointer transition-all">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex flex-1 items-center gap-3 cursor-pointer">
                      <CardIcon className="text-emerald-600" size={20} />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase">{t.labels.cardPayment}</span>
                        <span className="text-[9px] text-slate-400 uppercase">Humo / UzCard / Click</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  toast({ title: "Shet-faktura tayyorlandi", description: "Elektron pochta manzilingizga yuborildi." });
                  setIsDepositOpen(false);
                }} className="w-full bg-[#0b4db1] rounded-xl h-12 font-black uppercase tracking-widest text-[11px]">
                  Davom etish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wallet size={48} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Umumiy balans</p>
          <p className="text-2xl font-black text-slate-900 tracking-tighter">4,821.5 Mlr</p>
          <div className="mt-3 flex items-center gap-1.5 text-emerald-600 text-[10px] font-black">
            <TrendingUp size={12} /> +8.2%
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[24px] bg-[#0b4db1] p-6 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
            <Lock size={48} />
          </div>
          <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Escrow (Muzlatilgan)</p>
          <p className="text-2xl font-black tracking-tighter">205,800,000</p>
          <div className="mt-3 flex items-center gap-1.5 text-blue-200 text-[10px] font-black uppercase">
            Xavfsiz bitimlar
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Oylik kirim</p>
          <p className="text-2xl font-black text-blue-600 tracking-tighter">720.0 Mlr</p>
          <div className="mt-3 flex items-center gap-1.5 text-blue-600 text-[10px] font-black">
            <ArrowUpRight size={12} /> Yuqori faollik
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[24px] bg-slate-900 p-6 text-white">
          <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Sof foyda</p>
          <p className="text-2xl font-black tracking-tighter">210.0 Mlr</p>
          <div className="mt-3 flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase">
            Stabil o'sish
          </div>
        </Card>
      </div>

      {/* Main Analysis and Escrow List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 border-none shadow-sm rounded-[40px] bg-white p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Kirim va Chiqim Dinamikasi</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">2026-yil uchun tahlil</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="rounded-lg h-8 px-3 text-[9px] font-black border-slate-100">HAFTALIK</Badge>
              <Badge className="bg-blue-600 text-white rounded-lg h-8 px-3 text-[9px] font-black">OYLIK</Badge>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis hide />
                <ShadcnChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="incoming" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={32} />
                <Bar dataKey="outgoing" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <Card className="lg:col-span-4 border-none shadow-sm rounded-[40px] bg-white p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Escrow Operatsiyalari</h3>
            </div>
            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black px-2">{t.labels.disputeStats}</Badge>
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="group p-5 rounded-[24px] bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-blue-50 border border-transparent hover:border-blue-100 transition-all duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[11px] font-black text-slate-800 uppercase leading-tight">{tx.vendor}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{tx.id} • {tx.date}</p>
                  </div>
                  <Badge className={cn(
                    "text-[8px] font-black uppercase px-2 py-0.5 rounded-full border-none",
                    tx.status === 'Locked' ? "bg-amber-50 text-amber-600" : 
                    tx.status === 'Disputed' ? "bg-red-50 text-red-600" :
                    "bg-emerald-50 text-emerald-600"
                  )}>
                    {tx.status === 'Locked' ? t.labels.escrowLocked : 
                     tx.status === 'Disputed' ? 'DISPUT' : t.labels.escrowReleased}
                  </Badge>
                </div>

                {tx.timeLeft && (
                  <div className="flex items-center gap-2 mb-4 px-2 py-1 rounded-lg bg-amber-50/50 text-amber-600 text-[9px] font-black uppercase">
                    <Clock size={12} /> {lang === 'uz' ? 'Qolgan vaqt:' : 'Осталось:'} {tx.timeLeft}
                  </div>
                )}

                <div className="flex justify-between items-end">
                  <p className="text-[15px] font-black text-slate-900 tracking-tighter">{formatCurrency(tx.amount)} UZS</p>
                  <div className="flex gap-2">
                    {tx.status === 'Locked' && (
                      <>
                        <Button 
                          onClick={() => handleOpenDispute(tx.id)}
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50"
                        >
                          <AlertTriangle size={12} />
                        </Button>
                        <Button 
                          onClick={() => handleReleaseFunds(tx.id)}
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50"
                        >
                          {t.labels.acceptWork}
                        </Button>
                      </>
                    )}
                    {tx.status === 'Released' && (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-8 h-12 w-full border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 hover:border-blue-100 rounded-2xl">
            Barcha xavfsiz bitimlar
          </Button>
        </Card>
      </div>

      {/* AI and Expense breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-[40px] bg-[#0f172a] p-10 text-white relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-600/30">
                <Zap size={10} fill="currentColor" /> Premium Moliya
              </div>
              <h3 className="text-xl font-black tracking-tight uppercase max-w-xs">AI yordamida moliyaviy prognozlash</h3>
              <p className="text-[12px] font-medium text-white/50 leading-relaxed max-w-sm">
                Kelgusi oylar uchun xarajatlar va kirimlarni AI tahlili yordamida 95% aniqlikda bashorat qiling.
              </p>
              <Button className="bg-white text-slate-900 hover:bg-blue-50 rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[11px] shadow-2xl">
                Tahlilni ko'rish
              </Button>
            </div>
            <div className="hidden md:block w-48 h-48 relative">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[60px]" />
              <div className="relative z-10 w-full h-full flex items-center justify-center border-2 border-white/10 rounded-full">
                <TrendingUp size={64} className="text-blue-400 opacity-50" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[40px] bg-white p-10 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Xarajatlar toifasi</h3>
            <HelpCircle size={16} className="text-slate-300" />
          </div>
          <div className="space-y-8">
            {[
              { label: "Xom ashyo va materiallar", value: 45, color: "bg-blue-600" },
              { label: "Logistika va transport", value: 25, color: "bg-indigo-500" },
              { label: "Marketing va savdo", value: 15, color: "bg-emerald-500" },
              { label: "Operatsion xarajatlar", value: 15, color: "bg-slate-200" },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                  <span className="text-[11px] font-black text-slate-900">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-1000", item.color)} 
                    style={{ width: `${item.value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
