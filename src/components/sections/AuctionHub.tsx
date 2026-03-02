
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, LayoutGrid, Plus, Gavel, Sparkles, Clock } from "lucide-react";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Lot {
  id: string;
  number: string;
  title: string;
  code: string;
  price: number;
  bidsCount: number;
}

const INITIAL_LOTS: Lot[] = [
  {
    id: "1",
    number: "LOT-4594",
    title: "OIJSADAS",
    code: "324242",
    price: 523423,
    bidsCount: 0,
  },
  {
    id: "2",
    number: "LOT-7921",
    title: "UYGTFTYHUJ",
    code: "87654",
    price: 12345678,
    bidsCount: 0,
  }
];

export function AuctionHub() {
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">("buyer");
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [activeLotId, setActiveLotId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLotTitle, setNewLotTitle] = useState("");
  const [newLotPrice, setNewLotPrice] = useState("");
  const { toast } = useToast();

  const [timer, setTimer] = useState("01:11:25");

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val) + " UZS";

  const handleAddLot = () => {
    if (!newLotTitle || !newLotPrice) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(newLotPrice);
    if (isNaN(price)) {
      toast({
        title: "Xatolik",
        description: "Narxni to'g'ri kiriting",
        variant: "destructive",
      });
      return;
    }

    const newLot: Lot = {
      id: Date.now().toString(),
      number: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newLotTitle.toUpperCase(),
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      price: price,
      bidsCount: 0,
    };

    setLots([newLot, ...lots]);
    setIsDialogOpen(false);
    setNewLotTitle("");
    setNewLotPrice("");
    toast({
      title: "Muvaffaqiyatli",
      description: "Yangi lot muvaffaqiyatli qo'shildi",
    });
  };

  const activeLot = lots.find(l => l.id === activeLotId);

  if (activeLotId && activeLot) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Top Toggle (Always visible in this view too) */}
        <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl w-fit border shadow-sm">
          <button
            onClick={() => setActiveTab("buyer")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
              activeTab === "buyer" 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {dict.labels.buyerPanel}
          </button>
          <button
            onClick={() => setActiveTab("seller")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
              activeTab === "seller" 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            {dict.labels.sellerPanel}
          </button>
        </div>

        {/* Terminal Header Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border px-8 py-4 flex justify-between items-center shadow-sm">
          <h2 className="text-xs font-black text-slate-500 tracking-widest uppercase">
            САВДО ТЕРМИНАЛИ
          </h2>
          <div className="text-primary text-2xl font-black tracking-tighter">
            {timer}
          </div>
        </div>

        {/* Main Terminal Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Lot Information (2 columns) */}
          <Card className="lg:col-span-2 border-none rounded-[40px] shadow-sm bg-white overflow-hidden flex flex-col min-h-[500px]">
            <CardContent className="p-10 flex flex-col h-full">
              <div className="mb-8">
                <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-[10px] mb-4 px-4 py-1.5 rounded-full uppercase tracking-wider">
                  ЖОНЛИ АУКЦИОН
                </Badge>
                <h1 className="text-5xl font-black text-[#121926] mb-1">
                  {activeLot.title}
                </h1>
                <p className="text-xl text-muted-foreground/60 font-bold tracking-wider">
                  {activeLot.code}
                </p>
              </div>

              {/* Empty State Box */}
              <div className="flex-1 border-2 border-dashed border-muted rounded-[30px] flex flex-col items-center justify-center p-12 text-center bg-slate-50/30 mt-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <Gavel className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <p className="text-muted-foreground font-medium italic">
                  Ҳозирча таклифлар йўқ. Савдо бошланишини кутинг.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Bidding & AI Side Panel */}
          <div className="space-y-6">
            {/* Bid Control Card */}
            <Card className="border-[6px] border-yellow-400 rounded-[40px] shadow-xl bg-white overflow-hidden">
              <CardContent className="p-10">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-6">
                  ЭНГ ЯХШИ ТАКЛИФ
                </p>
                <div className="mb-8">
                  <div className="text-5xl font-black text-primary tracking-tighter mb-1">
                    {formatCurrency(activeLot.price)}
                  </div>
                  <p className="text-xl font-bold italic text-slate-800">
                    Ҳозирча йўқ
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-10">
                  <span className="text-xs text-muted-foreground font-medium">Рейтинг:</span>
                  <span className="text-xs font-black text-green-500">Аъло (AI тасдиқлади)</span>
                </div>

                <Button className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-[25px] text-lg font-black shadow-2xl shadow-primary/40 mb-6 transition-all active:scale-95 uppercase">
                  БИТИМНИ ИМЗОЛАШ
                </Button>

                <button 
                  onClick={() => setActiveLotId(null)}
                  className="w-full text-center text-[10px] font-black text-slate-400 hover:text-primary tracking-widest uppercase transition-colors"
                >
                  САВДОДАН ЧИҚИШ
                </button>
              </CardContent>
            </Card>

            {/* AI Analytics Card */}
            <Card className="border-none rounded-[30px] shadow-sm bg-[#2e2a73] text-white overflow-hidden relative">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-black tracking-widest uppercase">СИ (AI) ТАҲЛИЛИ</h3>
                </div>
                <p className="text-[10px] leading-relaxed text-blue-100/70 font-medium">
                  Тизим иштирокчиларнинг молиявий ҳолати ва аввалги савдоларини таҳлил қилиб, энг ишончли ҳамкорни тавсия қилмоқда.
                </p>
                
                {/* Decorative circles */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/5 rounded-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Panel Switcher */}
      <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl w-fit border shadow-sm">
        <button
          onClick={() => setActiveTab("buyer")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
            activeTab === "buyer" 
              ? "bg-primary text-white shadow-lg shadow-primary/30" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          {dict.labels.buyerPanel}
        </button>
        <button
          onClick={() => setActiveTab("seller")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
            activeTab === "seller" 
              ? "bg-primary text-white shadow-lg shadow-primary/30" 
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <LayoutGrid className="w-4 h-4" />
          {dict.labels.sellerPanel}
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-[#121926] rounded-[40px] p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
            {dict.labels.manageLots}
          </h1>
          <p className="text-muted-foreground text-sm font-medium opacity-80">
            {dict.labels.lotSubtitle}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="relative z-10 bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
              <Plus className="w-5 h-5" />
              {dict.labels.newLot}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-[30px] border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">{dict.labels.newLot}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Lot nomi
                </Label>
                <Input
                  id="name"
                  value={newLotTitle}
                  onChange={(e) => setNewLotTitle(e.target.value)}
                  placeholder="Masalan: Avtomobil ehtiyot qismlari"
                  className="h-12 rounded-xl border-muted bg-muted/30 focus:bg-white transition-all"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Boshlang'ich narx (UZS)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newLotPrice}
                  onChange={(e) => setNewLotPrice(e.target.value)}
                  placeholder="1 000 000"
                  className="h-12 rounded-xl border-muted bg-muted/30 focus:bg-white transition-all"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="ghost" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl h-12 font-bold"
              >
                Bekor qilish
              </Button>
              <Button 
                onClick={handleAddLot}
                className="rounded-xl h-12 px-8 font-bold bg-primary shadow-lg shadow-primary/20"
              >
                Qo'shish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -ml-24 -mb-24" />
      </div>

      {/* Lots Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {lots.map((lot) => (
          <Card key={lot.id} className="border-none rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white">
            <CardContent className="p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge variant="secondary" className="bg-muted/50 text-muted-foreground font-mono text-[10px] mb-4 px-3 py-1 rounded-full">
                    #{lot.number}
                  </Badge>
                  <h2 className="text-3xl font-black text-[#121926] mb-1">
                    {lot.title}
                  </h2>
                  <p className="text-muted-foreground/60 text-sm font-bold tracking-wider">
                    {lot.code}
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => setActiveLotId(lot.id)}
                  className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-6 font-bold h-12 shadow-lg shadow-primary/20"
                >
                  {dict.labels.watch}
                </Button>
              </div>

              <div className="flex justify-between items-end">
                <div className="text-4xl font-black text-[#121926] tracking-tight">
                  {formatCurrency(lot.price)}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                  <span className="text-[10px] font-black text-green-600 uppercase">
                    {lot.bidsCount} {dict.labels.bids}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
