const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function nightsBetween(
  checkIn: Date | null,
  checkOut: Date | null,
  fallback: number
): number {
  if (!checkIn || !checkOut) return fallback;
  const diff = Math.round((checkOut.getTime() - checkIn.getTime()) / MS_PER_DAY);
  return diff > 0 ? diff : fallback;
}

export function priceForNights(
  pricePerNight: number,
  nights: number
): number {
  return Math.round(pricePerNight * nights);
}

export function freeCancellationDateLabel(
  checkIn: Date | null,
  fallback: string
): string {
  if (!checkIn) return fallback;
  const d = new Date(checkIn);
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString("en-US", { day: "numeric", month: "long" });
}
