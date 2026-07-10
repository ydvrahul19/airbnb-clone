"use client";

import Calendar from "./Calendar";

function formatRange(checkIn: Date, checkOut: Date) {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `${checkIn.toLocaleDateString("en-GB", opts)} - ${checkOut.toLocaleDateString("en-GB", opts)}`;
}

export default function TripDates({
  nights,
  area,
  checkIn,
  checkOut,
  onDatesChange,
}: {
  nights: number;
  area: string;
  checkIn: Date | null;
  checkOut: Date | null;
  onDatesChange: (checkIn: Date | null, checkOut: Date | null) => void;
}) {
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
        <Calendar checkIn={checkIn} checkOut={checkOut} onSelect={onDatesChange} />
      </div>
    </div>
  );
}
