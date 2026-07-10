"use client";

import { useEffect, useRef, useState } from "react";
import {
  Utensils,
  Wifi,
  Monitor,
  Car,
  Flame,
  Bath,
  Dog,
  Camera,
  Dumbbell,
  Waves,
  X as XIcon,
  LucideIcon,
} from "lucide-react";
import { useFocusTrap, captureActiveElement } from "@/lib/useFocusTrap";

const ICON_MAP: Record<string, LucideIcon> = {
  utensils: Utensils,
  wifi: Wifi,
  monitor: Monitor,
  car: Car,
  flame: Flame,
  bath: Bath,
  dog: Dog,
  camera: Camera,
  dumbbell: Dumbbell,
  waves: Waves,
  "alarm-smoke": XIcon,
  "flame-off": XIcon,
};

interface Amenity {
  icon: string;
  label: string;
  available: boolean;
}

export default function Amenities({
  amenities,
  total,
}: {
  amenities: Amenity[];
  total: number;
}) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useFocusTrap(modalRef, showModal);

  useEffect(() => {
    if (!showModal) return;
    previouslyFocused.current = captureActiveElement();
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [showModal]);

  return (
    <div className="py-6 border-b border-airbnb-border">
      <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
      <div className="grid grid-cols-2 gap-y-4">
        {amenities.map((a, i) => {
          const Icon = ICON_MAP[a.icon] ?? Utensils;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 text-sm ${
                !a.available ? "text-airbnb-secondary" : ""
              }`}
            >
              <Icon className="w-6 h-6 shrink-0" strokeWidth={1.3} aria-hidden="true" />
              <span className={!a.available ? "line-through" : ""}>{a.label}</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 border border-[#222222] rounded-lg px-6 py-3 text-sm font-semibold hover:bg-airbnb-gray-hover transition-colors duration-150"
      >
        Show all {total} amenities
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="All amenities"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-center justify-center p-4 border-b border-airbnb-border">
              <button
                ref={closeBtnRef}
                onClick={() => setShowModal(false)}
                className="absolute left-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-airbnb-gray-hover"
                aria-label="Close"
              >
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <h3 className="font-semibold">What this place offers</h3>
            </div>
            <div className="p-6 space-y-4">
              {amenities.map((a, i) => {
                const Icon = ICON_MAP[a.icon] ?? Utensils;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 text-sm ${
                      !a.available ? "text-airbnb-secondary" : ""
                    }`}
                  >
                    <Icon className="w-6 h-6 shrink-0" strokeWidth={1.3} aria-hidden="true" />
                    <span className={!a.available ? "line-through" : ""}>{a.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
