
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
  ShoppingCart,
  ShieldCheck,
  ShoppingBasket,
  MapPin,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
    displayText: "Sement",
    description: "Ushbu mahsulot yuqori sifatli xom ashyodan tayyorlangan bo'lib, xalqaro standartlarga to'liq javob beradi. Barcha kerakli sertifikatlar mavjud. Buyurtma hajmi katta bo'lsa qo'shimcha chegirmalar taqdim etiladi.",
    location: "Toshkent sh.",
    delivery: "Kelishuv asosida"
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
    displayText: "Server",
    description: "Yuqori unumdorlikka ega server tizimi. Barcha zamonaviy talablarga javob beradi. 3 yillik rasmiy kafolat va texnik xizmat ko'rsatish mavjud.",
    location: "Toshkent sh.",
    delivery: "Bepul"
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
    displayText: "Profil",
    description: "Akfa korxonasidan yuqori sifatli aluminiy profillar. Turli xil o'lcham va ranglarda mavjud. Qurilish va ta'mirlash uchun ideal tanlov.",
    location: "Samarqand sh.",
    delivery: "Hudud bo'ylab bepul"
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
    displayText: "Traktor",
    description: "Universal-haydovchi traktori. Qishloq xo'jaligi ishlarida yuqori samaradorlikni ta'minlaydi. Ehtiyot qismlar va servis xizmati kafolatlangan.",
    location: "Namangan vil.",
    delivery: "Kelishuv asosida"
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
    displayText: "Qum",
    description: "Tozalangan va elangan oq qum. Qurilish qorishmalari uchun mos keladi. Sifati laboratoriya tomonidan tasdiqlangan.",
    location: "Toshkent vil.",
    delivery: "Kelishuv asosida"
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
    displayText: "Armatura",
    description: "Yuqori mustahkamlikdagi po'lat armatura. Binolar poydevori va karkaslari uchun ishlatiladi. Davlat standartlariga (GOST) muvofiq.",
    location: "Navoiy sh.",
    delivery: "Bepul (Toshkentgacha)"
  }
];

interface MarketplaceProps {
  onAddToCart?: (product: typeof PRODUCTS[0]) => void;
}

