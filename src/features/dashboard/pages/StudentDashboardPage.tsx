import { Link } from "react-router-dom";

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

const checklistItems = [
  { key: "personal", label: "Personal Information" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "resume", label: "Resume" },
  { key: "social", label: "Social Links" },
];

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

  const checklistState: Record<string, boolean> = {
    personal: hasPersonal,
    education: hasEducation,
    skills: hasSkills,
    resume: hasResume,
    social: hasSocial,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-[#0F172A]">Good morning, {user?.name?.split(" ")[0] || "there"}</h1>
        <p className="mt-1 text-sm text-[#64748B]">Here's your career overview</p>
      </div>

      <div className="grid gap-4 grid-cols-4">
        <Link to="/applications">
          <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5 transition-colors hover:border-[#BFDBFE]">
            <p className="text-[28px] font-medium text-[#0F172A]">{applicationCount}</p>
            <p className="mt-0.5 text-[13px] text-[#94A3B8]">Applications</p>
          </div>
        </Link>
        <Link to="/bookmarks">
          <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5 transition-colors hover:border-[#BFDBFE]">
            <p className="text-[28px] font-medium text-[#0F172A]">{bookmarkCount}</p>
            <p className="mt-0.5 text-[13px] text-[#94A3B8]">Bookmarks</p>
          </div>
        </Link>
        <Link to="/applications">
          <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5 transition-colors hover:border-[#BFDBFE]">
            <p className="text-[28px] font-medium text-[#0F172A]">{applications?.filter((a) => a.status === "interview").length || 0}</p>
            <p className="mt-0.5 text-[13px] text-[#94A3B8]">Interviews</p>
          </div>
        </Link>
        <Link to="/profile">
          <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5 transition-colors hover:border-[#BFDBFE]">
            <p className="text-[28px] font-medium text-[#0F172A]">{completion}%</p>
            <p className="mt-0.5 text-[13px] text-[#94A3B8]">Profile</p>
          </div>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          {internships?.length ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-[#0F172A]">Recommended internships</h2>
                <Link to="/internships" className="text-[13px] text-[#2563EB]">View all</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {internships.slice(0, 2).map((internship) => (
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
            <h2 className="text-base font-medium text-[#0F172A] mb-4">Recent Activity</h2>
            {applications?.length === 0 ? (
              <EmptyState title="No activity yet" description="Start applying to internships." />
            ) : (
              <div className="space-y-3">
                {applications?.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] truncate">{item.internshipTitle}</p>
                      <p className="text-[13px] text-[#64748B] mt-0.5">{item.companyName} &middot; {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            )}
          </AppCard>
        </div>

        <div className="space-y-6">
          <div className="bg-[#2563EB] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">Profile Completion</p>
              <span className="text-[32px] font-medium text-white">{completion}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-[rgba(255,255,255,0.3)]">
              <div className="h-1.5 rounded-full bg-white transition-all" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-4 space-y-2">
              {checklistItems.map(({ key, label }) => {
                const done = checklistState[key];
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${done ? "border-white bg-white" : "border-[rgba(255,255,255,0.4)]"}`}>
                      {done && <span className="text-[#2563EB] text-[10px]">✓</span>}
                    </div>
                    <span className={done ? "text-white" : "text-[rgba(255,255,255,0.5)]"}>{label}</span>
                  </div>
                );
              })}
            </div>
            <Link to="/profile">
              <AppButton variant="secondary" className="mt-4 w-full !text-[#2563EB] !border-white/30 !bg-white/10 hover:!bg-white/20">Complete profile</AppButton>
            </Link>
          </div>

          <AppCard>
            <h2 className="text-base font-medium text-[#0F172A] mb-3">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">
                <span className="text-[13px] text-[#64748B]">Application rate</span>
                <span className="text-sm font-medium text-[#0F172A]">68%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">
                <span className="text-[13px] text-[#64748B]">Response rate</span>
                <span className="text-sm font-medium text-[#0F172A]">42%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[13px] text-[#64748B]">Avg. review rating</span>
                <span className="text-sm font-medium text-[#0F172A]">4.2</span>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
