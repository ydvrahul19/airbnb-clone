import { BadgeCheck, ShieldCheck } from "lucide-react";

interface HostDetailProps {
  name: string;
  totalReviews: number;
  rating: number;
  yearsHosting: number;
  isVerified: boolean;
  bio: string[];
  cohosts: { name: string }[];
  responseRate: number;
  responseTime: string;
}

export default function HostDetail({
  name,
  totalReviews,
  rating,
  yearsHosting,
  isVerified,
  bio,
  cohosts,
  responseRate,
  responseTime,
}: HostDetailProps) {
  return (
    <div className="py-8 border-b border-airbnb-border">
      <h2 className="text-xl font-semibold mb-6">Meet your host</h2>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="border border-airbnb-border rounded-2xl p-6 flex flex-col items-center text-center w-full sm:w-64 shrink-0">
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-500 flex items-center justify-center text-white text-3xl font-semibold relative"
            aria-hidden="true"
          >
            {name.charAt(0)}
            {isVerified && (
              <span className="absolute bottom-0 right-0 bg-airbnb-pink rounded-full p-1 border-2 border-white">
                <BadgeCheck className="w-4 h-4 text-white" aria-hidden="true" />
              </span>
            )}
          </div>
          <p className="font-semibold text-lg mt-4">{name}</p>
          <p className="text-sm text-airbnb-secondary">Host</p>

          <div className="w-full mt-6 space-y-4">
            <div className="border-b border-airbnb-border pb-4">
              <p className="font-semibold">{totalReviews.toLocaleString()}</p>
              <p className="text-xs text-airbnb-secondary">Reviews</p>
            </div>
            <div className="border-b border-airbnb-border pb-4">
              <p className="font-semibold flex items-center justify-center gap-1">
                {rating}★
              </p>
              <p className="text-xs text-airbnb-secondary">Rating</p>
            </div>
            <div>
              <p className="font-semibold">{yearsHosting}</p>
              <p className="text-xs text-airbnb-secondary">Years hosting</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <ul className="space-y-3 mb-6">
            {bio.map((line, i) => (
              <li key={i} className="text-sm">{line}</li>
            ))}
          </ul>

          {cohosts.length > 0 && (
            <>
              <h3 className="font-semibold mb-3">Co-Hosts</h3>
              <div className="grid grid-cols-3 gap-4 mb-6 max-w-sm">
                {cohosts.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-white text-xs font-semibold shrink-0"
                      aria-hidden="true"
                    >
                      {c.name.charAt(0)}
                    </div>
                    <span className="text-sm">{c.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="font-semibold mb-2">Host details</h3>
          <p className="text-sm">Response rate: {responseRate}%</p>
          <p className="text-sm">Responds {responseTime}</p>

          <button className="border border-[#222222] rounded-lg px-6 py-3 text-sm font-semibold mt-4 hover:bg-airbnb-gray-hover transition-colors duration-150">
            Message host
          </button>

          <div className="flex items-start gap-2 mt-6 text-sm text-airbnb-secondary max-w-md">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              To help protect your payment, always use Airbnb to send money and
              communicate with hosts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
