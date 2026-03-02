
"use client";

import * as React from "react";
import { useState } from "react";
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
  ChevronDown,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
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
  duration?: string;
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
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [timeLeft, setTimeLeft] = useState("00:44:37");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [newLotTitle, setNewLotTitle] = useState("");
  const [newLotQuantity, setNewLotQuantity] = useState("");
  const [newLotCategory, setNewLotCategory] = useState("IT");
  const [newLotPrice, setNewLotPrice] = useState("");
  const [newLotDuration, setNewLotDuration] = useState("24");

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
      location: "Toshkent", // Standart
      lotId: `AUC-UZ-2026-${String(lots.length + 1).padStart(3, '0')}`,
      price: parseFloat(newLotPrice.replace(/\s/g, '')),
      duration: newLotDuration,
      hasBlitz: true,
    };

    setLots([newLot, ...lots]);
    setIsDialogOpen(false);
    
    // Formni tozalash
    setNewLotTitle("");
    setNewLotQuantity("");
    setNewLotPrice("");
    
    toast({
      title: "Muvaffaqiyatli",
      description: "Yangi lot muvaffaqiyatli yaratildi",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      {/* Header Section */}
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
                  <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Lot nomi</Label>
                  <Input 
                    id="title" 
                    placeholder="Masalan: Apple MacBook Pro" 
                    className="h-10 rounded-xl text-[11px] font-bold"
                    value={newLotTitle}
                    onChange={(e) => setNewLotTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Miqdor</Label>
                    <Input 
                      id="quantity" 
                      placeholder="100 dona" 
                      className="h-10 rounded-xl text-[11px] font-bold"
                      value={newLotQuantity}
                      onChange={(e) => setNewLotQuantity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Toifa</Label>
                    <Select value={newLotCategory} onValueChange={setNewLotCategory}>
                      <SelectTrigger className="h-10 rounded-xl text-[11px] font-bold">
                        <SelectValue placeholder="Toifani tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Qurilish">Qurilish</SelectItem>
                        <SelectItem value="Transport">Transport</SelectItem>
                        <SelectItem value="Oziq-ovqat">Oziq-ovqat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Boshlang'ich narx (so'm)</Label>
                  <Input 
                    id="price" 
                    placeholder="15 000 000" 
                    className="h-10 rounded-xl text-[11px] font-bold"
                    value={newLotPrice}
                    onChange={(e) => setNewLotPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Auktsion davomiyligi</Label>
                  <RadioGroup value={newLotDuration} onValueChange={setNewLotDuration} className="flex gap-4">
                    <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      <RadioGroupItem value="24" id="r1" />
                      <Label htmlFor="r1" className="text-[11px] font-bold cursor-pointer">24 soat</Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      <RadioGroupItem value="48" id="r2" />
                      <Label htmlFor="r2" className="text-[11px] font-bold cursor-pointer">48 soat</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleCreateLot}
                  className="w-full bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl h-11 text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  Lotni Tasdiqlash
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="border-blue-200 text-[#2563eb] hover:bg-blue-50 rounded-xl h-10 px-6 text-[10px] font-black uppercase tracking-widest gap-2">
            <FileText size={14} /> Hisobot
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-100">
        <Tabs defaultValue="uzb" className="w-full">
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
        </Tabs>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Lots */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aktiv Lotlar</h2>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold gap-1 text-slate-500 uppercase tracking-widest">
              Barchasi <ChevronDown size={12} />
            </Button>
          </div>

          <div className="space-y-6">
            {lots.map((lot) => (
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
                          <Clock size={10} /> {lot.duration ? `${lot.duration}:00:00` : "00:44:37"}
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
        </div>

        {/* Right Column: Stats & Bids */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Jonli Statistika</h2>
            <div className="h-48 w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="value" 
                      fill="#2563eb" 
                      radius={[6, 6, 0, 0]} 
                      barSize={36}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Vaqt Hisoblagich</h2>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">{timeLeft}</p>
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

              <div className="pt-2">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Auto-Taklif Faollashtirish</h2>
                <div className="flex gap-2.5">
                  <input 
                    type="text" 
                    placeholder="Maksimal narx (so'm)"
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl h-11 px-5 text-[11px] font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-200 outline-none transition-all"
                  />
                  <Button className="bg-[#1e1e1e] hover:bg-black text-white rounded-xl h-11 px-6 text-[9px] font-black uppercase tracking-widest">
                    OK
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

