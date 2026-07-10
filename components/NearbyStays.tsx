"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NearbyStay {
  title: string;
  price: number;
  rating: number;
  image: string;
}

export default function NearbyStays({
  stays,
  currency,
}: {
  stays: NearbyStay[];
  currency: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">More stays nearby</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-airbnb-secondary">1 / 2</span>
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:bg-airbnb-gray-hover"
            aria-label="Previous stays"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:bg-airbnb-gray-hover"
            aria-label="Next stays"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {stays.map((stay, i) => (
          <div key={i} className="w-[240px] shrink-0 group cursor-pointer">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
              <Image
                src={stay.image}
                alt={stay.title}
                fill
                className="object-cover group-hover:brightness-95 transition-[filter] duration-200"
                sizes="240px"
              />
            </div>
            <p className="text-sm font-medium mt-2 truncate">{stay.title}</p>
            <p className="text-sm mt-0.5">
              {currency}
              {stay.price.toLocaleString()}{" "}
              <span className="text-airbnb-secondary">★ {stay.rating}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
