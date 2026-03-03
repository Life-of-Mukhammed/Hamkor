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
  Sparkles,
  Globe,
  UserCheck
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
  const [role, setRole] = useState("haridor");

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  const handleSaveRole = (newRole: string) => {
    setRole(newRole);
    toast({
      title: "Muvaffaqiyatli",
      description: `Sizning rolingiz "${newRole === 'sotuvchi' ? 'Sotuvchi' : 'Haridor'}" qilib yangilandi.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#001529] pb-20">
      {/* Profile Header Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f4f9ff] p-8 rounded-[32px] shadow-sm border border-[#001529]/5">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-[#0b4db1] rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-100">
            S
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-[#001529]">Salom, sheyx2772!</h1>
            <div className="flex items-center gap-6 text-[11px] font-bold text-[#001529]/40 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">Reyting: <span className="text-amber-500 flex items-center gap-0.5">4.8 <Star size={12} fill="currentColor" /></span></span>
              <span className="text-[#0b4db1]">Faol e'lonlar: 2 ta</span>
              <span className="text-[#0b4db1]">Shartnomalar: 1 ta</span>
              <Badge className="bg-[#0b4db1] text-white border-none text-[9px] font-black uppercase px-2 py-0.5">
                {role === 'sotuvchi' ? 'Sotuvchi' : 'Haridor'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Personal Info */}
          <Card className="border-none shadow-sm rounded-[40px] bg-[#f4f9ff] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-10 py-8 border-b border-[#001529]/5">
              <CardTitle className="text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-[#001529]">
                <User size={18} className="text-[#0b4db1]" /> Shaxsiy Ma'lumotlar
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-9 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 bg-white shadow-sm">
                Tahrirlash
              </Button>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#001529]/40">Ism / Kompaniya nomi</Label>
                  <Input defaultValue="sheyx2772" className="rounded-2xl h-12 text-[13px] font-bold border-none bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-blue-100" />
                </div>
                
                {/* Role Selection Added Here */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#001529]/40">Foydalanuvchi roli</Label>
                  <Select value={role} onValueChange={handleSaveRole}>
                    <SelectTrigger className="rounded-2xl h-12 text-[13px] font-bold border-none bg-white shadow-sm focus:ring-2 focus:ring-blue-100">
                      <div className="flex items-center gap-2">
                        <UserCheck size={16} className="text-[#0b4db1]" />
                        <SelectValue placeholder="Rolni tanlang" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                      <SelectItem value="sotuvchi" className="text-[12px] font-bold uppercase tracking-tight py-3">Sotuvchi</SelectItem>
                      <SelectItem value="haridor" className="text-[12px] font-bold uppercase tracking-tight py-3">Haridor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#001529]/40">Telefon</Label>
                    <Input defaultValue="+998 90 123 45 67" className="rounded-2xl h-12 text-[13px] font-bold border-none bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-blue-100" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#001529]/40">Email</Label>
                    <Input defaultValue="sheyx2772@gmail.com" className="rounded-2xl h-12 text-[13px] font-bold border-none bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-blue-100" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#001529]/40">Manzil</Label>
                  <Input defaultValue="Toshkent shahri, Yunusobod tumani" className="rounded-2xl h-12 text-[13px] font-bold border-none bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-blue-100" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#001529]/40">Bank hisob raqami (STIR/Karta)</Label>
                  <Input defaultValue="2020 8000 1234 5678 9012" className="rounded-2xl h-12 text-[13px] font-bold border-none bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-blue-100" />
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <Checkbox id="juridical" className="rounded-lg border-[#001529]/10 bg-white" />
                  <label htmlFor="juridical" className="text-[12px] font-black text-[#001529]/60 cursor-pointer uppercase tracking-tight">Yuridik shaxsman</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Balance */}
          <Card className="border-none shadow-sm rounded-[40px] bg-[#f4f9ff] overflow-hidden">
            <CardHeader className="px-10 py-8 border-b border-[#001529]/5">
              <CardTitle className="text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-[#001529]">
                <Wallet size={18} className="text-[#0b4db1]" /> Mening Balansim
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="bg-[#0b4db1] rounded-[32px] p-10 text-white relative overflow-hidden group mb-8 shadow-xl shadow-blue-100">
                <div className="relative z-10 space-y-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">Asosiy Balans</p>
                  <h2 className="text-4xl font-black tracking-tighter">12 500 000 UZS</h2>
                  <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest">Muzlatilgan: 5 000 000 UZS</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Button className="h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-emerald-100">
                  Pul chiqarish
                </Button>
                <Button variant="outline" className="h-14 border-none bg-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-sm">
                  Karta tahrirlash
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* History & Statistics */}
          <Card className="border-none shadow-sm rounded-[40px] bg-[#f4f9ff] overflow-hidden">
            <CardHeader className="px-10 py-8 border-b border-[#001529]/5">
              <CardTitle className="text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-[#001529]">
                <ArrowUpRight size={18} className="text-[#0b4db1]" /> Statistika
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-[28px] bg-white shadow-sm border border-[#001529]/5">
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">Umumiy Daromad</p>
                  <p className="text-[18px] font-black text-emerald-700">+ 45 000 000</p>
                </div>
                <div className="p-6 rounded-[28px] bg-white shadow-sm border border-[#001529]/5">
                  <p className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-2">Umumiy Xarajat</p>
                  <p className="text-[18px] font-black text-red-700">- 30 000 000</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Kirim (Lot #251)", date: "24.10.2025", amount: "+ 12,000,000 UZS", color: "text-emerald-600" },
                  { title: "Chiqim (Komissiya)", date: "22.10.2025", amount: "- 150,000 UZS", color: "text-red-600" },
                  { title: "Chiqim (Lot #280)", date: "20.10.2025", amount: "- 5,000,000 UZS", color: "text-red-600" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-white border border-[#001529]/5 last:border-blue-100">
                    <div>
                      <p className="text-[12px] font-black text-[#001529] uppercase tracking-tight">{item.title}</p>
                      <p className="text-[9px] font-bold text-[#001529]/40 uppercase tracking-widest">{item.date}</p>
                    </div>
                    <p className={`text-[13px] font-black ${item.color}`}>{item.amount}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-[#001529]/40 gap-2 hover:bg-white rounded-xl h-12">
                Barcha cheklarni yuklab olish (PDF)
              </Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="border-none shadow-sm rounded-[40px] bg-[#f4f9ff] overflow-hidden">
            <CardHeader className="px-10 py-8 border-b border-[#001529]/5">
              <CardTitle className="text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-[#001529]">
                <SettingsIcon size={18} className="text-[#0b4db1]" /> Tizim Sozlamalari
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-[#0b4db1]" />
                    <span className="text-[12px] font-black uppercase text-[#001529] tracking-tight">Interface tili</span>
                  </div>
                  <Select defaultValue="uz">
                    <SelectTrigger className="w-36 h-11 rounded-xl border-none bg-white shadow-sm text-[11px] font-black uppercase tracking-widest">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      <SelectItem value="uz">O'zbek</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={16} className="text-[#0b4db1]" />
                    <span className="text-[12px] font-black uppercase text-[#001529] tracking-tight">Xabarnomalar</span>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#0b4db1]" />
                </div>

                <div className="pt-6 border-t border-[#001529]/5 flex items-center gap-2 text-rose-500 cursor-pointer group">
                  <ShieldAlert size={16} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Hisobni butkul o'chirish</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Banner */}
          <div className="bg-[#001529] rounded-[40px] p-12 text-white relative overflow-hidden group shadow-2xl shadow-[#001529]/20">
            <div className="relative z-10">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#0b4db1] mb-3">PRO-HUJJATLAR</p>
              <h3 className="text-2xl font-black tracking-tight uppercase mb-6 leading-tight">PREMIUM darajasiga o'ting</h3>
              <p className="text-[13px] font-medium opacity-60 leading-relaxed max-w-xs mb-10">
                Buxgalteriya, huquq, HR va soliq hujjatlarini avtomatik rasmiylashtirishni yoqing.
              </p>
              <Button className="bg-white text-[#001529] hover:bg-slate-50 rounded-2xl h-16 px-10 font-black uppercase tracking-widest text-[11px] shadow-2xl">
                Hozir Boshlash
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0b4db1]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0b4db1]/30 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
}
