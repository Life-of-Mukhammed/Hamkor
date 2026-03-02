
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Search, Inbox } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContractGenerationOutput } from "@/ai/flows/contract-generation-flow";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Шартномалар</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Барча имзоланган ва тасдиқланган ҳужжатлар</p>
          </div>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input 
            placeholder="Қидириш..." 
            className="pl-10 rounded-xl h-11 text-[11px] font-bold border-slate-100 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {contracts.length === 0 ? (
        <Card className="border-none shadow-sm rounded-[32px] bg-white p-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <Inbox className="text-slate-200" size={40} />
          </div>
          <h3 className="text-lg font-black text-slate-300 uppercase tracking-widest">Шартномалар мавжуд эмас</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">
            "Харидор панели" орқали янги шартнома имзоланг ва у шу ерда пайдо бўлади.
          </p>
        </Card>
      ) : (
        <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden p-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-50">
                <TableHead className="text-[9px] font-black uppercase tracking-widest">ID / Рақам</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Шартнома номи</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Сана</TableHead>
                <TableHead className="text-[9px] font-black uppercase tracking-widest">Ҳолат</TableHead>
                <TableHead className="text-right text-[9px] font-black uppercase tracking-widest">Амаллар</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.contractId} className="border-slate-50 group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="text-[11px] font-black text-slate-400">{contract.contractId}</TableCell>
                  <TableCell className="text-[11px] font-black text-slate-700">{contract.title}</TableCell>
                  <TableCell className="text-[11px] font-bold text-slate-500">{contract.date}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] uppercase font-black px-2 py-0.5">
                      Имзоланган
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        onClick={() => setSelectedContract(contract)}
                        variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50">
                        <Download size={16} />
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
        <DialogContent className="sm:max-w-[700px] rounded-[32px] p-0 overflow-hidden border-none max-h-[90vh] flex flex-col">
          <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100 shrink-0">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-[12px] font-black uppercase tracking-widest">
                {selectedContract?.title}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="p-10 overflow-y-auto bg-white flex-1 relative">
            {selectedContract && (
              <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-xl font-black text-center mb-10 uppercase tracking-tight border-b pb-8">{selectedContract.title}</h1>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-8">
                  <span>Тошкент ш.</span>
                  <span>{selectedContract.date}</span>
                </div>
                <div className="text-[13px] leading-relaxed text-slate-600 text-justify whitespace-pre-wrap font-medium">
                  {selectedContract.content}
                </div>
                
                <div className="mt-16 flex justify-end">
                  <div className="border-[3px] border-emerald-600 p-1.5 rounded-lg transform rotate-[-8deg] bg-emerald-50/30">
                    <div className="border border-emerald-600 p-2 flex flex-col items-center">
                      <span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest">ЭРИ БИЛАН ТАСДИҚЛАНГАН</span>
                      <span className="text-[10px] font-black text-emerald-600 uppercase mt-0.5">SOLIQ.UZ / ID: {selectedContract.contractId}</span>
                      <span className="text-[6px] text-emerald-600 font-bold mt-0.5">{selectedContract.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
            <Button onClick={() => setSelectedContract(null)} className="rounded-xl h-11 px-8 font-black uppercase text-[10px] tracking-widest bg-slate-900">Ёпиш</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
