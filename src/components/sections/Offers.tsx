"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase, Download, Eye, Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="space-y-8 animate-fade-in text-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2563eb] rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-blue-100">
            <Briefcase size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Тижорат takliflari</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Ҳамкорлардан келиб тушган тижорат лойиҳалари</p>
          </div>
        </div>
        <Button className="bg-[#2563eb] hover:bg-blue-700 text-white rounded-2xl h-14 px-10 text-[11px] font-black uppercase tracking-widest gap-2 shadow-xl shadow-blue-100">
          <Plus size={18} /> Янги таклиф
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-[48px] bg-[#f4f9ff] overflow-hidden p-4">
        <div className="p-10 border-b border-[#001529]/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <Input 
              placeholder="Қидириш..." 
              className="pl-12 rounded-2xl h-14 text-[13px] font-bold border-none bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl h-12 border-[#001529]/5 bg-white text-[10px] font-black uppercase tracking-widest gap-2 shadow-sm">
              <Filter size={16} /> Филтр
            </Button>
            <Button variant="outline" className="rounded-xl h-12 border-[#001529]/5 bg-white text-[10px] font-black uppercase tracking-widest gap-2 shadow-sm">
              <Download size={16} /> Экспорт
            </Button>
          </div>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader className="bg-[#001529]/5">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14 px-10">ID / Сана</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Лойиҳа номи</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Ҳамкор</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Сумма (сўм)</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Ҳолат</TableHead>
                <TableHead className="text-right text-[9px] font-black uppercase tracking-widest h-14 px-10">Амаллар</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_OFFERS.map((offer) => (
                <TableRow key={offer.id} className="border-[#001529]/5 group hover:bg-white/50 transition-colors">
                  <TableCell className="px-10 py-8">
                    <p className="text-[11px] font-black text-slate-400 uppercase">{offer.id}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase mt-1 tracking-tighter">{offer.date}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[13px] font-black text-slate-700 uppercase tracking-tight">{offer.title}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{offer.company}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[15px] font-black text-[#2563eb] tracking-tighter">{formatCurrency(offer.amount)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "border-none text-[8px] uppercase font-black px-3 py-1 rounded-full",
                      offer.status === 'Тасдиқланди' ? "bg-emerald-100/50 text-emerald-600" :
                      offer.status === 'Рад этилди' ? "bg-red-100/50 text-red-600" :
                      offer.status === 'Янги' ? "bg-blue-100/50 text-blue-600" : "bg-amber-100/50 text-amber-600"
                    )}>
                      {offer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-10">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white text-slate-400">
                        <Eye size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white text-slate-400">
                        <Download size={18} />
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