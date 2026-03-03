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
    { label: "Jami shartnomalar", value: contracts.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-100/50" },
    { label: "Imzolangan", value: contracts.length, icon: FileCheck, color: "text-emerald-600", bg: "bg-emerald-100/50" },
    { label: "Kutilayotgan", value: 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-100/50" },
    { label: "Tasdiqlangan", value: contracts.length, icon: ShieldCheck, color: "text-violet-600", bg: "bg-violet-100/50" },
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
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
          <Input 
            placeholder="Qidirish..." 
            className="pl-12 rounded-2xl h-14 text-[13px] font-bold border-none bg-[#f4f9ff] shadow-sm focus:ring-2 focus:ring-blue-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[32px] bg-[#f4f9ff] p-8 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className={cn("p-4 rounded-2xl bg-white shadow-sm transition-colors", stat.color)}>
                <stat.icon size={22} />
              </div>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-6">{stat.label}</p>
          </Card>
        ))}
      </div>

      {contracts.length === 0 ? (
        <Card className="border-none shadow-sm rounded-[48px] bg-[#f4f9ff] p-32 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
            <Inbox className="text-slate-200" size={48} />
          </div>
          <h3 className="text-xl font-black text-slate-300 uppercase tracking-[0.2em]">Shartnomalar topilmadi</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase mt-4 max-w-sm leading-relaxed tracking-widest opacity-60">
            Hali hech qanday shartnoma imzolanmagan. "Hafsizlik paneli" orqali yangi hujjat yarating.
          </p>
        </Card>
      ) : (
        <Card className="border-none shadow-sm rounded-[48px] bg-[#f4f9ff] overflow-hidden p-4">
          <Table>
            <TableHeader className="bg-[#001529]/5">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14 px-10">ID / Raqam</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14">Shartnoma Nomi</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14 text-center">Sana</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest h-14 text-center">Holat</TableHead>
                <TableHead className="text-right text-[9px] font-black uppercase tracking-widest h-14 px-10">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.contractId} className="border-[#001529]/5 group hover:bg-white/50 transition-colors">
                  <TableCell className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-tighter">{contract.contractId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                        <FileText size={18} />
                      </div>
                      <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{contract.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[12px] font-bold text-slate-700">{contract.date}</span>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Toshkent</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-emerald-100/50 text-emerald-600 border-none text-[9px] uppercase font-black px-4 py-1 rounded-full">
                      Imzolangan
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-10">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <Button 
                        onClick={() => setSelectedContract(contract)}
                        variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-slate-400 hover:text-[#0b4db1] hover:bg-white shadow-sm transition-all"
                      >
                        <Eye size={20} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-white shadow-sm transition-all">
                        <Download size={20} />
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
        <DialogContent className="sm:max-w-[800px] rounded-[48px] p-0 overflow-hidden border-none max-h-[90vh] flex flex-col shadow-2xl">
          <DialogHeader className="p-10 bg-slate-50 border-b border-slate-100 shrink-0 flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-[13px] font-black uppercase tracking-[0.2em] text-[#0b4db1] flex items-center gap-3">
                <FileCheck size={18} /> Hujjatni ko'zdan kechirish
              </DialogTitle>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-[0.1em]">ID: {selectedContract?.contractId}</p>
            </div>
            <Button variant="outline" className="h-11 rounded-2xl border-slate-200 text-[10px] font-black uppercase tracking-widest gap-2 bg-white shadow-sm">
              <Download size={16} /> PDF Yuklash
            </Button>
          </DialogHeader>
          
          <div className="p-16 overflow-y-auto bg-white flex-1 no-scrollbar">
            {selectedContract && (
              <div className="max-w-3xl mx-auto space-y-10">
                <div className="text-center space-y-3 border-b pb-12 border-[#001529]/5">
                  <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">{selectedContract.title}</h1>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em]">O'zbekiston Respublikasi Qonunchiligi asosida</p>
                </div>

                <div className="flex justify-between text-[12px] font-black uppercase text-slate-500 py-3 border-b border-dashed border-[#001529]/5">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#0b4db1]" />
                    Sana: {selectedContract.date}
                  </div>
                  <div className="tracking-widest">Joy: Toshkent sh.</div>
                </div>

                <div className="text-[14px] leading-relaxed text-slate-700 text-justify whitespace-pre-wrap font-medium space-y-6 font-body">
                  {selectedContract.content}
                </div>
                
                <div className="mt-24 pt-12 border-t border-[#001529]/5 flex justify-between items-end">
                  <div className="space-y-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Tomonlar imzosi:</p>
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-[#001529]/5 shadow-inner">
                        <FileCheck size={28} />
                      </div>
                      <div className="w-40 h-px bg-slate-100" />
                    </div>
                  </div>

                  <div className="border-[6px] border-[#0b4db1] p-3 rounded-[32px] transform rotate-[-8deg] bg-blue-50/30 shadow-2xl shadow-blue-100/50">
                    <div className="border-2 border-[#0b4db1] p-5 flex flex-col items-center rounded-[24px]">
                      <ShieldCheck className="text-[#0b4db1] mb-2" size={32} />
                      <span className="text-[10px] font-black text-[#0b4db1] uppercase tracking-[0.3em]">ERI TASDIQLANGAN</span>
                      <span className="text-[14px] font-black text-[#0b4db1] uppercase mt-1 tracking-tight">I-TIJORAT SYSTEM</span>
                      <span className="text-[8px] text-[#0b4db1] font-bold mt-2 opacity-60">ID: {selectedContract.contractId}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-end gap-4 shrink-0">
            <Button onClick={() => setSelectedContract(null)} className="rounded-[24px] h-16 px-16 font-black uppercase text-[12px] tracking-[0.3em] bg-[#001529] hover:bg-black shadow-2xl shadow-slate-200 text-white transition-all active:scale-95">
              Yopish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}