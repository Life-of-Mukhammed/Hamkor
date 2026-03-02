
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, TrendingUp, History, Timer } from "lucide-react";
import { dict } from "@/lib/translations";

const INITIAL_PRICE = 150000000;

export function AuctionHub() {
  const [price, setPrice] = useState(INITIAL_PRICE);
  const [history, setHistory] = useState<{ id: string; amount: number; time: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    const priceUpdate = setInterval(() => {
      setPrice((prev) => {
        const increment = Math.floor(Math.random() * 500000) + 100000;
        const newPrice = prev + increment;
        
        setHistory((prevHistory) => [
          { 
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
            amount: newPrice, 
            time: new Date().toLocaleTimeString() 
          },
          ...prevHistory.slice(0, 4),
        ]);
        
        return newPrice;
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(priceUpdate);
    };
  }, []);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Gavel className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">{dict.sections.auction}</h1>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full neo-shadow border">
          <Timer className="w-4 h-4 text-accent" />
          <span className="font-mono text-xl">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass border-none neo-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Давлат харидлари: Махсус техника лоти №7782</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-center py-12 bg-primary/5 rounded-3xl border border-primary/10">
              <span className="text-muted-foreground uppercase tracking-widest text-sm mb-2">{dict.labels.bidPrice}</span>
              <span className="text-5xl font-black text-primary transition-all duration-500">
                {formatCurrency(price)}
              </span>
              <div className="mt-6 flex gap-4">
                <Button className="h-14 px-12 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  <TrendingUp className="mr-2 w-5 h-5" /> {dict.labels.placeBid}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-white">
                <p className="text-xs text-muted-foreground">Бошланғич нарх</p>
                <p className="font-bold">{formatCurrency(INITIAL_PRICE)}</p>
              </div>
              <div className="p-4 rounded-xl border bg-white">
                <p className="text-xs text-muted-foreground">Қатнашчилар сони</p>
                <p className="font-bold">12 та компания</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-none neo-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <History className="w-4 h-4 text-primary" />
              {dict.labels.bidHistory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((bid, idx) => (
                <div key={bid.id} className={`flex justify-between items-center p-3 rounded-lg border-l-4 ${idx === 0 ? 'border-primary bg-primary/5 animate-pulse' : 'border-muted'}`}>
                  <div>
                    <p className="text-xs text-muted-foreground">{bid.time}</p>
                    <p className="font-medium">{formatCurrency(bid.amount)}</p>
                  </div>
                  <span className="text-[10px] bg-muted px-2 py-1 rounded">Иштирокчи #{bid.id.split('-')[1]?.slice(0, 4) || '7782'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
