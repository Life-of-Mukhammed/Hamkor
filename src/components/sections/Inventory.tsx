"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box, ArrowUpRight, ArrowDownRight, Package, AlertTriangle, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MOCK_INVENTORY = [
  { id: "SKU-001", name: "Beton Aralashtirgich JS750", category: "Texnika", stock: 12, min: 5, price: 45000000, status: "Normal" },
  { id: "SKU-002", name: "Sanoat Quyosh Panellari 550W", category: "Sanoat", stock: 850, min: 100, price: 1250000, status: "Kop" },
  { id: "SKU-003", name: "Metall profil 40x40", category: "Qurilish", stock: 3, min: 10, price: 95000, status: "Kam" },
  { id: "SKU-004", name: "Dell PowerEdge Server R750", category: "IT", stock: 5, min: 2, price: 82000000, status: "Normal" },
];

export function Inventory() {
  return (
    <div className="space-y-8 animate-fade-in text-slate-700">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#001529] rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-blue-100">
            <Box size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Инвентар бошқаруви</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Омбор қолдиқлари ва захираларни назорат қилиш</p>
          </div>
        </div>
        <Button className="bg-[#001529] hover:bg-slate-800 text-white rounded-2xl h-14 px-10 text-[11px] font-black uppercase tracking-widest gap-2 shadow-xl shadow-slate-200">
          <Plus size={18} /> Янги маҳсулот
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-sm rounded-[32px] bg-[#f4f9ff] p-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
              <Package size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Жами маҳсулот</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">12,408</p>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-[32px] bg-[#f4f9ff] p-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
              <AlertTriangle size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Кам қолган захира</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">42 та</p>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-[32px] bg-[#f4f9ff] p-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <ArrowUpRight size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ойlik айланма</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">+12.4%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-[48px] bg-[#f4f9ff] overflow-hidden p-4">
        <div className="p-10 border-b border-[#001529]/5">
          <div className="relative max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <Input 
              placeholder="Маҳсулот номи ёки SKU бўйича..." 
              className="pl-12 rounded-2xl h-14 text-[13px] font-bold border-none bg-white shadow-sm"
            />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-[#001529]/5">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-14 px-10">SKU</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Номи</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Тоифа</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Қолдиқ</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Ҳолат</TableHead>
              <TableHead className="text-right text-[9px] font-black uppercase tracking-widest h-14 px-10">Амал</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_INVENTORY.map((item) => (
              <TableRow key={item.id} className="border-[#001529]/5 group hover:bg-white/50 transition-colors">
                <TableCell className="px-10 py-8 text-[11px] font-black text-slate-400">{item.id}</TableCell>
                <TableCell className="text-[13px] font-black text-slate-700 uppercase tracking-tight">{item.name}</TableCell>
                <TableCell className="text-[11px] font-bold text-slate-500 uppercase">{item.category}</TableCell>
                <TableCell className="text-[15px] font-black text-slate-900 tracking-tighter">{item.stock}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "border-none text-[8px] uppercase font-black px-3 py-1 rounded-full",
                    item.status === 'Kam' ? "bg-red-100/50 text-red-600" : 
                    item.status === 'Kop' ? "bg-emerald-100/50 text-emerald-600" : "bg-blue-100/50 text-blue-600"
                  )}>
                    {item.status === 'Kam' ? 'Кам' : item.status === 'Kop' ? 'Етарли' : 'Ўртача'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-10">
                  <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest h-10 rounded-xl hover:bg-white">Таҳрир</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}