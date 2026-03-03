"use client";

import { Card } from "@/components/ui/card";
import { 
  Landmark, TrendingUp, Users, Package, Bell, 
  ArrowUpRight, ArrowDownRight, Activity,
  Calendar, CreditCard, ShieldCheck,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Area, AreaChart, Tooltip 
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip as ShadcnChartTooltip } from "@/components/ui/chart";
import { translations, Language } from "@/lib/translations";

const marketData = [
  { name: "09:00", value: 400 },
  { name: "10:00", value: 300 },
  { name: "11:00", value: 550 },
  { name: "12:00", value: 278 },
  { name: "13:00", value: 489 },
  { name: "14:00", value: 339 },
  { name: "15:00", value: 649 },
  { name: "16:00", value: 530 },
  { name: "17:00", value: 710 },
];

const chartConfig = {
  value: {
    label: "Bozor qiymati",
    color: "#0b5dbb",
  },
};

interface DashboardProps {
  lang?: Language;
}

export function Dashboard({ lang = 'uz' }: DashboardProps) {
  const t = translations[lang];

  const stats = [
    { 
      title: t.labels.financialTurnover, 
      value: lang === 'en' ? "$482.5M" : "482,5 Млрд", 
      icon: Landmark, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      trend: "+12.5%", 
      isUp: true 
    },
    { 
      title: t.labels.activeTenders, 
      value: "1,248", 
      icon: TrendingUp, 
      color: "text-emerald-600", 
      bgColor: "bg-emerald-50",
      trend: "+5.2%", 
      isUp: true 
    },
    { 
      title: t.labels.clients, 
      value: "8,912", 
      icon: Users, 
      color: "text-violet-600", 
      bgColor: "bg-violet-50",
      trend: "+3.1%", 
      isUp: true 
    },
    { 
      title: t.labels.warehouseBalance, 
      value: "12,041", 
      icon: Package, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      trend: "-1.4%", 
      isUp: false 
    },
  ];

  const notifications = [
    { title: "UzAuto Motors", desc: lang === 'uz' ? "Yangi tender g'olibi aniqlandi" : lang === 'ru' ? "Определен победитель тендера" : "New tender winner determined", time: "12:45", status: "success" },
    { title: "Artel Electronics", desc: lang === 'uz' ? "To'lov tasdiqlandi" : lang === 'ru' ? "Платеж подтвержден" : "Payment confirmed", time: "11:20", status: "info" },
    { title: "Akfa Group", desc: lang === 'uz' ? "Yangi shartnoma imzolandi" : lang === 'ru' ? "Подписан новый контракт" : "New contract signed", time: "09:15", status: "info" },
    { title: "Inventory", desc: lang === 'uz' ? "Zaxira kamaymoqda" : lang === 'ru' ? "Запасы уменьшаются" : "Stock is low", time: "Kecha", status: "warning" },
  ];

  return (
    <div className="space-y-12 animate-fade-in font-body">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-[#001529] tracking-tight leading-tight">XUSH KELIBSIZ, <span className="text-[#0b5dbb]">SHEYX2772!</span></h1>
          <p className="text-[12px] font-bold text-[#001529]/40 uppercase tracking-[0.3em]">I-TIJORAT PLATFORMASI • TOSHKENT VAKTI 10:45</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-[#001529]/40 uppercase tracking-widest">Balans</span>
            <span className="text-lg font-black text-[#001529] tracking-tighter">12,500,000 UZS</span>
          </div>
          <div className="h-10 w-px bg-[#001529]/10 mx-2" />
          <button className="h-12 w-12 rounded-2xl bg-white border border-[#001529]/10 flex items-center justify-center text-[#0b5dbb] hover:bg-blue-50 transition-all shadow-sm">
            <Wallet size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-[#001529]/5 rounded-[32px] bg-white p-8 hover:-translate-y-1 transition-all duration-500 cursor-pointer group">
            <div className="flex justify-between items-start mb-6">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:bg-[#0b5dbb] group-hover:text-white", stat.bgColor, stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                stat.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
              )}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-[#001529] tracking-tighter">{stat.value}</h2>
              <p className="text-[11px] font-black text-[#001529]/40 uppercase tracking-widest">{stat.title}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-8 border-none shadow-2xl shadow-[#001529]/5 rounded-[48px] bg-white p-12 h-[600px] flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-black text-[#001529] tracking-tight uppercase">{t.labels.marketDynamics}</h3>
              <p className="text-[10px] text-[#001529]/40 font-bold uppercase tracking-[0.3em] mt-2">{t.labels.realTimeAnalysis}</p>
            </div>
            <div className="flex gap-2">
              <button className="h-10 px-6 rounded-xl bg-[#001529]/5 text-[10px] font-black uppercase tracking-widest text-[#001529]/50 hover:bg-[#0b5dbb] hover:text-white transition-all">Kunlik</button>
              <button className="h-10 px-6 rounded-xl bg-[#0b5dbb] text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-blue-100">Oylik</button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0b5dbb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#0b5dbb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 800, fill: '#001529', opacity: 0.3 }} 
                    dy={15}
                  />
                  <YAxis hide />
                  <ShadcnChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0b5dbb" 
                    strokeWidth={5} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    dot={{ r: 5, fill: '#0b5dbb', strokeWidth: 3, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>

        <Card className="lg:col-span-4 border-none shadow-2xl shadow-[#001529]/5 rounded-[48px] bg-white p-12 flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-[12px] font-black text-[#001529] tracking-tight uppercase tracking-[0.2em]">{t.labels.notifications}</h3>
            <div className="w-3 h-3 rounded-full bg-[#0b5dbb] animate-pulse" />
          </div>

          <div className="space-y-10 flex-1 overflow-y-auto no-scrollbar">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-6 group cursor-pointer">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-sm",
                  n.status === 'success' ? "bg-emerald-50 text-emerald-600" : 
                  n.status === 'warning' ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-[#0b5dbb]"
                )}>
                  <Bell size={22} />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-[12px] font-black text-[#001529] uppercase tracking-tight truncate">{n.title}</p>
                    <span className="text-[9px] font-bold text-[#001529]/20 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#001529]/40 uppercase leading-relaxed line-clamp-2">
                    {n.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-12 w-full h-14 rounded-2xl border-2 border-[#001529]/5 text-[11px] font-black text-[#001529]/30 hover:text-[#0b5dbb] hover:border-[#0b5dbb]/20 uppercase tracking-[0.25em] transition-all text-center">
            {t.labels.viewAll}
          </button>
        </Card>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
        {[
          { title: "To'lovlar", icon: CreditCard, color: "text-[#0b5dbb]", bg: "bg-blue-50", desc: "Escrow va tranzaksiyalar" },
          { title: "Statistika", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Tahliliy hisobotlar" },
          { title: "Xavfsizlik", icon: ShieldCheck, color: "text-violet-600", bg: "bg-violet-50", desc: "AI risk tekshiruvi" },
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-xl shadow-[#001529]/5 rounded-[32px] bg-white p-8 flex items-center gap-6 hover:shadow-2xl transition-all cursor-pointer">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", item.bg, item.color)}>
              <item.icon size={24} />
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[#001529] uppercase tracking-tight">{item.title}</h4>
              <p className="text-[11px] font-bold text-[#001529]/40 uppercase mt-1">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}