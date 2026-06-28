import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import SearchBar from "@/components/common/SearchBar";
import { useAllReviews } from "../hooks/useAllReviews";
import { useDeleteReview } from "../hooks/useDeleteReview";
import EmptyState from "@/components/shared/EmptyState";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ReviewManagePage() {
  const { data: reviews } = useAllReviews();
  const deleteReview = useDeleteReview();
  const [search, setSearch] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Delete review?")) return;
    await deleteReview.mutateAsync(id);
    toast.success("Review deleted");
  };

  const filtered = reviews?.filter((r) =>
    r.userName?.toLowerCase().includes(search.toLowerCase()) ||
    r.review?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-[#0F172A]">Review Management</h1>
        <p className="mt-1 text-sm text-secondary-text">Manage company reviews</p>
      </div>

      <div className="mt-6 space-y-6 animate-fade-in-up animate-delay-100">
        <SearchBar value={search} onChange={setSearch} placeholder="Search reviews..." />

        {filtered.length === 0 ? (
          <EmptyState title="No Reviews" description="Reviews will appear here" />
        ) : (
          <div className="space-y-4">
            {filtered.map((review) => (
              <AppCard key={review.id}>
                <div className="flex justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-sm font-medium shrink-0 shadow-sm">
                      {review.userName?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h3 className="font-medium text-heading">{review.userName}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size="12" className={star <= review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"} />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-body">{review.review}</p>
                    </div>
                  </div>
                  <AppButton variant="danger" onClick={() => handleDelete(review.id)}>
                    <Trash2 size="14" /> Delete
                  </AppButton>
                </div>
              </AppCard>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
