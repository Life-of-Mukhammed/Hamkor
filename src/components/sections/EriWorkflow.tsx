"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CircleCheck, CircleX, Eye, ShieldCheck, Download } from "lucide-react";
import { dict } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";

export function EriWorkflow() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleApprove = () => {
    toast({ title: "ЭРИ тасдиқланди", description: "Шартнома тизимга муваффақиятли юкланди" });
    setStep(2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{dict.sections.eri}</h1>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-3 glass border-none neo-shadow h-[800px] flex flex-col">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText size={16} /> Шартнома №U-2026/03-01.pdf
              </CardTitle>
              <Button variant="outline" size="sm"><Download size={14} className="mr-2" /> PDF Юклаш</Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[#525659] p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto bg-white shadow-2xl p-12 aspect-[1/1.41] space-y-6">
                <h1 className="text-2xl font-black text-center mb-12">МАҲСУЛОТ ЕТКАЗИБ БЕРИШ ШАРТНОМАСИ</h1>
                <div className="flex justify-between text-xs font-bold border-b pb-4">
                  <span>Тошкент ш.</span>
                  <span>1 март 2026 йил</span>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-justify">
                  <p><strong>1. ШАРТНОМА ПРЕДМЕТИ:</strong> Етказиб берувчи шартномада кўрсатилган товарларни ўз вақтида етказиб бериш мажбуриятини олади...</p>
                  <p><strong>2. ТЎЛОВ ШАРТЛАРИ:</strong> Харидор товар қийматининг 50% миқдорида олдиндан тўловни амалга оширади...</p>
                  <p className="h-48 bg-muted/10 border-2 border-dashed flex items-center justify-center text-muted-foreground">
                    [ ШАРТНОМА МАТНИНИНГ ДАВОМИ ]
                  </p>
                </div>
                {step === 2 && (
                  <div className="mt-12 flex justify-end">
                    <div className="border-4 border-green-600 p-2 rounded transform rotate-[-15deg]">
                      <div className="border-2 border-green-600 p-1 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-green-600">ЭРИ БИЛАН ТАСДИҚЛАНГАН</span>
                        <span className="text-sm font-black text-green-600 uppercase">SOLIQ.UZ / ID: 99827</span>
                        <span className="text-[8px] text-green-600">2026-03-01 10:45:12</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-none neo-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Тасдиқлаш босқичлари</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Юрист кўриги", status: "completed", date: "09:15" },
                { title: "Бухгалтерия тасдиғи", status: step >= 2 ? "completed" : "pending", date: "10:30" },
                { title: "Раҳбарият имзоси", status: "pending", date: "--:--" },
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {s.status === 'completed' ? (
                      <CircleCheck className="text-green-500" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-muted" />
                    )}
                    {i !== 2 && <div className="w-0.5 h-12 bg-muted my-1" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${s.status === 'pending' ? 'text-muted-foreground' : ''}`}>{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass border-none neo-shadow bg-primary/5 border border-primary/20">
            <CardHeader>
              <CardTitle className="text-md">ЭРИ Калити (ESI Key)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-xl border border-dashed text-center">
                <p className="text-xs text-muted-foreground mb-4">Калитни танланг (.pfx / .jks)</p>
                <Button variant="outline" className="w-full">Файлни юклаш</Button>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 h-12" disabled={step === 2} onClick={handleApprove}>
                  {dict.labels.approve}
                </Button>
                <Button variant="destructive" className="flex-1 h-12" disabled={step === 2}>
                  {dict.labels.reject}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
