import { useMemo, useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import SearchBar from "@/components/common/SearchBar";

import EmptyState from "@/components/shared/EmptyState";

import ApplicationManageCard from "../components/ApplicationManageCard";

import { useAllApplications } from "../hooks/useAllApplications";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { toast } from "sonner";

export default function ManageApplicationsPage() {
  const [search, setSearch] = useState("");

  const { data: applications } = useAllApplications();

  const updateStatus = useUpdateApplicationStatus();

  const filteredApplications = useMemo(() => {
    if (!applications) return [];

    return applications.filter((application) =>
      application.internshipTitle.toLowerCase().includes(search.toLowerCase()),
    );
  }, [applications, search]);

  const handleAccept = async (id: string) => {
    await updateStatus.mutateAsync({
      id,
      status: "accepted",
    });
     toast.success("Applicant accepted");
  };

  const handleReject = async (id: string) => {
    await updateStatus.mutateAsync({
      id,
      status: "rejected",
    });
     toast.success("Applicant rejected");
  };

  return (
    <PageContainer>
      <PageHeader
        title="Applications"
        description="Manage internship applications"
      />

      <div className="space-y-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search applications..."
        />

        {filteredApplications.length === 0 ? (
          <EmptyState
            title="No Applications"
            description="No applications found"
          />
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <ApplicationManageCard
                key={application.id}
                application={application}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
