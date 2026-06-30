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
      toast.error("Ulasan tidak boleh kosong");
      return;
    }

    try {
      await createReview.mutateAsync({
        companyId,
        userId: user?.uid || "",
        userName: user?.name || user?.email || "Anonim",
        userPhotoURL: user?.photoURL || "",
        rating,
        review,
      });

      setReview("");
      setRating(5);
      toast.success("Ulasan terkirim");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Gagal mengirim ulasan";
      toast.error(message);
    }
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
        Rating Keseluruhan
      </h3>

      <div className="rounded-2xl bg-background p-4">
        <p className="text-sm font-medium mb-3">Bagaimana pengalaman Anda?</p>

        <RatingInput value={rating} onChange={setRating} />
      </div>

      <AppTextarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Bagikan pengalaman magang Anda, lingkungan kerja, bimbingan, dan budaya perusahaan..."
        className="min-h-[140px}"
      />

      <AppButton type="submit">Kirim Ulasan</AppButton>
    </form>
  );
}
