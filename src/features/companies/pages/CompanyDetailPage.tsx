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

import { useCompanyInternshipsByCompanyId } from "@/features/internships/hooks/useCompanyInternshipsByCompanyId";

import InternshipCard from "@/features/internships/components/InternshipCard";
import {
  BadgeCheck,
  BriefcaseBusiness,
  MessageSquare,
  Star,
} from "lucide-react";

export default function CompanyDetailPage() {
  const { id } = useParams();

  const { data: company, isLoading } = useCompany(id || "");

  const reviews = useReviews(id || "");
  const { data: internships } = useCompanyInternshipsByCompanyId(
    company?.id || "",
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (!company) {
    return (
      <EmptyState
        title="Company Not Found"
        description="The company may have been removed."
      />
    );
  }

  return (
    <PageContainer>
      <CompanyHero company={company} />
      <AppCard className="mt-6">
        <div
          className="
    grid
    gap-4
    sm:grid-cols-2
    lg:grid-cols-4
    "
        >
          <div
            className="
      rounded-2xl
      bg-blue-50
      p-5
      "
          >
            <div className="flex items-center gap-2 text-blue-600">
              <Star
                size={18}
                className="
          fill-yellow-400
          text-yellow-400
          "
              />

              <span className="text-sm font-medium">Company Rating</span>
            </div>

            <p className="mt-3 text-3xl font-bold">{company.avgRating || 0}</p>
          </div>

          <div
            className="
      rounded-2xl
      bg-amber-50
      p-5
      "
          >
            <div className="flex items-center gap-2 text-amber-600">
              <MessageSquare size={18} />

              <span className="text-sm font-medium">Reviews</span>
            </div>

            <p className="mt-3 text-3xl font-bold">
              {company.reviewCount || 0}
            </p>
          </div>

          <div
            className="
      rounded-2xl
      bg-emerald-50
      p-5
      "
          >
            <div className="flex items-center gap-2 text-emerald-600">
              <BriefcaseBusiness size={18} />

              <span className="text-sm font-medium">Open Positions</span>
            </div>

            <p className="mt-3 text-3xl font-bold">
              {internships?.length || 0}
            </p>
          </div>

          <div
            className="
      rounded-2xl
      bg-violet-50
      p-5
      "
          >
            <div className="flex items-center gap-2 text-violet-600">
              <BadgeCheck size={18} />

              <span className="text-sm font-medium">Verification</span>
            </div>

            <p className="mt-3 text-lg font-bold">
              {company.verified ? "Verified" : "Pending"}
            </p>
          </div>
        </div>
      </AppCard>
      <div
        className="
  grid
  mt-6
  gap-6
  lg:grid-cols-[2fr_1fr]
  "
      >
        <div className="space-y-6">
          <AppCard>
            <h2
              className="
              text-2xl
              font-bold
              mb-4
              "
            >
              About Company
            </h2>

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
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Open Internships</h2>

              <p className="text-slate-500">
                Available internship opportunities
              </p>
            </div>

            {internships?.length === 0 ? (
              <EmptyState
                title="No Open Internships"
                description="This company has no active internships."
              />
            ) : (
              <div
                className="
                grid
                gap-4
                md:grid-cols-2
                "
              >
                {internships?.slice(0, 4).map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            )}
          </AppCard>

          <AppCard>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Student Reviews</h2>

                <p className="text-slate-500">Real experiences from interns</p>
              </div>

              <div
                className="
  flex
  items-center
  gap-2
  rounded-xl
  bg-blue-50
  px-4
  py-2
  "
              >
                <Star
                  size={16}
                  className="
    fill-yellow-400
    text-yellow-400
    "
                />

                <span className="font-medium">{company.avgRating || 0}</span>

                <span className="text-blue-600">
                  ({reviews.data?.length || 0})
                </span>
              </div>
            </div>

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

          <AppCard
            className="
  overflow-hidden
  border-0
  bg-gradient-to-br
  from-slate-50
  to-white
  "
          >
            <div className="mb-6">
              <span
                className="
      inline-flex
      rounded-full
      bg-yellow-100
      px-3
      py-1
      text-xs
      font-medium
      text-yellow-700
      "
              >
                Share Experience
              </span>

              <h2
                className="
      mt-3
      text-2xl
      font-bold
      "
              >
                Write a Review
              </h2>

              <p className="mt-2 text-slate-500">
                Help other students understand the company culture, mentorship
                quality, and internship experience.
              </p>
            </div>

            <ReviewForm companyId={company.id} />
          </AppCard>
        </div>

        <div className="space-y-6">
          <AppCard>
            <h3 className="font-semibold mb-4">Company Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500">Industry</p>

                <p className="font-medium">{company.industry}</p>
              </div>
              <div>
                <p className="text-slate-500">Location</p>

                <p className="font-medium">{company.location}</p>
              </div>
              <div>
                <p className="text-slate-500">Website</p>

                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
      font-medium
      text-blue-600
      "
                  >
                    Visit Website
                  </a>
                ) : (
                  <p className="font-medium">-</p>
                )}
              </div>
            </div>
          </AppCard>

          <AppCard>
            <div>
              <h3 className="font-semibold mb-4">Company Stats</h3>

              <div className="grid grid-cols-1 gap-3">
                <div
                  className="
                rounded-xl
                bg-blue-50
                p-4
                text-center
                "
                >
                  <p className="text-xs text-slate-500">Rating</p>

                  <div
                    className="
  mt-2
  flex
  items-center
  justify-center
  gap-2
  "
                  >
                    <Star
                      size={16}
                      className="
    fill-yellow-400
    text-yellow-400
    "
                    />

                    <span className="text-xl font-bold text-blue-600">
                      {company.avgRating || 0}
                    </span>
                  </div>
                </div>

                <div
                  className="
      rounded-xl
      bg-amber-50
      p-4
      text-center
      "
                >
                  <p className="text-xs text-slate-500">Reviews</p>

                  <p className="mt-1 text-xl font-bold text-amber-600">
                    {company.reviewCount || 0}
                  </p>
                </div>

                <div
                  className="
      rounded-xl
      bg-green-50
      p-4
      text-center
      "
                >
                  <p className="text-xs text-slate-500">Verified</p>

                  <p className="mt-1 text-xl font-bold text-green-600">
                    {company.verified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
