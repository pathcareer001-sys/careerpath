// features/companies/pages/CompanyApplicantsPage.tsx

import { useParams } from "react-router-dom";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
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

export default function CompanyApplicantsPage() {
  const { internshipId } = useParams();

  const { data: applications } = useInternshipApplications(internshipId || "");

  const updateStatus = useUpdateApplicationStatus();

  const handleStatus = async (
    application: Application,
    status: "accepted" | "rejected" | "interview",
  ) => {
    try {
      await updateStatus.mutateAsync({
        id: application.id,
        status,
      });
      const notificationMap = {
        accepted: {
          title: "Application Accepted 🎉",
          message: `Congratulations! Your application for ${application.internshipTitle} has been accepted.`,
        },

        rejected: {
          title: "Application Rejected",
          message: `Your application for ${application.internshipTitle} was not selected.`,
        },

        interview: {
          title: "Interview Invitation 🎯",
          message: `You have been invited to interview for ${application.internshipTitle}.`,
        },
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

  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(
    null,
  );

  const [interviewApplication, setInterviewApplication] =
    useState<Application | null>(null);

  const [interviewDate, setInterviewDate] = useState("");

  const [interviewLocation, setInterviewLocation] = useState("");

  return (
    <>
      {interviewApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AppCard className="w-full max-w-md">
            <h2 className="mb-4 text-xl font-bold">Schedule Interview</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Interview Date</label>

                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="
            w-full
            rounded-xl
            border
            px-3
            py-2
            "
                />
              </div>

              <div>
                <label className="mb-1 block text-sm">
                  Location / Meeting Link
                </label>

                <input
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  placeholder="Zoom Meeting / Office Address"
                  className="
            w-full
            rounded-xl
            border
            px-3
            py-2
            "
                />
              </div>

              <div className="flex justify-end gap-2">
                <AppButton
                  type="button"
                  onClick={() => {
                    setInterviewApplication(null);
                    setInterviewDate("");
                    setInterviewLocation("");
                  }}
                >
                  Cancel
                </AppButton>

                <AppButton
                  type="button"
                  onClick={async () => {
                    if (!interviewApplication) return;

                    await updateStatus.mutateAsync({
                      id: interviewApplication.id,

                      status: "interview",

                      interviewDate,

                      interviewLocation,
                    });

                    await notificationService.createNotification({
                      userId: interviewApplication.applicantId,

                      title: "Interview Invitation 🎯",

                      message: `
Interview for
${interviewApplication.internshipTitle}

Date:
${interviewDate}

Location:
${interviewLocation}
                `,

                      type: "application",

                      read: false,

                      createdAt: new Date().toISOString(),
                    });

                    toast.success("Interview scheduled");

                    setInterviewApplication(null);
                    setInterviewDate("");
                    setInterviewLocation("");
                  }}
                >
                  Schedule Interview
                </AppButton>
              </div>
            </div>
          </AppCard>
        </div>
      )}

      {selectedApplicant && (
        <ApplicantProfileModal
          uid={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
      <PageContainer>
        <PageHeader
          title="Applicants"
          description="Manage internship applicants"
        />

        <div
          className="
  mt-6
  grid
  gap-4
  md:grid-cols-4
  "
        >
          <AppCard>
            <p className="text-sm text-slate-500">Total</p>

            <h3 className="mt-2 text-3xl font-bold">
              {applications?.length || 0}
            </h3>
          </AppCard>
          <AppCard>
            <p className="text-sm text-slate-500">Pending</p>

            <h3 className="mt-2 text-3xl font-bold text-amber-600">
              {applications?.filter((item) => item.status === "pending").length}
            </h3>
          </AppCard>
          <AppCard>
            <p className="text-sm text-slate-500">Accepted</p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {
                applications?.filter((item) => item.status === "accepted")
                  .length
              }
            </h3>
          </AppCard>
          <AppCard>
            <p className="text-sm text-slate-500">Rejected</p>

            <h3 className="mt-2 text-3xl font-bold text-red-600">
              {
                applications?.filter((item) => item.status === "rejected")
                  .length
              }
            </h3>
          </AppCard>
        </div>

        <AppCard
          className="
          border-0
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          "
        >
          <h2 className="text-3xl font-bold">Applicant Management</h2>

          <p className="text-blue-100">
            Review and manage internship applications.
          </p>
        </AppCard>

        {applications?.length === 0 ? (
          <EmptyState
            title="No Applicants Yet"
            description="Applications will appear once students start applying."
          />
        ) : (
          <div className="space-y-4">
            {applications?.map((application) => (
              <AppCard key={application.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                      h-12
                      w-12
                      rounded-full
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                      text-blue-600
                      font-semibold
                      "
                    >
                      {application.applicantName?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {application.applicantName}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {application.applicantEmail}
                      </p>

                      <p className="text-sm text-slate-500">
                        {application.internshipTitle}
                      </p>
                      <p className="text-sm text-slate-400">
                        Applied:
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>

                      <div className="mt-2">
                        <StatusBadge status={application.status} />
                        {application.interviewDate && (
                          <p className="mt-2 text-sm text-purple-600">
                            Interview: {application.interviewDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <AppButton
                      type="button"
                      onClick={() =>
                        setSelectedApplicant(application.applicantId)
                      }
                    >
                      View Profile
                    </AppButton>
                    {application.status !== "accepted" &&
                      application.status !== "rejected" && (
                        <>
                          <AppButton
                            disabled={updateStatus.isPending}
                            onClick={() =>
                              handleStatus(application, "accepted")
                            }
                          >
                            Accept
                          </AppButton>

                          <AppButton
                            disabled={updateStatus.isPending}
                            onClick={() => {
                              setInterviewApplication(application);
                            }}
                          >
                            Interview
                          </AppButton>

                          <AppButton
                            disabled={updateStatus.isPending}
                            onClick={() =>
                              handleStatus(application, "rejected")
                            }
                          >
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
