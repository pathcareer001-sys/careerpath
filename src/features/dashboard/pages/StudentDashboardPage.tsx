import { Link } from "react-router-dom";
import { useMemo } from "react";
import SEO from "@/components/seo/SEO";
import AppCard from "@/components/common/AppCard";
import StatCard from "@/components/shared/StatCard";
import EmptyState from "@/components/shared/EmptyState";
import AppButton from "@/components/common/AppButton";
import VerifiedBadge from "@/components/company/VerifiedBadge";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApplications } from "@/features/applications/hooks/useApplications";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useInternships } from "@/features/internships/hooks/useInternships";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { calculateProfileCompletion } from "@/utils/profileCompletion";
import { useGreeting } from "@/hooks/useGreeting";
import { toast } from "sonner";
import { CalendarCheck, CheckCircle, XCircle } from "lucide-react";

const checklistItems = [
  { key: "personal", label: "Informasi Pribadi" },
  { key: "education", label: "Pendidikan" },
  { key: "skills", label: "Keahlian" },
  { key: "resume", label: "Resume" },
  { key: "social", label: "Tautan Sosial" },
];

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { greeting } = useGreeting();
  const { applicationCount, bookmarkCount } = useDashboardStats(user?.uid || "");
  const { data: applications } = useApplications(user?.uid || "");
  const { data: internships } = useInternships();
  const { data: companies } = useCompanies();
  const updateStatus = useUpdateApplicationStatus();
  const completion = calculateProfileCompletion(user ?? undefined);

  const premiumCompanyIds = useMemo(() => {
    if (!companies) return new Set<string>();
    return new Set(companies.filter((c) => c.subscription === "premium").map((c) => c.id));
  }, [companies]);

  const recommendedInternships = useMemo(() => {
    if (!internships) return [];
    return [...internships].sort((a, b) => {
      const aPremium = premiumCompanyIds.has(a.companyId) ? 1 : 0;
      const bPremium = premiumCompanyIds.has(b.companyId) ? 1 : 0;
      if (aPremium !== bPremium) return bPremium - aPremium;
      return 0;
    });
  }, [internships, premiumCompanyIds]);

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
      toast.success("Wawancara dikonfirmasi");
    } catch {
      toast.error("Gagal mengonfirmasi");
    }
  };

  const handleDeclineInterview = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: "rejected" });
      toast.success("Wawancara ditolak");
    } catch {
      toast.error("Gagal menolak");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SEO title="Dashboard" description="Kelola aplikasi, bookmark, dan profil magang Anda." noIndex />
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-heading">{greeting.text}, {user?.name?.split(" ")[0] || "di sana"}</h1>
        <p className="mt-1 text-sm text-secondary-text">{greeting.subtitle}</p>
      </div>

      {interviewApps.length > 0 && (
        <div className="animate-fade-in-up animate-delay-50 space-y-3">
          {interviewApps.map((app) => (
            <div key={app.id} className="rounded-xl border border-info/30 bg-gradient-to-r from-info/10 to-accent p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <CalendarCheck size="20" className="text-info shrink-0" />
                <div>
                  <p className="text-sm font-medium text-heading">Undangan Wawancara</p>
                  <p className="text-xs text-info mt-0.5 flex items-center gap-1">
                    {app.internshipTitle} di {app.companyName}
                    <VerifiedBadge show={premiumCompanyIds.has(app.companyId)} size={10} />
                  </p>
                  {app.interviewDate && <p className="text-xs text-info/80 mt-0.5">Jadwal: {app.interviewDate} {app.interviewLocation ? `(${app.interviewLocation})` : ""}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <AppButton onClick={() => handleConfirmInterview(app.id)} variant="primary" className="text-xs h-8 px-3">
                  <CheckCircle size="13" /> Konfirmasi
                </AppButton>
                <AppButton onClick={() => handleDeclineInterview(app.id)} variant="danger" className="text-xs h-8 px-3">
                  <XCircle size="13" /> Tolak
                </AppButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 animate-fade-in-up animate-delay-100">
        <Link to="/applications" className="block">
          <StatCard title="Lamaran" value={applicationCount} gradient="blue" />
        </Link>
        <Link to="/bookmarks" className="block">
          <StatCard title="Tersimpan" value={bookmarkCount} gradient="purple" />
        </Link>
        <Link to="/applications" className="block">
          <StatCard title="Wawancara" value={interviewApps.length} gradient="emerald" />
        </Link>
        <Link to="/profile" className="block">
          <StatCard title="Profil" value={`${completion}%`} gradient="amber" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6 animate-fade-in-up animate-delay-200">
          {recommendedInternships.length ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-heading">Magang Direkomendasikan</h2>
                <Link to="/internships" className="text-[13px] font-medium text-primary hover:text-primary-hover transition-colors">Lihat semua →</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {recommendedInternships.slice(0, 2).map((internship, i) => (
                  <div key={internship.id} style={{ animationDelay: `${300 + i * 150}ms` }} className="animate-fade-in-up">
                    <InternshipCard internship={internship} showPremiumBadge={premiumCompanyIds.has(internship.companyId)} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <AppCard>
              <EmptyState title="Belum ada rekomendasi" description="Mulai jelajahi magang." />
            </AppCard>
          )}

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-4">Aktivitas Terbaru</h2>
            {applications?.length === 0 ? (
              <EmptyState title="Belum ada aktivitas" description="Mulai lamar magang." />
            ) : (
              <div className="space-y-1">
                {applications?.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200 hover:bg-section -mx-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-heading truncate">{item.internshipTitle}</p>
                      <p className="text-[13px] text-secondary-text mt-0.5 flex items-center gap-1">
                        {item.companyName}
                        <VerifiedBadge show={premiumCompanyIds.has(item.companyId)} size={12} />
                        &middot; {new Date(item.createdAt).toLocaleDateString()}
                      </p>
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
              <p className="text-sm text-secondary-text font-medium">Kelengkapan Profil</p>
              <span className="text-[28px] font-medium text-primary">{completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-section overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-4 space-y-2">
              {checklistItems.map(({ key, label }) => {
                const done = checklistState[key];
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${done ? "border-primary bg-primary" : "border-muted"}`}>
                      {done && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`${done ? "text-heading" : "text-muted"}`}>{label}</span>
                  </div>
                );
              })}
            </div>
            <Link to="/profile">
              <AppButton variant="secondary" className="mt-4 w-full">
                Lengkapi Profil
              </AppButton>
            </Link>
          </div>

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-3">Statistik Cepat</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-divider">
                <span className="text-[13px] text-secondary-text">Tingkat lamaran</span>
                <span className="text-sm font-medium text-heading">68%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-divider">
                <span className="text-[13px] text-secondary-text">Tingkat respons</span>
                <span className="text-sm font-medium text-heading">42%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[13px] text-secondary-text">Rata-rata rating ulasan</span>
                <span className="text-sm font-medium text-heading">4.2</span>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
