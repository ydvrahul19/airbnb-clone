"use client";

import { useState } from "react";
import Calendar from "./Calendar";

function formatRange(checkIn: Date, checkOut: Date) {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `${checkIn.toLocaleDateString("en-GB", opts)} - ${checkOut.toLocaleDateString("en-GB", opts)}`;
}

export default function TripDates({
  nights,
  area,
  initialCheckIn,
  initialCheckOut,
}: {
  nights: number;
  area: string;
  initialCheckIn: string;
  initialCheckOut: string;
}) {
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(initialCheckIn));
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(initialCheckOut));

  return (
    <div className="py-8 border-b border-airbnb-border">
      <h2 className="text-xl font-semibold">
        {nights} nights in {area.split(",")[0]}
      </h2>
      {checkIn && checkOut && (
        <p className="text-sm text-airbnb-secondary mt-1">
          {formatRange(checkIn, checkOut)}
        </p>
      )}
      <div className="mt-4 border border-airbnb-border rounded-2xl w-fit">
        <Calendar
          checkIn={checkIn}
          checkOut={checkOut}
          onSelect={(ci, co) => {
            setCheckIn(ci);
            setCheckOut(co);
          }}
        />
      </div>
    </div>
  );
}
