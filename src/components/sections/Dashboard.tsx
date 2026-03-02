
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, TrendingUp, Users, Package, Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <Card className="lg:col-span-8 border-none shadow-sm rounded-[40px] bg-white p-10 h-[500px] flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Бозор динамикаси (Live)</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Реал вақтдаги савдо таҳлили</p>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <TrendingUp size={20} />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2 animate-pulse">
              <TrendingUp size={40} className="text-slate-200" />
            </div>
            <p className="text-sm font-black text-slate-300 uppercase tracking-widest">Таҳлилий графиклар юкланмоқда...</p>
          </div>

          {/* Background decoration */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl" />
        </Card>

        {/* Notifications Section */}
        <Card className="lg:col-span-4 border-none shadow-sm rounded-[40px] bg-white p-10 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Сўнгги билдиришномалар</h3>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          </div>

          <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar">
            {[
              { title: "Янги тендер ғолиби", desc: "UzAuto Motors учун эҳтиёт қисмлар хариди якунланди.", time: "12:45" },
              { title: "Тўлов тасдиқланди", desc: "Artel Electronics дан 450 млн сўм келиб тушди.", time: "11:20" },
              { title: "Янги шартнома", desc: "Akfa Group билан ҳамкорlik шартномаси имзоланди.", time: "09:15" },
              { title: "Захира камаймоқда", desc: "SKU-003 маҳсулоти минимал қолдиққа етди.", time: "Kecha" },
            ].map((n, i) => (
              <div key={i} className="flex gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Bell size={20} className="text-blue-600 group-hover:text-white" />
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
