
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box, ArrowUpRight, ArrowDownRight, Package, AlertTriangle, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const MOCK_INVENTORY = [
  { id: "SKU-001", name: "Beton Aralashtirgich JS750", category: "Texnika", stock: 12, min: 5, price: 45000000, status: "Normal" },
  { id: "SKU-002", name: "Sanoat Quyosh Panellari 550W", category: "Sanoat", stock: 850, min: 100, price: 1250000, status: "Kop" },
  { id: "SKU-003", name: "Metall profil 40x40", category: "Qurilish", stock: 3, min: 10, price: 95000, status: "Kam" },
  { id: "SKU-004", name: "Dell PowerEdge Server R750", category: "IT", stock: 5, min: 2, price: 82000000, status: "Normal" },
];

export function Inventory() {
  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Box size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Инвентар бошқаруви</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Омбор қолдиқлари ва захираларни назорат қилиш</p>
          </div>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 px-6 text-[11px] font-black uppercase tracking-widest gap-2 shadow-lg">
          <Plus size={16} /> Янги маҳсулот
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Package size={24} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Жами маҳсулот</p>
              <p className="text-2xl font-black text-slate-900">12,408</p>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Кам қолган захира</p>
              <p className="text-2xl font-black text-slate-900">42 та</p>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-[24px] bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ArrowUpRight size={24} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ойлик айланма</p>
              <p className="text-2xl font-black text-slate-900">+12.4%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Маҳсулот номи ёки SKU бўйича..." 
              className="pl-10 rounded-xl h-11 text-[11px] font-bold border-slate-100 bg-slate-50/50"
            />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-50">
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-12 px-8">SKU</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Номи</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Тоифа</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Қолдиқ</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Минимал</TableHead>
              <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Ҳолат</TableHead>
              <TableHead className="text-right text-[9px] font-black uppercase tracking-widest h-12 px-8">Амал</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_INVENTORY.map((item) => (
              <TableRow key={item.id} className="border-slate-50">
                <TableCell className="px-8 py-5 text-[11px] font-black text-slate-400">{item.id}</TableCell>
                <TableCell className="text-[12px] font-black text-slate-700 uppercase">{item.name}</TableCell>
                <TableCell className="text-[11px] font-bold text-slate-500">{item.category}</TableCell>
                <TableCell className="text-[13px] font-black text-slate-900">{item.stock}</TableCell>
                <TableCell className="text-[11px] font-bold text-slate-400">{item.min}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "border-none text-[8px] uppercase font-black px-2 py-0.5 rounded-full",
                    item.status === 'Kam' ? "bg-red-50 text-red-600" : 
                    item.status === 'Kop' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                  )}>
                    {item.status === 'Kam' ? 'Кам' : item.status === 'Kop' ? 'Етарли' : 'Ўртача'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-8">
                  <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest h-8 rounded-lg">Таҳрир</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
