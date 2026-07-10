"use client";

import { useState } from "react";

interface ReviewsProps {
  rating: number;
  reviewCount: number;
  categories: Record<string, number>;
  tags: { label: string; count: number }[];
  reviews: {
    name: string;
    tenure: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

const CATEGORY_LABELS: Record<string, string> = {
  cleanliness: "Cleanliness",
  accuracy: "Accuracy",
  checkIn: "Check-in",
  communication: "Communication",
  location: "Location",
  value: "Value",
};

function ReviewCard({
  review,
}: {
  review: ReviewsProps["reviews"][number];
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 140;
  const shown = expanded || !isLong ? review.text : review.text.slice(0, 140) + "…";

  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white text-sm font-semibold"
          aria-hidden="true"
        >
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-sm">{review.name}</p>
          <p className="text-airbnb-secondary text-xs">{review.tenure}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3 text-xs">
        <span aria-hidden="true">{"★".repeat(review.rating)}</span>
        <span className="text-airbnb-secondary">· {review.date}</span>
      </div>
      <p className="text-sm mt-2 leading-relaxed">{shown}</p>
      {isLong && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="underline font-medium text-sm mt-1"
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default function Reviews({
  rating,
  reviewCount,
  categories,
  tags,
  reviews,
}: ReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <div id="reviews" className="py-8 border-b border-airbnb-border scroll-mt-24">
      <div className="text-center mb-8">
        <p className="text-5xl font-semibold mb-2" aria-hidden="true">
          🍃 {rating} 🍃
        </p>
        <p className="text-xl font-semibold">Guest favourite</p>
        <p className="text-sm text-airbnb-secondary max-w-md mx-auto mt-2">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="underline text-sm font-medium mt-2">How reviews work</button>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {Object.entries(categories).map(([key, value]) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">{CATEGORY_LABELS[key] ?? key}</span>
              <span className="text-xs font-medium">{value}</span>
            </div>
            <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#222222] rounded-full"
                style={{ width: `${(value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="border border-airbnb-border rounded-full px-4 py-2 text-sm"
          >
            {tag.label} <span className="text-airbnb-secondary">{tag.count}</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        {visibleReviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>

      {!showAll && reviewCount > 6 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-8 border border-[#222222] rounded-lg px-6 py-3 text-sm font-semibold hover:bg-airbnb-gray-hover transition-colors duration-150"
        >
          Show all {reviewCount} reviews
        </button>
      )}
    </div>
  );
}
