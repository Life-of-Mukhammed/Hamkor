"use client";

import { useState } from "react";
import { assessAiRiskScore, AiRiskScoreAssessmentOutput } from "@/ai/flows/ai-risk-score-assessment-flow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Search, TriangleAlert, CircleCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { dict } from "@/lib/translations";

export function AiSecurity() {
  const [inn, setInn] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiRiskScoreAssessmentOutput | null>(null);
  const { toast } = useToast();

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

      <Card className="glass border-none neo-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Корхона хавфсизлигини текшириш (СТИР орқали)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={dict.labels.inn}
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button onClick={handleCheck} disabled={loading} className="h-12 px-8">
              {loading ? "Текширилмоқда..." : dict.labels.check}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          <Card className="glass border-none neo-shadow overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                {dict.labels.riskScore}: {result.riskScore}%
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Progress value={result.riskScore} className="h-4 mb-4" />
              <div className="flex justify-between items-center p-4 rounded-lg bg-background border">
                <span className="font-semibold">Даража:</span>
                <span className={
                  result.riskLevel === 'Low' ? 'text-green-600' :
                  result.riskLevel === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }>
                  {result.riskLevel}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-none neo-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.blacklistMatch ? <TriangleAlert className="text-red-500" /> : <CircleCheck className="text-green-500" />}
                {result.blacklistMatch ? "Қора рўйхатда мавжуд" : "Тоза статус"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 text-sm">
                <p className="font-bold mb-2">{dict.labels.recommendation}:</p>
                <p className="italic opacity-80">{result.recommendation}</p>
                {result.blacklistDetails && (
                  <p className="mt-4 text-xs text-red-500 font-mono">{result.blacklistDetails}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
