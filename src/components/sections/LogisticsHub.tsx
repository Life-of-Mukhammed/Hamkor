
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
  CircleAlert,
  MapPin,
  Send,
  CheckCircle2,
  Navigation,
  Clock,
  Layers,
  Activity,
  Zap,
  Map as MapIcon,
  Search
} from "lucide-react";
import { translations, Language } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogisticsHubProps {
  lang?: Language;
}

interface Announcement {
  id: string;
  from: string;
  to: string;
  details: string;
  budget: string;
  distance: string;
}

interface Offer {
  id: string;
  company: string;
  type: string;
  price: string;
  rating: number;
  trips: number;
  status: 'pending' | 'accepted';
}

const ACTIVE_TRIPS = [
  { id: 't1', from: 'TOSHKENT', to: 'SAMARQAND', plate: 'UZ-01-A123', status: 'moving', eta: '45 min', load: '85%' },
  { id: 't2', from: 'ANDIJON', to: 'NAMANGAN', plate: 'UZ-05-B456', status: 'moving', eta: '1h 12m', load: '100%' },
  { id: 't3', from: 'BUXORO', to: 'XIVA', plate: 'UZ-80-C789', status: 'stopped', eta: '2h 30m', load: '40%' },
];

export function LogisticsHub({ lang = 'uz' }: LogisticsHubProps) {
  const t = translations[lang];
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("buyer");

  // Form states
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      from: "Toshkent",
      to: "Xorazm",
      details: "Qurilish materiallari (5 tonna, uzunligi 6m)",
      budget: "1,800,000",
      distance: "1000 km"
    }
  ]);

  // Offers state
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "o1",
      company: "Toshkent Logistika MChJ",
      type: "DISPATCHER",
      price: "450,000",
      rating: 4.9,
      trips: 124,
      status: 'pending'
    }
  ]);

  const handlePublishAnnouncement = () => {
    if (!from || !to || !details) {
      toast({
        title: lang === 'uz' ? "Xatolik" : "Ошибка",
        description: lang === 'uz' ? "Iltimos, barcha maydonlarni to'ldiring" : "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const newAnnouncement: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      from,
      to,
      details,
      budget: budget || (lang === 'uz' ? "Kelishilgan" : "Договорная"),
      distance: "Hisoblanmoqda..." 
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setFrom("");
    setTo("");
    setDetails("");
    setBudget("");

    toast({
      title: lang === 'uz' ? "Muvaffaqiyatli" : "Успешно",
      description: lang === 'uz' ? "E'loningiz ochiq qilindi va dispetcherlarga yuborildi." : "Ваше объявление опубликовано и отправлено диспетчерам.",
    });
  };

  const handleAcceptOffer = (offerId: string) => {
    setOffers(prev => prev.map(o => 
      o.id === offerId ? { ...o, status: 'accepted' } : o
    ));

    const offer = offers.find(o => o.id === offerId);
    
    toast({
      title: lang === 'uz' ? "Taklif qabul qilindi" : "Предложение принято",
      description: lang === 'uz' 
        ? `${offer?.company} bilan shartnoma loyihasi shakllantirildi.` 
        : `Проект контракта с ${offer?.company} сформирован.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0b4db1] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Navigation size={22} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {lang === 'uz' ? "LOGISTIKA VA GPS" : "ЛОГИСТИКА И GPS"}
            </h1>
          </div>
        </div>
        
        {activeTab === 'monitoring' && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm animate-fade-in">
            <CheckCircle2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">BARCHA DATCHIKLAR FAOL</span>
          </div>
        )}
      </div>

      <Tabs defaultValue="buyer" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-slate-100 mb-8">
          <TabsList className="bg-transparent h-12 p-0 gap-8">
            <TabsTrigger value="buyer" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600 transition-all">
              {lang === 'uz' ? "Xaridor Paneli" : "Панель Покупателя"}
            </TabsTrigger>
            <TabsTrigger value="dispatcher" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600 transition-all">
              {lang === 'uz' ? "Dispetcher Paneli" : "Панель Диспетчера"}
            </TabsTrigger>
            <TabsTrigger value="carrier" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600 transition-all">
              {lang === 'uz' ? "Tashuvchi Paneli" : "Панель Перевозчика"}
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[11px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-blue-600 transition-all">
              {lang === 'uz' ? "GPS Monitoring" : "GPS Мониторинг"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="buyer" className="m-0 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-4 border-none shadow-sm rounded-[32px] bg-white p-8">
              <h2 className="text-lg font-black text-slate-900 mb-8">
                {lang === 'uz' ? "Yangi yuk e'loni" : "Новое объявление"}
              </h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Yo'nalish</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      placeholder={lang === 'uz' ? "Qayerdan" : "Откуда"} 
                      className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" 
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                    <Input 
                      placeholder={lang === 'uz' ? "Qayerga" : "Qayerga"} 
                      className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" 
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Yuk haqida</label>
                  <Input 
                    placeholder={lang === 'uz' ? "Turi, og'irligi, hajmi" : "Тип, вес, объем"} 
                    className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" 
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Byudjet (UZS)</label>
                  <Input 
                    placeholder={lang === 'uz' ? "Masalan: 500 000" : "Например: 500 000"} 
                    className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-slate-50/50" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handlePublishAnnouncement}
                  className="w-full h-14 bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-blue-100 mt-4 gap-2 transition-all active:scale-[0.98]"
                >
                  <Send size={16} /> {lang === 'uz' ? "E'lonni ochiq qilish" : "Опубликовать объявление"}
                </Button>
              </div>
            </Card>
            
            <Card className="lg:col-span-8 border-none shadow-sm rounded-[32px] bg-white p-8">
              <h2 className="text-lg font-black text-slate-900 mb-8">{lang === 'uz' ? "Kelgan takliflar" : "Полученные предложения"}</h2>
              <div className="space-y-6">
                {offers.map((offer) => (
                  <div key={offer.id} className={cn(
                    "p-8 rounded-[24px] border transition-all duration-300 group",
                    offer.status === 'accepted' ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50/30 border-slate-50 hover:border-blue-100"
                  )}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-[16px] font-black text-slate-900 uppercase">{offer.company}</h3>
                        <Badge className={cn(
                          "border-none text-[8px] font-black uppercase px-2 py-0.5",
                          offer.status === 'accepted' ? "bg-emerald-100 text-emerald-600" : "bg-blue-50 text-blue-600"
                        )}>
                          {offer.status === 'accepted' ? (lang === 'uz' ? 'QABUL QILINDI' : 'ПРИНЯТО') : offer.type}
                        </Badge>
                      </div>
                      <p className="text-2xl font-black text-slate-900">{offer.price} UZS</p>
                    </div>
                    <div className="flex items-center gap-2 text-amber-500 font-black text-[11px] mb-6">
                      <Star size={14} fill="currentColor" /> {offer.rating} <span className="text-slate-300 font-bold ml-1">({offer.trips} ta yuk)</span>
                    </div>
                    
                    {offer.status === 'accepted' ? (
                      <div className="w-full h-11 rounded-xl bg-emerald-100/50 text-emerald-600 flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-widest">
                        <CheckCircle2 size={16} /> {lang === 'uz' ? "Tasdiqlangan" : "Подтверждено"}
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleAcceptOffer(offer.id)}
                        className="w-full bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-11 text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
                      >
                        {lang === 'uz' ? "Qabul qilish" : "Принять"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="m-0 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px]">
            {/* Map Area */}
            <div className="lg:col-span-8 relative rounded-[40px] overflow-hidden bg-slate-100 border border-slate-100 shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/map1/1200/800" 
                alt="Map" 
                fill 
                className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                data-ai-hint="map satellite"
              />
              
              {/* Map UI Elements */}
              <div className="absolute top-8 left-8 w-80 bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl animate-fade-in border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-0.5">
                    <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Tashkent</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tashkent, Uzbekistan</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors">
                      <Layers size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                      <Navigation size={14} />
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">No reviews</div>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-8">
                <div className="bg-[#0b4db1] rounded-[32px] p-8 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-200">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em]">INFO</p>
                      <p className="text-[16px] font-black tracking-tight leading-tight">
                        BUGUN JAMI <span className="text-amber-400">1,240 TONNA</span> YUK YETKAZILDI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Controls */}
              <div className="absolute bottom-10 right-10 flex flex-col gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-all hover:scale-110">
                  <Activity size={20} />
                </div>
                <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-all hover:scale-110">
                  <MapIcon size={20} />
                </div>
              </div>
            </div>

            {/* Sidebar Monitoring */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="flex-1 border-none shadow-sm rounded-[40px] bg-white p-8 flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-10 shrink-0">
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">FAOL REYSLAR</h2>
                  <Badge className="bg-blue-50 text-blue-600 border-none h-6 w-6 rounded-lg flex items-center justify-center p-0 text-[10px] font-black">
                    {ACTIVE_TRIPS.length}
                  </Badge>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
                  {ACTIVE_TRIPS.map((trip) => (
                    <div key={trip.id} className="p-6 rounded-[32px] bg-slate-50/50 border border-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-500 group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <h4 className="text-[12px] font-black text-slate-900 tracking-tight">{trip.from} - {trip.to}</h4>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">({trip.plate})</p>
                        </div>
                        <div className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                          trip.status === 'moving' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", trip.status === 'moving' ? "bg-emerald-500" : "bg-amber-500")} />
                          {trip.status === 'moving' ? 'HARAKATDA' : 'TO\'XTAGAN'}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mt-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors shadow-sm">
                            <Clock size={16} />
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">ETA</p>
                            <p className="text-[12px] font-black text-slate-700">{trip.eta}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-300 group-hover:text-amber-500 transition-colors shadow-sm">
                            <Truck size={16} />
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">LOAD</p>
                            <p className="text-[12px] font-black text-slate-700">{trip.load}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Status Summary */}
              <Card className="border-none shadow-sm rounded-[32px] bg-white p-6 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Activity size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tizim holati</p>
                      <p className="text-[12px] font-black text-slate-900 uppercase">BARQAOR</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#0b4db1]">98.2%</p>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Uptim</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dispatcher" className="m-0 space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm rounded-[24px] bg-white p-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-black text-[#0b4db1] mb-2">140+</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'uz' ? "Shu oy tashkil qilingan yuklar" : "Грузы в этом месяце"}</p>
            </Card>
            <Card className="border-none shadow-sm rounded-[24px] bg-white p-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-black text-emerald-500 mb-2">4.9 <span className="text-lg text-emerald-300">★</span></h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'uz' ? "Mijozlar tomonidan o'rtacha baho" : "Средняя оценка клиентов"}</p>
            </Card>
            <Card className="border-none shadow-sm rounded-[24px] bg-white p-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl font-black text-amber-500 mb-2">12 ta</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'uz' ? "Tasdiqlangan hamkor tashuvchilar" : "Партнеры-перевозчики"}</p>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{lang === 'uz' ? "Bozordagi ochiq e'lonlar" : "Открытые объявления"}</h2>
              <Button variant="outline" className="h-10 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest gap-2">
                <Filter size={14} /> Filterlar
              </Button>
            </div>

            {announcements.map((ann) => (
              <Card key={ann.id} className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden p-8 border border-slate-50 hover:shadow-lg transition-all duration-300">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between gap-4 px-2">
                      <span className="text-lg font-black text-slate-900">{ann.from}</span>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-full h-px bg-slate-100 relative">
                          <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-white px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-50 rounded-full h-5 flex items-center">
                            {ann.distance}
                          </div>
                        </div>
                      </div>
                      <span className="text-lg font-black text-slate-900">{ann.to}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-black text-slate-900 uppercase min-w-[120px]">{lang === 'uz' ? "Yuk turi:" : "Тип груза:"}</span>
                        <span className="text-[12px] font-bold text-slate-500">{ann.details}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-black text-slate-900 uppercase min-w-[120px]">{lang === 'uz' ? "Vaqt:" : "Время:"}</span>
                        <span className="text-[12px] font-bold text-slate-500">{lang === 'uz' ? "Bugun kun davomida kelishilgan holda" : "Сегодня в течение дня"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-black text-slate-900 uppercase min-w-[120px]">{lang === 'uz' ? "Mijoz byudjeti:" : "Бюджет клиента:"}</span>
                        <span className="text-[12px] font-bold text-[#0b4db1] font-black">
                          {ann.budget} {(!ann.budget.includes("Kelishilgan") && !ann.budget.includes("Договорная")) ? "UZS" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-slate-50/50 p-6 rounded-[24px] border border-slate-50 space-y-4">
                    <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-2">{lang === 'uz' ? "O'z xizmatingizni taklif qiling" : "Предложите свои услуги"}</p>
                    <Input placeholder={lang === 'uz' ? "Narx taklif qiling (UZS)" : "Цена (UZS)"} className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-white" />
                    <Input placeholder={lang === 'uz' ? "Mijozga xabar (Izoh)..." : "Сообщение..."} className="h-12 rounded-xl text-[12px] font-bold border-slate-100 bg-white" />
                    <Button className="w-full bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-12 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                      {lang === 'uz' ? "Xaridorga yuborish" : "Отправить"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carrier" className="m-0 space-y-8 animate-fade-in">
          <div className="bg-[#e7f1ff] border border-[#c5dcff] rounded-[18px] p-6 flex gap-4 items-start shadow-sm">
            <div className="bg-white p-2.5 rounded-xl text-[#0b4db1] shadow-sm">
              <CircleAlert size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[13px] font-black text-[#0b4db1] uppercase tracking-widest">{lang === 'uz' ? "Dispetcherdan yangi taklif!" : "Предложение от диспетчера!"}</h4>
              <p className="text-[11px] font-medium text-[#4b77b8] leading-relaxed max-w-4xl">
                {lang === 'uz' 
                  ? "\"Toshkent Logistika MChJ\" sizga yangi yuk bo'yicha hamkorlik taklif qilmoqda. Agar \"Roziman\" ni bossangiz, mijozga sizning nomingizdan yuk tashiydigan dispetcher sifatida shartnoma taklif etiladi."
                  : "\"Toshkent Логистика МЧЖ\" предлагает вам сотрудничество. Если вы нажмете \"Согласен\", диспетчер предложит клиенту контракт от вашего имени."
                }
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-10">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight ml-2">{lang === 'uz' ? "Dispetcher takliflari" : "Предложения диспетчеров"}</h2>
            
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden p-8 border border-slate-50 hover:shadow-xl transition-all duration-500 group">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-1">{lang === 'uz' ? "Xorazmga qurilish materiallari" : "Стройматериалы в Хорезм"}</h3>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      {lang === 'uz' ? "Taklif qildi:" : "Предложил:"} <span className="text-slate-900 font-black">Toshkent Logistika MChJ</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={12} fill="currentColor" /> 4.9
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#fcfdfe] p-6 rounded-[24px] border border-slate-50 space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start gap-4">
                        <span className="text-[10px] font-black text-slate-900 uppercase min-w-[80px] mt-0.5">{lang === 'uz' ? "Yuklash:" : "Погрузка:"}</span>
                        <span className="text-[11px] font-bold text-slate-500">{lang === 'uz' ? "Chilonzor, Oq-tepa (Bugun 15:00 gacha)" : "Чиланзар, Ак-тепа (Сегодня до 15:00)"}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-[10px] font-black text-slate-900 uppercase min-w-[80px] mt-0.5">{lang === 'uz' ? "Tushirish:" : "Разгрузка:"}</span>
                        <span className="text-[11px] font-bold text-slate-500">{lang === 'uz' ? "Urganch shahri markazi" : "Центр города Ургенч"}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-[10px] font-black text-slate-900 uppercase min-w-[80px] mt-0.5">{lang === 'uz' ? "Yuk hajmi:" : "Объем:"}</span>
                        <span className="text-[11px] font-bold text-slate-500">~5 tonna, og'ir ob'ektlar</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4 bg-[#f8faff] p-8 rounded-[32px] border border-blue-50/50">
                  <div className="text-center space-y-1 mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lang === 'uz' ? "Sizga taklif etilayotgan haq:" : "Предлагаемая оплата:"}</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">1,800,000 UZS</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white rounded-xl h-14 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]">
                      {lang === 'uz' ? "Roziman" : "Согласен"}
                    </Button>
                    <Button variant="outline" className="w-full border-slate-200 text-slate-500 bg-white hover:bg-slate-50 rounded-xl h-14 font-black uppercase tracking-widest text-[11px] transition-all">
                      {lang === 'uz' ? "Rad etish" : "Отказать"}
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
