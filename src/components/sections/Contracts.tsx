
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Search, Inbox, FileCheck, Calendar, ShieldCheck, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ContractsProps {
  contracts: ContractGenerationOutput[];
}

export function Contracts({ contracts }: ContractsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContract, setSelectedContract] = useState<ContractGenerationOutput | null>(null);

  const filteredContracts = contracts.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contractId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Jami shartnomalar", value: contracts.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Imzolangan", value: contracts.length, icon: FileCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Kutilayotgan", value: 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Tasdiqlangan", value: contracts.length, icon: ShieldCheck, color: "text-violet-600", bg: "bg-violet-50" },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0b4db1] rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-blue-100">
            <FileCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Shartnomalar Paneli</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Hujjatlar aylanmasi va yuridik nazorat</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <Input 
            placeholder="Shartnoma raqami yoki nomi..." 
            className="pl-12 rounded-2xl h-12 text-[12px] font-bold border-slate-100 bg-white shadow-sm focus:ring-2 focus:ring-blue-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[24px] bg-white p-6 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className={cn("p-3 rounded-xl transition-colors", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">{stat.label}</p>
          </Card>
        ))}
      </div>

      {contracts.length === 0 ? (
        <Card className="border-none shadow-sm rounded-[40px] bg-white p-24 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
            <Inbox className="text-slate-200" size={48} />
          </div>
          <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Shartnomalar topilmadi</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase mt-3 max-w-sm leading-relaxed">
            Hali hech qanday shartnoma imzolanmagan. "Xaridor paneli" orqali yangi hujjat yarating.
          </p>
        </Card>
      ) : (
        <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden p-4">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-50">
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12 px-6">ID / Raqam</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12">Shartnoma Nomi</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12 text-center">Sana</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-12 text-center">Holat</TableHead>
                <TableHead className="text-right text-[9px] font-black uppercase tracking-widest h-12 px-6">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.contractId} className="border-slate-50 group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="px-6 py-6 text-[11px] font-black text-slate-400">{contract.contractId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <FileText size={14} />
                      </div>
                      <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">{contract.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-bold text-slate-700">{contract.date}</span>
                      <span className="text-[8px] font-black text-slate-300 uppercase">Toshkent</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] uppercase font-black px-3 py-1 rounded-full">
                      Imzolangan
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        onClick={() => setSelectedContract(contract)}
                        variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-[#0b4db1] hover:bg-blue-50 transition-all"
                      >
                        <Eye size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                        <Download size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Contract Viewer Dialog */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="sm:max-w-[800px] rounded-[40px] p-0 overflow-hidden border-none max-h-[90vh] flex flex-col shadow-2xl">
          <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100 shrink-0 flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-[12px] font-black uppercase tracking-[0.2em] text-[#0b4db1] flex items-center gap-2">
                <FileCheck size={16} /> Hujjatni ko'zdan kechirish
              </DialogTitle>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">ID: {selectedContract?.contractId}</p>
            </div>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest gap-2 bg-white">
              <Download size={14} /> PDF Yuklash
            </Button>
          </DialogHeader>
          
          <div className="p-12 overflow-y-auto bg-white flex-1 no-scrollbar">
            {selectedContract && (
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-2 border-b pb-10">
                  <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedContract.title}</h1>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">O'zbekiston Respublikasi Qonunchiligi asosida</p>
                </div>

                <div className="flex justify-between text-[11px] font-black uppercase text-slate-500 py-2 border-b border-dashed border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#0b4db1]" />
                    Sana: {selectedContract.date}
                  </div>
                  <div>Joy: Toshkent sh.</div>
                </div>

                <div className="text-[13px] leading-relaxed text-slate-700 text-justify whitespace-pre-wrap font-medium space-y-4 font-body">
                  {selectedContract.content}
                </div>
                
                <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-end">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tomonlar imzosi:</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <FileCheck size={20} />
                      </div>
                      <div className="w-32 h-px bg-slate-200" />
                    </div>
                  </div>

                  <div className="border-[4px] border-[#0b4db1] p-2 rounded-2xl transform rotate-[-8deg] bg-blue-50/30 shadow-xl shadow-blue-100/50">
                    <div className="border border-[#0b4db1] p-3 flex flex-col items-center">
                      <ShieldCheck className="text-[#0b4db1] mb-1" size={24} />
                      <span className="text-[8px] font-black text-[#0b4db1] uppercase tracking-[0.2em]">ERI TASDIQLANGAN</span>
                      <span className="text-[11px] font-black text-[#0b4db1] uppercase mt-0.5 tracking-tighter">I-TIJORAT SYSTEM</span>
                      <span className="text-[6px] text-[#0b4db1] font-bold mt-1 opacity-60">ID: {selectedContract.contractId}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
            <Button onClick={() => setSelectedContract(null)} className="rounded-2xl h-14 px-12 font-black uppercase text-[11px] tracking-[0.2em] bg-slate-900 shadow-xl shadow-slate-200">
              Yopish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
