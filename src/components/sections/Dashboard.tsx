
"use client";

import { Card } from "@/components/ui/card";
import { 
  Landmark, TrendingUp, Users, Package, Bell, 
  ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Area, AreaChart 
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
    label: "Market Value",
    color: "#2563eb",
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
    { title: "UzAuto Motors", desc: lang === 'uz' ? "Yangi tender g'olibi aniqlandi" : lang === 'ru' ? "Определен победитель тендера" : "New tender winner determined", time: "12:45", bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Artel Electronics", desc: lang === 'uz' ? "To'lov tasdiqlandi" : lang === 'ru' ? "Платеж подтвержден" : "Payment confirmed", time: "11:20", bgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
    { title: "Akfa Group", desc: lang === 'uz' ? "Yangi shartnoma imzolandi" : lang === 'ru' ? "Подписан новый контракт" : "New contract signed", time: "09:15", bgColor: "bg-violet-50", iconColor: "text-violet-600" },
    { title: "Inventory", desc: lang === 'uz' ? "Zaxira kamaymoqda" : lang === 'ru' ? "Запасы уменьшаются" : "Stock is low", time: "Yesterday", bgColor: "bg-rose-50", iconColor: "text-rose-500" },
  ];

  return (
    <div className="space-y-10 animate-fade-in text-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[32px] bg-white p-6 hover:shadow-xl transition-all duration-500 cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.title}</p>
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bgColor, stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h2>
              <div className={cn(
                "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
                stat.isUp ? "text-emerald-600" : "text-rose-500"
              )}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend} <span className="text-slate-300">{t.labels.lastMonth}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-8 border-none shadow-sm rounded-[40px] bg-white p-10 h-[550px] flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">{t.labels.marketDynamics}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{t.labels.realTimeAnalysis}</p>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
              <TrendingUp size={20} />
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                    dy={10}
                  />
                  <YAxis hide />
                  <ShadcnChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>

        <Card className="lg:col-span-4 border-none shadow-sm rounded-[40px] bg-white p-10 flex flex-col h-[550px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">{t.labels.notifications}</h3>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          </div>

          <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-5 group cursor-pointer">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300", n.bgColor)}>
                  <Bell size={20} className={cn("transition-colors group-hover:text-white", n.iconColor)} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{n.title}</p>
                    <span className="text-[9px] font-bold text-slate-300">{n.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed line-clamp-2">
                    {n.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all text-center">
            {t.labels.viewAll}
          </button>
        </Card>
      </div>
    </div>
  );
}
