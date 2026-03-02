
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Line,
  LineChart
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
  ChevronDown,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltipContent, ChartTooltip as ShadcnChartTooltip } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const chartData = [
  { name: "Du", value: 23 },
  { name: "Se", value: 34 },
  { name: "Ch", value: 28 },
  { name: "Pa", value: 41 },
  { name: "Ju", value: 38 },
  { name: "Sh", value: 47 },
  { name: "Ya", value: 42 },
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
  durationSeconds: number;
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
    durationSeconds: 2677, // 44:37
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
    durationSeconds: 172800, // 48:00:00
  }
];

const REGIONAL_LOTS: Lot[] = [
  {
    id: "r1",
    title: "Qozog'iston ko'miri",
    quantity: "1000 tonna",
    category: "Energetika",
    location: "Olmaota",
    lotId: "AUC-KZ-2026-101",
    price: 540000000,
    hasEscrow: true,
    durationSeconds: 86400,
  },
  {
    id: "r2",
    title: "Qirg'iziston asali",
    quantity: "2 tonna",
    category: "Oziq-ovqat",
    location: "Bishkek",
    lotId: "AUC-KG-2026-202",
    price: 12000000,
    hasBlitz: true,
    durationSeconds: 120,
  }
];

export function AuctionHub() {
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [regionalLots, setRegionalLots] = useState<Lot[]>(REGIONAL_LOTS);
  const [activeTab, setActiveTab] = useState("uzb");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newLotTitle, setNewLotTitle] = useState("");
  const [newLotQuantity, setNewLotQuantity] = useState("");
  const [newLotCategory, setNewLotCategory] = useState("IT");
  const [newLotPrice, setNewLotPrice] = useState("");
  const [newLotDuration, setNewLotDuration] = useState("24");

  const [globalTimeLeft, setGlobalTimeLeft] = useState(2677);

  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      setLots((prevLots) => 
        prevLots.map(lot => ({
          ...lot,
          durationSeconds: lot.durationSeconds > 0 ? lot.durationSeconds - 1 : 0
        }))
      );
      setRegionalLots((prevLots) => 
        prevLots.map(lot => ({
          ...lot,
          durationSeconds: lot.durationSeconds > 0 ? lot.durationSeconds - 1 : 0
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  const handleCreateLot = () => {
    if (!newLotTitle || !newLotQuantity || !newLotPrice) {
      toast({
        title: "Xatolik",
        description: "Iltimos, barcha maydonlarni to'ldiring",
        variant: "destructive",
      });
      return;
    }

    const newLot: Lot = {
      id: Math.random().toString(36).substr(2, 9),
      title: newLotTitle,
      quantity: newLotQuantity,
      category: newLotCategory,
      location: "Toshkent",
      lotId: `AUC-UZ-2026-${String(lots.length + 1).padStart(3, '0')}`,
      price: parseFloat(newLotPrice.replace(/\s/g, '')),
      durationSeconds: parseInt(newLotDuration) * 3600,
      hasBlitz: true,
    };

    setLots([newLot, ...lots]);
    setIsDialogOpen(false);
    toast({ title: "Muvaffaqiyatli", description: "Yangi lot yaratildi" });
  };

  const renderLotList = (displayLots: Lot[]) => (
    <div className="space-y-6">
      {displayLots.map((lot) => (
        <Card key={lot.id} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[32px] bg-white overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">{lot.title} — <span className="text-slate-400 font-bold">{lot.quantity}</span></h3>
                <div className="flex items-center gap-3">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.1em]">
                    {lot.category} • {lot.location} • {lot.lotId} 
                  </p>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-50 text-red-500 text-[8px] font-black uppercase">
                    <Clock size={10} /> {formatTime(lot.durationSeconds)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-[#2563eb] tracking-tighter">{formatCurrency(lot.price)}</p>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Boshlang'ich narx</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Button size="sm" className="h-8 bg-[#2563eb] hover:bg-blue-700 text-white rounded-full text-[9px] font-black uppercase px-5 gap-2 tracking-widest">
                <Zap size={10} fill="currentColor" /> Kuzatish
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-slate-100 hover:border-blue-200 text-slate-500 hover:text-blue-600 rounded-full text-[9px] font-black uppercase px-4 gap-2 tracking-widest transition-colors">
                <Info size={10} /> Batafsil
              </Button>
              {lot.hasEscrow && (
                <Badge className="h-8 bg-emerald-50 text-emerald-600 border-none rounded-full text-[9px] font-black uppercase px-4 flex items-center gap-2">
                  <ShieldCheck size={10} /> Escrow
                </Badge>
              )}
              {lot.hasBlitz && (
                <Badge className="h-8 bg-violet-50 text-violet-600 border-none rounded-full text-[9px] font-black uppercase px-4 flex items-center gap-2">
                  <Zap size={10} /> Blitz
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Auktsion Platformasi</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Real vaqt auktsionlari — O'rta Osiyo va O'zbekiston bozori</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-[9px] font-black uppercase tracking-wider border border-red-100">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Jonli Efir
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl h-10 px-6 text-[10px] font-black uppercase tracking-widest gap-2 shadow-lg shadow-blue-200">
                <Plus size={14} /> Yangi Lot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[24px]">
              <DialogHeader>
                <DialogTitle className="text-[14px] font-black uppercase tracking-widest">Yangi Lot Yaratish</DialogTitle>
                <DialogDescription className="text-[11px] font-bold text-slate-400 uppercase">
                  Auktsion uchun yangi mahsulot ma'lumotlarini kiriting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Lot nomi</Label>
                  <Input placeholder="Apple MacBook Pro" className="rounded-xl h-10 text-[11px] font-bold" value={newLotTitle} onChange={(e) => setNewLotTitle(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Miqdor</Label>
                    <Input placeholder="100 dona" className="rounded-xl h-10 text-[11px] font-bold" value={newLotQuantity} onChange={(e) => setNewLotQuantity(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Toifa</Label>
                    <Select value={newLotCategory} onValueChange={setNewLotCategory}>
                      <SelectTrigger className="rounded-xl h-10 text-[11px] font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Qurilish">Qurilish</SelectItem>
                        <SelectItem value="Transport">Transport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Boshlang'ich narx</Label>
                  <Input placeholder="15 000 000" className="rounded-xl h-10 text-[11px] font-bold" value={newLotPrice} onChange={(e) => setNewLotPrice(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateLot} className="w-full bg-[#2563eb] rounded-xl h-11 font-black uppercase tracking-widest text-[11px]">Lotni Tasdiqlash</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="border-blue-200 text-[#2563eb] hover:bg-blue-50 rounded-xl h-10 px-6 text-[10px] font-black uppercase tracking-widest gap-2">
            <FileText size={14} /> Hisobot
          </Button>
        </div>
      </div>

      <Tabs defaultValue="uzb" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b border-slate-100 mb-8">
          <TabsList className="bg-transparent h-12 p-0 gap-10">
            <TabsTrigger value="uzb" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Flag size={14} /> O'zbekiston
            </TabsTrigger>
            <TabsTrigger value="central" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Globe size={14} /> Markaziy Osiyo
            </TabsTrigger>
            <TabsTrigger value="my" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <User size={14} /> Mening Takliflarim
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Sparkles size={14} /> AI Tahlil
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className={cn(activeTab === "ai" ? "lg:col-span-12" : "lg:col-span-7", "space-y-8")}>
            <TabsContent value="uzb" className="m-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aktiv Lotlar (O'zbekiston)</h2>
              </div>
              {renderLotList(lots)}
            </TabsContent>

            <TabsContent value="central" className="m-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Markaziy Osiyo Lotlari</h2>
              </div>
              {renderLotList(regionalLots)}
            </TabsContent>

            <TabsContent value="my" className="m-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sizning Ishtirokingiz</h2>
              </div>
              <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableHead className="text-[9px] font-black uppercase">Lot nomi</TableHead>
                      <TableHead className="text-[9px] font-black uppercase">Sizning Taklifingiz</TableHead>
                      <TableHead className="text-[9px] font-black uppercase">Holat</TableHead>
                      <TableHead className="text-right text-[9px] font-black uppercase">Amal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-slate-50">
                      <TableCell className="text-[11px] font-bold">IT uskunalar to'plami</TableCell>
                      <TableCell className="text-[11px] font-black text-blue-600">128 500 000 so'm</TableCell>
                      <TableCell><Badge className="bg-green-50 text-green-600 border-none text-[8px] uppercase">Aktiv</Badge></TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="ghost" className="text-[9px] uppercase font-black">Yangilash</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none shadow-sm rounded-[32px] bg-white p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Bozor Trendlari Tahlili</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">AI tomonidan generatsiya qilingan</p>
                    </div>
                  </div>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                        <YAxis hide />
                        <ShadcnChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Card>
                <div className="space-y-6">
                  <Card className="border-none shadow-sm rounded-[32px] bg-indigo-600 p-8 text-white">
                    <Sparkles className="mb-4 opacity-60" size={24} />
                    <h3 className="text-sm font-black uppercase tracking-widest mb-2">AI Bashorati</h3>
                    <p className="text-[11px] font-bold text-white/80 leading-relaxed uppercase tracking-tighter">Kelgusi hafta qurilish materiallari narxi 4.2% ga ko'tarilishi kutilmoqda.</p>
                  </Card>
                  <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                    <div className="flex items-center gap-2 mb-4 text-amber-500">
                      <AlertCircle size={16} />
                      <h3 className="text-[10px] font-black uppercase tracking-widest">Xavf Tahlili</h3>
                    </div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-tight">Bozorda o'xshash lotlar ko'paygani sababli raqobat 15% ga oshgan.</p>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>

          {activeTab !== "ai" && (
            <div className="lg:col-span-5 space-y-8">
              <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Jonli Statistika</h2>
                <ChartContainer config={chartConfig} className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                      <YAxis hide />
                      <ShadcnChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={36} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Vaqt Hisoblagich</h2>
                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">{formatTime(globalTimeLeft)}</p>
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Lot yakuniga</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">So'nggi Takliflar</h2>
                    <div className="rounded-2xl border border-slate-50 overflow-hidden">
                      <Table>
                        <TableHeader className="bg-slate-50/50">
                          <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="text-[8px] font-black uppercase tracking-[0.2em] h-10 px-4">Ishtirokchi</TableHead>
                            <TableHead className="text-[8px] font-black uppercase tracking-[0.2em] text-right h-10 px-4">Summa</TableHead>
                            <TableHead className="text-[8px] font-black uppercase tracking-[0.2em] text-center h-10 px-4">Vaqt</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { name: "Texnomart Group", amount: 128500000, time: "2 daqiqa oldin" },
                            { name: "Artel Electronics", amount: 125000000, time: "5 daqiqa oldin" },
                            { name: "UzAuto Motors", amount: 118000000, time: "9 daqiqa oldin" },
                          ].map((bid, i) => (
                            <TableRow key={i} className="border-slate-50 hover:bg-slate-50/80 transition-colors">
                              <TableCell className="text-[10px] font-bold text-slate-700 px-4">{bid.name}</TableCell>
                              <TableCell className="text-right text-[10px] font-black text-blue-600 px-4">{formatCurrency(bid.amount)}</TableCell>
                              <TableCell className="text-center text-[8px] font-bold text-slate-400 px-4">{bid.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
