
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Landmark, TrendingUp, Users, Package, Bell, 
  ArrowUpRight, ArrowDownRight, BarChart as BarChartIcon,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Line, LineChart, ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Tooltip, Area, AreaChart 
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip as ShadcnChartTooltip } from "@/components/ui/chart";

const marketData = [
  { name: "09:00", value: 400, volume: 240 },
  { name: "10:00", value: 300, volume: 139 },
  { name: "11:00", value: 200, volume: 980 },
  { name: "12:00", value: 278, volume: 390 },
  { name: "13:00", value: 189, volume: 480 },
  { name: "14:00", value: 239, volume: 380 },
  { name: "15:00", value: 349, volume: 430 },
  { name: "16:00", value: 430, volume: 550 },
  { name: "17:00", value: 510, volume: 600 },
];

const chartConfig = {
  value: {
    label: "Bozor Faolligi",
    color: "#2563eb",
  },
};

export function Dashboard() {
  const stats = [
    { 
      title: "МОЛИЯВИЙ АЙЛАНМА", 
      value: "482,5 Млрд", 
      icon: Landmark, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      trend: "+12.5%", 
      isUp: true 
    },
    { 
      title: "ФАОЛ ТЕНДЕРЛАР", 
      value: "1,248", 
      icon: TrendingUp, 
      color: "text-emerald-600", 
      bgColor: "bg-emerald-50",
      trend: "+5.2%", 
      isUp: true 
    },
    { 
      title: "МИЖОЗЛАР", 
      value: "8,912", 
      icon: Users, 
      color: "text-violet-600", 
      bgColor: "bg-violet-50",
      trend: "+3.1%", 
      isUp: true 
    },
    { 
      title: "ОМБОР ҚОЛДИҒИ", 
      value: "12,041", 
      icon: Package, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      trend: "-1.4%", 
      isUp: false 
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in text-slate-700">
      {/* Stats Grid */}
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
                {stat.trend} <span className="text-slate-300">ўтган ойга нисбатан</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Chart Section */}
        <Card className="lg:col-span-8 border-none shadow-sm rounded-[40px] bg-white p-10 h-[550px] flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Бозор динамикаси (Live)</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Реал вақтдаги савдо таҳлили</p>
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
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Background decoration */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl opacity-50" />
        </Card>

        {/* Notifications Section */}
        <Card className="lg:col-span-4 border-none shadow-sm rounded-[40px] bg-white p-10 flex flex-col h-[550px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Сўнгги билдиришномалар</h3>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          </div>

          <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar">
            {[
              { title: "Янги тендер ғолиби", desc: "UzAuto Motors учун эҳтиёт қисмлар хариди якунланди.", time: "12:45", iconColor: "text-blue-600", bgColor: "bg-blue-50" },
              { title: "Тўлов тасдиқланди", desc: "Artel Electronics дан 450 млн сўм келиб тушди.", time: "11:20", iconColor: "text-emerald-600", bgColor: "bg-emerald-50" },
              { title: "Янги шартнома", desc: "Akfa Group билан ҳамкорlik шартномаси имзоланди.", time: "09:15", iconColor: "text-violet-600", bgColor: "bg-violet-50" },
              { title: "Захира камаймоқда", desc: "SKU-003 маҳсулоти минимал қолдиққа етди.", time: "Kecha", iconColor: "text-rose-500", bgColor: "bg-rose-50" },
            ].map((n, i) => (
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
            БАРЧАСИНИ КЎРИШ
          </button>
        </Card>
      </div>
    </div>
  );
}
