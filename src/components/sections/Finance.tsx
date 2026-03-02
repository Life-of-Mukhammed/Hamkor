
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, BarChart as BarChartIcon } from "lucide-react";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip as ShadcnChartTooltip } from "@/components/ui/chart";

const data = [
  { name: "Янв", incoming: 450, outgoing: 320 },
  { name: "Фев", incoming: 520, outgoing: 380 },
  { name: "Мар", incoming: 480, outgoing: 410 },
  { name: "Апр", incoming: 610, outgoing: 390 },
  { name: "Май", incoming: 590, outgoing: 440 },
  { name: "Июн", incoming: 720, outgoing: 510 },
];

const chartConfig = {
  incoming: { label: "Кирим", color: "#2563eb" },
  outgoing: { label: "Чиқим", color: "#f43f5e" },
};

export function Finance() {
  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shadow-lg">
          <BarChartIcon size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Молиявий бошқарув</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Корхона пул оқимлари ва бюджет таҳлили</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign size={48} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Умумий баланс</p>
          <p className="text-2xl font-black text-slate-900">4,821.5 Млрд</p>
          <div className="mt-3 flex items-center gap-1.5 text-emerald-600 text-[10px] font-black">
            <TrendingUp size={12} /> +8.2%
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Ойлик кирим</p>
          <p className="text-2xl font-black text-blue-600">720.0 Млрд</p>
          <div className="mt-3 flex items-center gap-1.5 text-blue-600 text-[10px] font-black">
            <ArrowUpRight size={12} /> Баланд
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Ойлик чиқим</p>
          <p className="text-2xl font-black text-rose-500">510.0 Млрд</p>
          <div className="mt-3 flex items-center gap-1.5 text-rose-500 text-[10px] font-black">
            <ArrowDownRight size={12} /> -2.4%
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-[24px] bg-[#0f172a] p-6 text-white">
          <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Соф фойда</p>
          <p className="text-2xl font-black">210.0 Млрд</p>
          <div className="mt-3 flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase">
            Стабил ўсиш
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[32px] bg-white p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Кирим ва Чиқим Динамикаси</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase">2026 йил учун ярим йиллик таҳлил</p>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis hide />
                <ShadcnChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="incoming" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="outgoing" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <Card className="border-none shadow-sm rounded-[32px] bg-white p-10">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-8">Харажатлар тоифаси</h3>
          <div className="space-y-6">
            {[
              { label: "Хом ашё", value: 45, color: "bg-blue-500" },
              { label: "Логистика", value: 25, color: "bg-indigo-500" },
              { label: "Маркетинг", value: 15, color: "bg-emerald-500" },
              { label: "Бошқалар", value: 15, color: "bg-slate-200" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                  <span className="text-[10px] font-black text-slate-900">{item.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
