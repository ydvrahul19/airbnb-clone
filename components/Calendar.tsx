"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (checkIn: Date | null, checkOut: Date | null) => void;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
}

export default function Calendar({ checkIn, checkOut, onSelect }: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    checkIn ? checkIn.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    checkIn ? checkIn.getMonth() : today.getMonth()
  );

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (year: number, month: number, day: number) => {
    const clicked = new Date(year, month, day);
    if (!checkIn || (checkIn && checkOut)) {
      onSelect(clicked, null);
    } else if (clicked < checkIn) {
      onSelect(clicked, null);
    } else {
      onSelect(checkIn, clicked);
    }
  };

  const renderMonth = (year: number, month: number) => {
    const cells = getMonthGrid(year, month);
    return (
      <div className="flex-1">
        <p className="text-center font-semibold text-sm mb-4">
          {MONTH_NAMES[month]} {year}
        </p>
        <div className="grid grid-cols-7 gap-y-1 text-xs text-center text-airbnb-secondary mb-2">
          {DAY_LABELS.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            if (day === null) return <span key={i} />;
            const date = new Date(year, month, day);
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isCheckIn = isSameDay(date, checkIn);
            const isCheckOut = isSameDay(date, checkOut);
            const inRange =
              checkIn && checkOut && date > checkIn && date < checkOut;

            return (
              <button
                key={i}
                disabled={isPast}
                onClick={() => handleDayClick(year, month, day)}
                className={`h-9 w-9 mx-auto text-sm rounded-full flex items-center justify-center transition-colors duration-100
                  ${isPast ? "text-neutral-300 cursor-not-allowed line-through" : "hover:bg-airbnb-gray-hover"}
                  ${isCheckIn || isCheckOut ? "bg-[#222222] text-white hover:bg-[#222222]" : ""}
                  ${inRange ? "bg-airbnb-gray-hover rounded-none" : ""}
                `}
                aria-pressed={isCheckIn || isCheckOut}
                aria-label={date.toDateString()}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goPrev}
          className="w-8 h-8 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        </button>
        <div className="flex-1" />
        <button
          onClick={goNext}
          className="w-8 h-8 rounded-full hover:bg-airbnb-gray-hover flex items-center justify-center"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <div className="flex gap-8">
        {renderMonth(viewYear, viewMonth)}
        {renderMonth(nextYear, nextMonth)}
      </div>
      <button
        onClick={() => onSelect(null, null)}
        className="text-sm underline font-medium mt-4"
      >
        Clear dates
      </button>
    </div>
  );
}
