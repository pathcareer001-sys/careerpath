import PageContainer from "@/components/common/PageContainer";

import PageHeader from "@/components/common/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

import ApplicationCard from "../components/ApplicationCard";

import { useApplications } from "../hooks/useApplications";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingState from "@/components/shared/LoadingState";
import { Briefcase, CheckCircle2, Clock3 } from "lucide-react";
import StatCard from "@/components/shared/StatCard";

export default function MyApplicationsPage() {
  const { user } = useAuth();

  const { data, isLoading } = useApplications(user?.uid || "");

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="My Applications"
        description="Track your internship applications"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total" value={data?.length || 0} icon={Briefcase} />

        <StatCard
          title="Accepted"
          value={data?.filter((item) => item.status === "accepted").length || 0}
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending"
          value={data?.filter((item) => item.status === "pending").length || 0}
          icon={Clock3}
        />
      </div>

      {data?.length === 0 ? (
        <EmptyState
          title="No Applications"
          description="Apply to an internship first"
        />
      ) : (
        <div className="space-y-4">
          {data?.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
