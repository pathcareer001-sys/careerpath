import { useParams } from "react-router-dom";

import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";

import { useCompany } from "../hooks/useCompany";
import { useReviews } from "@/features/reviews/hooks/useReviews";

import ReviewCard from "@/features/reviews/components/ReviewCard";
import CompanyHero from "../components/CompanyHero";

import ReviewForm from "@/features/reviews/components/ReviewForm";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

export default function CompanyDetailPage() {
  const { id } = useParams();

  const { data: company, isLoading } = useCompany(id || "");

  const reviews = useReviews(id || "");

  if (isLoading) {
    return <LoadingState />;
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <PageContainer>
      <CompanyHero company={company} />

      <AppCard>
        <div className="mb-4">
          <h2
            className="
            text-xl
            font-semibold
            "
          >
            About Company
          </h2>
        </div>

        <p
          className="
          text-slate-600
          leading-7
          "
        >
          {company.description}
        </p>
      </AppCard>

      <AppCard>
        <div className="mb-4">
          <h2
            className="
      text-xl
      font-semibold
      "
          >
            Write Review
          </h2>

          <p
            className="
      text-sm
      text-slate-500
      mt-1
      "
          >
            Share your internship experience
          </p>
        </div>

        <ReviewForm companyId={company.id} />
      </AppCard>

      <AppCard>
        <h2 className="font-semibold mb-4">Reviews</h2>

        {reviews.data?.length === 0 ? (
          <EmptyState
            title="No Reviews Yet"
            description="Be the first to review this company"
          />
        ) : (
          <div className="space-y-4">
            {reviews.data?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </AppCard>
    </PageContainer>
  );
}
