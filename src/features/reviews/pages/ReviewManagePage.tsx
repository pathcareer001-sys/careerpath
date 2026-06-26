import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import { useAllReviews } from "../hooks/useAllReviews";
import { useDeleteReview } from "../hooks/useDeleteReview";

import EmptyState from "@/components/shared/EmptyState";

import { toast } from "sonner";

export default function ReviewManagePage() {
  const { data: reviews } = useAllReviews();

  const deleteReview = useDeleteReview();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete review?")) return;

    await deleteReview.mutateAsync(id);

    toast.success("Review deleted");
  };

  return (
    <PageContainer>
      <PageHeader
        title="Review Management"
        description="Manage company reviews"
      />

      {!reviews?.length ? (
        <EmptyState title="No Reviews" description="Reviews will appear here" />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <AppCard key={review.id}>
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{review.userName}</h3>

                  <p className="text-sm text-slate-500">
                    Rating: {review.rating}/5
                  </p>

                  <p className="mt-2">{review.review}</p>
                </div>

                <AppButton onClick={() => handleDelete(review.id)}>
                  Delete
                </AppButton>
              </div>
            </AppCard>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
