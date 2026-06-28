import { useState } from "react";

import RatingInput from "./RatingInput";

import { useCreateReview } from "../hooks/useCreateReview";

interface Props {
  companyId: string;
}

import AppButton from "@/components/common/AppButton";
import AppTextarea from "@/components/common/AppTextarea";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

export default function ReviewForm({ companyId }: Props) {
  const [rating, setRating] = useState(5);

  const [review, setReview] = useState("");

  const createReview = useCreateReview();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!review.trim()) {
      toast.error("Review cannot be empty");
      return;
    }

    await createReview.mutateAsync({
      companyId,
      userId: user?.uid || "",
      userName: user?.name || user?.email || "Anonymous",
      userPhotoURL: user?.photoURL || "",
      rating,
      review,
    });

    setReview("");
    setRating(5);
    toast.success("Review submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3
        className="
  text-sm
  font-medium
  text-body
  "
      >
        Overall Rating
      </h3>

      <div className="rounded-2xl bg-background p-4">
        <p className="text-sm font-medium mb-3">How was your experience?</p>

        <RatingInput value={rating} onChange={setRating} />
      </div>

      <AppTextarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your internship experience, work environment, mentorship, and company culture..."
        className="min-h-[140px}"
      />

      <AppButton type="submit">Submit Review</AppButton>
    </form>
  );
}
