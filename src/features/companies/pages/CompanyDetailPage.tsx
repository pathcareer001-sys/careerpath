import { useParams, Link } from "react-router-dom";
import { Star, BadgeCheck, Globe, MapPin, Building2 } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import { useCompany } from "../hooks/useCompany";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import ReviewCard from "@/features/reviews/components/ReviewCard";
import ReviewForm from "@/features/reviews/components/ReviewForm";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import { useCompanyInternshipsByCompanyId } from "@/features/internships/hooks/useCompanyInternshipsByCompanyId";
import InternshipCard from "@/features/internships/components/InternshipCard";
import BookmarkButton from "@/features/bookmarks/components/BookmarkButton";

export default function CompanyDetailPage() {
  const { id } = useParams();
  const { data: company, isLoading } = useCompany(id || "");
  const reviews = useReviews(id || "");
  const { data: internships } = useCompanyInternshipsByCompanyId(company?.id || "");

  if (isLoading) return <LoadingState />;

  if (!company) {
    return <EmptyState title="Company not found" description="The company may have been removed." />;
  }

  return (
    <PageContainer>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent to-section p-6 text-heading animate-fade-in-up">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-section blur-3xl" />
        <div className="relative z-10 flex items-start gap-5">
          <div className="h-16 w-16 rounded-2xl bg-surface flex items-center justify-center text-primary text-2xl font-medium shrink-0 border border-border">
            {company.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] font-medium">{company.name}</h1>
              {company.verified && <BadgeCheck size="20" className="text-primary/60" />}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body mt-1">
              <span className="flex items-center gap-1"><MapPin size="14" />{company.location}</span>
              <span className="flex items-center gap-1"><Building2 size="14" />{company.industry}</span>
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-secondary-text hover:text-primary transition-colors">
                  <Globe size="14" />Website
                </a>
              )}
            </div>
          </div>
          <div className="shrink-0">
            <BookmarkButton companyId={company.id} />
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-6 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-[22px] font-medium">{company.avgRating || 0}</p>
            <div className="flex items-center gap-0.5 mt-1 justify-center">
              <Star size="14" className="fill-warning text-warning" />
            </div>
            <p className="text-xs text-secondary-text mt-0.5">Rating</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-[22px] font-medium">{company.reviewCount || 0}</p>
            <p className="text-xs text-secondary-text mt-1">Reviews</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-[22px] font-medium">{internships?.length || 0}</p>
            <p className="text-xs text-secondary-text mt-1">Open roles</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 animate-fade-in-up animate-delay-100">
          <AppCard>
            <h2 className="text-base font-medium text-heading mb-3">About</h2>
            <p className="text-sm text-body leading-relaxed">{company.description}</p>
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-4">Open Internships</h2>
            {internships?.length === 0 ? (
              <EmptyState title="No open internships" description="This company has no active positions." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {internships?.slice(0, 4).map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            )}
          </AppCard>

          <AppCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-heading">Reviews ({reviews.data?.length || 0})</h2>
              <div className="flex items-center gap-3">
                <Link to={`/companies/${id}/reviews`} className="text-xs font-medium text-primary hover:text-primary transition-colors">
                  View all &rarr;
                </Link>
                <div className="flex items-center gap-1 text-sm text-secondary-text">
                  <Star size="14" className="fill-warning text-warning" />
                  {company.avgRating || 0}
                </div>
              </div>
            </div>
            {reviews.data?.length === 0 ? (
              <EmptyState title="No reviews yet" description="Be the first to review this company." />
            ) : (
              <div className="space-y-3">
                {reviews.data?.map((review) => <ReviewCard key={review.id} review={review} />)}
              </div>
            )}
          </AppCard>
        </div>

        <div className="space-y-4 animate-fade-in-up animate-delay-200">
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
