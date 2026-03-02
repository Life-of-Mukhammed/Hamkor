
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Star, 
  Truck, 
  Filter, 
  Info,
  CircleAlert
} from "lucide-react";
import { translations, Language } from "@/lib/translations";

interface LogisticsHubProps {
  lang?: Language;
}

export function LogisticsHub({ lang = 'uz' }: LogisticsHubProps) {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState("buyer");

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  return (
    <div className="space-y-8 animate-fade-in text-slate-700 pb-20">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {lang === 'uz' ? "Logistika va Dispetcherlar" : lang === 'ru' ? "Логистика и Диспетчеры" : "Logistics & Dispatchers"}
        </h1>
        <p className="text-slate-400 text-[13px] font-medium">
          {lang === 'uz' ? "Yuklarni tashkil qilish, dispetcherlar xizmati va real vaqtda kuzatish" : lang === 'ru' ? "Организация грузов, диспетчерская служба и отслеживание в реальном времени" : "Cargo organization, dispatch service and real-time tracking"}
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="buyer" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b border-slate-100 mb-8">
          <TabsList className="bg-transparent h-12 p-0 gap-10">
            <TabsTrigger value="buyer" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600">
              {lang === 'uz' ? "Xaridor Paneli" : "Панель Покупателя"}
            </TabsTrigger>
            <TabsTrigger value="dispatcher" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600">
              {lang === 'uz' ? "Dispetcher Paneli" : "Панель Диспетчера"}
            </TabsTrigger>
            <TabsTrigger value="carrier" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600">
              {lang === 'uz' ? "Tashuvchi Paneli" : "Панель Перевозчика"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="buyer" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-4 border-none shadow-sm rounded-[32px] bg-white p-8">
              <h2 className="text-lg font-black text-slate-900 mb-8">
                {lang === 'uz' ? "Yangi yuk e'loni" : "Новое объявление"}
              </h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Yo'nalish</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Qayerdan" className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                    <Input placeholder="Qayerga" className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Yuk haqida</label>
                  <Input placeholder="Turi, og'irligi, hajmi" className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Byudjet (UZS)</label>
                  <Input placeholder="Masalan: 500 000" className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                </div>
                <Button className="w-full h-14 bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-blue-100 mt-4">
                  E'lonni ochiq qilish
                </Button>
              </div>
            </Card>
            <Card className="lg:col-span-8 border-none shadow-sm rounded-[32px] bg-white p-8">
              <h2 className="text-lg font-black text-slate-900 mb-8">Kelgan takliflar</h2>
              <div className="space-y-6">
                <div className="p-8 rounded-[24px] border border-slate-50 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[16px] font-black text-slate-900 uppercase">Toshkent Logistika MChJ</h3>
                      <Badge className="bg-blue-50 text-blue-600 border-none text-[8px] font-black uppercase px-2 py-0.5">DISPATCHER</Badge>
                    </div>
                    <p className="text-2xl font-black text-slate-900">450,000 UZS</p>
                  </div>
                  <div className="flex items-center gap-2 text-amber-500 font-black text-[11px] mb-4">
                    <Star size={14} fill="currentColor" /> 4.9 <span className="text-slate-300 font-bold ml-1">(124 ta yuk)</span>
                  </div>
                  <Button className="w-full bg-[#0b4db1] text-white rounded-xl h-11 text-[11px] font-black uppercase tracking-widest">Qabul qilish</Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dispatcher" className="m-0 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm rounded-[24px] bg-white p-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-black text-[#0b4db1] mb-2">140+</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Shu oy tashkil qilingan yuklar</p>
            </Card>
            <Card className="border-none shadow-sm rounded-[24px] bg-white p-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-black text-emerald-500 mb-2">4.9 <span className="text-lg text-emerald-300">★</span></h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mijozlar tomonidan o'rtacha baho</p>
            </Card>
            <Card className="border-none shadow-sm rounded-[24px] bg-white p-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-black text-amber-500 mb-2">12 ta</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tasdiqlangan hamkor tashuvchilar</p>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Bozordagi ochiq e'lonlar</h2>
              <Button variant="outline" className="h-10 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest gap-2">
                <Filter size={14} /> Filterlar
              </Button>
            </div>

            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden p-8 border border-slate-50">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-8">
                  <div className="flex items-center justify-between gap-4 px-2">
                    <span className="text-lg font-black text-slate-900">Toshkent</span>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="w-full h-px bg-slate-100 relative">
                        <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-white px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-50 rounded-full h-5 flex items-center">
                          400 km
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-black text-slate-900">Xorazm</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-slate-900 uppercase min-w-[120px]">Yuk turi:</span>
                      <span className="text-[12px] font-bold text-slate-500">Qurilish materiallari (5 tonna, uzunligi 6m)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-slate-900 uppercase min-w-[120px]">Vaqt:</span>
                      <span className="text-[12px] font-bold text-slate-500">Bugun kun davomida kelishilgan holda</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-slate-900 uppercase min-w-[120px]">Mijoz byudjeti:</span>
                      <span className="text-[12px] font-bold text-slate-500 italic">Xaridor aniq narx kiritmagan (Taklif kutmoqda)</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-50/50 p-6 rounded-[24px] border border-slate-50 space-y-4">
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-2">O'z xizmatingizni taklif qiling</p>
                  <Input placeholder="Narx taklif qiling (UZS)" className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-white" />
                  <Input placeholder="Mijozga xabar (Izoh)..." className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-white" />
                  <Button className="w-full bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-12 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-blue-100">
                    Xaridorga yuborish
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="carrier" className="m-0 space-y-8 animate-fade-in">
          {/* Notification Alert */}
          <div className="bg-[#e7f1ff] border border-[#c5dcff] rounded-[18px] p-6 flex gap-4 items-start shadow-sm">
            <div className="bg-white p-2.5 rounded-xl text-[#0b4db1] shadow-sm">
              <CircleAlert size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[13px] font-black text-[#0b4db1] uppercase tracking-widest">Dispetcherdan yangi taklif!</h4>
              <p className="text-[11px] font-medium text-[#4b77b8] leading-relaxed max-w-4xl">
                "Toshkent Logistika MChJ" sizga yangi yuk bo'yicha hamkorlik taklif qilmoqda. Agar "Roziman" ni bossangiz, mijozga sizning nomingizdan yuk tashiydigan dispetcher sifatida shartnoma taklif etiladi.
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-10">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight ml-2">Dispetcher takliflari</h2>
            
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden p-8 border border-slate-50 hover:shadow-xl transition-all duration-500 group">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Details Section */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-1">Xorazmga qurilish materiallari</h3>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      Taklif qildi: <span className="text-slate-900 font-black">Toshkent Logistika MChJ</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={12} fill="currentColor" /> 4.9
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#fcfdfe] p-6 rounded-[24px] border border-slate-50 space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start gap-4">
                        <span className="text-[10px] font-black text-slate-900 uppercase min-w-[80px] mt-0.5">Yuklash:</span>
                        <span className="text-[11px] font-bold text-slate-500">Chilonzor, Oq-tepa (Bugun 15:00 gacha)</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-[10px] font-black text-slate-900 uppercase min-w-[80px] mt-0.5">Tushirish:</span>
                        <span className="text-[11px] font-bold text-slate-500">Urganch shahri markazi</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-[10px] font-black text-slate-900 uppercase min-w-[80px] mt-0.5">Yuk hajmi:</span>
                        <span className="text-[11px] font-bold text-slate-500">~5 tonna, og'ir ob'ektlar</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Offer Action Section */}
                <div className="lg:col-span-4 space-y-4 bg-[#f8faff] p-8 rounded-[32px] border border-blue-50/50">
                  <div className="text-center space-y-1 mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sizga taklif etilayotgan haq:</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">1,800,000 UZS</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white rounded-xl h-14 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-emerald-100">
                      Roziman
                    </Button>
                    <Button variant="outline" className="w-full border-slate-200 text-slate-500 bg-white hover:bg-slate-50 rounded-xl h-14 font-black uppercase tracking-widest text-[11px]">
                      Rad etish
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
