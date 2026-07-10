"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Grid3x3, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useFocusTrap, captureActiveElement } from "@/lib/useFocusTrap";

interface LightboxProps {
  images: { src: string; roomLabel: string }[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  onOpenGrid: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onIndexChange,
  onClose,
  onOpenGrid,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const total = images.length;
  const current = images[currentIndex];

  useFocusTrap(containerRef, true);

  const goPrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % total);
  }, [currentIndex, total, onIndexChange]);

  useEffect(() => {
    previouslyFocused.current = captureActiveElement();
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, goPrev, goNext]);

  if (!current) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-white z-[60] flex flex-col animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${current.roomLabel}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <button
          onClick={onOpenGrid}
          className="w-9 h-9 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
          aria-label="Back to grid view"
        >
          <Grid3x3 className="w-5 h-5" aria-hidden="true" />
        </button>
        <h2 className="font-semibold" aria-live="polite">
          {current.roomLabel}
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-airbnb-secondary" aria-live="polite">
            {currentIndex + 1} of {total}
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative flex items-center justify-center px-20 pb-10">
        <button
          onClick={goPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-airbnb-border bg-white hover:scale-105 flex items-center justify-center transition-transform duration-150 shadow-sm"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <div
          key={currentIndex}
          className="relative w-full h-full max-w-4xl animate-fade-in"
        >
          <Image
            src={current.src}
            alt={`${current.roomLabel} - photo ${currentIndex + 1} of ${total}`}
            fill
            className="object-contain"
            sizes="80vw"
            priority
          />
        </div>

        <button
          onClick={goNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-airbnb-border bg-white hover:scale-105 flex items-center justify-center transition-transform duration-150 shadow-sm"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          className="absolute bottom-4 right-6 w-9 h-9 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
          aria-label="Save photo"
        >
          <Heart className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
