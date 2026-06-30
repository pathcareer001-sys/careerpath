import AppCard from "@/components/common/AppCard";

import RatingStars from "./RatingStars";

import type { Review } from "@/types/review";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <AppCard
      className="
  transition-all
  duration-200
  hover:-translate-y-1
  "
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full shrink-0 overflow-hidden">
              {review.userPhotoURL ? (
                <img src={review.userPhotoURL} alt={review.userName} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-primary flex items-center justify-center text-white font-medium">
                  {review.userName.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium">{review.userName}</h4>

              <p className="text-xs text-secondary-text">Mahasiswa Magang</p>
            </div>
          </div>

          <div
            className="
        rounded-xl
        bg-warning/10
        px-3
        py-2
        "
          >
            <RatingStars rating={review.rating} />
          </div>
        </div>

        <blockquote
          className="
      text-body
      leading-7
      border-l-4
      border-primary
      pl-4
      "
        >
          "{review.review}"
        </blockquote>
      </div>
    </AppCard>
  );
}
