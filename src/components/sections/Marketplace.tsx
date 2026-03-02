
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  TrendingUp, 
  ShieldCheck, 
  Package, 
  Truck,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { dict } from "@/lib/translations";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: 'all', label: 'Barchasi' },
  { id: 'electronics', label: 'Elektronika' },
  { id: 'construction', label: 'Qurilish' },
  { id: 'industrial', label: 'Sanoat' },
  { id: 'agriculture', label: 'Qishloq xo\'jaligi' },
];

const PRODUCTS = [
  {
    id: 1,
    title: "Sanoat Quyosh Panellari 550W",
    company: "GreenEnergy Solutions",
    category: "industrial",
    price: 1250000,
    unit: "dona",
    moq: "50 dona",
    stock: "850 dona",
    image: "https://picsum.photos/seed/solar/600/400",
    hint: "solar panels"
  },
  {
    id: 2,
    title: "Beton Aralashtirgich - JS750",
    company: "UzStroy Mash",
    category: "construction",
    price: 45000000,
    unit: "komplekt",
    moq: "1 komplekt",
    stock: "12 dona",
    image: "https://picsum.photos/seed/concrete/600/400",
    hint: "construction machinery"
  },
  {
    id: 3,
    title: "Dell PowerEdge R750 Server",
    company: "IT-Support LLC",
    category: "electronics",
    price: 82000000,
    unit: "dona",
    moq: "1 dona",
    stock: "5 dona",
    image: "https://picsum.photos/seed/server/600/400",
    hint: "server rack"
  },
  {
    id: 4,
    title: "G'alla kombayni - Case IH",
    company: "AgroTeh Servis",
    category: "agriculture",
    price: 1200000000,
    unit: "dona",
    moq: "1 dona",
    stock: "3 dona",
    image: "https://picsum.photos/seed/tractor/600/400",
    hint: "agricultural tractor"
  },
  {
    id: 5,
    title: "Chelik Armatura A500C",
    company: "Metal-Prom-Uz",
    category: "construction",
    price: 8900000,
    unit: "tonna",
    moq: "10 tonna",
    stock: "500 tonna",
    image: "https://picsum.photos/seed/steel/600/400",
    hint: "steel rebars"
  },
  {
    id: 6,
    title: "Sanoat Konditsioneri 100kW",
    company: "Artel Industrial",
    category: "industrial",
    price: 32000000,
    unit: "dona",
    moq: "2 dona",
    stock: "25 dona",
    image: "https://picsum.photos/seed/hvac/600/400",
    hint: "industrial air conditioner"
  }
];

export function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = PRODUCTS.filter(p => 
    (activeCategory === 'all' || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  return (
    <div className="space-y-8 animate-fade-in text-slate-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">B2B МАРКЕТПЛЕЙС</h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-600" /> 
            Ishonchli yetkazib beruvchilar va ulgurji narxlar
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 px-4 border-r border-slate-100">
            <TrendingUp size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">+12% Bozor o'sishi</span>
          </div>
          <div className="flex items-center gap-2 px-4">
            <Package size={16} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">12,400+ Mahsulotlar</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <Input 
              placeholder="Mahsulot nomi yoki kompaniya bo'yicha qidirish..." 
              className="h-14 pl-12 rounded-2xl border-none bg-white shadow-sm text-sm font-bold placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-blue-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="lg:col-span-4 flex gap-3">
          <Button variant="outline" className="h-14 flex-1 rounded-2xl bg-white border-none shadow-sm font-black uppercase tracking-widest text-[10px] gap-2">
            <Filter size={16} /> Filtrlar
          </Button>
          <Button className="h-14 w-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
            <ShoppingBag size={20} />
          </Button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300",
              activeCategory === cat.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[32px] bg-white overflow-hidden group">
            <div className="relative h-56 w-full overflow-hidden">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                data-ai-hint={product.hint}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-blue-600 border-none text-[9px] font-black uppercase px-3 py-1">
                  {product.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-900 shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
                  <TrendingUp size={18} />
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="mb-4">
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.company}</p>
                <h3 className="text-[14px] font-black text-slate-900 tracking-tight leading-tight line-clamp-2">{product.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">MOQ</p>
                  <p className="text-[11px] font-black text-slate-700 uppercase">{product.moq}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Omborda</p>
                  <p className="text-[11px] font-black text-emerald-700 uppercase">{product.stock}</p>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Narxi (1 {product.unit})</p>
                  <p className="text-xl font-black text-slate-900 tracking-tighter">
                    {formatCurrency(product.price)} <span className="text-[10px] text-slate-400">so'm</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                  <Truck size={14} /> 24-48s
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] gap-2 transition-all duration-300">
                Buyurtma Berish <ArrowRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="text-slate-300" size={40} />
          </div>
          <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">Mahsulot topilmadi</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">Qidiruv so'rovini o'zgartirib ko'ring yoki boshqa toifani tanlang.</p>
        </div>
      )}
    </div>
  );
}
