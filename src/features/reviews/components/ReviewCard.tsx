import AppCard from "@/components/common/AppCard";

import RatingStars from "./RatingStars";

import type { Review } from "@/types/review";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <AppCard
      className="
      transition-all
      duration-200
      hover:shadow-md
      "
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div
            className="
            w-10
            h-10
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
            shrink-0
            "
          >
            <span
              className="
              text-sm
              font-semibold
              text-blue-600
              "
            >
              {review.userName.charAt(0)}
            </span>
          </div>

          <div>
            <h4 className="font-semibold">{review.userName}</h4>

            <RatingStars rating={review.rating} />
          </div>
        </div>

        <p
          className="
          text-slate-600
          leading-7
          "
        >
          {review.review}
        </p>
      </div>
    </AppCard>
  );
}
