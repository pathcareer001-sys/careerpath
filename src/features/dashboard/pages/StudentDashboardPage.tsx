import { Briefcase, Bookmark, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";

import EmptyState from "@/components/shared/EmptyState";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApplications } from "@/features/applications/hooks/useApplications";
import StatusBadge from "@/features/applications/components/StatusBadge";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { Link } from "react-router-dom";

import { useInternships } from "@/features/internships/hooks/useInternships";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { calculateProfileCompletion } from "@/utils/profileCompletion";

export default function StudentDashboardPage() {
  const { user } = useAuth();

  const { applicationCount, bookmarkCount } = useDashboardStats(
    user?.uid || "",
  );

  const { data: applications } = useApplications(user?.uid || "");
  const { data: internships } = useInternships();
  const completion = calculateProfileCompletion(user ?? undefined);
  const hasPersonal = !!user?.name && !!user?.email;
  const hasEducation = !!user?.university;
  const hasSkills = !!user?.skills?.length;
  const hasResume = !!user?.resumeUrl;
  const hasSocial = !!user?.linkedin || !!user?.github || !!user?.portfolio;

  return (
    <PageContainer>
      <AppCard className="border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <ShieldCheck size={15} />
              Welcome Back
            </div>

            <h1 className="text-4xl font-bold">{user?.name}</h1>

            <p className="mt-2 text-blue-100">
              Track your internship journey and discover new opportunities.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/internships"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Browse Internships
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/applications"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              My Applications
            </Link>
          </div>
        </div>
      </AppCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link to="/internships">
          <AppCard className="transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/60">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <Briefcase size={20} />
              </div>

              <h3 className="font-semibold text-slate-950">Browse Internships</h3>

              <p className="text-sm text-slate-500">
                Discover new opportunities
              </p>
            </div>
          </AppCard>
        </Link>

        <Link to="/applications">
          <AppCard className="transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/60">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <TrendingUp size={20} />
              </div>

              <h3 className="font-semibold text-slate-950">My Applications</h3>

              <p className="text-sm text-slate-500">
                Track application progress
              </p>
            </div>
          </AppCard>
        </Link>

        <Link to="/bookmarks">
          <AppCard className="transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/60">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <Bookmark size={20} />
              </div>

              <h3 className="font-semibold text-slate-950">Saved Internships</h3>

              <p className="text-sm text-slate-500">
                View bookmarked positions
              </p>
            </div>
          </AppCard>
        </Link>

        <Link to="/profile">
          <AppCard className="transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/60">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <TrendingUp size={20} />
              </div>

              <h3 className="font-semibold text-slate-950">Edit Profile</h3>

              <p className="text-sm text-slate-500">
                Improve profile visibility
              </p>
            </div>
          </AppCard>
        </Link>
      </div>

      <div className="grid gap-4 border-y border-blue-100 bg-white/60 py-6 md:grid-cols-3">
        <div className="pr-4">
          <p className="text-sm text-slate-500">Applications</p>
          <p className="mt-1 text-3xl font-semibold text-blue-700">{applicationCount}</p>
          <p className="mt-1 text-sm text-slate-400">Total Applied</p>
        </div>

        <div className="border-x border-blue-100 px-4">
          <p className="text-sm text-slate-500">Bookmarks</p>
          <p className="mt-1 text-3xl font-semibold text-blue-700">{bookmarkCount}</p>
          <p className="mt-1 text-sm text-slate-400">Saved Jobs</p>
        </div>

        <div className="pl-4">
          <p className="text-sm text-slate-500">Profile Completion</p>
          <p className="mt-1 text-3xl font-semibold text-blue-700">{completion}%</p>
          <p className="mt-1 text-sm text-slate-400">
            {completion === 100 ? "Profile Complete" : "Keep improving"}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Recommended For You
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Based on your profile and interests
            </p>
          </div>

          <Link
            to="/internships"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </Link>
        </div>

        {internships?.length === 0 ? (
          <EmptyState
            title="No Internships"
            description="No recommendations available yet"
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internships?.slice(0, 3).map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AppCard>
          <h2 className="mb-5 text-lg font-semibold text-slate-950">Recent Activity</h2>

          {applications?.length === 0 ? (
            <EmptyState
              title="No Activity"
              description="Start applying to internships"
            />
          ) : (
            <div className="space-y-4">
              {applications?.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50/40 p-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">{item.internshipTitle}</p>

                    <p className="text-sm text-slate-500">
                      {item.companyName}
                    </p>

                    {"createdAt" in item && (
                      <p className="text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          )}
        </AppCard>

        <AppCard className="border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
          <h2 className="text-xl font-semibold">Complete Your Profile</h2>

          <p className="mt-2 text-blue-100">
            Complete your profile to get better internship recommendations.
          </p>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>
              <span>{completion}%</span>
            </div>

            <div className="h-2.5 rounded-full bg-white/20">
              <div
                className="h-2.5 rounded-full bg-white transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          <Link
            to="/profile"
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Edit Profile
            <ArrowRight size={15} />
          </Link>

          <div className="mt-6 space-y-2.5 border-t border-white/20 pt-6">
            {[
              [hasPersonal, "Personal Information"],
              [hasEducation, "Education"],
              [hasSkills, "Skills"],
              [hasResume, "Resume"],
              [hasSocial, "Social Links"],
            ].map(([done, label]) => (
              <p key={label as string} className="text-sm text-blue-100">
                {done ? "✓" : "○"} {label as string}
              </p>
            ))}
          </div>
        </AppCard>
      </div>
    </PageContainer>
  );
}
