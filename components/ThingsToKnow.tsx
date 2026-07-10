import { CalendarX, KeyRound, Shield } from "lucide-react";

interface ThingsToKnowProps {
  freeCancellationDate: string;
  houseRules: { checkIn: string; checkOut: string; maxGuests: number };
  safety: {
    carbonMonoxideAlarm: boolean;
    smokeAlarm: boolean;
    exteriorCameras: boolean;
  };
}

export default function ThingsToKnow({
  freeCancellationDate,
  houseRules,
  safety,
}: ThingsToKnowProps) {
  return (
    <div className="py-8 border-b border-airbnb-border">
      <h2 className="text-xl font-semibold mb-6">Things to know</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <CalendarX className="w-6 h-6 mb-3" strokeWidth={1.3} aria-hidden="true" />
          <p className="font-semibold mb-3">Cancellation policy</p>
          <p className="text-sm mb-1">
            Free cancellation before {freeCancellationDate}. Cancel before check-in for a
            partial refund.
          </p>
          <button className="underline font-medium text-sm mt-2">
            Review this host&apos;s full policy for details.
          </button>
        </div>
        <div>
          <KeyRound className="w-6 h-6 mb-3" strokeWidth={1.3} aria-hidden="true" />
          <p className="font-semibold mb-3">House rules</p>
          <p className="text-sm mb-1">Check-in {houseRules.checkIn}</p>
          <p className="text-sm mb-1">Checkout {houseRules.checkOut}</p>
          <p className="text-sm mb-2">{houseRules.maxGuests} guests maximum</p>
          <button className="underline font-medium text-sm">Learn more</button>
        </div>
        <div>
          <Shield className="w-6 h-6 mb-3" strokeWidth={1.3} aria-hidden="true" />
          <p className="font-semibold mb-3">Safety & property</p>
          <p className="text-sm mb-1">
            Carbon monoxide alarm {safety.carbonMonoxideAlarm ? "" : "not reported"}
          </p>
          <p className="text-sm mb-1">
            Smoke alarm {safety.smokeAlarm ? "" : "not reported"}
          </p>
          {safety.exteriorCameras && (
            <p className="text-sm mb-2">Exterior security cameras on property</p>
          )}
          <button className="underline font-medium text-sm">Learn more</button>
        </div>
      </div>
    </div>
  );
}
