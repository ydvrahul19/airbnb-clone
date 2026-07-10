export interface Listing {
  title: string;
  location: {
    area: string;
    neighbourhood: string;
    mapCoordinates: { lat: number; lng: number };
  };
  propertyType: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  isGuestFavourite: boolean;
  guestFavouriteText: string;
  host: {
    name: string;
    avatar: string | null;
    yearsHosting: number;
    isVerified: boolean;
    totalReviews: number;
    rating: number;
    responseRate: number;
    responseTime: string;
    bio: string[];
    cohosts: { name: string; avatar: string | null }[];
  };
  highlights: { icon: string; title: string; description: string }[];
  description: string;
  rooms: {
    bedroom: { label: string; detail: string; image: string };
    livingRoom: { label: string; detail: string; image: string };
  };
  amenities: { icon: string; label: string; available: boolean }[];
  amenitiesTotal: number;
  pricing: {
    currency: string;
    pricePerFive: number;
    nights: number;
    checkIn: string;
    checkOut: string;
    guests: number;
    freeCancellationDate: string;
    discountText: string;
  };
  reviewCategories: Record<string, number>;
  reviewTags: { label: string; count: number }[];
  reviews: {
    name: string;
    avatar: string | null;
    tenure: string;
    rating: number;
    date: string;
    text: string;
  }[];
  houseRules: { checkIn: string; checkOut: string; maxGuests: number };
  safety: {
    carbonMonoxideAlarm: boolean;
    smokeAlarm: boolean;
    exteriorCameras: boolean;
  };
  nearbyStays: { title: string; price: number; rating: number; image: string }[];
  photoTour: { roomLabel: string; tags: string[]; images: string[] }[];
}
