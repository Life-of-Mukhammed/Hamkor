
"use client";

import * as React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function TopAdBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const ads = [
    {
      id: 1,
      title: "UzAuto Motors",
      description: "Yangi Chevrolet Tracker — Shahar uchun mukammal tanlov",
      imageUrl: "https://picsum.photos/seed/tracker/1200/300",
      imageHint: "chevrolet tracker car"
    },
    {
      id: 2,
      title: "Artel Electronics",
      description: "Yangi avlod maishiy texnikalari — Sizning qulayligingiz uchun",
      imageUrl: "https://picsum.photos/seed/artel/1200/300",
      imageHint: "modern appliances"
    }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-100 overflow-hidden h-[80px] md:h-[120px] shrink-0">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {ads.map((ad) => (
            <CarouselItem key={ad.id} className="h-full">
              <div className="flex h-full w-full">
                {/* Image Section - 50% width */}
                <div className="relative w-1/2 h-full overflow-hidden shrink-0">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover"
                    data-ai-hint={ad.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10" />
                </div>
                
                {/* Content Section - 50% width */}
                <div className="w-1/2 px-4 md:px-12 flex items-center justify-between bg-white">
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 md:w-8 h-[2px] bg-[#0b4db1]" />
                      <h3 className="text-[9px] md:text-[13px] font-black text-[#0b4db1] uppercase tracking-[0.2em]">
                        {ad.title}
                      </h3>
                    </div>
                    <p className="text-[10px] md:text-[18px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight max-w-sm">
                      {ad.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 md:gap-10">
                    <Button 
                      className="bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-8 md:h-12 px-4 md:px-10 text-[8px] md:text-[11px] font-black uppercase tracking-widest gap-2 shadow-xl shadow-blue-100 transition-all active:scale-95"
                    >
                      Batafsil <ChevronRight size={14} className="hidden md:block" />
                    </Button>
                    
                    {/* Pagination Indicators */}
                    <div className="hidden xl:flex flex-col gap-1.5">
                      <div className={`w-1.5 h-6 rounded-full transition-all duration-500 ${ad.id === 1 ? 'bg-[#0b4db1]' : 'bg-slate-100'}`} />
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${ad.id === 2 ? 'bg-[#0b4db1]' : 'bg-slate-100'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
