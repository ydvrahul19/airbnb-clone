"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Sparkles, Flag } from "lucide-react";
import Calendar from "./Calendar";

interface BookingSidebarProps {
  currency: string;
  price: number;
  nights: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onDatesChange: (checkIn: Date | null, checkOut: Date | null) => void;
  initialGuests: number;
  freeCancellationDate: string;
  discountText: string;
  onReserve: () => void;
}

function formatDate(d: Date | null) {
  if (!d) return "Add date";
  return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
}

export default function BookingSidebar({
  currency,
  price,
  nights,
  checkIn,
  checkOut,
  onDatesChange,
  initialGuests,
  freeCancellationDate,
  discountText,
  onReserve,
}: BookingSidebarProps) {
  const [guests, setGuests] = useState(initialGuests);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
        setGuestsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCalendarOpen(false);
        setGuestsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="sticky top-24 border border-airbnb-border rounded-2xl shadow-lg p-6 w-full">
      <div className="bg-green-50 rounded-xl px-4 py-3 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-green-700" aria-hidden="true" />
          <span>{discountText} <span className="underline font-medium">Terms apply</span></span>
        </div>
        <button className="text-sm font-semibold border border-[#222222] rounded-lg px-3 py-1.5 shrink-0 ml-2 hover:bg-airbnb-gray-hover transition-colors duration-150">
          Claim
        </button>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-xl font-semibold">
          {currency}
          {price.toLocaleString()}
        </span>
        <span className="text-sm">for {nights} nights</span>
      </div>

      <div ref={wrapperRef} className="relative border border-airbnb-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-2">
          <button
            onClick={() => { setCalendarOpen((o) => !o); setGuestsOpen(false); }}
            className="text-left px-4 py-2 border-r border-b border-airbnb-border hover:bg-airbnb-gray-hover transition-colors duration-150"
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
          >
            <p className="text-[10px] font-semibold tracking-wide">CHECK-IN</p>
            <p className="text-sm">{formatDate(checkIn)}</p>
          </button>
          <button
            onClick={() => { setCalendarOpen((o) => !o); setGuestsOpen(false); }}
            className="text-left px-4 py-2 border-b border-airbnb-border hover:bg-airbnb-gray-hover transition-colors duration-150"
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
          >
            <p className="text-[10px] font-semibold tracking-wide">CHECKOUT</p>
            <p className="text-sm">{formatDate(checkOut)}</p>
          </button>
        </div>
        <button
          onClick={() => { setGuestsOpen((o) => !o); setCalendarOpen(false); }}
          className="w-full text-left px-4 py-2 hover:bg-airbnb-gray-hover transition-colors duration-150 flex items-center justify-between"
          aria-haspopup="dialog"
          aria-expanded={guestsOpen}
        >
          <div>
            <p className="text-[10px] font-semibold tracking-wide">GUESTS</p>
            <p className="text-sm">{guests} guest{guests !== 1 ? "s" : ""}</p>
          </div>
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </button>

        {calendarOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-airbnb-border rounded-2xl shadow-xl z-40 animate-scale-in">
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={onDatesChange}
            />
          </div>
        )}

        {guestsOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-airbnb-border rounded-2xl shadow-xl z-40 p-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Guests</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-[#222222] disabled:opacity-30"
                  disabled={guests <= 1}
                  aria-label="Decrease guests"
                >
                  −
                </button>
                <span className="w-4 text-center text-sm">{guests}</span>
                <button
                  onClick={() => setGuests((g) => Math.min(3, g + 1))}
                  className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-[#222222] disabled:opacity-30"
                  disabled={guests >= 3}
                  aria-label="Increase guests"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-airbnb-gray-hover text-center text-sm py-3 rounded-lg mt-4">
        Free cancellation before <span className="font-medium">{freeCancellationDate}</span>
      </div>

      <button
        onClick={onReserve}
        className="w-full bg-airbnb-pink hover:bg-airbnb-pink-dark text-white font-semibold text-base py-3.5 rounded-xl mt-4 transition-colors duration-150"
      >
        Reserve
      </button>
      <p className="text-center text-sm text-airbnb-secondary mt-3">
        You won&apos;t be charged yet
      </p>

      <button className="flex items-center gap-2 text-sm underline text-airbnb-secondary mt-4 mx-auto hover:text-[#222222]">
        <Flag className="w-3.5 h-3.5" aria-hidden="true" />
        Report this listing
      </button>
    </div>
  );
}
