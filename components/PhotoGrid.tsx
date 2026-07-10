"use client";

import Image from "next/image";
import { Grid3x3 } from "lucide-react";

interface PhotoGridProps {
  images: string[];
  title: string;
  onOpenTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function PhotoGrid({
  images,
  title,
  onOpenTour,
  onOpenLightbox,
}: PhotoGridProps) {
  // Ensure we always have 5 slots, repeating images if fewer are supplied
  const slots = Array.from({ length: 5 }, (_, i) => images[i % images.length]);

  return (
    <div className="relative rounded-xl overflow-hidden mt-6">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px]">
        {/* Hero - large left image */}
        <button
          onClick={() => onOpenLightbox(0)}
          className="col-span-2 row-span-2 relative group overflow-hidden focus:outline-none"
          aria-label={`View photo 1 of ${title}`}
        >
          <Image
            src={slots[0]}
            alt={`${title} - main photo`}
            fill
            priority
            className="object-cover group-hover:brightness-90 transition-[filter] duration-200"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </button>

        {/* 2x2 grid on the right */}
        {slots.slice(1).map((src, i) => (
          <button
            key={i}
            onClick={() => onOpenLightbox(i + 1)}
            className="relative group overflow-hidden focus:outline-none"
            aria-label={`View photo ${i + 2} of ${title}`}
          >
            <Image
              src={src}
              alt={`${title} - photo ${i + 2}`}
              fill
              className="object-cover group-hover:brightness-90 transition-[filter] duration-200"
              sizes="25vw"
            />
          </button>
        ))}
      </div>

      <button
        onClick={onOpenTour}
        className="absolute bottom-5 right-5 bg-white text-sm font-semibold px-4 py-2 rounded-lg border border-[#222222] shadow-sm hover:bg-airbnb-gray-hover transition-colors duration-150 flex items-center gap-2"
      >
        <Grid3x3 className="w-4 h-4" aria-hidden="true" />
        Show all photos
      </button>
    </div>
  );
}
