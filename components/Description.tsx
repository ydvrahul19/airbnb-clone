"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function Description({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const truncated = text.length > 280 ? text.slice(0, 280) + "…" : text;

  return (
    <div className="py-6 border-b border-airbnb-border">
      {!showOriginal && (
        <div className="bg-airbnb-gray-hover rounded-xl px-4 py-3 mb-4 text-sm flex items-center justify-between">
          <span>Some info has been automatically translated.</span>
          <button
            onClick={() => setShowOriginal(true)}
            className="underline font-medium shrink-0 ml-2"
          >
            Show original
          </button>
        </div>
      )}

      <p className="whitespace-pre-line leading-relaxed">
        {expanded ? text : truncated}
      </p>

      {!expanded && text.length > 280 && (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-1 font-semibold underline mt-3 text-sm"
        >
          Show more
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
