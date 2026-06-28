import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import { useAllReviews } from "@/features/reviews/hooks/useAllReviews";
import { useDeleteReview } from "@/features/reviews/hooks/useDeleteReview";
import { useUpdateReviewModeration } from "@/features/reviews/hooks/useUpdateReviewModeration";
import { Star, Trash2, Check, X, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ReviewModerationPage() {
  const { data: reviews } = useAllReviews();
  const deleteReview = useDeleteReview();
  const updateModeration = useUpdateReviewModeration();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("pending");

  const filtered = reviews?.filter((r) => {
    const matchesTab =
      tab === "pending"
        ? !r.moderationStatus || r.moderationStatus === "pending"
        : r.moderationStatus === tab;
    const matchesSearch =
      r.userName?.toLowerCase().includes(search.toLowerCase()) ||
      r.review?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  }) || [];

  const pendingCount = reviews?.filter(
    (r) => !r.moderationStatus || r.moderationStatus === "pending"
  ).length || 0;

  const approvedCount = reviews?.filter(
    (r) => r.moderationStatus === "approved"
  ).length || 0;

  const rejectedCount = reviews?.filter(
    (r) => r.moderationStatus === "rejected"
  ).length || 0;

  const handleApprove = async (id: string) => {
    await updateModeration.mutateAsync({ id, moderationStatus: "approved" });
    toast.success("Review approved");
  };

  const handleReject = async (id: string) => {
    await updateModeration.mutateAsync({ id, moderationStatus: "rejected" });
    toast.success("Review rejected");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review? This action cannot be undone.")) return;
    await deleteReview.mutateAsync(id);
    toast.success("Review deleted");
  };

  return (
    <PageContainer>
      <PageHeader title="Review Moderation" description="Moderate company reviews submitted by students" />

      <div className="mt-6 space-y-6 animate-fade-in-up">
        <SearchBar value={search} onChange={setSearch} placeholder="Search reviews by user or content..." />

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-[#F1F5F9] p-0.5 rounded-lg">
            <TabsTrigger
              value="pending"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-[#0F172A] data-active:shadow-sm transition-all"
            >
              <Clock size="15" />
              Pending
              {pendingCount > 0 && (
                <span className="ml-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-700">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-[#0F172A] data-active:shadow-sm transition-all"
            >
              <Check size="15" />
              Approved
              {approvedCount > 0 && (
                <span className="ml-0.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700">
                  {approvedCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-[#0F172A] data-active:shadow-sm transition-all"
            >
              <X size="15" />
              Rejected
              {rejectedCount > 0 && (
                <span className="ml-0.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[11px] font-medium text-red-700">
                  {rejectedCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {["pending", "approved", "rejected"].map((t) => (
            <TabsContent key={t} value={t} className="mt-6">
              {filtered.length === 0 ? (
                <EmptyState title={`No ${t} reviews`} description={`No reviews match your search in ${t} tab.`} />
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
                            <h3 className="font-medium text-heading">{review.userName || "Anonymous"}</h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size="12" className={star <= review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"} />
                              ))}
                              <span className="text-xs text-muted ml-1">({review.rating}/5)</span>
                            </div>
                            <p className="mt-2 text-sm text-body leading-relaxed">"{review.review}"</p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {tab === "pending" && (
                            <>
                              <AppButton
                                className="bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500"
                                onClick={() => handleApprove(review.id)}
                                disabled={updateModeration.isPending}
                              >
                                <Check size="14" /> Approve
                              </AppButton>
                              <AppButton
                                variant="secondary"
                                className="text-error border-error/30 hover:bg-error/10"
                                onClick={() => handleReject(review.id)}
                                disabled={updateModeration.isPending}
                              >
                                <X size="14" /> Reject
                              </AppButton>
                            </>
                          )}
                          <AppButton variant="danger" onClick={() => handleDelete(review.id)} disabled={deleteReview.isPending}>
                            <Trash2 size="14" /> Delete
                          </AppButton>
                        </div>
                      </div>
                    </AppCard>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageContainer>
  );
}
