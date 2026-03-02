
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, LayoutGrid, Plus, Gavel, Sparkles, Clock, TrendingUp, CheckCircle2, Hammer } from "lucide-react";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Lot {
  id: string;
  number: string;
  title: string;
  code: string;
  price: number;
  budget: number;
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
    number: "LOT-9921",
    title: "ПЦ-400 Цемент хариди",
    code: "324242",
    price: 142000000,
    budget: 150000000,
  },
  {
    id: "2",
    number: "LOT-7921",
    title: "АВТОМОБИЛЬ ЭҲТИЁТ ҚИСМЛАРИ",
    code: "87654",
    price: 52000000,
    budget: 60000000,
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

  const [timer, setTimer] = useState("00:00:00");

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
          id: `bid-${Date.now()}-${Math.random()}`,
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
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);

  const handleAddLot = () => {
    if (!newLotTitle || !newLotPrice) {
      toast({ title: "Хатолик", description: "Барча майдонларни тўлдиринг", variant: "destructive" });
      return;
    }
    const price = parseFloat(newLotPrice);
    if (isNaN(price)) {
      toast({ title: "Хатоlik", description: "Нархни тўғри киритинг", variant: "destructive" });
      return;
    }

    const newLot: Lot = {
      id: Date.now().toString(),
      number: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newLotTitle.toUpperCase(),
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      price: price,
      budget: price * 1.1,
    };

    setLots([newLot, ...lots]);
    setIsDialogOpen(false);
    setNewLotTitle("");
    setNewLotPrice("");
    toast({ title: "Муваффақиятли", description: "Янги лот муваффақиятли қўшилди" });
  };

  const activeLot = lots.find(l => l.id === activeLotId);
  const currentBids = activeLotId ? (bids[activeLotId] || []) : [];
  const highestBid = currentBids[0];

  if (activeLotId && activeLot) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex bg-white p-1 rounded-2xl w-fit border shadow-sm">
          <button
            onClick={() => { setActiveTab("buyer"); setActiveLotId(null); }}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
              activeTab === "buyer" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-primary"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            ХАРИДОР ПАНЕЛИ
          </button>
          <button
            onClick={() => { setActiveTab("seller"); setActiveLotId(null); }}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300",
              activeTab === "seller" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-primary"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            СОТУВЧИ ПАНЕЛИ
          </button>
        </div>

        <div className="bg-white rounded-2xl border px-8 py-4 flex justify-between items-center shadow-sm">
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
                    {activeLot.number}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xs font-black text-muted-foreground tracking-widest uppercase mb-4">ТАКЛИФЛАР ТАРИХИ</h3>
                
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-3">
                    {currentBids.length === 0 ? (
                      <div className="h-48 border-2 border-dashed border-muted rounded-[30px] flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                        <Gavel className="w-10 h-10 text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground font-medium italic">Ҳозирча таклифлар йўқ...</p>
                      </div>
                    ) : (
                      currentBids.map((bid) => (
                        <div 
                          key={bid.id} 
                          className={cn(
                            "flex justify-between items-center p-6 rounded-[25px] border-2 transition-all animate-fade-in",
                            bid.status === 'highest' 
                              ? "border-primary bg-primary/5 shadow-md" 
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
                              {formatCurrency(bid.amount)} UZS
                            </p>
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
            <Card className="border-[6px] border-primary rounded-[40px] shadow-xl bg-white overflow-hidden">
              <CardContent className="p-10">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  ЭНГ ЯХШИ ТАКЛИФ
                </p>
                <div className="mb-8">
                  <div className="text-5xl font-black text-primary tracking-tighter mb-1">
                    {highestBid ? formatCurrency(highestBid.amount) : formatCurrency(activeLot.price)}
                  </div>
                  <p className="text-xl font-bold italic text-slate-800">
                    {highestBid ? highestBid.bidder : 'Ҳозирча йўқ'}
                  </p>
                </div>

                <Button 
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-[25px] text-lg font-black shadow-2xl shadow-primary/40 mb-6 uppercase"
                  onClick={() => {
                    toast({ title: "Муваффақиятли", description: "Битим имзоланди" });
                    setActiveLotId(null);
                  }}
                >
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

            <Card className="border-none rounded-[30px] shadow-sm bg-[#2e2a73] text-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-black tracking-widest uppercase">СИ (AI) ТАҲЛИЛИ</h3>
                </div>
                <p className="text-[10px] leading-relaxed text-blue-100/70 font-medium">
                  Тизим иштирокчиларнинг молиявий ҳолати ва авvalgi савдоларини таҳлил қилиб, энг ишончли ҳамкорни тавсия қилмоқда.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header section based on image */}
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30">
          <Hammer className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-[#121926] tracking-tight uppercase">ОНЛАЙН АУКЦИОН</h1>
          <p className="text-muted-foreground text-sm font-medium">Лотлар очиш ва таклифлар бериш</p>
        </div>
      </div>

      {/* Tab switcher based on image */}
      <div className="flex bg-slate-50 p-2 rounded-3xl w-fit border shadow-sm">
        <button
          onClick={() => setActiveTab("buyer")}
          className={cn(
            "flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-bold transition-all duration-300 uppercase tracking-widest",
            activeTab === "buyer" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-slate-400 hover:text-primary"
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          ХАРИДОР ПАНЕЛИ
        </button>
        <button
          onClick={() => setActiveTab("seller")}
          className={cn(
            "flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-bold transition-all duration-300 uppercase tracking-widest",
            activeTab === "seller" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-slate-400 hover:text-primary"
          )}
        >
          <LayoutGrid className="w-4 h-4" />
          СОТУВЧИ ПАНЕЛИ
        </button>
      </div>

      {activeTab === 'seller' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 flex items-center gap-3">
              <Plus className="w-5 h-5" />
              ЯНГИ ЛОТ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-[30px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase">ЯНГИ ЛОТ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase text-muted-foreground">Lot nomi</Label>
                <Input
                  id="name"
                  value={newLotTitle}
                  onChange={(e) => setNewLotTitle(e.target.value)}
                  className="h-12 rounded-xl font-bold"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-xs font-bold uppercase text-muted-foreground">Boshlang'ich narx (UZS)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newLotPrice}
                  onChange={(e) => setNewLotPrice(e.target.value)}
                  className="h-12 rounded-xl font-bold"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddLot} className="rounded-xl h-12 px-8 font-bold bg-primary uppercase">Қошиш</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Lot list based on image design */}
      <div className="grid xl:grid-cols-2 gap-10">
        {lots.map((lot) => (
          <Card key={lot.id} className="border-none rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white p-2">
            <CardContent className="p-10 space-y-8">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[11px] px-4 py-1.5 rounded-full">
                  ID: {lot.number}
                </Badge>
                <Badge className="bg-red-50 text-red-500 border-none px-4 py-1.5 rounded-full flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                  <span className="text-[11px] font-black font-mono">00:00:00</span>
                </Badge>
              </div>

              <h2 className="text-4xl font-black text-[#121926] leading-tight uppercase tracking-tight">
                {lot.title}
              </h2>

              <div className="bg-slate-50 rounded-[35px] p-8 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">ЖОРИЙ НАРХ</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-primary tracking-tighter">
                      {formatCurrency(bids[lot.id]?.[0]?.amount || lot.price)}
                    </span>
                    <span className="text-sm font-black text-primary uppercase">UZS</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">БЮДЖЕТ</p>
                  <p className="text-xl font-black text-slate-600 tracking-tight">
                    {formatCurrency(lot.budget)} UZS
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setActiveLotId(lot.id)}
                className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-[25px] text-lg font-black shadow-xl shadow-primary/20 uppercase"
              >
                {activeTab === 'seller' ? 'ЛОТНИ БОШҚАРИШ' : 'ТАКЛИФ БЕРИШ'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

