"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  CircleCheck, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  UserCircle, 
  ArrowRight,
  ClipboardCheck,
  Zap
} from "lucide-react";
import { translations } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";
import { generateContract, ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";

interface EriWorkflowProps {
  onContractSigned?: (contract: ContractGenerationOutput) => void;
  lang?: 'uz' | 'ru' | 'en';
}

export function EriWorkflow({ onContractSigned, lang = 'uz' }: EriWorkflowProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inn, setInn] = useState("");
  const [fullName, setFullName] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [contractData, setContractData] = useState<ContractGenerationOutput | null>(null);
  const { toast } = useToast();
  const t = translations[lang];

  const handleGenerateContract = async () => {
    if (!inn || !fullName) {
      toast({ 
        title: "Xatolik", 
        description: "STIR va Ism-familiyani kiriting", 
        variant: "destructive" 
      });
      return;
    }
    setLoading(true);
    try {
      const data = await generateContract({
        inn,
        buyerName: fullName,
        additionalTerms: extraInfo || "Standart xarid shartlari"
      });
      setContractData(data);
      setStep(2);
      toast({ title: "Muvaffaqiyatli", description: "AI shartnomani tayyorladi" });
    } catch (error) {
      toast({ title: "AI Xatosi", description: "Qayta urinib ko'ring", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSign = () => {
    if (!contractData) return;
    setLoading(true);
    setTimeout(() => {
      setStep(3);
      setLoading(false);
      onContractSigned?.(contractData);
      toast({ title: "Tasdiqlandi", description: "Shartnoma ERI bilan imzolandi va 'Shartnomalar' bo'limiga yuborildi" });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#001529]">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-[#0b5dbb] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/10">
          <ClipboardCheck size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">{t.labels.buyerPanel}</h1>
          <p className="text-[11px] font-bold text-[#001529]/40 uppercase tracking-[0.2em] mt-1">Shartnomalarni avtomatik shakllantirish va imzolash</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          {step === 1 && (
            <Card className="premium-card border-none rounded-[48px] overflow-hidden p-12 animate-fade-in">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Sparkles size={16} />
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.2em]">AI Shartnoma Konstruktori</h3>
              </div>
              <div className="grid gap-8">
                <div className="space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001529]/40">{t.labels.inn}</Label>
                  <Input 
                    placeholder="123456789" 
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    className="rounded-2xl h-14 text-[14px] font-bold border-none bg-white shadow-sm focus:ring-2 focus:ring-blue-100" 
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001529]/40">{t.labels.fullName}</Label>
                  <Input 
                    placeholder="Alisher Navoiy" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-2xl h-14 text-[14px] font-bold border-none bg-white shadow-sm focus:ring-2 focus:ring-blue-100" 
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001529]/40">Qo'shimcha ma'lumotlar va shartlar</Label>
                  <Textarea 
                    placeholder="Mahsulot turi, yetkazib berish muddati va hokazo..." 
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    className="rounded-3xl min-h-[160px] text-[14px] font-bold border-none bg-white shadow-sm p-6 focus:ring-2 focus:ring-blue-100" 
                  />
                </div>
                <Button 
                  onClick={handleGenerateContract}
                  disabled={loading}
                  className="w-full bg-[#0b5dbb] hover:bg-blue-700 text-white rounded-2xl h-16 font-black uppercase tracking-[0.2em] text-[12px] gap-3 shadow-2xl shadow-blue-900/20"
                >
                  {loading ? <Zap size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  {t.labels.generateAi}
                </Button>
              </div>
            </Card>
          )}

          {step >= 2 && contractData && (
            <Card className="premium-card border-none rounded-[48px] overflow-hidden flex flex-col h-[800px] animate-fade-in shadow-2xl">
              <CardHeader className="bg-white/50 backdrop-blur-md border-b px-10 py-8">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                    <FileText size={18} className="text-blue-600" /> {contractData.title}
                  </CardTitle>
                  <Button variant="outline" className="h-10 rounded-xl border-[#001529]/10 bg-white text-[10px] font-black uppercase tracking-widest gap-2">
                    <Download size={14} /> PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#001529]/5 p-10 overflow-y-auto no-scrollbar">
                  <div className="max-w-3xl mx-auto bg-white shadow-2xl p-16 min-h-full space-y-8 rounded-sm border border-[#001529]/5">
                    <h1 className="text-2xl font-black text-center mb-12 uppercase tracking-tight leading-tight">{contractData.title}</h1>
                    <div className="flex justify-between text-[11px] font-black uppercase text-[#001529]/30 border-b pb-6 border-[#001529]/5">
                      <span>Toshkent sh.</span>
                      <span>{contractData.date}</span>
                    </div>
                    <div className="space-y-8 text-[14px] font-medium leading-relaxed text-[#001529]/80 text-justify whitespace-pre-wrap font-body">
                      {contractData.content}
                    </div>
                    {step === 3 && (
                      <div className="mt-16 flex justify-end animate-fade-in">
                        <div className="border-[6px] border-[#10b981] p-3 rounded-[24px] transform rotate-[-10deg] bg-emerald-50/50 shadow-2xl shadow-emerald-100">
                          <div className="border-2 border-[#10b981] p-5 flex flex-col items-center rounded-[18px]">
                            <span className="text-[9px] font-black text-[#10b981] uppercase tracking-[0.3em]">ERI BILAN TASDIQLANGAN</span>
                            <span className="text-[14px] font-black text-[#10b981] uppercase mt-1 tracking-tight">SOLIQ.UZ / ID: {contractData.contractId}</span>
                            <span className="text-[8px] text-[#10b981] font-bold mt-2 opacity-60">{fullName} • {new Date().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8">
          <Card className="premium-card border-none rounded-[40px] p-10">
            <h2 className="text-[11px] font-black text-[#001529]/30 uppercase tracking-[0.3em] mb-10">Jarayon holati</h2>
            <div className="space-y-10">
              {[
                { title: "Loyiha tayyorlash", status: step >= 2 ? "completed" : "active", desc: "AI shartnomani shakllantirmoqda" },
                { title: "ERI imzolash", status: step === 3 ? "completed" : (step === 2 ? "active" : "pending"), desc: "Yuridik kuchga ega imzo" },
                { title: "Yakuniy tasdiq", status: step === 3 ? "completed" : "pending", desc: "Tizimga avtomatik yuklash" },
              ].map((s, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${
                      s.status === 'completed' ? 'bg-[#10b981] text-white' : 
                      s.status === 'active' ? 'bg-[#0b5dbb] text-white ring-8 ring-blue-50' : 'bg-white text-[#001529]/20 border border-[#001529]/5'
                    }`}>
                      {s.status === 'completed' ? <CircleCheck size={18} /> : <span className="text-[11px] font-black">{i + 1}</span>}
                    </div>
                    {i !== 2 && <div className={`w-0.5 h-16 my-2 transition-colors duration-500 ${s.status === 'completed' ? 'bg-[#10b981]/20' : 'bg-[#001529]/5'}`} />}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className={`text-[12px] font-black uppercase tracking-[0.1em] ${s.status === 'pending' ? 'text-[#001529]/20' : 'text-[#001529]'}`}>{s.title}</p>
                    <p className="text-[10px] font-bold text-[#001529]/40 uppercase mt-1 tracking-tight">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {step === 2 && (
            <Card className="border-none rounded-[40px] bg-[#0b5dbb] p-10 text-white animate-fade-in shadow-2xl shadow-blue-900/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <UserCircle size={28} />
                </div>
                <div>
                  <h3 className="text-[14px] font-black uppercase tracking-widest">Shaxsni tasdiqlash</h3>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-tight">ERI kaliti bilan imzolang</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white/10 rounded-3xl border border-white/20">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Imzoluvchi shaxs</p>
                  <p className="text-[14px] font-black uppercase tracking-tight">{fullName}</p>
                </div>
                <Button 
                  onClick={handleFinalSign}
                  disabled={loading}
                  className="w-full bg-white text-[#0b5dbb] hover:bg-blue-50 rounded-2xl h-16 font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-blue-900/40"
                >
                  {loading ? "Imzolanmoqda..." : "Shartnomani tasdiqlash"}
                </Button>
                <p className="text-[9px] text-center font-bold text-white/40 uppercase tracking-tighter leading-relaxed">
                  Ushbu tugmani bosish orqali siz shartnoma shartlariga to'liq rozilik bildirasiz va ERI kalitingiz orqali yuridik javobgarlikni zimmangizga olasiz.
                </p>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-none rounded-[40px] bg-[#10b981] p-12 text-white animate-fade-in text-center shadow-2xl shadow-emerald-900/20">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CircleCheck size={40} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-3">Muvaffaqiyatli!</h3>
              <p className="text-[11px] font-bold text-white/70 uppercase leading-relaxed tracking-tight">Shartnoma №{contractData?.contractId} muvaffaqiyatli imzolandi va tizimga yuklandi.</p>
              <Button 
                onClick={() => { setStep(1); setContractData(null); }}
                variant="outline" 
                className="mt-10 w-full border-white/30 text-white hover:bg-white/10 rounded-2xl h-14 font-black uppercase tracking-[0.2em] text-[11px]"
              >
                Yangi loyiha boshlash
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}