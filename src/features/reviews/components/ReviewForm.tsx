import { useState } from "react";

import RatingInput from "./RatingInput";

import { useCreateReview } from "../hooks/useCreateReview";

interface Props {
  companyId: string;
}

import AppButton from "@/components/common/AppButton";
import AppTextarea from "@/components/common/AppTextarea";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ReviewForm({ companyId }: Props) {
  const [rating, setRating] = useState(5);

  const [review, setReview] = useState("");

  const createReview = useCreateReview();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createReview.mutateAsync({
      companyId,
      userId: user?.uid || "",
      userName: user?.displayName || user?.email || "Anonymous",
      rating,
      review,
    });

    setReview("");
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RatingInput value={rating} onChange={setRating} />

      <AppTextarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
      />

      <AppButton type="submit">Submit Review</AppButton>
    </form>
  );
}
