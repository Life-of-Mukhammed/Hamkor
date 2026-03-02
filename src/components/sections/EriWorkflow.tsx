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
import { dict } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";
import { generateContract, ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";

export function EriWorkflow() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inn, setInn] = useState("");
  const [fullName, setFullName] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [contractData, setContractData] = useState<ContractGenerationOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateContract = async () => {
    if (!inn || !fullName) {
      toast({ 
        title: "Хатолик", 
        description: "СТИР ва Исм-фамилияни киритинг", 
        variant: "destructive" 
      });
      return;
    }
    setLoading(true);
    try {
      const data = await generateContract({
        inn,
        buyerName: fullName,
        additionalTerms: extraInfo || "Стандарт харид шартлари"
      });
      setContractData(data);
      setStep(2);
      toast({ title: "Муваффақиятли", description: "AI шартномани тайёрлади" });
    } catch (error) {
      toast({ title: "AI Хатоси", description: "Қайта уриниб кўринг", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSign = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(3);
      setLoading(false);
      toast({ title: "Тасдиқланди", description: "Шартнома ЭРИ билан имзоланди" });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <ClipboardCheck size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{dict.labels.buyerPanel}</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Шартномаларни автоматик шакллантириш ва имзолаш</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Side: Form or Preview */}
        <div className="lg:col-span-7 space-y-6">
          {step === 1 && (
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-blue-600" size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest">AI Шартнома Конструктори</h3>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{dict.labels.inn}</Label>
                  <Input 
                    placeholder="123456789" 
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    className="rounded-xl h-12 text-[12px] font-bold border-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{dict.labels.fullName}</Label>
                  <Input 
                    placeholder="Алишер Навоий" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-xl h-12 text-[12px] font-bold border-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Қўшимча маълумотлар ва шартлар</Label>
                  <Textarea 
                    placeholder="Маҳсулот тури, етказиб бериш муддати ва ҳоказо..." 
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    className="rounded-xl min-h-[120px] text-[12px] font-bold border-slate-100 p-4" 
                  />
                </div>
                <Button 
                  onClick={handleGenerateContract}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 font-black uppercase tracking-widest text-[11px] gap-2 shadow-lg shadow-blue-100"
                >
                  {loading ? <Zap size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  {dict.labels.generateAi}
                </Button>
              </div>
            </Card>
          )}

          {step >= 2 && contractData && (
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden flex flex-col h-[750px] animate-fade-in">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                    <FileText size={16} className="text-blue-600" /> {contractData.title}
                  </CardTitle>
                  <Button variant="outline" className="h-9 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest gap-2">
                    <Download size={14} /> PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-200/50 p-6 overflow-y-auto">
                  <div className="max-w-3xl mx-auto bg-white shadow-2xl p-10 min-h-full space-y-6 rounded-sm border border-slate-100">
                    <h1 className="text-xl font-black text-center mb-8 uppercase tracking-tight">{contractData.title}</h1>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 border-b pb-4 border-slate-100">
                      <span>Тошкент ш.</span>
                      <span>{contractData.date}</span>
                    </div>
                    <div className="space-y-6 text-[12px] font-medium leading-relaxed text-slate-700 text-justify whitespace-pre-wrap">
                      {contractData.content}
                    </div>
                    {step === 3 && (
                      <div className="mt-12 flex justify-end animate-fade-in">
                        <div className="border-[3px] border-emerald-600 p-1.5 rounded-lg transform rotate-[-12deg] bg-emerald-50/50">
                          <div className="border border-emerald-600 p-2 flex flex-col items-center">
                            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">ЭРИ БИЛАН ТАСДИҚЛАНГАН</span>
                            <span className="text-[11px] font-black text-emerald-600 uppercase mt-0.5">SOLIQ.UZ / ID: {contractData.contractId}</span>
                            <span className="text-[7px] text-emerald-600 font-bold mt-0.5">{fullName} • {new Date().toLocaleString()}</span>
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

        {/* Right Side: Status and Controls */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Жараён ҳолати</h2>
            <div className="space-y-8">
              {[
                { title: "Лойиҳа тайёрлаш", status: step >= 2 ? "completed" : "active", desc: "AI шартномани шакллантирмоқда" },
                { title: "ЭРИ имзолаш", status: step === 3 ? "completed" : (step === 2 ? "active" : "pending"), desc: "Юридик кучга эга имзо" },
                { title: "Якуний тасдиқ", status: step === 3 ? "completed" : "pending", desc: "Тизимга автоматик юклаш" },
              ].map((s, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                      s.status === 'completed' ? 'bg-emerald-500 text-white' : 
                      s.status === 'active' ? 'bg-blue-600 text-white ring-4 ring-blue-50' : 'bg-slate-100 text-slate-300'
                    }`}>
                      {s.status === 'completed' ? <CircleCheck size={14} /> : <span className="text-[9px] font-black">{i + 1}</span>}
                    </div>
                    {i !== 2 && <div className={`w-0.5 h-12 my-1 transition-colors duration-500 ${s.status === 'completed' ? 'bg-emerald-200' : 'bg-slate-50'}`} />}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className={`text-[11px] font-black uppercase tracking-widest ${s.status === 'pending' ? 'text-slate-300' : 'text-slate-800'}`}>{s.title}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {step === 2 && (
            <Card className="border-none shadow-sm rounded-[32px] bg-blue-600 p-8 text-white animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <UserCircle size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Шахсни тасдиқлаш</h3>
                  <p className="text-[9px] font-bold text-white/70 uppercase">ЭРИ калити билан имзоланг</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">Имзоловчи шахс</p>
                  <p className="text-[12px] font-black uppercase">{fullName}</p>
                </div>
                <Button 
                  onClick={handleFinalSign}
                  disabled={loading}
                  className="w-full bg-white text-blue-600 hover:bg-slate-50 rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] shadow-xl shadow-blue-800/20"
                >
                  {loading ? "Имзоланмоқда..." : "Шартномани тасдиқлаш"}
                </Button>
                <p className="text-[8px] text-center font-bold text-white/50 uppercase tracking-tighter">
                  Ушбу тугмани босиш орқали сиз шартнома шартларига тўлиқ розилик билдирасиз
                </p>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-none shadow-sm rounded-[32px] bg-emerald-500 p-8 text-white animate-fade-in text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleCheck size={32} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest mb-2">Муваффақиятли!</h3>
              <p className="text-[10px] font-bold text-white/80 uppercase leading-relaxed">Шартнома №{contractData?.contractId} муваффақиятли имзоланди ва тизимга юкланди.</p>
              <Button 
                onClick={() => { setStep(1); setContractData(null); }}
                variant="outline" 
                className="mt-6 w-full border-white/30 text-white hover:bg-white/10 rounded-xl h-12 font-black uppercase tracking-widest text-[10px]"
              >
                Янги лойиҳа бошлаш
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
