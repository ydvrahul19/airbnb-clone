"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Share, Heart } from "lucide-react";
import { useFocusTrap, captureActiveElement } from "@/lib/useFocusTrap";

interface PhotoTourGroup {
  roomLabel: string;
  tags: string[];
  images: string[];
}

interface PhotoTourProps {
  title: string;
  groups: PhotoTourGroup[];
  onClose: () => void;
  onOpenLightbox: (flatIndex: number) => void;
  /** Ref holding the scroll position to restore on mount and keep updated
   *  as the user scrolls. Lives in the parent so it survives Photo Tour
   *  being unmounted/remounted around the lightbox. */
  scrollPositionRef?: React.MutableRefObject<number>;
}

export default function PhotoTour({
  title,
  groups,
  onClose,
  onOpenLightbox,
  scrollPositionRef,
}: PhotoTourProps) {
  const [showThumbnailGrid, setShowThumbnailGrid] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useFocusTrap(containerRef, true);

  // Flatten image list for lightbox index lookup
  const flatImages = groups.flatMap((g) => g.images);

  // Restore the scroll position left off at (e.g. when returning from the
  // lightbox) instead of always reopening at the top. Runs before paint so
  // there's no visible flash of the thumbnail grid first.
  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    const savedTop = scrollPositionRef?.current ?? 0;
    if (el && savedTop > 0) {
      el.scrollTop = savedTop;
      setShowThumbnailGrid(savedTop < 80);
    }
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    previouslyFocused.current = captureActiveElement();
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowThumbnailGrid(el.scrollTop < 80);
    if (scrollPositionRef) {
      scrollPositionRef.current = el.scrollTop;
    }
  };

  let runningIndex = 0;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-airbnb-border shrink-0">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-9 h-9 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
          aria-label="Back to listing"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <h2 className="font-semibold">Photo tour</h2>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
            aria-label="Share"
          >
            <Share className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            className="w-9 h-9 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
            aria-label="Save"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-10 px-6 py-10">
          {/* Left column */}
          <div className="relative">
            <div className="sticky top-10">
              {showThumbnailGrid ? (
                <div className="grid grid-cols-4 gap-3 animate-fade-in">
                  {groups.map((g, gi) => {
                    const thumbIndex = runningIndex;
                    runningIndex += g.images.length;
                    return (
                      <button
                        key={gi}
                        onClick={() => onOpenLightbox(thumbIndex)}
                        className="text-left"
                      >
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={g.images[0]}
                            alt={g.roomLabel}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </div>
                        <p className="text-xs mt-1 truncate">{g.roomLabel}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-8 animate-fade-in">
                  {groups.map((g, gi) => (
                    <div key={gi}>
                      <h3 className="text-3xl font-semibold">{g.roomLabel}</h3>
                      <p className="text-airbnb-secondary text-sm mt-1">
                        {g.tags.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column - scrolling images */}
          <div className="space-y-3">
            {(() => {
              let idx = 0;
              return groups.map((g, gi) => (
                <div key={gi} className="space-y-3 mb-6">
                  {g.images.map((img, ii) => {
                    const flatIdx = idx++;
                    return (
                      <button
                        key={ii}
                        onClick={() => onOpenLightbox(flatIdx)}
                        className="relative block w-full rounded-lg overflow-hidden aspect-[4/3]"
                      >
                        <Image
                          src={img}
                          alt={`${g.roomLabel} photo ${ii + 1}`}
                          fill
                          className="object-cover hover:brightness-95 transition-[filter] duration-200"
                          sizes="500px"
                        />
                      </button>
                    );
                  })}
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
