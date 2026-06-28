import { useParams } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import EmptyState from "@/components/shared/EmptyState";
import { useInternshipApplications } from "@/features/applications/hooks/useInternshipApplications";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import { toast } from "sonner";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { useState } from "react";
import ApplicantProfileModal from "@/features/companies/components/ApplicantProfileModal";
import { notificationService } from "@/features/notifications/services/notificationService";
import type { Application } from "@/types/application";
import { Eye, Users, Clock, CheckCircle2, XCircle, SearchCheck } from "lucide-react";

export default function CompanyApplicantsPage() {
  const { internshipId } = useParams();
  const { data: applications } = useInternshipApplications(internshipId || "");
  const updateStatus = useUpdateApplicationStatus();
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [interviewApplication, setInterviewApplication] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");

  const handleStatus = async (application: Application, status: "accepted" | "rejected" | "interview" | "reviewed") => {
    try {
      await updateStatus.mutateAsync({ id: application.id, status });
      const notificationMap: Record<string, { title: string; message: string }> = {
        accepted: { title: "Application Accepted", message: `Congratulations! Your application for ${application.internshipTitle} has been accepted.` },
        rejected: { title: "Application Rejected", message: `Your application for ${application.internshipTitle} was not selected.` },
        interview: { title: "Interview Invitation", message: `You have been invited to interview for ${application.internshipTitle}.` },
        reviewed: { title: "Application Reviewed", message: `Your application for ${application.internshipTitle} is now being reviewed.` },
      };
      await notificationService.createNotification({
        userId: application.applicantId,
        title: notificationMap[status].title,
        message: notificationMap[status].message,
        type: "application",
        read: false,
        createdAt: new Date().toISOString(),
      });
      toast.success(`Applicant ${status}`);
    } catch {
      toast.error("Failed to update applicant");
    }
  };

  const stats = {
    total: applications?.length || 0,
    pending: applications?.filter((a) => a.status === "pending").length || 0,
    reviewed: applications?.filter((a) => a.status === "reviewed").length || 0,
    accepted: applications?.filter((a) => a.status === "accepted").length || 0,
    rejected: applications?.filter((a) => a.status === "rejected").length || 0,
  };

  return (
    <>
      {interviewApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AppCard className="w-full max-w-md">
            <h2 className="mb-4 text-xl font-medium">Schedule Interview</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Interview Date</label>
                <input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm">Location / Meeting Link</label>
                <input value={interviewLocation} onChange={(e) => setInterviewLocation(e.target.value)} placeholder="Zoom Meeting / Office Address" className="w-full rounded-xl border px-3 py-2" />
              </div>
              <div className="flex justify-end gap-2">
                <AppButton type="button" onClick={() => { setInterviewApplication(null); setInterviewDate(""); setInterviewLocation(""); }}>Cancel</AppButton>
                <AppButton type="button" onClick={async () => {
                  if (!interviewApplication) return;
                  await updateStatus.mutateAsync({ id: interviewApplication.id, status: "interview", interviewDate, interviewLocation });
                  await notificationService.createNotification({ userId: interviewApplication.applicantId, title: "Interview Invitation", message: `Interview for ${interviewApplication.internshipTitle}\nDate: ${interviewDate}\nLocation: ${interviewLocation}`, type: "application", read: false, createdAt: new Date().toISOString() });
                  toast.success("Interview scheduled");
                  setInterviewApplication(null); setInterviewDate(""); setInterviewLocation("");
                }}>Schedule Interview</AppButton>
              </div>
            </div>
          </AppCard>
        </div>
      )}

      {selectedApplicant && (
        <ApplicantProfileModal uid={selectedApplicant} onClose={() => setSelectedApplicant(null)} />
      )}

      <PageContainer>
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-medium text-heading">Applicants</h1>
          <p className="mt-1 text-sm text-secondary-text">Manage internship applicants</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-5 animate-fade-in-up animate-delay-100">
          {[
            { label: "Total", value: stats.total, gradient: "from-accent to-white", icon: <Users size="16" className="text-primary" /> },
            { label: "Pending", value: stats.pending, gradient: "from-warning/10 to-white", icon: <Clock size="16" className="text-warning" /> },
            { label: "Reviewed", value: stats.reviewed, gradient: "from-accent to-white", icon: <SearchCheck size="16" className="text-primary" /> },
            { label: "Accepted", value: stats.accepted, gradient: "from-success/10 to-white", icon: <CheckCircle2 size="16" className="text-success" /> },
            { label: "Rejected", value: stats.rejected, gradient: "from-error/10 to-white", icon: <XCircle size="16" className="text-error" /> },
          ].map((stat, i) => (
            <div key={stat.label} className={`relative overflow-hidden rounded-xl border border-border bg-gradient-to-br ${stat.gradient} px-5 py-4`}>
              <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10" style={{ background: i === 0 ? "var(--color-primary)" : i === 1 ? "var(--color-warning)" : i === 2 ? "var(--color-primary)" : i === 3 ? "var(--color-success)" : "var(--color-error)" }} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[26px] font-medium text-heading leading-none">{stat.value}</p>
                  <p className="mt-1 text-[13px] text-secondary-text font-medium">{stat.label}</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-surface shadow-sm border border-border flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 animate-fade-in-up animate-delay-200">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary p-5 text-white">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-secondary/30 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary/30 blur-xl" />
            <div className="relative z-10">
              <h2 className="text-xl font-medium">Applicant Management</h2>
              <p className="text-white/70 mt-1">Review and manage internship applications.</p>
            </div>
          </div>
        </div>

        {applications?.length === 0 ? (
          <div className="mt-6">
            <EmptyState title="No Applicants Yet" description="Applications will appear once students start applying." />
          </div>
        ) : (
          <div className="mt-6 space-y-4 animate-fade-in-up animate-delay-300">
            {applications?.map((application) => (
              <AppCard key={application.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-medium shrink-0 shadow-sm">
                      {application.applicantName?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-heading">{application.applicantName}</h3>
                      <p className="text-sm text-secondary-text">{application.applicantEmail}</p>
                      <p className="text-sm text-secondary-text">{application.internshipTitle}</p>
                      <p className="text-xs text-muted">Applied: {new Date(application.createdAt).toLocaleDateString()}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <StatusBadge status={application.status} />
                        {application.interviewDate && (
                          <span className="text-xs text-info">Interview: {application.interviewDate} {application.interviewLocation ? `(${application.interviewLocation})` : ""}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap shrink-0">
                    <AppButton type="button" onClick={() => setSelectedApplicant(application.applicantId)}>
                      <Eye size="14" /> Profile
                    </AppButton>
                    {application.status !== "accepted" && application.status !== "rejected" && application.status !== "withdrawn" && (
                      <>
                        {application.status === "pending" && (
                          <AppButton type="button" disabled={updateStatus.isPending} onClick={() => handleStatus(application, "reviewed")}>
                            Mark Reviewed
                          </AppButton>
                        )}
                        <AppButton type="button" disabled={updateStatus.isPending} onClick={() => handleStatus(application, "accepted")}>
                          Accept
                        </AppButton>
                        <AppButton type="button" disabled={updateStatus.isPending} onClick={() => setInterviewApplication(application)}>
                          Interview
                        </AppButton>
                        <AppButton type="button" disabled={updateStatus.isPending} onClick={() => handleStatus(application, "rejected")}>
                          Reject
                        </AppButton>
                      </>
                    )}
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        )}
      </PageContainer>
    </>
  );
}
