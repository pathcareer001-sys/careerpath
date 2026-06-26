import { Briefcase, Bookmark, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import EmptyState from "@/components/shared/EmptyState";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApplications } from "@/features/applications/hooks/useApplications";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useInternships } from "@/features/internships/hooks/useInternships";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { calculateProfileCompletion } from "@/utils/profileCompletion";
import AppButton from "@/components/common/AppButton";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { applicationCount, bookmarkCount } = useDashboardStats(user?.uid || "");
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
      <PageHeader title="Dashboard" description="Welcome back, {user?.name}" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: "/internships", icon: Briefcase, label: "Browse Internships", desc: "Discover new opportunities" },
          { to: "/applications", icon: TrendingUp, label: "My Applications", desc: "Track application progress" },
          { to: "/bookmarks", icon: Bookmark, label: "Saved Internships", desc: "View bookmarked positions" },
          { to: "/profile", icon: TrendingUp, label: "Edit Profile", desc: "Improve profile visibility" },
        ].map(({ to, icon: Icon, label, desc }) => (
          <Link key={to} to={to}>
            <AppCard className="hover:border-blue-300 hover:shadow-[0_0_0_1px_#2563eb1a] transition-all">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Icon size="18" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </div>
            </AppCard>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <AppCard highlight>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Briefcase size="18" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-slate-500">Applications</p>
              <p className="text-[22px] font-medium text-slate-900">{applicationCount}</p>
            </div>
          </div>
        </AppCard>
        <AppCard highlight>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Bookmark size="18" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-slate-500">Bookmarks</p>
              <p className="text-[22px] font-medium text-slate-900">{bookmarkCount}</p>
            </div>
          </div>
        </AppCard>
        <AppCard highlight>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp size="18" />
            </div>
            <div className="space-y-0.5 flex-1">
              <p className="text-xs text-slate-500">Profile Completion</p>
              <p className="text-[22px] font-medium text-slate-900">{completion}%</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{ width: `${completion}%` }} />
          </div>
        </AppCard>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-slate-900">Recommended For You</h2>
          <Link to="/internships" className="text-sm text-blue-600">View all</Link>
        </div>

        {internships?.length === 0 ? (
          <EmptyState title="No internships yet" description="Check back later for recommendations." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internships?.slice(0, 3).map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AppCard>
          <h2 className="text-base font-medium text-slate-900 mb-4">Recent Activity</h2>
          {applications?.length === 0 ? (
            <EmptyState title="No activity yet" description="Start applying to internships." />
          ) : (
            <div className="space-y-3">
              {applications?.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.internshipTitle}</p>
                    <p className="text-xs text-slate-500">{item.companyName}</p>
                    {"createdAt" in item && (
                      <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                    )}
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          )}
        </AppCard>

        <AppCard>
          <h2 className="text-base font-medium text-slate-900 mb-4">Profile Checklist</h2>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Progress</span>
              <span>{completion}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[
              [hasPersonal, "Personal Information"],
              [hasEducation, "Education"],
              [hasSkills, "Skills"],
              [hasResume, "Resume"],
              [hasSocial, "Social Links"],
            ].map(([done, label]) => (
              <div key={label as string} className="flex items-center gap-2 text-slate-600">
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${done ? "border-green-500 bg-green-500" : "border-slate-300"}`}>
                  {done && <span className="text-white text-[10px]">✓</span>}
                </div>
                {label as string}
              </div>
            ))}
          </div>
          <Link to="/profile">
            <AppButton variant="secondary" className="mt-4 w-full">Complete profile</AppButton>
          </Link>
        </AppCard>
      </div>
    </PageContainer>
  );
}
