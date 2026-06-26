// src/features/companies/pages/CompanyDashboardPage.tsx

import {
  Briefcase,
  Users,
  Clock3,
  CheckCircle2,
  Star,
  Building2,
  Globe,
  MapPin,
  XCircle,
  MessageSquare,
} from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";

import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { useCompanyDashboard } from "../hooks/useCompanyDashboard";
import { useCompanyByOwnerId } from "../hooks/useCompanyByOwnerId";
import CompanyAnalyticsChart from "../components/CompanyAnalyticsChart";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { Link } from "react-router-dom";
export default function CompanyDashboardPage() {
  const { user } = useAuth();

  const { data: dashboard, isLoading } = useCompanyDashboard(user?.uid || "");

  const { data: company } = useCompanyByOwnerId(user?.uid || "");
  if (isLoading) {
    return <LoadingState />;
  }
  const acceptanceRate = dashboard?.totalApplicants
    ? Math.round(
        (dashboard.acceptedApplicants / dashboard.totalApplicants) * 100,
      )
    : 0;
  if (!dashboard) {
    return (
      <EmptyState
        title="No Dashboard Data"
        description="Dashboard data unavailable"
      />
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Company Dashboard"
        description="Manage internships and applicants"
      />

      {/* HERO */}
      <AppCard
        className="
        overflow-hidden
        border-0
        bg-gradient-to-r
        from-blue-600
        via-blue-500
        to-indigo-600
        text-white
        "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div>
            <p className="text-blue-100">Welcome Back</p>

            <h1
              className="
              mt-2
              text-3xl
              font-bold
              "
            >
              {company?.name || "Your Company"}
            </h1>

            <p className="mt-2 text-blue-100">
              {company?.industry || "Company Profile"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {company?.verified && (
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs">
                  ✓ Verified Company
                </span>
              )}
            </div>
            {company?.location && (
              <div
                className="
    mt-2
    flex
    items-center
    gap-2
    text-blue-100
    "
              >
                <MapPin size={16} />

                <span>{company.location}</span>
              </div>
            )}

            {company?.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="
    mt-2
    flex
    items-center
    gap-2
    text-blue-100
    hover:text-white
    "
              >
                <Globe size={16} />

                <span className="truncate">{company.website}</span>
              </a>
            )}

            <div className="mt-4 flex gap-2">
              <Star
                size={18}
                className="
                fill-yellow-400
                text-yellow-400
                "
              />

              <span>{company?.avgRating || 0}</span>

              <span className="text-blue-100">
                ({company?.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-blue-100">Total Applicants</p>

            <h2
              className="
              text-5xl
              font-bold
              "
            >
              {dashboard.totalApplicants || 0}
            </h2>
            <p className="mt-2 text-blue-100">
              Acceptance Rate: {acceptanceRate}%
            </p>
          </div>
        </div>
      </AppCard>

      <div
        className="
  mt-6
  grid
  gap-4
  md:grid-cols-3
  "
      >
        <Link to="/company/internships">
          <AppCard
            className="
      hover:border-blue-200
      hover:shadow-lg
      transition-all
      "
          >
            <Briefcase className="text-blue-600 mb-3" />

            <h3 className="font-semibold">Manage Internships</h3>

            <p className="text-sm text-slate-500">
              Create and manage internship postings
            </p>
          </AppCard>
        </Link>

        <Link to="/company/internships">
          <AppCard
            className="
      hover:border-blue-200
      hover:shadow-lg
      transition-all
      "
          >
            <Users className="text-blue-600 mb-3" />

            <h3 className="font-semibold">View Applicants</h3>

            <p className="text-sm text-slate-500">
              Review student applications
            </p>
          </AppCard>
        </Link>

        <Link to="/company/profile">
          <AppCard
            className="
      hover:border-blue-200
      hover:shadow-lg
      transition-all
      "
          >
            <Building2 className="text-blue-600 mb-3" />

            <h3 className="font-semibold">Company Profile</h3>

            <p className="text-sm text-slate-500">Update company information</p>
          </AppCard>
        </Link>
      </div>

      {/* STATS */}
      <div
        className="
        mt-6
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-5
        "
      >
        <StatCard
          title="Internships"
          value={dashboard.totalInternships || 0}
          icon={<Briefcase />}
        />

        <StatCard
          title="Applicants"
          value={dashboard.totalApplicants || 0}
          icon={<Users />}
        />

        <StatCard
          title="Pending"
          value={dashboard.pendingApplicants || 0}
          icon={<Clock3 />}
        />

        <StatCard
          title="Accepted"
          value={dashboard.acceptedApplicants || 0}
          icon={<CheckCircle2 />}
        />
        <StatCard
          title="Rejected"
          value={dashboard.rejectedApplicants || 0}
          icon={<XCircle />}
        />
      </div>

      {/* RECENT APPLICANTS */}
      <AppCard className="mt-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Recent Applicants</h2>

          <p className="text-sm text-slate-500">
            Latest internship applications
          </p>
        </div>

        {dashboard.applications?.length === 0 ? (
          <EmptyState
            title="No Applicants Yet"
            description="Applications will appear here"
          />
        ) : (
          <div className="space-y-4">
            {dashboard.applications?.slice(0, 5).map((application) => (
              <div
                key={application.id}
                className="
                  flex
                  items-center
                  justify-between
                  "
              >
                <div>
                  <p className="font-medium">{application.applicantName}</p>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      "
                  >
                    {application.internshipTitle}
                  </p>
                </div>

                <StatusBadge status={application.status} />
              </div>
            ))}
          </div>
        )}
      </AppCard>

      <AppCard className="mt-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Active Internships</h2>

          <p className="text-sm text-slate-500">
            Your latest internship postings
          </p>
        </div>

        {dashboard.internships?.length === 0 ? (
          <EmptyState
            title="No Internships"
            description="Create your first internship"
          />
        ) : (
          <div className="space-y-4">
            {dashboard.internships?.slice(0, 5).map((internship) => (
              <div
                key={internship.id}
                className="
            flex
            items-center
            justify-between
            "
              >
                <div>
                  <p className="font-medium">{internship.title}</p>

                  <p className="text-sm text-slate-500">
                    {internship.location}
                  </p>
                </div>

                <span
                  className="
              rounded-full
              bg-green-50
              px-3
              py-1
              text-xs
              font-medium
              text-green-600
              "
                >
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </AppCard>
      <AppCard className="mt-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Application Analytics</h2>

          <p className="text-sm text-slate-500">
            Overview of applicant statuses
          </p>
        </div>

        {dashboard.totalApplicants === 0 ? (
          <EmptyState
            title="No Analytics Yet"
            description="Application statistics will appear here once students apply."
          />
        ) : (
          <CompanyAnalyticsChart
            pending={dashboard.pendingApplicants}
            accepted={dashboard.acceptedApplicants}
            rejected={dashboard.rejectedApplicants || 0}
          />
        )}
      </AppCard>

      <AppCard className="mt-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Top Performing Internships</h2>

          <p className="text-sm text-slate-500">
            Ranked by number of applicants
          </p>
        </div>
        {dashboard.internshipPerformance?.length === 0 ? (
          <EmptyState
            title="No Performance Data"
            description="Internship statistics will appear here."
          />
        ) : (
          <div className="space-y-4">
            {dashboard.internshipPerformance
              ?.slice(0, 5)
              .map((internship, index) => (
                <div
                  key={internship.id}
                  className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          p-4
          "
                >
                  <div>
                    <p className="font-semibold">
                      #{index + 1} {internship.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      {internship.location}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {internship.applicants}
                    </p>

                    <p className="text-xs text-slate-500">Applicants</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </AppCard>
      <AppCard className="mt-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Recent Reviews</h2>

          <p className="text-sm text-slate-500">Latest student feedback</p>
        </div>

        {dashboard.reviews?.length === 0 ? (
          <EmptyState
            title="No Reviews Yet"
            description="Reviews from students will appear here."
          />
        ) : (
          <div className="space-y-4">
            {dashboard.reviews?.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="
            rounded-xl
            border
            p-4
            "
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-600" />

                  <div>
                    <p className="font-semibold">{review.userName}</p>

                    <p className="text-sm text-slate-500">
                      {review.rating}/5 Rating
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-slate-600">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </AppCard>
    </PageContainer>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <AppCard>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3
            className="
            mt-2
            text-3xl
            font-bold
            "
          >
            {value}
          </h3>
        </div>

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-blue-50
          flex
          items-center
          justify-center
          text-blue-600
          "
        >
          {icon}
        </div>
      </div>
    </AppCard>
  );
}
