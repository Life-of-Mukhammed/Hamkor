
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Building2, 
  Bell, 
  ShieldCheck, 
  Globe, 
  Save, 
  LogOut,
  Camera
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { dict } from "@/lib/translations";

export function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Muvaffaqiyatli",
        description: "Barcha o'zgarishlar saqlandi",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-700 pb-20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
          <ShieldCheck size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{dict.sections.settings}</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profil ma'lumotlari va tizim sozlamalari</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Left Column: Profile & Company */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-6 mb-10">
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-slate-50">
                  <AvatarImage src="https://picsum.photos/seed/user/200" />
                  <AvatarFallback className="bg-blue-50 text-blue-600 font-black text-xl">AN</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase">Alisher Navoiy</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Bosh menejer • Premium foydalanuvchi</p>
                <Button variant="outline" size="sm" className="mt-4 rounded-xl h-9 border-slate-100 text-[10px] font-black uppercase tracking-widest">
                  Rasmni o'zgartirish
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ism va Familiya</Label>
                <Input defaultValue="Alisher Navoiy" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Elektron pochta</Label>
                <Input defaultValue="alisher@itijorat.uz" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Telefon raqami</Label>
                <Input defaultValue="+998 90 123 45 67" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mutaxassislik</Label>
                <Input defaultValue="Logistika va Xaridlar" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="text-blue-600" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">Kompaniya Ma'lumotlari</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kompaniya nomi</Label>
                <Input defaultValue="IT-Solutions Uzbekistan LLC" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">STIR (INN)</Label>
                <Input defaultValue="309 456 781" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yuridik manzil</Label>
                <Input defaultValue="Toshkent sh., Mirzo Ulug'bek tumani, Mustaqillik shoh ko'chasi 54" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: System Settings */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-3 mb-8">
              <Bell className="text-blue-600" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">Bildirishnomalar</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: "Email xabarlar", desc: "Yangi shartnomalar va to'lovlar haqida" },
                { label: "SMS bildirishnomalar", desc: "Muhim auksion yangiliklari" },
                { label: "Push xabarlar", desc: "Real vaqt rejimidagi o'zgarishlar" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-black uppercase text-slate-800">{item.label}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="text-blue-600" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">Til va Mintaqa</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tizim tili</Label>
                <div className="flex gap-2">
                  {['UZ', 'RU', 'EN'].map((lang) => (
                    <Button 
                      key={lang}
                      variant={lang === 'UZ' ? 'default' : 'outline'}
                      className={`flex-1 h-10 rounded-xl text-[10px] font-black uppercase ${lang === 'UZ' ? 'bg-blue-600' : 'border-slate-100'}`}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] gap-2 shadow-xl shadow-slate-200 transition-all duration-300"
            >
              <Save size={18} /> {loading ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
            <Button variant="outline" className="w-full border-red-100 text-rose-500 hover:bg-rose-50 rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] gap-2">
              <LogOut size={18} /> Tizimdan chiqish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
