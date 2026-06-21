import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

import { useAuth } from "@/hooks/useAuth";

import { useMyCompany } from "@/features/companies/hooks/useMyCompany";

import ApplicantCard from "../components/ApplicantCard";

import { useCompanyApplications } from "../hooks/useCompanyApplications";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";

export default function CompanyApplicationsPage() {
  const { user } = useAuth();

  const { data: company } = useMyCompany(user?.uid || "");

  const { data: applications, isLoading } = useCompanyApplications(
    company?.id || "",
  );

  const updateStatus = useUpdateApplicationStatus();

  const handleAccept = async (id: string) => {
    await updateStatus.mutateAsync({
      id,
      status: "accepted",
    });
  };

  const handleReject = async (id: string) => {
    await updateStatus.mutateAsync({
      id,
      status: "rejected",
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!company) {
    return (
      <EmptyState
        title="No Company Profile"
        description="Create company profile first"
      />
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Applicants"
        description="Manage internship applicants"
      />

      {applications?.length === 0 ? (
        <EmptyState
          title="No Applicants"
          description="No one has applied yet"
        />
      ) : (
        <div className="space-y-4">
          {applications?.map((application) => (
            <ApplicantCard
              key={application.id}
              application={application}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
