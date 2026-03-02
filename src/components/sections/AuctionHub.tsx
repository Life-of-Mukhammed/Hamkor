
"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingCart, LayoutGrid, Plus, Gavel, Sparkles, X, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Lot {
  id: string;
  number: string;
  title: string;
  code: string;
  price: number;
  budget: number;
  quantity?: string;
  duration?: string;
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
    quantity: "500 tn",
    duration: "24",
  },
  {
    id: "2",
    number: "LOT-7921",
    title: "АВТОМОБИЛЬ ЭҲТИЁТ ҚИСМЛАРИ",
    code: "87654",
    price: 52000000,
    budget: 60000000,
    quantity: "12 komplekt",
    duration: "48",
  }
];

interface AuctionHubProps {
  onNavigate?: (id: string) => void;
}

export function AuctionHub({ onNavigate }: AuctionHubProps) {
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">("buyer");
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [activeLotId, setActiveLotId] = useState<string | null>(null);
  const [manageLotId, setManageLotId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New Lot States
  const [newLotTitle, setNewLotTitle] = useState("");
  const [newLotPrice, setNewLotPrice] = useState("");
  const [newLotQuantity, setNewLotQuantity] = useState("");
  const [newLotDuration, setNewLotDuration] = useState("24");

  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState<Record<string, Bid[]>>({});
  const { toast } = useToast();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);

  const handleAddLot = () => {
    if (!newLotTitle || !newLotPrice || !newLotQuantity) {
      toast({ title: "Хатолик", description: "Барча майдонларни тўлдиринг", variant: "destructive" });
      return;
    }
    const price = parseFloat(newLotPrice);
    if (isNaN(price)) {
      toast({ title: "Хатолик", description: "Нархни тўғри киритинг", variant: "destructive" });
      return;
    }

    const newLot: Lot = {
      id: Date.now().toString(),
      number: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newLotTitle.toUpperCase(),
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      price: price,
      budget: price * 1.1,
      quantity: newLotQuantity,
      duration: newLotDuration,
    };

    setLots([newLot, ...lots]);
    setIsDialogOpen(false);
    
    // Reset fields
    setNewLotTitle("");
    setNewLotPrice("");
    setNewLotQuantity("");
    setNewLotDuration("24");
    
    toast({ title: "Муваффақиятли", description: "Янги лот муваффақиятли қўшилди" });
  };

  const handleSendBid = () => {
    if (!activeLotId || !bidAmount) return;
    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) return;

    const newBid: Bid = {
      id: `bid-${Date.now()}-${Math.random()}`,
      bidder: "Sizning Korxonangiz",
      amount: amount,
      time: "Hozir",
      status: 'highest'
    };

    setBids(prev => {
      const currentBids = prev[activeLotId] || [];
      return {
        ...prev,
        [activeLotId]: [newBid, ...currentBids.map(b => ({ ...b, status: 'pending' as const }))]
      };
    });
    setBidAmount("");
    toast({ title: "Муваффақиятли", description: "Таклифингиз қабул қилинди" });
  };

  const handleApproveLot = () => {
    toast({ 
      title: "Лот тасдиқланди", 
      description: "Шартнома имзолаш босқичига ўтилмоқда...",
    });
    setManageLotId(null);
    if (onNavigate) {
      setTimeout(() => onNavigate('eri'), 1500);
    }
  };

  const activeLot = lots.find(l => l.id === activeLotId);
  const currentBids = activeLotId ? (bids[activeLotId] || []) : [];
  const manageLot = lots.find(l => l.id === manageLotId);

  // Split-screen Trading Terminal (Seller)
  if (activeLotId && activeLot) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-10 animate-fade-in">
        <div className="bg-white w-full max-w-6xl h-full max-h-[850px] rounded-[40px] shadow-2xl overflow-hidden flex relative">
          <button 
            onClick={() => setActiveLotId(null)}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X size={24} className="text-slate-400" />
          </button>

          <div className="w-[40%] bg-slate-50/50 border-r border-slate-100 p-10 flex flex-col">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-[#121926] uppercase tracking-tight mb-2">ТАКЛИФЛАР ТАРИХИ</h1>
              <p className="text-sm font-medium text-slate-400">Барча берилган таклифлар рўйхати</p>
            </div>

            <ScrollArea className="flex-1 -mr-4 pr-4">
              <div className="space-y-4">
                {currentBids.length === 0 ? (
                  <div className="text-center py-12 text-slate-300 italic text-sm">Ҳозирча таклифлар йўқ</div>
                ) : (
                  currentBids.map((bid) => (
                    <div key={bid.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center animate-fade-in">
                      <span className="text-lg font-black text-slate-800">{formatCurrency(bid.amount)} UZS</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">{bid.time}</span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="mt-8">
              <Button className="w-full h-16 bg-[#534df3] hover:bg-[#433ce0] text-white rounded-2xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg shadow-blue-200">
                <Sparkles size={18} /> SI TAHLILI
              </Button>
            </div>
          </div>

          <div className="flex-1 p-10 flex flex-col items-center justify-center">
            <div className="max-w-md w-full text-center">
              <h2 className="text-2xl font-black text-[#121926] uppercase mb-2">ТАКЛИФ КИРИТИНГ</h2>
              <p className="text-sm font-medium text-slate-400 mb-12">Жорий нархдан пастроқ сумма киритинг</p>
              <div className="relative mb-10">
                <input 
                  type="text" 
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-24 bg-slate-50/80 rounded-3xl border-none text-center text-4xl font-black text-slate-800 placeholder:text-slate-200 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
              <Button 
                onClick={handleSendBid}
                className="w-full h-24 bg-[#121926] hover:bg-black text-white rounded-3xl text-xl font-black tracking-widest uppercase shadow-2xl transition-transform active:scale-95"
              >
                ТАКЛИФНИ ЮБОРИШ
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Manage Lot Dialog (Buyer)
  if (manageLotId && manageLot) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 relative">
          <button 
            onClick={() => setManageLotId(null)}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>

          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-[#121926] uppercase">ЛОТНИ БОШҚАРИШ</h2>
            <p className="text-slate-500 font-medium">{manageLot.title}</p>
            
            <div className="grid grid-cols-2 gap-4 text-left pt-6">
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Жорий энг паст таклиф</p>
                <p className="text-xl font-black text-primary">{formatCurrency(bids[manageLot.id]?.[0]?.amount || manageLot.price)} UZS</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Таклифлар сони</p>
                <p className="text-xl font-black text-slate-800">{bids[manageLot.id]?.length || 0} та</p>
              </div>
            </div>

            <div className="pt-10 flex gap-4">
              <Button 
                variant="outline"
                onClick={() => setManageLotId(null)}
                className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest border-2"
              >
                БЕКОР ҚИЛИШ
              </Button>
              <Button 
                onClick={handleApproveLot}
                className="flex-1 h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
              >
                ЛОТНИ ТАСДИҚЛАШ
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30">
          <Gavel className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-[#121926] tracking-tight uppercase">ОНЛАЙН АУКЦИОН</h1>
          <p className="text-muted-foreground text-sm font-medium">Лотлар очиш ва таклифlar бериш</p>
        </div>
      </div>

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

      {activeTab === 'buyer' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 flex items-center gap-3">
              <Plus className="w-5 h-5" /> ЯНГИ ЛОТ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px] rounded-[30px] p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">ЯНГИ ЛОТ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Lot nomi</Label>
                <Input 
                  placeholder="Masalan: Sement xaridi"
                  value={newLotTitle} 
                  onChange={(e) => setNewLotTitle(e.target.value)} 
                  className="h-12 rounded-xl font-bold bg-slate-50 border-none focus:ring-2 focus:ring-primary/20" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Boshlang'ich narx</Label>
                  <Input 
                    type="number" 
                    placeholder="0.00"
                    value={newLotPrice} 
                    onChange={(e) => setNewLotPrice(e.target.value)} 
                    className="h-12 rounded-xl font-bold bg-slate-50 border-none" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Miqdor</Label>
                  <Input 
                    placeholder="Masalan: 500 tn"
                    value={newLotQuantity} 
                    onChange={(e) => setNewLotQuantity(e.target.value)} 
                    className="h-12 rounded-xl font-bold bg-slate-50 border-none" 
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Auksion davomiyligi (soat)</Label>
                <RadioGroup 
                  value={newLotDuration} 
                  onValueChange={setNewLotDuration}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 bg-slate-50 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors flex-1">
                    <RadioGroupItem value="24" id="r1" />
                    <Label htmlFor="r1" className="font-bold cursor-pointer">24 soat</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors flex-1">
                    <RadioGroupItem value="48" id="r2" />
                    <Label htmlFor="r2" className="font-bold cursor-pointer">48 soat</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button 
                onClick={handleAddLot} 
                className="w-full rounded-2xl h-14 px-8 font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                E'lon qilish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid xl:grid-cols-2 gap-10">
        {lots.map((lot) => (
          <Card key={lot.id} className="border-none rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white p-2">
            <CardContent className="p-10 space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[11px] px-4 py-1.5 rounded-full">ID: {lot.number}</Badge>
                  {lot.quantity && (
                    <Badge variant="outline" className="text-slate-500 font-bold text-[11px] px-4 py-1.5 rounded-full border-slate-200">
                      {lot.quantity}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <Clock size={12} />
                    {lot.duration} soat
                  </div>
                  <Badge className="bg-red-50 text-red-500 border-none px-4 py-1.5 rounded-full flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                    <span className="text-[11px] font-black font-mono">LIVE</span>
                  </Badge>
                </div>
              </div>

              <h2 className="text-4xl font-black text-[#121926] leading-tight uppercase tracking-tight">{lot.title}</h2>

              <div className="bg-slate-50 rounded-[35px] p-8 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">ЖОРИЙ НАРХ</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-primary tracking-tighter">{formatCurrency(bids[lot.id]?.[0]?.amount || lot.price)}</span>
                    <span className="text-sm font-black text-primary uppercase">UZS</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">БЮДЖЕТ</p>
                  <p className="text-xl font-black text-slate-600 tracking-tight">{formatCurrency(lot.budget)} UZS</p>
                </div>
              </div>

              {activeTab === 'seller' ? (
                <Button 
                  onClick={() => setActiveLotId(lot.id)}
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-[25px] text-lg font-black shadow-xl shadow-primary/20 uppercase"
                >
                  ТАКЛИФ БЕРИШ
                </Button>
              ) : (
                <Button 
                  onClick={() => setManageLotId(lot.id)}
                  className="w-full h-20 bg-[#121926] hover:bg-black text-white rounded-[25px] text-lg font-black shadow-xl shadow-slate-200 uppercase"
                >
                  ЛОТНИ БОШҚАРИШ
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
