"use client";

import { useEffect, useState } from "react";

const TABS = ["Photos", "Amenities", "Reviews", "Location"];

interface StickyNavProps {
  price: number;
  currency: string;
  nights: number;
  rating: number;
  reviewCount: number;
  onReserve: () => void;
}

export default function StickyNav({
  price,
  currency,
  nights,
  rating,
  reviewCount,
  onReserve,
}: StickyNavProps) {
  const [activeTab, setActiveTab] = useState("Photos");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (tab: string) => {
    setActiveTab(tab);
    const el = document.getElementById(tab.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`sticky top-0 z-30 bg-white border-b border-airbnb-border transition-shadow duration-200 ${
        scrolled ? "shadow-[0_2px_4px_rgba(0,0,0,0.04)]" : ""
      }`}
    >
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-6 lg:px-0 h-[73px]">
        <nav className="flex gap-8" aria-label="Listing sections">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`relative text-sm font-medium py-6 transition-colors duration-150 ${
                activeTab === tab
                  ? "text-[#222222]"
                  : "text-airbnb-secondary hover:text-[#222222]"
              }`}
              aria-current={activeTab === tab ? "true" : undefined}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#222222] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="text-sm">
            <span className="font-semibold">
              {currency}
              {price.toLocaleString()}
            </span>{" "}
            <span className="text-airbnb-secondary">for {nights} nights</span>
            <span className="mx-1 text-airbnb-secondary">·</span>
            <span className="font-semibold">★ {rating}</span>{" "}
            <span className="text-airbnb-secondary underline">
              {reviewCount} reviews
            </span>
          </div>
          <button
            onClick={onReserve}
            className="bg-airbnb-pink hover:bg-airbnb-pink-dark text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-150"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
