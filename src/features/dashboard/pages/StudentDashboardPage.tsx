import { Link } from "react-router-dom";
import AppCard from "@/components/common/AppCard";
import StatCard from "@/components/shared/StatCard";
import EmptyState from "@/components/shared/EmptyState";
import AppButton from "@/components/common/AppButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApplications } from "@/features/applications/hooks/useApplications";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useInternships } from "@/features/internships/hooks/useInternships";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { calculateProfileCompletion } from "@/utils/profileCompletion";
import { toast } from "sonner";
import { CalendarCheck, CheckCircle, XCircle } from "lucide-react";

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
  const updateStatus = useUpdateApplicationStatus();
  const completion = calculateProfileCompletion(user ?? undefined);

  const interviewApps = applications?.filter((a) => a.status === "interview") || [];
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

  const handleConfirmInterview = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: "interview" });
      toast.success("Interview confirmed");
    } catch {
      toast.error("Failed to confirm");
    }
  };

  const handleDeclineInterview = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: "rejected" });
      toast.success("Interview declined");
    } catch {
      toast.error("Failed to decline");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-[#0F172A]">Good morning, {user?.name?.split(" ")[0] || "there"}</h1>
        <p className="mt-1 text-sm text-secondary-text">Here's your career overview</p>
      </div>

      {interviewApps.length > 0 && (
        <div className="animate-fade-in-up animate-delay-50 space-y-3">
          {interviewApps.map((app) => (
            <div key={app.id} className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <CalendarCheck size="20" className="text-purple-600 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-purple-900">Interview Invitation</p>
                  <p className="text-xs text-purple-600 mt-0.5">{app.internshipTitle} at {app.companyName}</p>
                  {app.interviewDate && <p className="text-xs text-purple-500 mt-0.5">Scheduled: {app.interviewDate} {app.interviewLocation ? `(${app.interviewLocation})` : ""}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <AppButton onClick={() => handleConfirmInterview(app.id)} className="!bg-emerald-600 hover:!bg-emerald-700 !text-white text-xs h-8 px-3">
                  <CheckCircle size="13" /> Confirm
                </AppButton>
                <AppButton onClick={() => handleDeclineInterview(app.id)} variant="danger" className="text-xs h-8 px-3">
                  <XCircle size="13" /> Decline
                </AppButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 animate-fade-in-up animate-delay-100">
        <Link to="/applications" className="block">
          <StatCard title="Applications" value={applicationCount} gradient="blue" />
        </Link>
        <Link to="/bookmarks" className="block">
          <StatCard title="Bookmarks" value={bookmarkCount} gradient="purple" />
        </Link>
        <Link to="/applications" className="block">
          <StatCard title="Interviews" value={interviewApps.length} gradient="emerald" />
        </Link>
        <Link to="/profile" className="block">
          <StatCard title="Profile" value={`${completion}%`} gradient="amber" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6 animate-fade-in-up animate-delay-200">
          {internships?.length ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-[#0F172A]">Recommended internships</h2>
                <Link to="/internships" className="text-[13px] font-medium text-primary hover:text-[#1d4ed8] transition-colors">View all →</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {internships.slice(0, 2).map((internship, i) => (
                  <div key={internship.id} style={{ animationDelay: `${300 + i * 150}ms` }} className="animate-fade-in-up">
                    <InternshipCard internship={internship} />
                  </div>
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
              <div className="space-y-1">
                {applications?.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200 hover:bg-[#F8FAFF] -mx-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] truncate">{item.internshipTitle}</p>
                      <p className="text-[13px] text-secondary-text mt-0.5">{item.companyName} &middot; {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            )}
          </AppCard>
        </div>

        <div className="space-y-6 animate-fade-in-up animate-delay-300">
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-secondary-text font-medium">Profile Completion</p>
              <span className="text-[28px] font-medium text-primary">{completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-4 space-y-2">
              {checklistItems.map(({ key, label }) => {
                const done = checklistState[key];
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${done ? "border-[#5FAED8] bg-primary" : "border-[#CBD5E1]"}`}>
                      {done && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`${done ? "text-[#0F172A]" : "text-muted"}`}>{label}</span>
                  </div>
                );
              })}
            </div>
            <Link to="/profile">
              <AppButton variant="secondary" className="mt-4 w-full">
                Complete profile
              </AppButton>
            </Link>
          </div>

          <AppCard>
            <h2 className="text-base font-medium text-[#0F172A] mb-3">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">
                <span className="text-[13px] text-secondary-text">Application rate</span>
                <span className="text-sm font-medium text-[#0F172A]">68%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">
                <span className="text-[13px] text-secondary-text">Response rate</span>
                <span className="text-sm font-medium text-[#0F172A]">42%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[13px] text-secondary-text">Avg. review rating</span>
                <span className="text-sm font-medium text-[#0F172A]">4.2</span>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
