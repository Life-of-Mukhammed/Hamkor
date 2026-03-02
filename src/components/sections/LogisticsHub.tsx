
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck, Navigation, MapPin, Clock, ShieldCheck, Zap } from "lucide-react";
import { dict } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";

export function LogisticsHub() {
  const [trucks, setTrucks] = useState([
    { id: 1, name: "Toshkent - Samarqand (UZ-01-A123)", status: "Harakatda", eta: "45 min", load: "85%", temp: "+4°C" },
    { id: 2, name: "Andijon - Namangan (UZ-05-B456)", status: "Harakatda", eta: "1 soat 12 min", load: "100%", temp: "Normal" },
    { id: 3, name: "Buxoro - Xiva (UZ-80-C789)", status: "To'xtagan", eta: "2 soat 30 min", load: "40%", temp: "Normal" },
  ]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0b4db1] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Navigation size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{dict.sections.logistics}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real vaqt rejimida GPS monitoring va marshrutlar nazorati</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <ShieldCheck size={14} />
            Barcha datchiklar faol
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Google Map Section */}
        <Card className="lg:col-span-8 h-[650px] border-none shadow-sm rounded-[40px] bg-white overflow-hidden relative group">
          <div className="absolute inset-0 z-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191884.83987122425!2d69.1392823!3d41.2825125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0x4093a4846db66045!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.2] contrast-[1.1] opacity-90 transition-all duration-700 group-hover:grayscale-0"
            ></iframe>
          </div>
          
          {/* Map Overlay Controls */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-xl max-w-[200px]">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Platforma Holati</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black text-slate-900 uppercase">Tizim Onlayn</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-10">
            <div className="bg-[#0b4db1] text-white p-6 rounded-[32px] shadow-2xl shadow-blue-900/20 max-w-[240px]">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-blue-300" />
                <p className="text-[10px] font-black uppercase tracking-widest">Tezkor Ma'lumot</p>
              </div>
              <p className="text-[12px] font-bold leading-relaxed opacity-90 uppercase tracking-tighter">
                Bugun jami 1,240 tonna yuk muvaffaqiyatli yetkazildi.
              </p>
            </div>
          </div>
        </Card>

        {/* Sidebar Info Section */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm rounded-[40px] bg-white p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Faol Reyslar</h3>
              <Badge className="bg-blue-50 text-blue-600 border-none text-[8px] font-black uppercase px-2 py-0.5">
                {trucks.length} TA
              </Badge>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-2">
              {trucks.map((t) => (
                <div 
                  key={t.id} 
                  className="p-5 rounded-[24px] border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-black text-slate-900 uppercase group-hover:text-blue-600 transition-colors">
                        {t.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        {t.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-300" />
                      <div className="space-y-0.5">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ETA</p>
                        <p className="text-[10px] font-black text-slate-700">{t.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-300" />
                      <div className="space-y-0.5">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">YUKLANISH</p>
                        <p className="text-[10px] font-black text-slate-700">{t.load}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50">
              <div className="p-6 bg-slate-900 rounded-[32px] text-white">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Jami Masofa (Bugun)</p>
                <p className="text-2xl font-black tracking-tighter">12,450 <span className="text-[10px] text-white/50">KM</span></p>
                <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
