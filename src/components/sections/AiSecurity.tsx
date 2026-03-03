"use client";

import { useState } from "react";
import { assessAiRiskScore, AiRiskScoreAssessmentOutput } from "@/ai/flows/ai-risk-score-assessment-flow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Search, TriangleAlert, CircleCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { dict as defaultDict } from "@/lib/translations";

export function AiSecurity({ t }: { t?: any }) {
  const [inn, setInn] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiRiskScoreAssessmentOutput | null>(null);
  const { toast } = useToast();
  
  const dict = t || defaultDict;

  const handleCheck = async () => {
    if (inn.length < 9) {
      toast({ title: "Хатолик", description: "СТИР камида 9 та рақам бўлиши керак", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const data = await assessAiRiskScore({ inn });
      setResult(data);
      toast({ title: "Муваффақиятли", description: "AI текшируви якунланди" });
    } catch (error) {
      toast({ title: "Тизим хатоси", description: "Қайта уриниб кўринг", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{dict.sections.aiSecurity}</h1>
      </div>

      <Card className="border-none neo-shadow bg-[#f4f9ff] rounded-[32px] overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-lg font-black uppercase tracking-tight text-[#001529]">Корхона хавфсизлигини текшириш (СТИР орқали)</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={dict.labels.inn}
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                className="pl-12 h-14 rounded-2xl border-none bg-white shadow-sm font-bold text-lg"
              />
            </div>
            <Button onClick={handleCheck} disabled={loading} className="h-14 px-10 rounded-2xl bg-[#0b4db1] hover:bg-blue-700 text-white font-black uppercase tracking-widest shadow-lg shadow-blue-100">
              {loading ? "Текширилмоқда..." : dict.labels.check}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          <Card className="border-none neo-shadow bg-[#f4f9ff] rounded-[32px] overflow-hidden">
            <CardHeader className="bg-primary/5 p-8">
              <CardTitle className="flex items-center gap-3 text-lg font-black uppercase">
                <Shield className="text-[#0b4db1]" /> {dict.labels.riskScore}: {result.riskScore}%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-6">
              <Progress value={result.riskScore} className="h-4 mb-8 bg-white" />
              <div className="flex justify-between items-center p-6 rounded-2xl bg-white shadow-sm border border-[#001529]/5">
                <span className="font-black uppercase text-[11px] tracking-widest opacity-40">Хавф Даражаси:</span>
                <span className={cn(
                  "font-black uppercase tracking-widest text-[13px]",
                  result.riskLevel === 'Low' ? 'text-green-600' :
                  result.riskLevel === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                )}>
                  {result.riskLevel}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none neo-shadow bg-[#f4f9ff] rounded-[32px] overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="flex items-center gap-3 text-lg font-black uppercase">
                {result.blacklistMatch ? <TriangleAlert className="text-red-500" /> : <CircleCheck className="text-green-500" />}
                {result.blacklistMatch ? "Қора рўйхатда мавжуд" : "Тоза статус"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="p-8 rounded-[24px] bg-white shadow-sm border border-[#001529]/5 space-y-4">
                <p className="font-black uppercase text-[10px] tracking-widest text-[#0b4db1]">{dict.labels.recommendation}:</p>
                <p className="text-[14px] leading-relaxed font-medium text-[#001529]/70 italic">"{result.recommendation}"</p>
                {result.blacklistDetails && (
                  <div className="pt-4 mt-4 border-t border-red-50">
                    <p className="text-[11px] text-red-500 font-bold uppercase tracking-tighter">{result.blacklistDetails}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}