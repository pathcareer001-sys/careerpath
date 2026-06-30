import { useParams, Link } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import VerifiedBadge from "@/components/company/VerifiedBadge";
import ReviewCard from "@/features/reviews/components/ReviewCard";
import ReviewForm from "@/features/reviews/components/ReviewForm";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import { useCompany } from "@/features/companies/hooks/useCompany";
import { useReviews } from "@/features/reviews/hooks/useReviews";

export default function CompanyReviewPage() {
  const { id } = useParams();
  const { data: company, isLoading } = useCompany(id || "");
  const reviews = useReviews(id || "");

  if (isLoading) return <LoadingState />;

  if (!company) {
    return <EmptyState title="Perusahaan tidak ditemukan" description="Perusahaan mungkin telah dihapus." />;
  }

  return (
    <PageContainer>
      <Link to={`/companies/${id}`} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary mb-4 transition-colors">
        <ArrowLeft size="14" /> Kembali ke {company.name}
      </Link>

      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl shrink-0 overflow-hidden">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
                {company.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-medium text-heading">Ulasan & Rating</h1>
            <p className="text-sm text-secondary-text flex items-center gap-1">
              {company.name}
              <VerifiedBadge show={company.subscription === "premium"} size={12} />
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 p-4 rounded-xl bg-gradient-to-br from-warning/10 to-accent border border-warning/30 animate-fade-in-up animate-delay-100">
        <div className="text-center">
          <p className="text-4xl font-medium text-heading">{company.avgRating || 0}</p>
          <div className="flex items-center gap-0.5 mt-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size="16" className={star <= Math.round(company.avgRating || 0) ? "fill-warning text-warning" : "text-muted"} />
            ))}
          </div>
          <p className="text-xs text-secondary-text mt-1">{company.reviewCount || 0} ulasan</p>
        </div>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4 animate-fade-in-up animate-delay-200">
          {reviews.data?.length === 0 ? (
            <EmptyState title="Belum ada ulasan" description="Jadilah yang pertama memberi ulasan perusahaan ini." />
          ) : (
            reviews.data?.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </div>

        <div className="animate-fade-in-up animate-delay-300">
          <AppCard>
            <h3 className="text-sm font-medium text-heading mb-3">Tulis Ulasan</h3>
            <p className="text-xs text-secondary-text mb-4">Bagikan pengalaman Anda untuk membantu mahasiswa lain.</p>
            <ReviewForm companyId={company.id} />
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
