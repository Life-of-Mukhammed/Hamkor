
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
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
import { translations, Language } from "@/lib/translations";

interface SettingsProps {
  lang?: Language;
}

export function Settings({ lang = 'uz' }: SettingsProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: lang === 'en' ? "Success" : lang === 'ru' ? "Успешно" : "Muvaffaqiyatli",
        description: lang === 'en' ? "Changes saved" : lang === 'ru' ? "Изменения сохранены" : "O'zgarishlar saqlandi",
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
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{t.sections.settings}</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
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
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">CEO • Premium</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.labels.fullName}</Label>
                <Input defaultValue="Alisher Navoiy" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</Label>
                <Input defaultValue="alisher@itijorat.uz" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="text-blue-600" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">Company</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</Label>
                <Input defaultValue="IT-Solutions Uzbekistan LLC" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.labels.inn}</Label>
                <Input defaultValue="309 456 781" className="rounded-xl h-12 text-[12px] font-bold border-slate-100" />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-3 mb-8">
              <Bell className="text-blue-600" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">Notifications</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-slate-800">Email</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-slate-800">SMS</span>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] gap-2 shadow-xl shadow-blue-100 transition-all duration-300"
            >
              <Save size={18} /> {loading ? "..." : t.labels.save}
            </Button>
            <Button variant="outline" className="w-full border-red-100 text-rose-500 hover:bg-rose-50 rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] gap-2">
              <LogOut size={18} /> {t.labels.logout}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
