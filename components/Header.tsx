"use client";

import { Search, Menu, Globe, ImageIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-airbnb-border">
      <div className="max-w-[1760px] mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-1.5 text-airbnb-pink font-bold text-2xl shrink-0"
          aria-label="Airbnb home"
        >
          <ImageIcon className="w-8 h-8" strokeWidth={2.2} aria-hidden="true" />
          <span className="hidden sm:inline">airbnb</span>
        </a>

        {/* Search pill */}
        <button
          className="flex items-center border border-airbnb-border rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 h-12 pl-6 pr-2 text-sm font-medium divide-x divide-airbnb-border"
          aria-label="Search listings"
        >
          <span className="pr-4">Anywhere</span>
          <span className="px-4">Anytime</span>
          <span className="pl-4 pr-2 text-airbnb-secondary font-normal flex items-center gap-2">
            Add guests
            <span className="bg-airbnb-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
              <Search className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
            </span>
          </span>
        </button>

        {/* Right nav */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#"
            className="hidden md:block text-sm font-medium rounded-full px-3 py-3 hover:bg-airbnb-gray-hover transition-colors duration-150"
          >
            Become a host
          </a>
          <button
            className="w-9 h-9 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center transition-colors duration-150"
            aria-label="Choose a language and region"
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            className="flex items-center gap-3 border border-airbnb-border rounded-full pl-3 pr-1 py-1 hover:shadow-md transition-shadow duration-200"
            aria-label="Main menu"
          >
            <Menu className="w-4 h-4" aria-hidden="true" />
            <span className="w-8 h-8 rounded-full bg-neutral-500 flex items-center justify-center text-white text-xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
