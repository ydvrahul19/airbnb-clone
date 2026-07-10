export default function HostCard({
  name,
  yearsHosting,
}: {
  name: string;
  yearsHosting: number;
}) {
  return (
    <div className="flex items-center gap-4 py-6 border-b border-airbnb-border">
      <div
        className="w-14 h-14 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-500 flex items-center justify-center text-white font-semibold text-lg shrink-0"
        aria-hidden="true"
      >
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold">Hosted by {name}</p>
        <p className="text-airbnb-secondary text-sm">{yearsHosting} years hosting</p>
      </div>
    </div>
  );
}
