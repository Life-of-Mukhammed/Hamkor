
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ShoppingCart, 
  LayoutGrid, 
  Plus, 
  Gavel, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Clock, 
  Trophy
} from "lucide-react";
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
  
  const [newLotTitle, setNewLotTitle] = useState("");
  const [newLotPrice, setNewLotPrice] = useState("");
  const [newLotQuantity, setNewLotQuantity] = useState("");
  const [newLotDuration, setNewLotDuration] = useState("24");

  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState<Record<string, Bid[]>>({
    "1": [
      { id: "b1", bidder: "Orient Group", amount: 141000000, time: "10:45", status: 'highest' },
      { id: "b2", bidder: "Euro Building", amount: 141500000, time: "10:40", status: 'pending' },
    ]
  });
  const { toast } = useToast();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

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
    setNewLotTitle("");
    setNewLotPrice("");
    setNewLotQuantity("");
    setNewLotDuration("24");
    toast({ title: "Муваффақиятли", description: "Янги лот муваффақиятli қўшилди" });
  };

  const handleSendBid = () => {
    if (!activeLotId || !bidAmount) return;
    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) return;

    const newBid: Bid = {
      id: `bid-${Date.now()}-${Math.random()}`,
      bidder: "Sizning Korxonangiz",
      amount: amount,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
    toast({ title: "Лот тасдиқланди", description: "Шартнома имзолаш босқичига ўтилмоқда..." });
    setManageLotId(null);
    if (onNavigate) {
      setTimeout(() => onNavigate('eri'), 1500);
    }
  };

  const activeLot = lots.find(l => l.id === activeLotId);
  const currentBids = activeLotId ? (bids[activeLotId] || []) : [];
  const manageLot = lots.find(l => l.id === manageLotId);
  const manageBids = manageLotId ? (bids[manageLotId] || []) : [];

  if (activeLotId && activeLot) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white w-full max-w-5xl h-full max-h-[750px] rounded-[32px] shadow-2xl overflow-hidden flex relative">
          <button 
            onClick={() => setActiveLotId(null)}
            className="absolute top-5 right-5 p-1.5 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X size={20} className="text-slate-400" />
          </button>

          <div className="w-[38%] bg-slate-50/50 border-r border-slate-100 p-8 flex flex-col">
            <div className="mb-8">
              <h1 className="text-xl font-black text-[#121926] uppercase tracking-tight mb-1">ТАКЛИФЛАР ТАРИХИ</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Жорий савдолар</p>
            </div>

            <ScrollArea className="flex-1 -mr-4 pr-4">
              <div className="space-y-3">
                {currentBids.length === 0 ? (
                  <div className="text-center py-10 text-slate-300 italic text-xs">Таклифлар йўқ</div>
                ) : (
                  currentBids.map((bid) => (
                    <div key={bid.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center animate-fade-in">
                      <span className="text-sm font-black text-slate-800">{formatCurrency(bid.amount)}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{bid.time}</span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="mt-6">
              <Button className="w-full h-12 bg-[#534df3] hover:bg-[#433ce0] text-white rounded-xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                <Sparkles size={14} /> SI TAHLILI
              </Button>
            </div>
          </div>

          <div className="flex-1 p-8 flex flex-col items-center justify-center">
            <div className="max-w-xs w-full text-center">
              <h2 className="text-lg font-black text-[#121926] uppercase mb-1 tracking-tight">ТАКЛИФ КИРИТИНГ</h2>
              <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-widest">Янги нархни ёзинг</p>
              <div className="relative mb-8">
                <input 
                  type="text" 
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-20 bg-slate-50/80 rounded-2xl border-none text-center text-3xl font-black text-slate-800 placeholder:text-slate-200 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
              <Button 
                onClick={handleSendBid}
                className="w-full h-16 bg-[#121926] hover:bg-black text-white rounded-2xl text-sm font-black tracking-widest uppercase shadow-xl"
              >
                ТАКЛИФНИ ЮБОРИШ
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (manageLotId && manageLot) {
    const lowestBid = manageBids.length > 0 ? Math.min(...manageBids.map(b => b.amount)) : manageLot.price;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl p-8 relative">
          <button 
            onClick={() => setManageLotId(null)}
            className="absolute top-5 right-5 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-[#121926] uppercase tracking-tight">ЛОТНИ БОШҚАРИШ</h2>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-tight">{manageLot.title}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50/50 p-5 rounded-[24px] text-left border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">ЭНГ ПАСТ ТАКЛИФ</p>
                <p className="text-lg font-black text-primary tracking-tight">{formatCurrency(lowestBid)}</p>
              </div>
              <div className="bg-slate-50/50 p-5 rounded-[24px] text-left border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">ТАКЛИФЛАР</p>
                <p className="text-2xl font-black text-slate-800">{manageBids.length}</p>
              </div>
            </div>

            <div className="pt-6 text-left">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">ТАКЛИФЛАР РЎЙХАТИ</h3>
              <div className="border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-bold text-[10px] uppercase h-10">Иштирокчи</TableHead>
                      <TableHead className="font-bold text-right text-[10px] uppercase h-10">Сумма</TableHead>
                      <TableHead className="font-bold text-center text-[10px] uppercase h-10">Вақт</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {manageBids.length === 0 ? (
                      <TableRow><TableCell colSpan={3} className="text-center py-6 text-slate-400 italic text-xs">Таклифлар йўқ</TableCell></TableRow>
                    ) : (
                      manageBids.sort((a,b) => a.amount - b.amount).map((bid) => (
                        <TableRow key={bid.id} className="h-12">
                          <TableCell className="text-[11px] font-bold flex items-center gap-1.5">
                            {bid.amount === lowestBid && <Trophy size={12} className="text-yellow-500" />}
                            {bid.bidder}
                          </TableCell>
                          <TableCell className="text-right text-[11px] font-black text-primary">{formatCurrency(bid.amount)}</TableCell>
                          <TableCell className="text-center text-[9px] text-slate-400 font-bold">{bid.time}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="pt-8 flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setManageLotId(null)}
                className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]"
              >
                БЕКОР ҚИЛИШ
              </Button>
              <Button 
                onClick={handleApproveLot}
                className="flex-1 h-14 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-200"
              >
                ТАСДИҚЛАШ
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
          <Gavel className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#121926] tracking-tight uppercase">ОНЛАЙН АУКЦИОН</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Лotlar va takliflar boshqaruvi</p>
        </div>
      </div>

      <div className="flex bg-slate-100/50 p-1.5 rounded-2xl w-fit border shadow-sm">
        <button
          onClick={() => setActiveTab("buyer")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black transition-all duration-300 uppercase tracking-widest",
            activeTab === "buyer" ? "bg-primary text-white shadow-md" : "text-slate-400 hover:text-primary"
          )}
        >
          <ShoppingCart className="w-3.5 h-3.5" /> ХАРИДОР
        </button>
        <button
          onClick={() => setActiveTab("seller")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black transition-all duration-300 uppercase tracking-widest",
            activeTab === "seller" ? "bg-primary text-white shadow-md" : "text-slate-400 hover:text-primary"
          )}
        >
          <LayoutGrid className="w-3.5 h-3.5" /> СОТУВЧИ
        </button>
      </div>

      {activeTab === 'buyer' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-6 rounded-xl text-xs font-black shadow-lg shadow-primary/20 flex items-center gap-2 uppercase tracking-widest">
              <Plus className="w-4 h-4" /> ЯНГИ ЛОТ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[420px] rounded-[24px] p-6">
            <DialogHeader><DialogTitle className="text-lg font-black uppercase tracking-tight">ЯНГИ ЛОТ</DialogTitle></DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="grid gap-1.5">
                <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Lot nomi</Label>
                <Input value={newLotTitle} onChange={(e) => setNewLotTitle(e.target.value)} className="h-10 rounded-lg font-bold bg-slate-50 border-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Narx</Label>
                  <Input type="number" value={newLotPrice} onChange={(e) => setNewLotPrice(e.target.value)} className="h-10 rounded-lg font-bold bg-slate-50 border-none" />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Miqdor</Label>
                  <Input value={newLotQuantity} onChange={(e) => setNewLotQuantity(e.target.value)} className="h-10 rounded-lg font-bold bg-slate-50 border-none" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Davomiyligi (soat)</Label>
                <RadioGroup value={newLotDuration} onValueChange={setNewLotDuration} className="flex gap-3">
                  <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2.5 rounded-lg flex-1 cursor-pointer">
                    <RadioGroupItem value="24" id="r1" /><Label htmlFor="r1" className="text-[10px] font-black uppercase cursor-pointer">24</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2.5 rounded-lg flex-1 cursor-pointer">
                    <RadioGroupItem value="48" id="r2" /><Label htmlFor="r2" className="text-[10px] font-black uppercase cursor-pointer">48</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter><Button onClick={handleAddLot} className="w-full rounded-xl h-12 font-black uppercase tracking-widest text-xs bg-primary">E'lon qilish</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {lots.map((lot) => {
          const currentLotBids = bids[lot.id] || [];
          const currentPrice = currentLotBids.length > 0 ? Math.min(...currentLotBids.map(b => b.amount)) : lot.price;
          return (
            <Card key={lot.id} className="border-none rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[9px] px-3 py-1 rounded-full uppercase">ID: {lot.number}</Badge>
                    <Badge variant="outline" className="text-slate-500 font-bold text-[9px] px-3 py-1 rounded-full border-slate-200 uppercase">{lot.quantity}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={10} className="text-slate-400" />
                    <span className="text-[9px] font-black text-slate-400 uppercase">{lot.duration} SOAT</span>
                    <Badge className="bg-red-50 text-red-500 border-none px-2.5 py-1 rounded-full text-[9px] font-black tracking-tighter uppercase flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
                    </Badge>
                  </div>
                </div>

                <h2 className="text-xl font-black text-[#121926] leading-tight uppercase tracking-tight">{lot.title}</h2>

                <div className="bg-slate-50 rounded-[28px] p-6 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">ЖОРИЙ НАРХ</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(currentPrice)}</span>
                      <span className="text-[10px] font-black text-primary uppercase">UZS</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">БЮДЖЕТ</p>
                    <p className="text-sm font-black text-slate-600 tracking-tight">{formatCurrency(lot.budget)}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => activeTab === 'seller' ? setActiveLotId(lot.id) : setManageLotId(lot.id)}
                  className={cn(
                    "w-full h-14 rounded-2xl text-[11px] font-black shadow-lg uppercase tracking-widest",
                    activeTab === 'seller' ? "bg-primary text-white" : "bg-[#121926] text-white"
                  )}
                >
                  {activeTab === 'seller' ? "ТАКЛИФ БЕРИШ" : "ЛОТНИ БОШҚАРИШ"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
