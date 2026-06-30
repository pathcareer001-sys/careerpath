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
    toast.success("Ulasan disetujui");
  };

  const handleReject = async (id: string) => {
    await updateModeration.mutateAsync({ id, moderationStatus: "rejected" });
    toast.success("Ulasan ditolak");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus ulasan ini? Tindakan ini tidak dapat dibatalkan.")) return;
    await deleteReview.mutateAsync(id);
    toast.success("Ulasan dihapus");
  };

  return (
    <PageContainer>
      <PageHeader title="Moderasi Ulasan" description="Moderasi ulasan perusahaan yang diajukan mahasiswa" />

      <div className="mt-6 space-y-6 animate-fade-in-up">
        <SearchBar value={search} onChange={setSearch} placeholder="Cari ulasan berdasarkan pengguna atau konten..." />

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-section p-0.5 rounded-lg">
            <TabsTrigger
              value="pending"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
            >
              <Clock size="15" />
              Tertunda
              {pendingCount > 0 && (
                <span className="ml-0.5 rounded-full bg-warning/10 px-1.5 py-0.5 text-[11px] font-medium text-warning">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
            >
              <Check size="15" />
              Disetujui
              {approvedCount > 0 && (
                <span className="ml-0.5 rounded-full bg-success/10 px-1.5 py-0.5 text-[11px] font-medium text-success">
                  {approvedCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
            >
              <X size="15" />
              Ditolak
              {rejectedCount > 0 && (
                <span className="ml-0.5 rounded-full bg-error/10 px-1.5 py-0.5 text-[11px] font-medium text-error">
                  {rejectedCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {["pending", "approved", "rejected"].map((t) => (
            <TabsContent key={t} value={t} className="mt-6">
              {filtered.length === 0 ? (
                <EmptyState title={`Tidak ada ulasan ${t === "pending" ? "tertunda" : t === "approved" ? "disetujui" : "ditolak"}`} description={`Tidak ada ulasan yang cocok dengan pencarian Anda.`} />
              ) : (
                <div className="space-y-4">
                  {filtered.map((review) => (
                    <AppCard key={review.id}>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full shrink-0 overflow-hidden shadow-sm">
                            {review.userPhotoURL ? (
                              <img src={review.userPhotoURL} alt={review.userName} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
                                {review.userName?.charAt(0) || "?"}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-heading">{review.userName || "Anonim"}</h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size="12" className={star <= review.rating ? "fill-warning text-warning" : "text-muted"} />
                              ))}
                              <span className="text-xs text-muted ml-1">({review.rating}/5)</span>
                            </div>
                            <p className="mt-2 text-sm text-body leading-relaxed">"{review.review}"</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tab === "pending" && (
                            <>
                              <AppButton
                                variant="primary"
                                onClick={() => handleApprove(review.id)}
                                disabled={updateModeration.isPending}
                              >
                                <Check size="14" /> Setujui
                              </AppButton>
                              <AppButton
                                variant="secondary"
                                className="text-error border-error/30 hover:bg-error/10"
                                onClick={() => handleReject(review.id)}
                                disabled={updateModeration.isPending}
                              >
                                <X size="14" /> Tolak
                              </AppButton>
                            </>
                          )}
                          <AppButton variant="danger" onClick={() => handleDelete(review.id)} disabled={deleteReview.isPending}>
                            <Trash2 size="14" /> Hapus
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
