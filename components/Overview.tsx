import { Award } from "lucide-react";

interface OverviewProps {
  propertyType: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  isGuestFavourite: boolean;
  guestFavouriteText: string;
  rating: number;
  reviewCount: number;
}

export default function Overview({
  propertyType,
  guests,
  bedrooms,
  beds,
  bathrooms,
  isGuestFavourite,
  guestFavouriteText,
  rating,
  reviewCount,
}: OverviewProps) {
  return (
    <div className="pt-6">
      <h2 className="text-xl font-medium">{propertyType}</h2>
      <p className="text-[#222222] mt-1">
        {guests} guests · {bedrooms} bedroom · {beds} bed · {bathrooms} bathroom
      </p>

      {isGuestFavourite && (
        <div className="mt-6 border border-airbnb-border rounded-2xl px-6 py-4 flex items-center gap-4">
          <Award className="w-9 h-9 shrink-0" strokeWidth={1.3} aria-hidden="true" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Guest favourite</p>
            <p className="text-sm text-airbnb-secondary mt-0.5">
              {guestFavouriteText}
            </p>
          </div>
          <div className="text-center px-4 border-l border-airbnb-border">
            <p className="font-semibold text-lg">{rating}</p>
            <p className="text-xs">★★★★★</p>
          </div>
          <div className="text-center px-4 border-l border-airbnb-border">
            <p className="font-semibold text-lg">{reviewCount}</p>
            <p className="text-xs underline">Reviews</p>
          </div>
        </div>
      )}
    </div>
  );
}
