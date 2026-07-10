"use client";

import { Share, Heart } from "lucide-react";
import { useState } from "react";

export default function TitleBar({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center justify-between pt-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4 text-sm font-medium">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-airbnb-gray-hover transition-colors duration-150 underline">
          <Share className="w-4 h-4" aria-hidden="true" />
          Share
        </button>
        <button
          onClick={() => setSaved((s) => !s)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-airbnb-gray-hover transition-colors duration-150 underline"
          aria-pressed={saved}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-150 ${
              saved ? "fill-airbnb-pink text-airbnb-pink" : ""
            }`}
            aria-hidden="true"
          />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
