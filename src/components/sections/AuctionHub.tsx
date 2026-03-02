
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
  LineChart,
  Pie,
  PieChart,
  Cell
} from "recharts";
import { 
  Plus, 
  FileText, 
  Info, 
  Zap, 
  Flag, 
  Globe, 
  User, 
  Sparkles,
  Clock,
  TrendingUp,
  Handshake,
  Loader2,
  ShieldAlert,
  Search,
  Download,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltipContent, ChartTooltip as ShadcnChartTooltip, type ChartConfig } from "@/components/ui/chart";
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
import { getLotAiDetails, LotDetailsOutput } from "@/ai/flows/lot-details-flow";
import { generateAuctionReport, AuctionReportOutput } from "@/ai/flows/auction-report-flow";

const chartData = [
  { name: "Du", value: 23 },
  { name: "Se", value: 34 },
  { name: "Ch", value: 28 },
  { name: "Pa", value: 41 },
  { name: "Ju", value: 38 },
  { name: "Sh", value: 47 },
  { name: "Ya", value: 42 },
];

const pieData = [
  { name: "IT", value: 400, color: "#2563eb" },
  { name: "Qurilish", value: 300, color: "#8b5cf6" },
  { name: "Transport", value: 200, color: "#f59e0b" },
];

const mainChartConfig = {
  value: {
    label: "Savdolar",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const reportPieConfig = {
  value: {
    label: "Qiymat",
  },
  IT: {
    label: "IT",
    color: "#2563eb",
  },
  Qurilish: {
    label: "Qurilish",
    color: "#8b5cf6",
  },
  Transport: {
    label: "Transport",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

const reportBarConfig = {
  value: {
    label: "Faollik",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

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
  bidsCount?: number;
}

const INITIAL_LOTS: Lot[] = [
  {
    id: "1",
    title: "IT uskunalar to'plami",
    quantity: "500 dona",
    category: "IT",
    location: "Toshkent",
    lotId: "AUC-UZ-2026-001",
    price: 140773123,
    hasEscrow: true,
    hasBlitz: true,
    durationSeconds: 2610, 
    bidsCount: 120,
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
    durationSeconds: 172800, 
    bidsCount: 45,
  },
  {
    id: "ca1",
    title: "Elektronika — 500 dona TV",
    quantity: "500 dona",
    category: "IT",
    location: "Olmaota",
    lotId: "LOT-CA-001",
    price: 547000000,
    hasBlitz: true,
    durationSeconds: 3300,
    bidsCount: 15,
  },
  {
    id: "ca2",
    title: "Transport — 3 ta yuk mashinasi",
    quantity: "3 ta",
    category: "Transport",
    location: "Bishkek",
    lotId: "LOT-CA-002",
    price: 779000000,
    hasBlitz: true,
    durationSeconds: 26520,
    bidsCount: 8,
  },
];

export function AuctionHub({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [activeTab, setActiveTab] = useState("uzb");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const [selectedLotForBid, setSelectedLotForBid] = useState<Lot | null>(null);
  const [bidAmountInput, setBidAmountInput] = useState("");
  const [selectedLotDetails, setSelectedLotDetails] = useState<LotDetailsOutput | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const [reportData, setReportData] = useState<AuctionReportOutput | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

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
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePlaceBidClick = (lot: Lot) => {
    setSelectedLotForBid(lot);
    setBidAmountInput((lot.price + 1000000).toString());
    setIsBidDialogOpen(true);
  };

  const handleConfirmBid = () => {
    if (!selectedLotForBid) return;

    const amount = parseFloat(bidAmountInput.replace(/\s/g, ""));
    if (isNaN(amount) || amount <= selectedLotForBid.price) {
      toast({
        title: "Xatolik",
        description: "Taklif summasi joriy narxdan yuqori bo'lishi kerak",
        variant: "destructive",
      });
      return;
    }

    setLots(prev => prev.map(l => 
      l.id === selectedLotForBid.id 
        ? { ...l, price: amount, bidsCount: (l.bidsCount || 0) + 1 }
        : l
    ));

    toast({
      title: "Taklif qabul qilindi",
      description: `${selectedLotForBid.lotId} uchun yangi narx: ${formatCurrency(amount)} so'm`,
    });

    setIsBidDialogOpen(false);
    setSelectedLotForBid(null);
  };

  const handleShowDetails = async (lot: Lot) => {
    setLoadingDetails(true);
    setIsDetailsOpen(true);
    setSelectedLotDetails(null);
    try {
      const details = await getLotAiDetails({
        title: lot.title,
        category: lot.category,
        price: Number(lot.price),
        quantity: lot.quantity
      });
      setSelectedLotDetails(details);
    } catch (error) {
      console.error("Details loading error:", error);
      toast({
        title: "Xatolik",
        description: "AI ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      });
      setIsDetailsOpen(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleShowReport = async () => {
    setLoadingReport(true);
    setIsReportOpen(true);
    setReportData(null);
    try {
      const totalValue = lots.reduce((acc, lot) => acc + lot.price, 0);
      const totalBids = lots.reduce((acc, lot) => acc + (lot.bidsCount || 0), 0);
      
      const data = await generateAuctionReport({
        totalLots: lots.length,
        totalValue,
        totalBids,
        topCategory: "IT",
        recentBids: [
          { participant: "Texnomart Group", amount: 140773123 },
          { participant: "Artel Electronics", amount: 139000000 },
          { participant: "UzAuto Motors", amount: 135000000 },
        ]
      });
      setReportData(data);
    } catch (error) {
      console.error("Report loading error:", error);
      toast({
        title: "Xatolik",
        description: "Hisobotni tayyorlashda xatolik yuz berdi.",
        variant: "destructive",
      });
      setIsReportOpen(false);
    } finally {
      setLoadingReport(false);
    }
  };

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
      bidsCount: 0,
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
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Joriy narx</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Button 
                onClick={() => handlePlaceBidClick(lot)}
                size="sm" 
                className="h-9 bg-[#2563eb] hover:bg-blue-700 text-white rounded-full text-[10px] font-black uppercase px-6 gap-2 tracking-widest shadow-lg shadow-blue-100"
              >
                <Zap size={12} fill="currentColor" /> Taklif
              </Button>
              <Button 
                onClick={() => handleShowDetails(lot)}
                variant="outline" 
                size="sm" 
                className="h-9 border-slate-100 hover:border-blue-200 text-slate-500 hover:text-blue-600 rounded-full text-[10px] font-black uppercase px-5 gap-2 tracking-widest transition-colors"
              >
                <Info size={12} /> Batafsil
              </Button>
              <Button variant="outline" size="sm" className="h-9 border-slate-100 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase px-5 gap-2 tracking-widest border-none">
                <Handshake size={12} /> Savdo
              </Button>
              <Button 
                onClick={() => onNavigate?.('eri')}
                variant="outline" 
                size="sm" 
                className="h-9 border-slate-100 bg-violet-50 hover:bg-violet-100 text-violet-600 rounded-full text-[10px] font-black uppercase px-5 gap-2 tracking-widest border-none"
              >
                <FileText size={12} /> ERI
              </Button>
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
            Jonli
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl h-11 px-6 text-[11px] font-black uppercase tracking-widest gap-2 shadow-lg shadow-blue-200">
                <Plus size={16} /> Yangi Lot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[32px]">
              <DialogHeader>
                <DialogTitle className="text-[14px] font-black uppercase tracking-widest">Yangi Lot Yaratish</DialogTitle>
                <DialogDescription className="text-[11px] font-bold text-slate-400 uppercase">
                  Auktsion uchun yangi mahsulot ma'lumotlarini kiriting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Lot nomi</Label>
                  <Input placeholder="Apple MacBook Pro" className="rounded-xl h-12 text-[12px] font-bold" value={newLotTitle} onChange={(e) => setNewLotTitle(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Miqdor</Label>
                    <Input placeholder="100 dona" className="rounded-xl h-12 text-[12px] font-bold" value={newLotQuantity} onChange={(e) => setNewLotQuantity(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Toifa</Label>
                    <Select value={newLotCategory} onValueChange={setNewLotCategory}>
                      <SelectTrigger className="rounded-xl h-12 text-[12px] font-bold">
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
                  <Input placeholder="15 000 000" className="rounded-xl h-12 text-[12px] font-bold" value={newLotPrice} onChange={(e) => setNewLotPrice(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateLot} className="w-full bg-[#2563eb] rounded-xl h-12 font-black uppercase tracking-widest text-[12px]">Lotni Tasdiqlash</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button 
            onClick={handleShowReport}
            variant="outline" 
            className="border-blue-200 text-[#2563eb] hover:bg-blue-50 rounded-xl h-11 px-6 text-[11px] font-black uppercase tracking-widest gap-2"
          >
            <FileText size={16} /> Hisobot
          </Button>
        </div>
      </div>

      <Tabs defaultValue="uzb" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b border-slate-100 mb-8">
          <TabsList className="bg-transparent h-12 p-0 gap-10">
            <TabsTrigger value="central" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Globe size={14} /> Markaziy Osiyo
            </TabsTrigger>
            <TabsTrigger value="uzb" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest gap-2 text-slate-400 data-[state=active]:text-blue-600">
              <Flag size={14} /> O'zbekiston
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
            <TabsContent value="uzb" className="m-0 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aktiv Lotlar (O'zbekiston)</h2>
              </div>
              {renderLotList(lots.filter(l => l.lotId.startsWith("AUC")))}
            </TabsContent>

            <TabsContent value="central" className="m-0 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {lots.filter(l => l.lotId.startsWith("LOT-CA")).map(lot => (
                  <Card key={lot.id} className="border-none shadow-sm rounded-[24px] bg-white p-8 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-[14px] font-black uppercase tracking-widest text-slate-900">{lot.lotId}</h3>
                      <Badge className="bg-red-50 text-red-500 border-none text-[10px] font-black uppercase px-2 py-0.5 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                      </Badge>
                    </div>
                    <p className="text-[12px] font-bold text-slate-400 uppercase mb-4">{lot.title}</p>
                    <div className="mb-6">
                      <p className="text-3xl font-black text-blue-600 tracking-tighter">{formatCurrency(lot.price)} so'm</p>
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-black uppercase">
                        <Clock size={14} /> {formatTime(lot.durationSeconds)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      <Button onClick={() => handlePlaceBidClick(lot)} size="sm" className="bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase h-9 px-5 gap-2 shadow-md">
                        <Zap size={12} fill="currentColor" /> Taklif
                      </Button>
                      <Button onClick={() => handleShowDetails(lot)} variant="outline" size="sm" className="h-9 border-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase px-5 gap-2">
                        <Info size={12} /> Batafsil
                      </Button>
                      <Button onClick={() => onNavigate?.('eri')} variant="outline" size="sm" className="h-9 bg-violet-50 text-violet-600 rounded-xl text-[10px] font-black uppercase px-5 gap-2 border-none">
                        <FileText size={12} /> ERI
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
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
                    {lots.slice(0, 2).map(lot => (
                      <TableRow key={lot.id} className="border-slate-50">
                        <TableCell className="text-[11px] font-bold">{lot.title}</TableCell>
                        <TableCell className="text-[11px] font-black text-blue-600">{formatCurrency(lot.price)} so'm</TableCell>
                        <TableCell><Badge className="bg-green-50 text-green-600 border-none text-[8px] uppercase">Aktiv</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button 
                            onClick={() => handlePlaceBidClick(lot)}
                            size="sm" variant="ghost" className="text-[9px] uppercase font-black"
                          >
                            Yangilash
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
                  <ChartContainer config={mainChartConfig} className="h-64 w-full">
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
                    <p className="text-[11px] font-bold text-white/80 leading-relaxed uppercase tracking-tighter">Kelgusi hafta IT uskunalar narxi 4.2% ga ko'tarilishi kutilmoqda.</p>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>

          {activeTab !== "ai" && (
            <div className="lg:col-span-5 space-y-8">
              <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Jonli Statistika</h2>
                <ChartContainer config={mainChartConfig} className="h-48 w-full">
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
                    <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Vaqt Hisoblagich</h2>
                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">{formatTime(globalTimeLeft)}</p>
                      <p className="text-[11px] font-black text-red-500 uppercase tracking-widest mb-1">Lot yakuniga</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">So'nggi Takliflar</h2>
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
                            { name: "Texnomart Group", amount: 140773123, time: "Hozir" },
                            { name: "Artel Electronics", amount: 139000000, time: "2 daqiqa oldin" },
                            { name: "UzAuto Motors", amount: 135000000, time: "5 daqiqa oldin" },
                          ].map((bid, i) => (
                            <TableRow key={i} className="border-slate-50 hover:bg-slate-50/80 transition-colors">
                              <TableCell className="text-[11px] font-bold text-slate-700 px-4">{bid.name}</TableCell>
                              <TableCell className="text-right text-[11px] font-black text-blue-600 px-4">{formatCurrency(bid.amount)}</TableCell>
                              <TableCell className="text-center text-[9px] font-bold text-slate-400 px-4">{bid.time}</TableCell>
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

      {/* Place Bid Dialog */}
      <Dialog open={isBidDialogOpen} onOpenChange={setIsBidDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[32px]">
          <DialogHeader>
            <DialogTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-2">
              <Zap className="text-blue-600 w-5 h-5" /> Taklif Berish
            </DialogTitle>
            <DialogDescription className="text-[11px] font-bold text-slate-400 uppercase">
              {selectedLotForBid?.title} uchun yangi narxni belgilang.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Joriy Narx:</span>
              <span className="text-[16px] font-black text-slate-900">{formatCurrency(selectedLotForBid?.price || 0)} so'm</span>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sizning Taklifingiz</Label>
              <div className="relative">
                <Input 
                  type="text"
                  placeholder="Summani kiriting..." 
                  className="rounded-xl h-14 text-[14px] font-black pl-4" 
                  value={bidAmountInput} 
                  onChange={(e) => setBidAmountInput(e.target.value)} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">UZS</span>
              </div>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">
                Minimal qadam: +1,000,000 so'm tavsiya etiladi
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleConfirmBid} 
              className="w-full bg-[#2563eb] rounded-xl h-14 font-black uppercase tracking-widest text-[12px] shadow-lg shadow-blue-200"
            >
              Taklifni Tasdiqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Lot Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[32px] overflow-hidden p-0 border-none">
          <DialogHeader className="p-8 bg-slate-50/80 border-b">
            <DialogTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="text-blue-600 w-5 h-5" /> AI Tahliliy Ma'lumot
            </DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto bg-white">
            {loadingDetails ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">AI ma'lumotlarni tahlil qilmoqda...</p>
              </div>
            ) : selectedLotDetails ? (
              <div className="space-y-8 animate-fade-in">
                <section>
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Tavsif</h4>
                  <p className="text-[13px] leading-relaxed text-slate-600 font-medium">{selectedLotDetails.description}</p>
                </section>
                
                <section>
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-3">Bozor Tahlili</h4>
                  <p className="text-[13px] leading-relaxed text-slate-600 font-medium">{selectedLotDetails.marketAnalysis}</p>
                </section>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <TrendingUp size={14} /> Strategiya
                    </h4>
                    <p className="text-[11px] font-bold text-emerald-800">{selectedLotDetails.strategy}</p>
                  </div>
                  <div className={cn(
                    "p-6 rounded-2xl border",
                    selectedLotDetails.riskLevel === 'Low' ? "bg-blue-50 border-blue-100 text-blue-800" :
                    selectedLotDetails.riskLevel === 'Medium' ? "bg-amber-50 border-amber-100 text-amber-800" :
                    "bg-red-50 border-red-100 text-red-800"
                  )}>
                    <h4 className="text-[9px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <ShieldAlert size={14} /> Xavf Darajasi
                    </h4>
                    <p className="text-[11px] font-black">{selectedLotDetails.riskLevel === 'Low' ? 'Past' : selectedLotDetails.riskLevel === 'Medium' ? 'O\'rta' : 'Yuqori'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Ma'lumot mavjud emas.</p>
              </div>
            )}
          </div>
          <DialogFooter className="p-6 bg-slate-50 border-t">
            <Button onClick={() => setIsDetailsOpen(false)} className="bg-slate-900 text-white rounded-xl h-12 px-8 font-black uppercase text-[11px] tracking-widest w-full">Yopish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Auction Report Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="sm:max-w-[800px] rounded-[40px] overflow-hidden p-0 border-none max-h-[90vh] flex flex-col bg-[#f8fafc]">
          <DialogHeader className="p-10 bg-white border-b flex flex-row items-center justify-between shrink-0">
            <div>
              <DialogTitle className="text-[14px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-slate-900">
                <BarChart3 className="text-[#2563eb] w-6 h-6" /> Auksion Faoliyati Hisoboti
              </DialogTitle>
              <DialogDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Real vaqt tahlili va AI tavsiyalari
              </DialogDescription>
            </div>
            <Button variant="outline" className="h-10 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest gap-2">
              <Download size={14} /> PDF Yuklash
            </Button>
          </DialogHeader>
          
          <div className="p-10 space-y-10 overflow-y-auto flex-1">
            {loadingReport ? (
              <div className="flex flex-col items-center justify-center py-32 gap-6">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-[#2563eb] animate-spin" />
                  <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={20} />
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Ma'lumotlar tahlil qilinmoqda...</p>
              </div>
            ) : reportData ? (
              <div className="space-y-10 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ChartContainer config={mainChartConfig} className="bg-white border-none shadow-sm p-6 rounded-[24px]">
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Jami Aylanma</p>
                      <p className="text-2xl font-black text-[#2563eb] tracking-tighter">{formatCurrency(lots.reduce((a, b) => a + b.price, 0))}</p>
                    </div>
                  </ChartContainer>
                  <Card className="bg-white border-none shadow-sm p-6 rounded-[24px]">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Aktiv Lotlar</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">{lots.length} ta</p>
                  </Card>
                  <Card className="bg-white border-none shadow-sm p-6 rounded-[24px]">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Jami Takliflar</p>
                    <p className="text-2xl font-black text-emerald-600 tracking-tighter">{lots.reduce((a, b) => a + (b.bidsCount || 0), 0)} ta</p>
                  </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white border-none shadow-sm p-8 rounded-[32px]">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Savdolar ulushi (Toifalar)</h4>
                    <div className="h-64">
                      <ChartContainer config={reportPieConfig} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ShadcnChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </Card>

                  <Card className="bg-white border-none shadow-sm p-8 rounded-[32px]">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Faollik tahlili</h4>
                    <div className="h-64">
                      <ChartContainer config={reportBarConfig} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                            <ShadcnChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={24} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </Card>
                </div>

                {/* AI Summary Section */}
                <section className="space-y-6">
                  <div className="bg-blue-600 p-10 rounded-[40px] text-white shadow-xl shadow-blue-200">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles size={24} className="text-blue-200" />
                      <h4 className="text-[12px] font-black uppercase tracking-[0.2em]">AI Executive Summary</h4>
                    </div>
                    <p className="text-[14px] leading-relaxed font-medium text-blue-50 opacity-90">{reportData.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-2">Bozor Kayfiyati</h4>
                      <Card className="bg-white border-none shadow-sm p-6 rounded-[24px]">
                        <p className="text-[13px] leading-relaxed text-slate-600 font-medium">{reportData.marketSentiment}</p>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-2">Strategik Tavsiyalar</h4>
                      <div className="space-y-3">
                        {reportData.recommendations.map((rec, i) => (
                          <Card key={i} className="bg-white border-none shadow-sm p-4 rounded-[20px] flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-[12px] font-bold text-slate-700">{rec}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : null}
          </div>
          <DialogFooter className="p-8 bg-white border-t shrink-0">
            <Button onClick={() => setIsReportOpen(false)} className="bg-slate-900 text-white rounded-2xl h-14 px-10 font-black uppercase text-[11px] tracking-widest w-full shadow-lg">Yopish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
