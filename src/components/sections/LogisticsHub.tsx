
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck, Navigation, MapPin, Clock } from "lucide-react";
import { dict } from "@/lib/translations";

export function LogisticsHub() {
  const [trucks, setTrucks] = useState([
    { id: 1, pos: { x: 20, y: 30 }, name: "Toshkent-Samarqand", eta: "45 мин" },
    { id: 2, pos: { x: 60, y: 70 }, name: "Andijon-Namangan", eta: "1 соат 12 мин" },
    { id: 3, pos: { x: 80, y: 40 }, name: "Buxoro-Xiva", eta: "2 соат 30 мин" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks((prev) =>
        prev.map((t) => ({
          ...t,
          pos: { 
            x: t.pos.x + (Math.random() - 0.5) * 2,
            y: t.pos.y + (Math.random() - 0.5) * 2
          },
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Navigation className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{dict.sections.logistics}</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 h-[600px] glass border-none neo-shadow relative overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-[#f0f4f8]">
            <svg width="100%" height="100%" viewBox="0 0 800 600" className="opacity-40">
              <path d="M50,100 Q150,50 300,100 T600,150" fill="none" stroke="#ccc" strokeWidth="20" />
              <path d="M100,500 L700,100" fill="none" stroke="#ccc" strokeWidth="15" />
              <circle cx="200" cy="150" r="10" fill="#bbb" />
              <circle cx="500" cy="400" r="10" fill="#bbb" />
            </svg>
            
            {trucks.map((t) => (
              <div
                key={t.id}
                className="absolute transition-all duration-1000 ease-linear animate-truck"
                style={{ left: `${t.pos.x}%`, top: `${t.pos.y}%` }}
              >
                <div className="relative group cursor-pointer">
                  <div className="bg-primary p-2 rounded-full shadow-lg text-white">
                    <Truck size={16} />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-white p-2 rounded-lg border neo-shadow whitespace-nowrap z-10">
                    <p className="text-xs font-bold">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{dict.labels.truckEta}: {t.eta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-xl border neo-shadow">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-medium">Жонли мониторинг фаол</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="glass border-none neo-shadow">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">Фаол рейслар</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {trucks.map(t => (
                <div key={t.id} className="p-3 rounded-lg border bg-white hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold">{t.name}</p>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">Ҳаракатда</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1 text-[10px]">
                      <Clock size={10} /> {t.eta}
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <MapPin size={10} /> 128 км
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="glass border-none neo-shadow bg-primary text-white">
            <CardContent className="p-6">
              <p className="text-sm opacity-80 mb-1">Умумий юк айланмаси</p>
              <p className="text-2xl font-black">2,450.8 тн</p>
              <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-white" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
