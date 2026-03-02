
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip as ChartTooltip
} from "recharts";
import { 
  Plus, 
  FileText, 
  Info, 
  Zap, 
  ShieldCheck, 
  Flag, 
  Globe, 
  User, 
  Sparkles,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { name: "Yan", value: 23 },
  { name: "Fev", value: 34 },
  { name: "Mar", value: 28 },
  { name: "Apr", value: 41 },
  { name: "May", value: 38 },
  { name: "Iyun", value: 47 },
];

const chartConfig = {
  value: {
    label: "Savdolar",
    color: "hsl(var(--primary))",
  },
};

interface Lot {
  id: string;
  title: string;
  category: string;
  location: string;
  lotId: string;
  price: number;
  quantity: string;
  hasEscrow?: boolean;
  hasBlitz?: boolean;
}

const INITIAL_LOTS: Lot[] = [
  {
    id: "1",
    title: "IT uskunalar to'plami",
    quantity: "500 dona",
    category: "IT",
    location: "Toshkent",
    lotId: "AUC-UZ-2026-001",
    price: 135773123,
    hasEscrow: true,
    hasBlitz: true,
  },
  {
    id: "2",
    title: "Metall profil",
    quantity: "100 tonna",
    category: "Qurilish",
    location: "Samarqand",
    lotId: "AUC-UZ-2026-002",
    price: 99185225,
    hasBlitz: true,
  },
  {
    id: "3",
    title: "Qishloq xo'jaligi texnikasi",
    quantity: "10 dona",
    category: "Transport",
    location: "Andijon",
    lotId: "AUC-UZ-2026-003",
    price: 216944635,
    hasEscrow: true,
    hasBlitz: true,
  }
];

export function AuctionHub() {
  const [lots] = useState<Lot[]>(INITIAL_LOTS);
  const [timeLeft, setTimeLeft] = useState("00:44:37");
  const { toast } = useToast();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Auktsion Platformasi</h1>
          <p className="text-slate-400 text-xs font-medium">Real vaqt auktsionlari — O'rta Osiyo va O'zbekiston bozori</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-100">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Jonli Efir
          </div>
          <Button className="bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl h-10 px-5 text-xs font-bold gap-2 shadow-lg shadow-blue-200">
            <Plus size={16} /> Yangi Lot
          </Button>
          <Button variant="outline" className="border-blue-200 text-[#2563eb] hover:bg-blue-50 rounded-xl h-10 px-5 text-xs font-bold gap-2">
            <FileText size={16} /> Hisobot
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <Tabs defaultValue="uzb" className="w-full">
          <TabsList className="bg-transparent h-12 p-0 gap-8">
            <TabsTrigger value="uzb" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-xs font-bold gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Flag size={14} /> O'zbekiston
            </TabsTrigger>
            <TabsTrigger value="central" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-xs font-bold gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Globe size={14} /> Markaziy Osiyo
            </TabsTrigger>
            <TabsTrigger value="my" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-xs font-bold gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <User size={14} /> Mening Takliflarim
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-xs font-bold gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Sparkles size={14} /> AI Tahlil
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Lots */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aktiv Lotlar</h2>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold gap-1 text-slate-500">
              Barchasi <ChevronDown size={12} />
            </Button>
          </div>

          <div className="space-y-4">
            {lots.map((lot) => (
              <Card key={lot.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[20px] bg-white overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-800">{lot.title} — <span className="text-slate-500">{lot.quantity}</span></h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                        Kategoriya: {lot.category} | {lot.location} | Lot: {lot.lotId} 
                        <span className="inline-block ml-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#2563eb] tracking-tight">{formatCurrency(lot.price)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="h-7 bg-[#2563eb] hover:bg-blue-700 text-white rounded-full text-[9px] font-black uppercase px-4 gap-1.5">
                      <Zap size={10} fill="currentColor" /> 130mln taklif
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 border-blue-100 text-blue-600 rounded-full text-[9px] font-black uppercase px-3 gap-1.5">
                      <Info size={10} /> Batafsil
                    </Button>
                    {lot.hasEscrow && (
                      <Badge className="h-7 bg-[#22c55e] hover:bg-green-600 text-white border-none rounded-full text-[9px] font-black uppercase px-3 flex items-center gap-1.5">
                        <ShieldCheck size={10} /> Escrow
                      </Badge>
                    )}
                    {lot.hasBlitz && (
                      <Badge className="h-7 bg-[#a855f7] hover:bg-purple-600 text-white border-none rounded-full text-[9px] font-black uppercase px-3 flex items-center gap-1.5">
                        <Zap size={10} /> Blitz
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Stats & Bids */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Jonli Statistika</h2>
            <div className="h-48 w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 600, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="value" 
                      fill="#2563eb" 
                      radius={[4, 4, 0, 0]} 
                      barSize={32}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Vaqt Hisoblagich</h2>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{timeLeft}</p>
              </div>

              <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Takliflar</h2>
                <div className="rounded-xl border border-slate-50 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="text-[9px] font-black uppercase tracking-widest h-8">Taklif beruvchi</TableHead>
                        <TableHead className="text-[9px] font-black uppercase tracking-widest text-right h-8">Summa</TableHead>
                        <TableHead className="text-[9px] font-black uppercase tracking-widest text-center h-8">Vaqt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "Texnomart Group", amount: 128500000, time: "2 daqiqa oldin" },
                        { name: "Artel Electronics", amount: 125000000, time: "5 daqiqa oldin" },
                        { name: "UzAuto Motors", amount: 118000000, time: "9 daqiqa oldin" },
                      ].map((bid, i) => (
                        <TableRow key={i} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="text-[10px] font-bold text-slate-600">{bid.name}</TableCell>
                          <TableCell className="text-right text-[10px] font-black text-blue-600">{formatCurrency(bid.amount)}</TableCell>
                          <TableCell className="text-center text-[9px] font-medium text-slate-400">{bid.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="pt-2">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Auto-Taklif</h2>
                <p className="text-[10px] font-bold text-slate-400 mb-4">Maksimal narx (so'm)</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="250 000 000"
                    className="flex-1 bg-slate-50 border-none rounded-xl h-10 px-4 text-xs font-bold placeholder:text-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <Button className="bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest">
                    Faollashtirish
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
