
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Lock, User, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulyatsiya qilingan kirish jarayoni
    setTimeout(() => {
      if (username && password) {
        toast({
          title: "Xush kelibsiz!",
          description: "Tizimga muvaffaqiyatli kirdingiz.",
        });
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Xatolik",
          description: "Iltimos, barcha maydonlarni to'ldiring.",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-6 font-body">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="w-full max-w-[480px] relative z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#0b5dbb] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/20 mb-6">
            <div className="w-8 h-8 rounded-[6px] border-4 border-white" />
          </div>
          <h1 className="text-3xl font-black text-[#001529] tracking-tight uppercase">I-HAMKOR</h1>
          <p className="text-[11px] font-black text-[#001529]/40 uppercase tracking-[0.4em] mt-2">B2B Supreme Platform</p>
        </div>

        <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,21,41,0.08)] rounded-[48px] bg-white p-4">
          <CardHeader className="p-10 pb-4 text-center">
            <CardTitle className="text-[14px] font-black uppercase tracking-[0.2em] text-[#001529]">Tizimga kirish</CardTitle>
            <CardDescription className="text-[11px] font-bold text-[#001529]/40 uppercase tracking-tight mt-2">
              Korporativ hisobingiz orqali davom eting
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-6">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001529]/40 ml-1">Login yoki STIR</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001529]/20 group-focus-within:text-[#0b5dbb] transition-colors" size={18} />
                    <Input 
                      placeholder="sheyx2772" 
                      className="h-14 pl-12 rounded-2xl border-none bg-[#f4f9ff] text-[14px] font-bold focus-visible:ring-2 focus-visible:ring-blue-100"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center ml-1">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001529]/40">Parol</Label>
                    <button type="button" className="text-[9px] font-black text-[#0b5dbb] uppercase tracking-widest hover:underline">Unutdingizmi?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001529]/20 group-focus-within:text-[#0b5dbb] transition-colors" size={18} />
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      className="h-14 pl-12 rounded-2xl border-none bg-[#f4f9ff] text-[14px] font-bold focus-visible:ring-2 focus-visible:ring-blue-100"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-[#001529] hover:bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-all active:scale-95"
              >
                {loading ? "Tekshirilmoqda..." : "Kirish"}
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-[#001529]/5">
              <div className="bg-[#f4f9ff] p-6 rounded-[32px] flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0b5dbb] shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#001529] uppercase tracking-tight">Xavfsiz ulanish</p>
                  <p className="text-[9px] font-bold text-[#001529]/40 uppercase tracking-tighter">Barcha ma'lumotlar shifrlangan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-[11px] font-bold text-[#001529]/40 uppercase tracking-widest">Platformada hali yo'qmisiz?</p>
          <Button variant="ghost" className="text-[11px] font-black text-[#0b5dbb] uppercase tracking-[0.2em] hover:bg-blue-50 rounded-xl px-8 h-12">
            Ro'yxatdan o'tish
          </Button>
        </div>
      </div>
    </div>
  );
}
