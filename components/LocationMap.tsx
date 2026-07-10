import { Search, Plus, Minus, Home } from "lucide-react";

export default function LocationMap({
  area,
  neighbourhood,
}: {
  area: string;
  neighbourhood: string;
}) {
  return (
    <div id="location" className="py-8 border-b border-airbnb-border scroll-mt-24">
      <h2 className="text-xl font-semibold mb-4">Where you&apos;ll be</h2>
      <p className="font-medium mb-4">{area}</p>

      <div className="relative w-full h-[480px] rounded-xl overflow-hidden bg-[#E8EEF1]">
        {/* Stylized map placeholder */}
        <svg
          viewBox="0 0 800 480"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          aria-label="Map showing approximate property location"
          role="img"
        >
          <rect width="800" height="480" fill="#EAF2ED" />
          <polygon points="0,0 320,0 0,480" fill="#CFE0EF" />
          <circle cx="230" cy="260" r="90" fill="#D8E8DC" opacity="0.8" />
          <circle cx="560" cy="360" r="110" fill="#D8E8DC" opacity="0.8" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 100}
              y1="0"
              x2={i * 100}
              y2="480"
              stroke="#D3DCE0"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 96}
              x2="800"
              y2={i * 96}
              stroke="#D3DCE0"
              strokeWidth="1"
            />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-11 h-11 rounded-full bg-[#222222] flex items-center justify-center shadow-lg">
            <Home className="w-5 h-5 text-white" fill="white" aria-hidden="true" />
          </div>
        </div>

        <button
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-airbnb-gray-hover"
          aria-label="Search this area"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="absolute top-4 right-4 flex flex-col rounded-lg overflow-hidden shadow-md">
          <button
            className="w-9 h-9 bg-white flex items-center justify-center hover:bg-airbnb-gray-hover border-b border-airbnb-border"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            className="w-9 h-9 bg-white flex items-center justify-center hover:bg-airbnb-gray-hover"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="text-sm text-airbnb-secondary mt-4">
        Exact location will be provided after booking.
      </p>

      <h3 className="font-semibold mt-6 mb-2">Neighbourhood highlights</h3>
      <p className="text-sm leading-relaxed">{neighbourhood}</p>
      <button className="underline font-medium text-sm mt-2 flex items-center gap-1">
        Show more
      </button>
    </div>
  );
}
