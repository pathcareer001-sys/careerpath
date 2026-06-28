import { Link, useParams } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import EmptyState from "@/components/shared/EmptyState";
import { useInternshipApplications } from "@/features/applications/hooks/useInternshipApplications";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import { toast } from "sonner";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { useState } from "react";
import { notificationService } from "@/features/notifications/services/notificationService";
import type { Application } from "@/types/application";
import { Eye, Users, Clock, CheckCircle2, XCircle, SearchCheck } from "lucide-react";

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

      <PageContainer>
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-medium text-heading">Applicants</h1>
          <p className="mt-1 text-sm text-secondary-text">Manage internship applicants</p>
        </div>

        <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 animate-fade-in-up animate-delay-100">
          {[
            { label: "Total", value: stats.total, gradient: "from-primary to-secondary", icon: <Users size="16" className="text-primary" /> },
            { label: "Pending", value: stats.pending, gradient: "from-warning to-accent", icon: <Clock size="16" className="text-warning" /> },
            { label: "Reviewed", value: stats.reviewed, gradient: "from-primary to-secondary", icon: <SearchCheck size="16" className="text-primary" /> },
            { label: "Accepted", value: stats.accepted, gradient: "from-success to-info", icon: <CheckCircle2 size="16" className="text-success" /> },
            { label: "Rejected", value: stats.rejected, gradient: "from-error to-accent", icon: <XCircle size="16" className="text-error" /> },
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
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent to-section p-5 text-heading">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/60 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-section blur-xl" />
            <div className="relative z-10">
              <h2 className="text-xl font-medium">Applicant Management</h2>
              <p className="text-body mt-1">Review and manage internship applications.</p>
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
                    <Link to={`/students/${application.applicantId}`}>
                      <AppButton type="button">
                        <Eye size="14" /> Profile
                      </AppButton>
                    </Link>
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