export function Marketplace({ onAddToCart }: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
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
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-700 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#001529] tracking-tight">B2B Marketplace</h1>
      </div>

      <div className="bg-[#f4f9ff] border border-[#001529]/5 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
        <div className="bg-white p-3 rounded-xl shadow-sm text-[#0b5dbb]">
          <Sparkles size={20} />
        </div>
        <div>
          <h4 className="text-[11px] font-black text-[#0b5dbb] uppercase tracking-widest mb-1">AI Tavsiyalari</h4>
          <p className="text-[13px] text-[#001529]/60 font-medium">
            Siz o'tgan safar armatura xarid qildingiz, ehtimol sizga sement va beton kerak bo'lishi mumkin. Quyidagi ro'yxat siz uchun moslashtirilgan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-[#f4f9ff] p-8">
            <div className="flex items-center gap-2 mb-8">
              <Filter size={16} className="text-[#001529]/30" />
              <h3 className="text-sm font-black uppercase tracking-widest text-[#001529]">Filtrlar</h3>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-[11px] font-black text-[#001529]/40 uppercase tracking-widest mb-4">Kategoriyalar</h4>
                <div className="space-y-4">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={cat.id} 
                        checked={activeCategory === cat.id}
                        onCheckedChange={() => setActiveCategory(cat.id)}
                        className="rounded-lg border-[#001529]/10 bg-white"
                      />
                      <label 
                        htmlFor={cat.id} 
                        className="text-[13px] font-bold text-[#001529]/60 cursor-pointer select-none"
                      >
                        {cat.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-black text-[#001529]/40 uppercase tracking-widest mb-4">Narx oralig'i (UZS)</h4>
                <div className="flex items-center gap-2">
                  <Input placeholder="Dan" className="h-11 text-[12px] font-bold rounded-xl border-none bg-white shadow-sm" />
                  <Input placeholder="Gacha" className="h-11 text-[12px] font-bold rounded-xl border-none bg-white shadow-sm" />
                </div>
              </div>

              <Button className="w-full bg-[#001529] hover:bg-black text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] mt-4 shadow-lg">
                Filtrni qo'llash
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001529]/20 group-focus-within:text-[#0b5dbb] transition-colors" size={18} />
              <Input 
                placeholder="Mahsulot nomi, brend yoki sotuvchi bo'yicha qidiruv" 
                className="h-14 pl-12 rounded-2xl border-none bg-[#f4f9ff] shadow-sm text-[14px] font-bold placeholder:text-[#001529]/20 focus-visible:ring-2 focus-visible:ring-blue-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="mashhur">
              <SelectTrigger className="w-[200px] h-14 rounded-2xl border-none bg-[#f4f9ff] shadow-sm text-[12px] font-black uppercase tracking-widest px-6 text-[#001529]/60">
                <SelectValue placeholder="Mashhur" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-2xl">
                <SelectItem value="mashhur">Mashhur</SelectItem>
                <SelectItem value="arzon">Arzonlari oldin</SelectItem>
                <SelectItem value="qimmat">Qimmatlari oldin</SelectItem>
                <SelectItem value="yangi">Yangi qo'shilganlar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[40px] bg-[#f4f9ff] overflow-hidden group">
                <div 
                  className="relative h-56 w-full bg-white flex items-center justify-center p-8 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <span className="text-6xl font-black text-[#001529]/5 uppercase tracking-tighter select-none">
                    {product.displayText}
                  </span>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-black text-[#001529]/30 uppercase tracking-widest">{product.category}</p>
                    <div className="flex items-center gap-1 text-amber-400 font-black text-[11px]">
                      <Star size={12} fill="currentColor" /> {product.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-[16px] font-black text-[#001529] tracking-tight leading-tight mb-2 group-hover:text-[#0b5dbb] transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  
                  <p className="text-[11px] font-bold text-[#001529]/40 mb-6 uppercase tracking-tighter">
                    {product.company} • {product.stock} mavjud
                  </p>

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-2xl font-black text-[#0b5dbb] tracking-tighter">
                        {formatCurrency(product.price)} <span className="text-[11px] text-[#001529]/40 font-bold uppercase tracking-widest ml-1">/ {product.unit}</span>
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[11px] gap-2 mt-8 shadow-xl shadow-blue-100"
                  >
                    <ShoppingCart size={16} /> Savatga qo'shish
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 bg-[#f4f9ff] rounded-full flex items-center justify-center mb-8">
                <ShoppingBag className="text-[#001529]/10" size={48} />
              </div>
              <h3 className="text-xl font-black text-[#001529]/20 uppercase tracking-widest">Mahsulot topilmadi</h3>
            </div>
          )}
        </div>
      </div>

      {/* Mahsulot tafsilotlari oynasi */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[850px] rounded-[40px] p-0 overflow-hidden border-none shadow-2xl bg-white">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedProduct?.title || "Mahsulot tafsilotlari"}</DialogTitle>
            <DialogDescription>
              Tanlangan mahsulot haqida batafsil ma'lumot, narx va yetkazib berish shartlari.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Chap tomon: Rasm */}
            <div className="relative bg-[#f4f9ff] flex items-center justify-center p-12 h-full min-h-[400px]">
              <div className="w-full aspect-square bg-white rounded-[48px] flex items-center justify-center shadow-sm">
                <span className="text-6xl font-black text-[#001529]/10 uppercase tracking-tighter select-none">
                  {selectedProduct?.displayText}
                </span>
              </div>
            </div>

            {/* O'ng tomon: Ma'lumotlar */}
            <div className="p-12 flex flex-col justify-between h-full bg-white">
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black text-[#0b5dbb] uppercase tracking-[0.2em]">{selectedProduct?.category}</span>
                  <div className="flex items-center gap-1.5 font-black text-[13px] text-[#001529]">
                    <Star size={16} fill="currentColor" className="text-amber-400" /> {selectedProduct?.rating}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-[#001529] tracking-tight leading-none mb-4 uppercase">{selectedProduct?.displayText}</h2>
                  <p className="text-3xl font-black text-[#0b5dbb] tracking-tighter">
                    {selectedProduct ? formatCurrency(selectedProduct.price) : 0} <span className="text-[14px] text-[#001529]/40 font-black uppercase tracking-widest ml-1">/ {selectedProduct?.unit}</span>
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-lg bg-[#f4f9ff] flex items-center justify-center text-[#001529]/30">
                      <ShieldCheck size={16} />
                    </div>
                    <p className="text-[13px] font-bold text-[#001529]/60">Sotuvchi: <span className="font-black text-[#001529]">{selectedProduct?.company}</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-lg bg-[#f4f9ff] flex items-center justify-center text-[#001529]/30">
                      <ShoppingBasket size={16} />
                    </div>
                    <p className="text-[13px] font-bold text-[#001529]/60">Omborda: <span className="font-black text-[#001529]">{selectedProduct?.stock} ta mavjud</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-lg bg-[#f4f9ff] flex items-center justify-center text-[#001529]/30">
                      <MapPin size={16} />
                    </div>
                    <p className="text-[13px] font-bold text-[#001529]/60">Joylashuv: <span className="font-black text-[#001529]">{selectedProduct?.location}</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-lg bg-[#f4f9ff] flex items-center justify-center text-[#001529]/30">
                      <Truck size={16} />
                    </div>
                    <p className="text-[13px] font-bold text-[#001529]/60">Yetkazib berish haqi: <span className="font-black text-[#001529]">{selectedProduct?.delivery}</span></p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-[13px] leading-relaxed text-[#001529]/60 font-medium">
                    {selectedProduct?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-12">
                <Button 
                  onClick={() => selectedProduct && handleAddToCart(selectedProduct)}
                  className="flex-1 h-16 bg-[#0b4db1] hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-blue-900/20"
                >
                  Savatga qo'shish
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedProduct(null)}
                  className="h-16 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] text-[#001529]/40 hover:bg-[#f4f9ff] hover:text-[#001529]"
                >
                  Yopish
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
