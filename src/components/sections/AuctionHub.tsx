
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, LayoutGrid, Plus, Eye } from "lucide-react";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";

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

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val) + " UZS";

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
        <Button className="relative z-10 bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
          <Plus className="w-5 h-5" />
          {dict.labels.newLot}
        </Button>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -ml-24 -mb-24" />
      </div>

      {/* Lots Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {INITIAL_LOTS.map((lot) => (
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
