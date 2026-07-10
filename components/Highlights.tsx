import { Sunset, Wind, DoorOpen, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  sunset: Sunset,
  wind: Wind,
  "door-open": DoorOpen,
};

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="py-6 border-b border-airbnb-border space-y-6">
      {highlights.map((h, i) => {
        const Icon = ICON_MAP[h.icon] ?? Sunset;
        return (
          <div key={i} className="flex items-start gap-4">
            <Icon className="w-6 h-6 shrink-0 mt-0.5" strokeWidth={1.3} aria-hidden="true" />
            <div>
              <p className="font-semibold text-sm">{h.title}</p>
              <p className="text-airbnb-secondary text-sm mt-0.5">{h.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
