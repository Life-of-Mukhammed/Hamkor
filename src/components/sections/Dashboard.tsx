"use client";

import { AdCarousel } from "@/components/dashboard/AdCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, TrendingUp, Users, Package, Bell } from "lucide-react";

export function Dashboard() {
  const stats = [
    { title: "Молиявий айланма", value: "482,5 Млрд", icon: Landmark, color: "text-blue-600", trend: "+12.5%" },
    { title: "Фаол тендерлар", value: "1,248", icon: TrendingUp, color: "text-green-600", trend: "+5.2%" },
    { title: "Мижозлар", value: "8,912", icon: Users, color: "text-purple-600", trend: "+3.1%" },
    { title: "Омбор қолдиғи", value: "12,041", icon: Package, color: "text-orange-600", trend: "-1.4%" },
  ];

  return (
    <div className="space-y-8">
      <AdCarousel />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="glass border-none neo-shadow hover:scale-[1.02] transition-transform cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend} ўтган ойга нисбатан
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass border-none neo-shadow h-96">
          <CardHeader>
            <CardTitle>Бозор динамикаси (Live)</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-muted-foreground">
            <div className="flex flex-col items-center">
              <TrendingUp size={48} className="opacity-10 mb-4" />
              <p className="text-sm font-medium">Таҳлилий графиклар юкланмоқда...</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-none neo-shadow h-96">
          <CardHeader>
            <CardTitle>Сўнгги билдиришномалар</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer border-b last:border-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold">Янги тендер ғолиби</p>
                  <p className="text-[10px] text-muted-foreground">UzAuto Motors учун эҳтиёт қисмлар хариди якунланди.</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
