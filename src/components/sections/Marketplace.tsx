
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Sparkles, 
  Star,
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { id: 'all', label: 'Barchasi' },
  { id: 'construction', label: 'Qurilish materiallari' },
  { id: 'metal', label: 'Metall va prokat' },
  { id: 'electronics', label: 'Elektronika' },
  { id: 'agriculture', label: 'Qishloq xo\'jaligi' },
  { id: 'machinery', label: 'Maxsus texnika' },
];

const PRODUCTS = [
  {
    id: 1,
    title: "Portland Sement M500",
    company: "Bekabod Sement",
    category: "Qurilish materiallari",
    categoryKey: "construction",
    price: 45000,
    unit: "qop",
    stock: 2000,
    rating: 4.8,
    displayText: "SEMENT"
  },
  {
    id: 2,
    title: "AMD Ryzen 9 Server",
    company: "Tech Systems",
    category: "Elektronika",
    categoryKey: "electronics",
    price: 12500000,
    unit: "dona",
    stock: 15,
    rating: 4.9,
    displayText: "SERVER"
  },
  {
    id: 3,
    title: "Aluminiy Profil 6m",
    company: "Akfa Impex",
    category: "Metall va prokat",
    categoryKey: "metal",
    price: 85000,
    unit: "dona",
    stock: 500,
    rating: 4.5,
    displayText: "PROFIL"
  },
  {
    id: 4,
    title: "Traktor MTZ-82",
    company: "Agrotex",
    category: "Maxsus texnika",
    categoryKey: "machinery",
    price: 145000000,
    unit: "dona",
    stock: 2,
    rating: 4.7,
    displayText: "TRAKTOR"
  },
  {
    id: 5,
    title: "Oq qum (Tozalangan)",
    company: "TashQum QazibOlish",
    category: "Qurilish materiallari",
    categoryKey: "construction",
    price: 60000,
    unit: "tonna",
    stock: 50,
    rating: 4.2,
    displayText: "QUM"
  },
  {
    id: 6,
    title: "Armatura 16mm A500C",
    company: "Metall Invest",
    category: "Metall va prokat",
    categoryKey: "metal",
    price: 8900000,
    unit: "tonna",
    stock: 120,
    rating: 4.6,
    displayText: "ARMATURA"
  }
];

interface MarketplaceProps {
  onAddToCart?: (product: typeof PRODUCTS[0]) => void;
}

export function Marketplace({ onAddToCart }: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredProducts = PRODUCTS.filter(p => 
    (activeCategory === 'all' || p.categoryKey === activeCategory) &&
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('uz-UZ').format(val);

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    onAddToCart?.(product);
    toast({
      title: "Savatga qo'shildi",
      description: `${product.title} muvaffaqiyatli savatga qo'shildi.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-700 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">B2B Marketplace</h1>
      </div>

      <div className="bg-[#f0f4ff] border border-blue-100 rounded-xl p-4 flex items-start gap-4 shadow-sm">
        <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">AI Tavsiyalari</h4>
          <p className="text-[12px] text-slate-500 font-medium">
            Siz o'tgan safar armatura xarid qildingiz, ehtimol sizga sement va beton kerak bo'lishi mumkin. Quyidagi ro'yxat siz uchun moslashtirilgan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={16} className="text-slate-400" />
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Filtrlar</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Kategoriyalar</h4>
                <div className="space-y-3">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={cat.id} 
                        checked={activeCategory === cat.id}
                        onCheckedChange={() => setActiveCategory(cat.id)}
                        className="rounded border-slate-200"
                      />
                      <label 
                        htmlFor={cat.id} 
                        className="text-[12px] font-bold text-slate-600 cursor-pointer select-none"
                      >
                        {cat.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Narx oralig'i (UZS)</h4>
                <div className="flex items-center gap-2">
                  <Input placeholder="Dan" className="h-10 text-[12px] font-bold rounded-xl border-slate-100 bg-slate-50" />
                  <Input placeholder="Gacha" className="h-10 text-[12px] font-bold rounded-xl border-slate-100 bg-slate-50" />
                </div>
              </div>

              <Button className="w-full bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-11 font-black uppercase tracking-widest text-[11px] mt-4">
                Filtrni qo'llash
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
              <Input 
                placeholder="Mahsulot nomi, brend yoki sotuvchi bo'yicha qidiruv" 
                className="h-12 pl-12 rounded-xl border-slate-100 bg-white shadow-sm text-[13px] font-bold placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-blue-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="mashhur">
              <SelectTrigger className="w-[200px] h-12 rounded-xl border-slate-100 bg-white shadow-sm text-[12px] font-black uppercase tracking-widest px-4">
                <SelectValue placeholder="Mashhur" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="mashhur">Mashhur</SelectItem>
                <SelectItem value="arzon">Arzonlari oldin</SelectItem>
                <SelectItem value="qimmat">Qimmatlari oldin</SelectItem>
                <SelectItem value="yangi">Yangi qo'shilganlar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl bg-white overflow-hidden group">
                <div className="relative h-48 w-full bg-[#e9ecf2] flex items-center justify-center p-6">
                  <span className="text-5xl font-black text-slate-400/30 uppercase tracking-tighter select-none">
                    {product.displayText}
                  </span>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{product.category}</p>
                    <div className="flex items-center gap-1 text-amber-400 font-black text-[11px]">
                      <Star size={12} fill="currentColor" /> {product.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-[14px] font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-[#0b4db1] transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  
                  <p className="text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-tighter">
                    {product.company} • {product.stock} mavjud
                  </p>

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-xl font-black text-[#0b4db1] tracking-tighter">
                        {formatCurrency(product.price)} <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest ml-1">/ {product.unit}</span>
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-11 font-black uppercase tracking-widest text-[11px] gap-2 mt-6 shadow-md shadow-blue-100"
                  >
                    <ShoppingCart size={16} /> Savatga qo'shish
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="text-slate-200" size={40} />
              </div>
              <h3 className="text-lg font-black text-slate-300 uppercase tracking-widest">Mahsulot topilmadi</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
