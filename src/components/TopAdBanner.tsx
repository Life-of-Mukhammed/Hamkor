
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
    <div className="w-full bg-white border-b border-slate-100 overflow-hidden h-[100px] md:h-[120px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {ads.map((ad) => (
            <CarouselItem key={ad.id} className="h-full">
              <div className="flex items-center h-full w-full">
                {/* Image Section */}
                <div className="relative w-1/3 h-full overflow-hidden">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover"
                    data-ai-hint={ad.imageHint}
                  />
                </div>
                
                {/* Content Section */}
                <div className="flex-1 px-8 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-[2px] bg-[#0b4db1]" />
                      <h3 className="text-[14px] font-black text-[#0b4db1] uppercase tracking-tight">
                        {ad.title}
                      </h3>
                    </div>
                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">
                      {ad.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <Button 
                      className="bg-[#0b4db1] hover:bg-blue-700 text-white rounded-xl h-10 px-6 text-[11px] font-black uppercase tracking-widest gap-2 shadow-lg shadow-blue-100"
                    >
                      Batafsil <ChevronRight size={14} />
                    </Button>
                    
                    {/* Pagination Dots Sim */}
                    <div className="flex gap-1.5">
                      <div className={`w-6 h-1.5 rounded-full ${ad.id === 1 ? 'bg-[#0b4db1]' : 'bg-slate-200'}`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${ad.id === 2 ? 'bg-[#0b4db1]' : 'bg-slate-200'}`} />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
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
