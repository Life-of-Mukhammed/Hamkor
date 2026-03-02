
"use client";

import { useState, useEffect, useMemo } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, LayoutGrid, Plus, Gavel, Sparkles, Clock, User, TrendingUp, CheckCircle2 } from "lucide-react";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Lot {
  id: string;
  number: string;
  title: string;
  code: string;
  price: number;
}

interface Bid {
  id: string;
  bidder: string;
  amount: number;
  time: string;
  status: 'pending' | 'highest';
}

const INITIAL_LOTS: Lot[] = [
  {
    id: "1",
    number: "LOT-4594",
    title: "AVTOMOBIL EHTIYOT QISMLARI",
    code: "324242",
    price: 523423,
  },
  {
    id: "2",
    number: "LOT-7921",
    title: "ELEKTRONIKA JIXOZLARI",
    code: "87654",
    price: 12345678,
  }
];

const MOCK_BIDDERS = ["OOO 'EXPRESS LOGISTIC'", "AKFA GROUP", "ARTEL ELECTRONICS", "UZ-KOR GAS", "SAM-AUTO"];

export function AuctionHub() {
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">("buyer");
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [activeLotId, setActiveLotId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLotTitle, setNewLotTitle] = useState("");
  const [newLotPrice, setNewLotPrice] = useState("");
  const [bids, setBids] = useState<Record<string, Bid[]>>({});
  const { toast } = useToast();

  const [timer, setTimer] = useState("01:11:25");

  // Real-time bid simulation
  useEffect(() => {
    if (!activeLotId) return;

    const interval = setInterval(() => {
      setBids(prev => {
        const currentLotBids = prev[activeLotId] || [];
        const lastBidAmount = currentLotBids.length > 0 
          ? currentLotBids[0].amount 
          : (lots.find(l => l.id === activeLotId)?.price || 0);
        
        const newAmount = lastBidAmount + Math.floor(Math.random() * 500000) + 100000;
        const newBid: Bid = {
          id: Math.random().toString(36).substr(2, 9),
          bidder: MOCK_BIDDERS[Math.floor(Math.random() * MOCK_BIDDERS.length)],
          amount: newAmount,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          status: 'highest'
        };

        const updatedBids = [newBid, ...currentLotBids.map(b => ({ ...b, status: 'pending' as const }))].slice(0, 10);
        return { ...prev, [activeLotId]: updatedBids };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeLotId, lots]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val) + " UZS";

  const handleAddLot = () => {
    if (!newLotTitle || !newLotPrice) {
      toast({ title: "Xatolik", description: "Barcha maydonlarni to'ldiring", variant: "destructive" });
      return;
    }
    const price = parseFloat(newLotPrice);
    if (isNaN(price)) {
      toast({ title: "Xatolik", description: "Narxni to'g'ri kiriting", variant: "destructive" });
      return;
    }

    const newLot: Lot = {
      id: Date.now().toString(),
      number: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newLotTitle.toUpperCase(),
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      price: price,
    };

    setLots([newLot, ...lots]);
    setIsDialogOpen(false);
    setNewLotTitle("");
    setNewLotPrice("");
    toast({ title: "Muvaffaqiyatli", description: "Yangi lot muvaffaqiyatli qo'shildi" });
  };

  const activeLot = lots.find(l => l.id === activeLotId);
  const currentBids = activeLotId ? (bids[activeLotId] || []) : [];
  const highestBid = currentBids[0];

  if (activeLotId && activeLot) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl w-fit border shadow-sm">
          <button
            onClick={() => { setActiveTab("buyer"); setActiveLotId(null); }}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
              activeTab === "buyer" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-primary"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {dict.labels.buyerPanel}
          </button>
          <button
            onClick={() => { setActiveTab("seller"); setActiveLotId(null); }}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
              activeTab === "seller" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-primary"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            {dict.labels.sellerPanel}
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl border px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-xs font-black text-slate-500 tracking-widest uppercase">
              {activeTab === 'seller' ? 'ЛОТ БОШҚАРУВИ' : 'САВДО ТЕРМИНАЛИ'}
            </h2>
          </div>
          <div className="text-primary text-2xl font-black tracking-tighter font-mono">
            {timer}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none rounded-[40px] shadow-sm bg-white overflow-hidden flex flex-col min-h-[600px]">
            <CardContent className="p-10 flex flex-col h-full">
              <div className="mb-8 flex justify-between items-start">
                <div>
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
                {activeTab === 'seller' && (
                  <div className="text-right">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">БОШЛАНҒИЧ НАРХ</p>
                    <p className="text-xl font-bold text-slate-400 line-through">{formatCurrency(activeLot.price)}</p>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4 px-4">
                  <h3 className="text-xs font-black text-muted-foreground tracking-widest uppercase">ТАКЛИФЛАР ТАРИХИ</h3>
                  <Badge variant="outline" className="text-[10px] font-bold">{currentBids.length} ТАКЛИФ</Badge>
                </div>
                
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-3">
                    {currentBids.length === 0 ? (
                      <div className="h-48 border-2 border-dashed border-muted rounded-[30px] flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                        <Gavel className="w-10 h-10 text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground font-medium italic">Ҳозирча такliфлар йўқ...</p>
                      </div>
                    ) : (
                      currentBids.map((bid, index) => (
                        <div 
                          key={bid.id} 
                          className={cn(
                            "flex justify-between items-center p-6 rounded-[25px] border-2 transition-all animate-fade-in",
                            bid.status === 'highest' 
                              ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                              : "border-slate-100 bg-white"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center font-black",
                              bid.status === 'highest' ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                            )}>
                              {bid.bidder[0]}
                            </div>
                            <div>
                              <p className="font-black text-[#121926] uppercase tracking-tight">{bid.bidder}</p>
                              <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {bid.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={cn(
                              "text-xl font-black tracking-tighter",
                              bid.status === 'highest' ? "text-primary" : "text-slate-600"
                            )}>
                              {formatCurrency(bid.amount)}
                            </p>
                            {bid.status === 'highest' && (
                              <Badge className="bg-green-500 text-white border-none text-[9px] font-black uppercase">ЭНГ ЮҚОРИ</Badge>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className={cn(
              "border-[6px] rounded-[40px] shadow-xl bg-white overflow-hidden transition-colors",
              highestBid ? "border-primary" : "border-yellow-400"
            )}>
              <CardContent className="p-10">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {activeTab === 'seller' ? 'ЖОРИЙ ФОЙДА' : 'ЭНГ ЯХШИ ТАКЛИФ'}
                </p>
                <div className="mb-8">
                  <div className="text-5xl font-black text-primary tracking-tighter mb-1">
                    {highestBid ? formatCurrency(highestBid.amount) : formatCurrency(activeLot.price)}
                  </div>
                  <p className="text-xl font-bold italic text-slate-800">
                    {highestBid ? highestBid.bidder : 'Ҳозирча йўқ'}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-10">
                  <span className="text-xs text-muted-foreground font-medium">Ҳолат:</span>
                  <span className="text-xs font-black text-green-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 
                    {activeTab === 'seller' ? 'Муваффақиятли савдо' : 'Рейтинг: Аъло'}
                  </span>
                </div>

                <Button 
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-[25px] text-lg font-black shadow-2xl shadow-primary/40 mb-6 transition-all active:scale-95 uppercase"
                  onClick={() => {
                    toast({ title: "Муваффақиятли", description: activeTab === 'seller' ? "Савдо якунланди ва битим тасдиқланди" : "Сизнинг таклифингиз қабул қилинди" });
                    setActiveLotId(null);
                  }}
                >
                  {activeTab === 'seller' ? 'БИТИМНИ ТАСДИҚЛАШ' : 'БИТИМНИ ИМЗОЛАШ'}
                </Button>

                <button 
                  onClick={() => setActiveLotId(null)}
                  className="w-full text-center text-[10px] font-black text-slate-400 hover:text-primary tracking-widest uppercase transition-colors"
                >
                  САВДОДАН ЧИҚИШ
                </button>
              </CardContent>
            </Card>

            <Card className="border-none rounded-[30px] shadow-sm bg-[#2e2a73] text-white overflow-hidden relative">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-black tracking-widest uppercase">СИ (AI) ТАҲЛИЛИ</h3>
                </div>
                <p className="text-[10px] leading-relaxed text-blue-100/70 font-medium">
                  {activeTab === 'seller' 
                    ? "AI тизимимиз таклифларни таҳлил қилиб, ушбу нархни бозор қийматидан 15% юқори деб баҳолади. Сотиш тавсия этилади."
                    : "Тизим иштирокчиларнинг молиявий ҳолати ва аввалги савдоларини таҳлил қилиб, энг ишончli ҳамкорни тавсия қилмоқда."}
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl w-fit border shadow-sm">
        <button
          onClick={() => setActiveTab("buyer")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
            activeTab === "buyer" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-primary"
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          {dict.labels.buyerPanel}
        </button>
        <button
          onClick={() => setActiveTab("seller")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
            activeTab === "seller" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-primary"
          )}
        >
          <LayoutGrid className="w-4 h-4" />
          {dict.labels.sellerPanel}
        </button>
      </div>

      <div className="bg-[#121926] rounded-[40px] p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase">
            {activeTab === 'seller' ? 'МЕНИНГ ЛОТЛАРИМ' : 'ОЧИҚ САВДОЛАР'}
          </h1>
          <p className="text-muted-foreground text-sm font-medium opacity-80">
            {activeTab === 'seller' ? 'Ўз лотларингизни бошқаринг ва таклифларни кўринг' : 'Янги харид лотларини кузатинг ва иштирок этинг'}
          </p>
        </div>

        {activeTab === 'seller' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="relative z-10 bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                <Plus className="w-5 h-5" />
                {dict.labels.newLot}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[30px] border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase tracking-tight">{dict.labels.newLot}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lot nomi</Label>
                  <Input
                    id="name"
                    value={newLotTitle}
                    onChange={(e) => setNewLotTitle(e.target.value)}
                    placeholder="Masalan: Qurilish materiallari"
                    className="h-12 rounded-xl border-muted bg-muted/30 focus:bg-white transition-all font-bold"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Boshlang'ich narx (UZS)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newLotPrice}
                    onChange={(e) => setNewLotPrice(e.target.value)}
                    placeholder="10 000 000"
                    className="h-12 rounded-xl border-muted bg-muted/30 focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 font-bold uppercase">Bekor qilish</Button>
                <Button onClick={handleAddLot} className="rounded-xl h-12 px-8 font-bold bg-primary shadow-lg shadow-primary/20 uppercase">Қошиш</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {lots.map((lot) => (
          <Card key={lot.id} className="border-none rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white">
            <CardContent className="p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge variant="secondary" className="bg-muted/50 text-muted-foreground font-mono text-[10px] mb-4 px-3 py-1 rounded-full uppercase">
                    #{lot.number}
                  </Badge>
                  <h2 className="text-3xl font-black text-[#121926] mb-1 uppercase tracking-tight">
                    {lot.title}
                  </h2>
                  <p className="text-muted-foreground/60 text-sm font-bold tracking-wider">
                    ID: {lot.code}
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => setActiveLotId(lot.id)}
                  className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-6 font-bold h-12 shadow-lg shadow-primary/20 uppercase"
                >
                  {activeTab === 'seller' ? 'БОШҚАРИШ' : dict.labels.watch}
                </Button>
              </div>

              <div className="flex justify-between items-end border-t pt-6 mt-4">
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">
                    {activeTab === 'seller' ? 'ЖОРИЙ ТАКЛИФ' : 'БОШЛАНҒИЧ НАРХ'}
                  </p>
                  <div className="text-4xl font-black text-[#121926] tracking-tight font-mono">
                    {bids[lot.id]?.[0]?.amount ? formatCurrency(bids[lot.id][0].amount) : formatCurrency(lot.price)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                    <span className="text-[10px] font-black text-green-600 uppercase">
                      {bids[lot.id]?.length || 0} ТАКЛИФЛАР
                    </span>
                  </div>
                  {activeTab === 'seller' && (
                    <div className="flex items-center gap-1 text-[9px] font-bold text-primary animate-pulse">
                      <TrendingUp className="w-3 h-3" /> ОНЛАЙН КУЗАТИШ
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
