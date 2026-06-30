import { Link, useParams } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import VerifiedBadge from "@/components/company/VerifiedBadge";
import EmptyState from "@/components/shared/EmptyState";
import { useInternshipApplications } from "@/features/applications/hooks/useInternshipApplications";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import { toast } from "sonner";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { useState, useMemo } from "react";
import { notificationService } from "@/features/notifications/services/notificationService";
import type { Application } from "@/types/application";
import { Eye, Users, Clock, CheckCircle2, XCircle, SearchCheck, Crown } from "lucide-react";

export default function CompanyApplicantsPage() {
  const { internshipId } = useParams();
  const { data: applications } = useInternshipApplications(internshipId || "");
  const updateStatus = useUpdateApplicationStatus();
  const [interviewApplication, setInterviewApplication] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");

  const handleStatus = async (application: Application, status: "accepted" | "rejected" | "interview" | "reviewed") => {
    try {
      await updateStatus.mutateAsync({ id: application.id, status });
      toast.success(`Pelamar ${status === "accepted" ? "diterima" : status === "rejected" ? "ditolak" : status === "interview" ? "diwawancara" : "ditinjau"}`);

      const notificationMap: Record<string, { title: string; message: string }> = {
        accepted: { title: "Lamaran Diterima", message: `Selamat! Lamaran Anda untuk ${application.internshipTitle} telah diterima.` },
        rejected: { title: "Lamaran Ditolak", message: `Lamaran Anda untuk ${application.internshipTitle} tidak dipilih.` },
        interview: { title: "Undangan Wawancara", message: `Anda diundang untuk wawancara untuk ${application.internshipTitle}.` },
        reviewed: { title: "Lamaran Ditinjau", message: `Lamaran Anda untuk ${application.internshipTitle} sedang ditinjau.` },
      };
      notificationService.createNotification({
        userId: application.applicantId,
        title: notificationMap[status].title,
        message: notificationMap[status].message,
        type: "application",
        read: false,
        createdAt: new Date().toISOString(),
      }).catch(() => {});
    } catch {
      toast.error("Gagal memperbarui pelamar");
    }
  };

  const sortedApplications = useMemo(() => {
    if (!applications) return [];
    return [...applications].sort((a, b) => {
      const aPremium = a.applicantSubscription === "premium" ? 1 : 0;
      const bPremium = b.applicantSubscription === "premium" ? 1 : 0;
      if (aPremium !== bPremium) return bPremium - aPremium;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [applications]);

  const stats = {
    total: sortedApplications.length || 0,
    pending: sortedApplications.filter((a) => a.status === "pending").length || 0,
    reviewed: sortedApplications.filter((a) => a.status === "reviewed").length || 0,
    accepted: sortedApplications.filter((a) => a.status === "accepted").length || 0,
    rejected: sortedApplications.filter((a) => a.status === "rejected").length || 0,
  };

  return (
    <>
      {interviewApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AppCard className="w-full max-w-md">
            <h2 className="mb-4 text-xl font-medium">Jadwalkan Wawancara</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Tanggal Wawancara</label>
                <input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm">Lokasi / Tautan Meeting</label>
                <input value={interviewLocation} onChange={(e) => setInterviewLocation(e.target.value)} placeholder="Zoom Meeting / Alamat Kantor" className="w-full rounded-xl border px-3 py-2" />
              </div>
              <div className="flex justify-end gap-2">
                <AppButton type="button" onClick={() => { setInterviewApplication(null); setInterviewDate(""); setInterviewLocation(""); }}>Batal</AppButton>
                <AppButton type="button" onClick={async () => {
                  if (!interviewApplication) return;
                  try {
                    await updateStatus.mutateAsync({ id: interviewApplication.id, status: "interview", interviewDate, interviewLocation });
                    toast.success("Wawancara dijadwalkan");
                    notificationService.createNotification({ userId: interviewApplication.applicantId, title: "Undangan Wawancara", message: `Wawancara untuk ${interviewApplication.internshipTitle}\nTanggal: ${interviewDate}\nLokasi: ${interviewLocation}`, type: "application", read: false, createdAt: new Date().toISOString() }).catch(() => {});
                    setInterviewApplication(null); setInterviewDate(""); setInterviewLocation("");
                  } catch {
                    toast.error("Gagal menjadwalkan wawancara");
                  }
                }}>Jadwalkan Wawancara</AppButton>
              </div>
            </div>
          </AppCard>
        </div>
      )}

      <PageContainer>
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-medium text-heading">Pelamar</h1>
          <p className="mt-1 text-sm text-secondary-text">Kelola pelamar magang</p>
        </div>

        <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 animate-fade-in-up animate-delay-100">
          {[
            { label: "Total", value: stats.total, gradient: "from-primary to-secondary", icon: <Users size="16" className="text-primary" /> },
            { label: "Menunggu", value: stats.pending, gradient: "from-warning to-accent", icon: <Clock size="16" className="text-warning" /> },
            { label: "Ditinjau", value: stats.reviewed, gradient: "from-primary to-secondary", icon: <SearchCheck size="16" className="text-primary" /> },
            { label: "Diterima", value: stats.accepted, gradient: "from-success to-info", icon: <CheckCircle2 size="16" className="text-success" /> },
            { label: "Ditolak", value: stats.rejected, gradient: "from-error to-accent", icon: <XCircle size="16" className="text-error" /> },
          ].map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-xl border border-border-light bg-surface p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-border">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[28px] font-semibold text-heading leading-none tracking-tight">{stat.value}</p>
                  <p className="mt-1.5 text-[13px] text-secondary-text font-medium">{stat.label}</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-surface shadow-sm border border-border flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${stat.gradient} opacity-[0.06] transition-all duration-300 group-hover:opacity-[0.12] group-hover:scale-110`} />
            </div>
          ))}
        </div>

        <div className="mt-6 animate-fade-in-up animate-delay-200">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.04] to-section p-5 text-heading">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/60 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-section blur-xl" />
            <div className="relative z-10">
              <h2 className="text-xl font-medium">Manajemen Pelamar</h2>
              <p className="text-body mt-1">Tinjau dan kelola lamaran magang.</p>
            </div>
          </div>
        </div>

        {sortedApplications.length === 0 ? (
          <div className="mt-6">
            <EmptyState title="Belum Ada Pelamar" description="Lamaran akan muncul setelah mahasiswa mulai mendaftar." />
          </div>
        ) : (
          <div className="mt-6 space-y-4 animate-fade-in-up animate-delay-300">
            {sortedApplications.map((application) => {
              const isPremiumStudent = application.applicantSubscription === "premium";
              return (
              <AppCard key={application.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full shrink-0 overflow-hidden shadow-sm">
                      {application.applicantPhotoURL ? (
                        <img src={application.applicantPhotoURL} alt={application.applicantName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium">
                          {application.applicantName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-heading">{application.applicantName}</h3>
                        {isPremiumStudent && <VerifiedBadge show size={14} />}
                      </div>
                      {isPremiumStudent && (
                        <div className="flex items-center gap-1.5 rounded-lg bg-primary/[0.06] px-2.5 py-1 text-xs font-medium text-primary w-fit mt-1">
                          <Crown size="11" />
                          Kandidat Prioritas
                        </div>
                      )}
                      <p className="text-sm text-secondary-text mt-1">{application.applicantEmail}</p>
                      <p className="text-sm text-secondary-text">{application.internshipTitle}</p>
                      <p className="text-xs text-muted">Mendaftar: {new Date(application.createdAt).toLocaleDateString()}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <StatusBadge status={application.status} />
                        {application.interviewDate && (
                          <span className="text-xs text-info">Wawancara: {application.interviewDate} {application.interviewLocation ? `(${application.interviewLocation})` : ""}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap shrink-0">
                    <Link to={`/students/${application.applicantId}`}>
                      <AppButton type="button">
                        <Eye size="14" /> Profil
                      </AppButton>
                    </Link>
                    {application.status !== "accepted" && application.status !== "rejected" && application.status !== "withdrawn" && (
                      <>
                        {application.status === "pending" && (
                          <AppButton type="button" disabled={updateStatus.isPending} onClick={() => handleStatus(application, "reviewed")}>
                            Tandai Ditinjau
                          </AppButton>
                        )}
                        <AppButton type="button" disabled={updateStatus.isPending} onClick={() => handleStatus(application, "accepted")}>
                          Terima
                        </AppButton>
                        <AppButton type="button" disabled={updateStatus.isPending} onClick={() => setInterviewApplication(application)}>
                          Wawancara
                        </AppButton>
                        <AppButton type="button" disabled={updateStatus.isPending} onClick={() => handleStatus(application, "rejected")}>
                          Tolak
                        </AppButton>
                      </>
                    )}
                  </div>
                </div>
              </AppCard>
            );})}
          </div>
        )}
      </PageContainer>
    </>
  );
}
