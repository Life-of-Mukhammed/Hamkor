"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Settings as SettingsIcon, 
  MessageCircle, 
  BookOpen,
  ChevronDown,
  Star,
  Plus,
  Minus,
  Trash2,
  Bell,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { translations, Language } from "@/lib/translations";

interface SettingsProps {
  lang?: Language;
}

export function Settings({ lang = 'uz' }: SettingsProps) {
  const { toast } = useToast();
  const t = translations[lang];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  return (
    <div className="space-y-8 animate-fade-in text-slate-700 pb-20">
      {/* Profile Header Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[24px] shadow-sm border border-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#0b4db1] rounded-full flex items-center justify-center text-white text-2xl font-black">
            S
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-black text-slate-900">Salom, sheyx2772!</h1>
            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1">Sizning reytingingiz: <span className="text-amber-500 flex items-center gap-0.5">4.8 <Star size={10} fill="currentColor" /></span> (12 ta bajarilgan lot)</span>
              <span className="text-blue-600">Faol e'lonlar: 2 ta</span>
              <span className="text-blue-600">Faol shartnomalar: 1 ta</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Personal Info */}
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-8 py-6 border-b border-slate-50">
              <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <User size={16} className="text-blue-600" /> Shaxsiy Ma'lumotlar
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2 bg-slate-50">
                Tahrirlash
              </Button>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ism / Kompaniya nomi</Label>
                  <Input defaultValue="sheyx2772" className="rounded-xl h-11 text-[12px] font-bold border-slate-100" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Telefon</Label>
                    <Input defaultValue="+998 90 123 45 67" className="rounded-xl h-11 text-[12px] font-bold border-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</Label>
                    <Input defaultValue="sheyx2772@gmail.com" className="rounded-xl h-11 text-[12px] font-bold border-slate-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Manzil</Label>
                  <Input defaultValue="Toshkent shahri, Yunusobod tumani" className="rounded-xl h-11 text-[12px] font-bold border-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bank hisob raqami (STIR/Karta)</Label>
                  <Input defaultValue="2020 8000 1234 5678 9012" className="rounded-xl h-11 text-[12px] font-bold border-slate-100" />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="juridical" />
                  <label htmlFor="juridical" className="text-[11px] font-bold text-slate-600 cursor-pointer">Yuridik shaxsmi?</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Balance */}
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50">
              <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <Wallet size={16} className="text-blue-600" /> Mening Balansim
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-[#0b4db1] rounded-[24px] p-8 text-white relative overflow-hidden group mb-6">
                <div className="relative z-10 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Asosiy Balans</p>
                  <h2 className="text-3xl font-black tracking-tighter">12 500 000 UZS</h2>
                  <p className="text-[10px] font-bold opacity-60">Muzlatilgan (Zalog): 5 000 000 UZS</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px]">
                  Pul chiqarish
                </Button>
                <Button variant="outline" className="h-12 border-slate-100 rounded-xl font-black uppercase tracking-widest text-[11px]">
                  Karta tahrirlash
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50">
              <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <MessageCircle size={16} className="text-blue-600" /> Yordam va Qo'llanma
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 border-slate-100 rounded-xl font-black uppercase tracking-widest text-[11px] gap-2">
                  <MessageCircle size={14} /> Chat orqali
                </Button>
                <Button variant="outline" className="h-12 border-slate-100 rounded-xl font-black uppercase tracking-widest text-[11px] gap-2">
                  <BookOpen size={14} /> Qo'llanma
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ko'p so'raladigan savollar (FAQ)</p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-slate-50">
                    <AccordionTrigger className="text-[12px] font-bold text-slate-700 py-3 hover:no-underline">E'lon qanday qo'yiladi?</AccordionTrigger>
                    <AccordionContent className="text-[11px] text-slate-500">
                      Marketplace yoki Auksion bo'limiga o'tib "Yangi Lot" yoki "Yangi E'lon" tugmasini bosing.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-slate-50">
                    <AccordionTrigger className="text-[12px] font-bold text-slate-700 py-3 hover:no-underline">To'lovlar xavfsizimi?</AccordionTrigger>
                    <AccordionContent className="text-[11px] text-slate-500">
                      Barcha to'lovlar Escrow tizimi orqali himoyalangan.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-slate-50">
                    <AccordionTrigger className="text-[12px] font-bold text-slate-700 py-3 hover:no-underline">Kompaniya ma'lumotlarini o'zgartirish</AccordionTrigger>
                    <AccordionContent className="text-[11px] text-slate-500">
                      Sozlamalar bo'limidagi Shaxsiy Ma'lumotlar qismidan tahrirlashingiz mumkin.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <p className="text-center text-[9px] font-bold text-slate-300 uppercase">Qo'llab-quvvatlashga shikoyat yozish</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* History & Statistics */}
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50">
              <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <ArrowUpRight size={16} className="text-blue-600" /> To'lov Tarixi va Statistika
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-[20px] bg-emerald-50 border border-emerald-100">
                  <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Umumiy Daromad</p>
                  <p className="text-[16px] font-black text-emerald-700">+ 45 000 000 UZS</p>
                </div>
                <div className="p-4 rounded-[20px] bg-red-50 border border-red-100">
                  <p className="text-[8px] font-black text-red-600 uppercase tracking-widest mb-1">Umumiy Xarajat</p>
                  <p className="text-[16px] font-black text-red-700">- 30 000 000 UZS</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Kirim (Lot #251)", date: "24.10.2025 - TRX-1092", amount: "+ 12,000,000 UZS", color: "text-emerald-600" },
                  { title: "Chiqim (Komissiya)", date: "22.10.2025 - TRX-1091", amount: "- 150,000 UZS", color: "text-red-600" },
                  { title: "Chiqim (Lot #280)", date: "20.10.2025 - TRX-1090", amount: "- 5,000,000 UZS", color: "text-red-600" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-[11px] font-black text-slate-800">{item.title}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{item.date}</p>
                    </div>
                    <p className={`text-[11px] font-black ${item.color}`}>{item.amount}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 gap-2">
                Barcha cheklarni yuklab olish (PDF)
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50">
              <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <Bell size={16} className="text-blue-600" /> Bildirishnomalar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-black uppercase text-slate-800">Push xabarnomalar (Ilova ichida)</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Yangi taklif va e'lonlar uchun</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-black uppercase text-slate-800">Email xabarnomalar</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Kiritilgan savdolar va muhim ogohlantirishlar</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-black uppercase text-slate-800">SMS xabarnomalar</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Tasdiqlash kodlari va xavfsizlik uchun</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Lots */}
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50">
              <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <Star size={16} className="text-blue-600" /> Saqlangan Lotlar (0)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-20 text-center">
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Sizda saqlangan e'lonlar yo'q.</p>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50">
              <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                <SettingsIcon size={16} className="text-blue-600" /> Tizim Sozlamalari
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-slate-400" />
                    <span className="text-[11px] font-black uppercase text-slate-800">Interface tili</span>
                  </div>
                  <Select defaultValue="uz">
                    <SelectTrigger className="w-32 h-9 rounded-xl border-slate-100 text-[11px] font-black uppercase">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uz">O'zbek</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-slate-400" />
                    <span className="text-[11px] font-black uppercase text-slate-800">Rejimni o'zgartirish</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-9 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest">
                    Sotuvchiga o'tish
                  </Button>
                </div>
                <div className="pt-4 flex items-center gap-2 text-rose-500 cursor-pointer">
                  <ShieldAlert size={14} />
                  <span className="text-[11px] font-black uppercase tracking-widest">Hisobni butkul o'chirish</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Banner */}
          <div className="bg-[#0f172a] rounded-[32px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">PRO-HUJJATLAR</p>
              <h3 className="text-xl font-black tracking-tight uppercase mb-4">PREMIUM darajasiga o'ting</h3>
              <p className="text-[12px] font-medium opacity-60 leading-relaxed max-w-xs mb-8">
                Buxgalteriya, huquq, HR va soliq hujjatlarini avtomatik rasmiylashtirishni yoqing.
              </p>
              <Button className="bg-white text-slate-900 hover:bg-slate-50 rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[11px] shadow-xl">
                Boshlash
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-600/30 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Globe({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

