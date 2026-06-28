import { useParams, Link } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
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
    return <EmptyState title="Company not found" description="The company may have been removed." />;
  }

  return (
    <PageContainer>
      <Link to={`/companies/${id}`} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary mb-4 transition-colors">
        <ArrowLeft size="14" /> Back to {company.name}
      </Link>

      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-medium">
            {company.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-medium text-[#0F172A]">Reviews & Ratings</h1>
            <p className="text-sm text-secondary-text">{company.name}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 animate-fade-in-up animate-delay-100">
        <div className="text-center">
          <p className="text-4xl font-medium text-heading">{company.avgRating || 0}</p>
          <div className="flex items-center gap-0.5 mt-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size="16" className={star <= Math.round(company.avgRating || 0) ? "fill-amber-400 text-amber-400" : "text-muted"} />
            ))}
          </div>
          <p className="text-xs text-secondary-text mt-1">{company.reviewCount || 0} reviews</p>
        </div>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4 animate-fade-in-up animate-delay-200">
          {reviews.data?.length === 0 ? (
            <EmptyState title="No reviews yet" description="Be the first to review this company." />
          ) : (
            reviews.data?.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </div>

        <div className="animate-fade-in-up animate-delay-300">
          <AppCard>
            <h3 className="text-sm font-medium text-heading mb-3">Write a Review</h3>
            <p className="text-xs text-secondary-text mb-4">Share your experience to help other students.</p>
            <ReviewForm companyId={company.id} />
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
