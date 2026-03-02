
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
      imageUrl: "https://picsum.photos/seed/tracker1/1200/400",
      imageHint: "chevrolet car"
    },
    {
      id: 2,
      title: "Artel Electronics",
      description: "Yangi avlod maishiy texnikalari — Sizning qulayligingiz uchun",
      imageUrl: "https://picsum.photos/seed/artel1/1200/400",
      imageHint: "home appliances"
    }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-100 overflow-hidden h-[75px] md:h-[95px] shrink-0">
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
                <div className="relative w-1/2 h-full overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    priority
                    className="object-cover"
                    data-ai-hint={ad.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10" />
                </div>
                
                {/* Content Section - 50% width */}
                <div className="w-1/2 px-4 md:px-8 flex items-center justify-between bg-white">
                  <div className="space-y-0.5 md:space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 md:w-6 h-[1.5px] bg-[#0b4db1]" />
                      <h3 className="text-[8px] md:text-[10px] font-black text-[#0b4db1] uppercase tracking-[0.2em]">
                        {ad.title}
                      </h3>
                    </div>
                    <p className="text-[9px] md:text-[14px] lg:text-[18px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight max-w-sm">
                      {ad.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-6">
                    <Button 
                      className="bg-[#0b4db1] hover:bg-blue-700 text-white rounded-lg h-7 md:h-9 px-3 md:px-6 text-[7px] md:text-[10px] font-black uppercase tracking-widest gap-1 shadow-lg shadow-blue-100 transition-all active:scale-95"
                    >
                      Batafsil <ChevronRight size={12} className="hidden md:block" />
                    </Button>
                    
                    {/* Pagination Indicators */}
                    <div className="hidden xl:flex flex-col gap-1">
                      <div className={`w-1 h-4 rounded-full transition-all duration-500 ${ad.id === 1 ? 'bg-[#0b4db1]' : 'bg-slate-100'}`} />
                      <div className={`w-1 h-1 rounded-full transition-all duration-500 ${ad.id === 2 ? 'bg-[#0b4db1]' : 'bg-slate-100'}`} />
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
