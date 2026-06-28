import {
  Briefcase,
  Users,
  Star,
  Building2,
  Globe,
  MapPin,
} from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import StatCard from "@/components/shared/StatCard";

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

  if (isLoading) return <LoadingState />;

  const acceptanceRate = dashboard?.totalApplicants
    ? Math.round((dashboard.acceptedApplicants / dashboard.totalApplicants) * 100)
    : 0;

  if (!dashboard) {
    return <EmptyState title="No Dashboard Data" description="Dashboard data unavailable" />;
  }

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-purple-700 p-6 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div>
              <p className="text-blue-100 text-sm">Welcome Back</p>
              <h1 className="mt-2 text-3xl font-medium">{company?.name || "Your Company"}</h1>
              <p className="mt-1 text-blue-100">{company?.industry || "Company Profile"}</p>
              {company?.verified && (
                <span className="inline-flex mt-3 rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200 border border-emerald-500/20">
                  ✓ Verified Company
                </span>
              )}
              {company?.location && (
                <div className="mt-2 flex items-center gap-2 text-blue-100 text-sm">
                  <MapPin size="14" />
                  <span>{company.location}</span>
                </div>
              )}
              {company?.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 text-blue-100 hover:text-white text-sm transition-colors">
                  <Globe size="14" />
                  <span className="truncate">{company.website}</span>
                </a>
              )}
              <div className="mt-4 flex items-center gap-2">
                <Star size="16" className="fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium">{company?.avgRating || 0}</span>
                <span className="text-blue-100 text-sm">({company?.reviewCount || 0} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Total Applicants</p>
              <h2 className="text-5xl font-medium">{dashboard.totalApplicants || 0}</h2>
              <p className="mt-1 text-blue-100 text-sm">Acceptance Rate: {acceptanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 animate-fade-in-up animate-delay-100">
        <Link to="/company/internships">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Briefcase className="text-primary mb-2" size="20" />
            <h3 className="font-medium">Manage Internships</h3>
            <p className="text-sm text-secondary-text">Create and manage internship postings</p>
          </AppCard>
        </Link>
        <Link to="/company/internships">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Users className="text-primary mb-2" size="20" />
            <h3 className="font-medium">View Applicants</h3>
            <p className="text-sm text-secondary-text">Review student applications</p>
          </AppCard>
        </Link>
        <Link to="/company/profile">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Building2 className="text-primary mb-2" size="20" />
            <h3 className="font-medium">Company Profile</h3>
            <p className="text-sm text-secondary-text">Update company information</p>
          </AppCard>
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5 animate-fade-in-up animate-delay-200">
        <StatCard title="Internships" value={dashboard.totalInternships || 0} gradient="blue" />
        <StatCard title="Applicants" value={dashboard.totalApplicants || 0} gradient="purple" />
        <StatCard title="Pending" value={dashboard.pendingApplicants || 0} gradient="amber" />
        <StatCard title="Accepted" value={dashboard.acceptedApplicants || 0} gradient="emerald" />
        <StatCard title="Rejected" value={dashboard.rejectedApplicants || 0} gradient="rose" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h2 className="text-base font-medium mb-1">Recent Applicants</h2>
          <p className="text-sm text-secondary-text mb-4">Latest internship applications</p>
          {dashboard.applications?.length === 0 ? (
            <EmptyState title="No Applicants Yet" description="Applications will appear here" />
          ) : (
            <div className="space-y-3">
              {dashboard.applications?.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8FAFF] transition-colors -mx-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-medium shrink-0">
                      {application.applicantName?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{application.applicantName}</p>
                      <p className="text-xs text-secondary-text">{application.internshipTitle}</p>
                    </div>
                  </div>
                  <StatusBadge status={application.status} />
                </div>
              ))}
            </div>
          )}
        </AppCard>

        <AppCard>
          <h2 className="text-base font-medium mb-1">Active Internships</h2>
          <p className="text-sm text-secondary-text mb-4">Your latest internship postings</p>
          {dashboard.internships?.length === 0 ? (
            <EmptyState title="No Internships" description="Create your first internship" />
          ) : (
            <div className="space-y-3">
              {dashboard.internships?.slice(0, 5).map((internship) => (
                <div key={internship.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8FAFF] transition-colors -mx-3">
                  <div>
                    <p className="text-sm font-medium">{internship.title}</p>
                    <p className="text-xs text-secondary-text">{internship.location}</p>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h2 className="text-base font-medium mb-1">Application Analytics</h2>
          <p className="text-sm text-secondary-text mb-4">Overview of applicant statuses</p>
          {dashboard.totalApplicants === 0 ? (
            <EmptyState title="No Analytics Yet" description="Application statistics will appear here once students apply." />
          ) : (
            <CompanyAnalyticsChart pending={dashboard.pendingApplicants} accepted={dashboard.acceptedApplicants} rejected={dashboard.rejectedApplicants || 0} />
          )}
        </AppCard>

        <AppCard>
          <h2 className="text-base font-medium mb-1">Top Performing Internships</h2>
          <p className="text-sm text-secondary-text mb-4">Ranked by number of applicants</p>
          {dashboard.internshipPerformance?.length === 0 ? (
            <EmptyState title="No Performance Data" description="Internship statistics will appear here." />
          ) : (
            <div className="space-y-3">
              {dashboard.internshipPerformance?.slice(0, 5).map((internship, index) => (
                <div key={internship.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-medium shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{internship.title}</p>
                      <p className="text-xs text-secondary-text">{internship.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium text-primary">{internship.applicants}</p>
                    <p className="text-xs text-secondary-text">Applicants</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h2 className="text-base font-medium mb-1">Recent Reviews</h2>
          <p className="text-sm text-secondary-text mb-4">Latest student feedback</p>
          {dashboard.reviews?.length === 0 ? (
            <EmptyState title="No Reviews Yet" description="Reviews from students will appear here." />
          ) : (
            <div className="space-y-4">
              {dashboard.reviews?.slice(0, 3).map((review) => (
                <div key={review.id} className="p-4 rounded-xl border border-border hover:border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-medium">
                      {review.userName?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.userName}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size="10" className={star <= review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-body">{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </PageContainer>
  );
}
