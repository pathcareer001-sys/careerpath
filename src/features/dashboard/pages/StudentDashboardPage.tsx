import { Briefcase, Bookmark, TrendingUp, ArrowUp, ArrowDown, Clock, Building2, CalendarDays, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/common/PageContainer";
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

function ProgressRing({ pct, size = 72 }: { pct: number; size?: number }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2563eb" strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-100 flex-1">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

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

  const statusCounts = {
    pending: applications?.filter((a) => a.status === "pending").length || 0,
    reviewed: applications?.filter((a) => a.status === "reviewed").length || 0,
    interview: applications?.filter((a) => a.status === "interview").length || 0,
    accepted: applications?.filter((a) => a.status === "accepted").length || 0,
  };
  const maxStatus = Math.max(...Object.values(statusCounts), 1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-medium text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Welcome back, {user?.name}</p>
        </div>
        <Link to="/internships" className="inline-flex items-center gap-1.5 h-9 rounded-lg bg-blue-600 text-white px-4 text-sm font-medium hover:bg-blue-700 transition-colors">
          Browse internships
          <ChevronRight size="15" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/applications" className="block group">
          <AppCard className="transition-all hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Briefcase size="20" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600 font-medium">
                <ArrowUp size="12" />
                12%
              </span>
            </div>
            <p className="mt-3 text-[28px] font-medium text-slate-900">{applicationCount}</p>
            <p className="text-sm text-slate-500">Applications</p>
          </AppCard>
        </Link>
        <Link to="/bookmarks" className="block group">
          <AppCard className="transition-all hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
                <Bookmark size="20" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600 font-medium">
                <ArrowUp size="12" />
                5%
              </span>
            </div>
            <p className="mt-3 text-[28px] font-medium text-slate-900">{bookmarkCount}</p>
            <p className="text-sm text-slate-500">Bookmarks</p>
          </AppCard>
        </Link>
        <Link to="/applications" className="block group">
          <AppCard className="transition-all hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white">
                <TrendingUp size="20" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs text-red-500 font-medium">
                <ArrowDown size="12" />
                3%
              </span>
            </div>
            <p className="mt-3 text-[28px] font-medium text-slate-900">{statusCounts.interview}</p>
            <p className="text-sm text-slate-500">Interviews</p>
          </AppCard>
        </Link>
        <Link to="/profile" className="block group">
          <AppCard className="transition-all hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <TrendingUp size="20" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600 font-medium">
                <ArrowUp size="12" />
                {completion}%
              </span>
            </div>
            <p className="mt-3 text-[28px] font-medium text-slate-900">{completion}%</p>
            <p className="text-sm text-slate-500">Profile done</p>
          </AppCard>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          {internships?.length ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-slate-900">Recommended</h2>
                <Link to="/internships" className="text-sm font-medium text-blue-600">View all</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {internships?.slice(0, 2).map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            </div>
          ) : (
            <AppCard>
              <EmptyState title="No recommendations yet" description="Start exploring internships." />
            </AppCard>
          )}

          <AppCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-slate-900">Application Pipeline</h2>
            </div>
            <div className="space-y-2">
              {[
                { label: "Pending", count: statusCounts.pending, color: "bg-amber-500" },
                { label: "Reviewed", count: statusCounts.reviewed, color: "bg-blue-500" },
                { label: "Interview", count: statusCounts.interview, color: "bg-purple-500" },
                { label: "Accepted", count: statusCounts.accepted, color: "bg-emerald-500" },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-20 text-xs text-slate-500">{label}</span>
                  <MiniBar value={count} max={maxStatus} color={color} />
                  <span className="w-6 text-right text-xs font-medium text-slate-700">{count}</span>
                </div>
              ))}
            </div>
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-slate-900 mb-4">Activity</h2>
            {applications?.length === 0 ? (
              <EmptyState title="No activity yet" description="Start applying to internships." />
            ) : (
              <div className="relative pl-6 space-y-0">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200" />
                {applications?.slice(0, 5).map((item, idx) => {
                  const statusIcons: Record<string, string> = {
                    pending: "bg-amber-500",
                    reviewed: "bg-blue-500",
                    interview: "bg-purple-500",
                    accepted: "bg-emerald-500",
                    rejected: "bg-red-500",
                  };
                  return (
                    <div key={item.id} className="relative pb-5 last:pb-0">
                      <div className={`absolute -left-[19px] top-1.5 h-3 w-3 rounded-full border-2 border-white ${statusIcons[item.status] || "bg-slate-400"}`} />
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{item.internshipTitle}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Building2 size="11" />{item.companyName}</span>
                            <span className="flex items-center gap-1"><CalendarDays size="11" />{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </AppCard>
        </div>

        <div className="space-y-6">
          <AppCard>
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <ProgressRing pct={completion} />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-900">{completion}%</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Profile</p>
                <p className="text-xs text-slate-500 mt-0.5">{user?.name || "Set up your profile"}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {[
                [hasPersonal, "Personal Info"],
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

          <AppCard>
            <h2 className="text-sm font-medium text-slate-900 mb-3">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">Application rate</span>
                <span className="text-sm font-medium text-slate-900">68%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">Response rate</span>
                <span className="text-sm font-medium text-slate-900">42%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-slate-500">Avg. review rating</span>
                <span className="text-sm font-medium text-slate-900">4.2</span>
              </div>
            </div>
          </AppCard>

          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-600 to-blue-700 p-4">
            <div className="flex items-center gap-2 text-white/80 text-xs font-medium uppercase tracking-wider mb-2">
              <Clock size="14" />
              Quick tip
            </div>
            <p className="text-sm text-white leading-relaxed">
              Complete your profile to increase your chances of getting noticed by recruiters.
            </p>
            <Link to="/profile" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white hover:text-blue-100 transition-colors">
              Update profile <ChevronRight size="14" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
