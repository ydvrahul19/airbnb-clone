"use client";

import { useEffect, useRef, useState } from "react";
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
}

export default function PhotoTour({
  title,
  groups,
  onClose,
  onOpenLightbox,
}: PhotoTourProps) {
  const [showThumbnailGrid, setShowThumbnailGrid] = useState(true);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useFocusTrap(containerRef, true);

  // Flatten image list for lightbox index lookup
  const flatImages = groups.flatMap((g) => g.images);

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

  // Scroll-spy: keep the left column in sync with whichever room's
  // photos are currently in view on the right.
  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Among groups currently intersecting the "active" band near the
        // top of the scroll container, pick the one furthest up the page.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        const idx = groupRefs.current.indexOf(
          topMost.target as HTMLDivElement
        );
        if (idx !== -1) setActiveGroupIndex(idx);
      },
      {
        root,
        // Treat a band near the top of the visible area as "active"
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    groupRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowThumbnailGrid(el.scrollTop < 80);
  };

  // Starting flat-index of each group, computed once per render pass
  // (avoids mutating a variable during render).
  const groupStartIndices = groups.reduce<number[]>((acc, g, gi) => {
    acc.push(gi === 0 ? 0 : acc[gi - 1] + groups[gi - 1].images.length);
    return acc;
  }, []);

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
                    const thumbIndex = groupStartIndices[gi];
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
                <div
                  key={activeGroupIndex}
                  className="animate-fade-in"
                  aria-live="polite"
                >
                  <h3 className="text-3xl font-semibold">
                    {groups[activeGroupIndex]?.roomLabel}
                  </h3>
                  {groups[activeGroupIndex]?.tags.length ? (
                    <p className="text-airbnb-secondary text-sm mt-1">
                      {groups[activeGroupIndex].tags.join(" · ")}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Right column - scrolling images, grouped by room */}
          <div>
            {groups.map((g, gi) => {
              const [firstImg, ...restImgs] = g.images;
              const firstFlatIdx = groupStartIndices[gi];
              return (
                  <div
                    key={gi}
                    ref={(el) => {
                      groupRefs.current[gi] = el;
                    }}
                    className="space-y-3 mb-6"
                  >
                    {/* Large hero photo for the room */}
                    <button
                      onClick={() => onOpenLightbox(firstFlatIdx)}
                      className="relative block w-full rounded-lg overflow-hidden aspect-[4/3] focus:outline-none"
                    >
                      <Image
                        src={firstImg}
                        alt={`${g.roomLabel} photo 1`}
                        fill
                        className="object-cover hover:brightness-95 transition-[filter] duration-200"
                        sizes="500px"
                      />
                    </button>

                    {/* Remaining photos for the room, in a 2-col grid */}
                    {restImgs.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {restImgs.map((img, ii) => {
                          const flatIdx = firstFlatIdx + ii + 1;
                          return (
                            <button
                              key={ii}
                              onClick={() => onOpenLightbox(flatIdx)}
                              className="relative block w-full rounded-lg overflow-hidden aspect-[4/3] focus:outline-none"
                            >
                              <Image
                                src={img}
                                alt={`${g.roomLabel} photo ${ii + 2}`}
                                fill
                                className="object-cover hover:brightness-95 transition-[filter] duration-200"
                                sizes="250px"
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
