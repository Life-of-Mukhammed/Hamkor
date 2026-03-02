
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Star, Truck, User, Building2, MapPin, Package, CircleDollarSign } from "lucide-react";
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
              {lang === 'uz' ? "Xaridor Paneli" : lang === 'ru' ? "Панель Покупателя" : "Buyer Panel"}
            </TabsTrigger>
            <TabsTrigger value="dispatcher" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600">
              {lang === 'uz' ? "Dispetcher Paneli" : lang === 'ru' ? "Панель Диспетчера" : "Dispatcher Panel"}
            </TabsTrigger>
            <TabsTrigger value="carrier" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600">
              {lang === 'uz' ? "Tashuvchi Paneli" : lang === 'ru' ? "Панель Перевозчика" : "Carrier Panel"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="buyer" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form */}
            <Card className="lg:col-span-4 border-none shadow-sm rounded-[32px] bg-white p-8">
              <h2 className="text-lg font-black text-slate-900 mb-8">
                {lang === 'uz' ? "Yangi yuk e'loni" : lang === 'ru' ? "Новое объявление о грузе" : "New Cargo Post"}
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Yo'nalish</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder={lang === 'uz' ? "Qayerdan (Mas., Toshkent)" : "Откуда"} className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                    <Input placeholder={lang === 'uz' ? "Qayerga (Mas., Samarqand)" : "Куда"} className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Yuk haqida</label>
                  <Input placeholder={lang === 'uz' ? "Yuk turi, og'irligi, hajmi (masalan: Mebel, 2 tonna)" : "Тип груза, вес, объем"} className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Bujdetingiz (UZS)</label>
                  <Input placeholder={lang === 'uz' ? "Ixtiyoriy (Masalan: 500000)" : "Бюджет (UZS)"} className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox id="show-dispatchers" className="mt-1 border-slate-200" defaultChecked />
                  <label htmlFor="show-dispatchers" className="text-[12px] font-bold text-slate-600 cursor-pointer leading-tight">
                    {lang === 'uz' ? "Dispetcherlarga ham ko'rsatilsin (Tavsiya qilinadi)" : "Показать диспетчерам (рекомендуется)"}
                  </label>
                </div>

                <Button className="w-full h-14 bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-blue-100 mt-4">
                  {lang === 'uz' ? "E'lonni ochiq qilish" : "Опубликовать объявление"}
                </Button>
              </div>
            </Card>

            {/* Right Column: Offers */}
            <Card className="lg:col-span-8 border-none shadow-sm rounded-[32px] bg-white p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-black text-slate-900">
                  {lang === 'uz' ? "Kelgan takliflar" : lang === 'ru' ? "Поступившие предложения" : "Received Offers"}
                </h2>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px] h-10 rounded-xl border-slate-100 text-[11px] font-black uppercase tracking-widest px-4">
                    <SelectValue placeholder="Hammasi" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">{lang === 'uz' ? "Hammasi" : "Все"}</SelectItem>
                    <SelectItem value="carrier">{lang === 'uz' ? "Faqat tashuvchilar" : "Только перевозчики"}</SelectItem>
                    <SelectItem value="dispatcher">{lang === 'uz' ? "Faqat dispetcherlar" : "Только диспетчеры"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                {/* Offer 1 */}
                <div className="p-8 rounded-[24px] border border-slate-50 hover:border-blue-100 hover:shadow-xl transition-all duration-500 group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-[16px] font-black text-slate-900 uppercase">Toshkent Logistika MChJ</h3>
                        <Badge className="bg-blue-50 text-blue-600 border-none text-[8px] font-black uppercase px-2 py-0.5 flex items-center gap-1">
                          <Building2 size={10} /> DISPATCHER
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-amber-500 font-black text-[11px]">
                        <Star size={14} fill="currentColor" /> 4.9 <span className="text-slate-300 font-bold ml-1">(124 ta yuk)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">450,000 UZS</p>
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-slate-500 font-medium italic leading-relaxed mb-6">
                    "O'zimiz ishonchli mashina topamiz, yuklash/tushirishni to'liq tashkillashtirib beramiz."
                  </p>

                  <div className="flex justify-end">
                    <Button className="bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-11 px-8 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-100">
                      {lang === 'uz' ? "Qabul qilish" : "Принять"}
                    </Button>
                  </div>
                </div>

                {/* Offer 2 */}
                <div className="p-8 rounded-[24px] border border-slate-50 hover:border-blue-100 hover:shadow-xl transition-all duration-500 group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-[16px] font-black text-slate-900 uppercase">Rustam Haydovchi</h3>
                        <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black uppercase px-2 py-0.5 flex items-center gap-1">
                          <Truck size={10} /> TASHUVCHI
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px]">
                        <div className="flex items-center gap-1 text-amber-500 font-black">
                          <Star size={14} fill="currentColor" /> 4.7
                        </div>
                        <span>• (45 ta yuk) • ISUZU (3 tonna)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">500,000 UZS</p>
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-slate-500 font-medium italic leading-relaxed mb-6">
                    "Ertaga ertalab soat 10:00 da tayyor bo'laman."
                  </p>

                  <div className="flex justify-end">
                    <Button className="bg-white border-slate-100 text-slate-900 hover:bg-slate-50 rounded-xl h-11 px-8 text-[11px] font-black uppercase tracking-widest border">
                      {lang === 'uz' ? "Qabul qilish" : "Принять"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dispatcher" className="m-0">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
              <Building2 size={40} />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Dispetcher Paneli</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">Bu bo'limda siz xaridorlar yuklarini boshqarishingiz mumkin</p>
          </Card>
        </TabsContent>

        <TabsContent value="carrier" className="m-0">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600">
              <Truck size={40} />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Tashuvchi Paneli</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">Bu bo'limda siz o'z texnikangiz va reyslarni boshqarishingiz mumkin</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
