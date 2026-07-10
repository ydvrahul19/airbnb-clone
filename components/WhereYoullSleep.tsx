import Image from "next/image";

interface Room {
  label: string;
  detail: string;
  image: string;
}

export default function WhereYoullSleep({
  bedroom,
  livingRoom,
}: {
  bedroom: Room;
  livingRoom: Room;
}) {
  const rooms = [bedroom, livingRoom];

  return (
    <div className="py-6 border-b border-airbnb-border">
      <h2 className="text-xl font-semibold mb-4">Where you&apos;ll sleep</h2>
      <div className="grid grid-cols-2 gap-4 max-w-[520px]">
        {rooms.map((room, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-airbnb-border">
              <Image
                src={room.image}
                alt={room.label}
                fill
                className="object-cover group-hover:brightness-95 transition-[filter] duration-200"
                sizes="260px"
              />
            </div>
            <p className="font-semibold mt-2">{room.label}</p>
            <p className="text-airbnb-secondary text-sm">{room.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
