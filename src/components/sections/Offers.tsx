
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase, Download, Eye, Plus, Filter } from "lucide-react";

const MOCK_OFFERS = [
  { id: "CP-8821", title: "Қурилиш материаллари етказиб бериш", company: "Premium Build LLC", date: "22.05.2026", status: "Кўриб чиқилмоқда", amount: "450 000 000" },
  { id: "CP-8822", title: "IT инфратузилма хизмати", company: "SoftTech Solution", date: "21.05.2026", status: "Тасдиқланди", amount: "125 000 000" },
  { id: "CP-8823", title: "Логистика ва транспорт хизмати", company: "UzTrans Cargo", date: "20.05.2026", status: "Рад этилди", amount: "89 000 000" },
  { id: "CP-8824", title: "Қуёш панеллари ўрнатиш", company: "EcoEnergy Services", date: "19.05.2026", status: "Янги", amount: "1 200 000 000" },
];

export function Offers() {
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (val: string) => 
    new Intl.NumberFormat('uz-UZ').format(Number(val.replace(/\s/g, '')));

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white shadow-lg">
            <Briefcase size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Тижорат таклифлари</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ҳамкорлардан келиб тушган тижорат лойиҳалари</p>
          </div>
        </div>
        <Button className="bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl h-11 px-6 text-[11px] font-black uppercase tracking-widest gap-2">
          <Plus size={16} /> Янги таклиф
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Қидириш..." 
              className="pl-10 rounded-xl h-11 text-[11px] font-bold border-slate-100 bg-slate-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-[10px] font-black uppercase tracking-widest gap-2">
              <Filter size={14} /> Филтр
            </Button>
            <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-[10px] font-black uppercase tracking-widest gap-2">
              <Download size={14} /> Экспорт
            </Button>
          </div>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-50">
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12 px-8">ID / Сана</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Лойиҳа номи</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Ҳамкор</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Сумма (сўм)</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Ҳолат</TableHead>
                <TableHead className="text-right text-[9px] font-black uppercase tracking-widest h-12 px-8">Амаллар</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_OFFERS.map((offer) => (
                <TableRow key={offer.id} className="border-slate-50 group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="px-8 py-6">
                    <p className="text-[11px] font-black text-slate-400">{offer.id}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase mt-1">{offer.date}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[12px] font-black text-slate-700 uppercase tracking-tight">{offer.title}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[11px] font-bold text-slate-500">{offer.company}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[13px] font-black text-[#2563eb] tracking-tighter">{formatCurrency(offer.amount)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "border-none text-[8px] uppercase font-black px-2.5 py-1 rounded-full",
                      offer.status === 'Тасдиқланди' ? "bg-emerald-50 text-emerald-600" :
                      offer.status === 'Рад этилди' ? "bg-red-50 text-red-600" :
                      offer.status === 'Янги' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {offer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100 text-slate-400">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100 text-slate-400">
                        <Download size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
