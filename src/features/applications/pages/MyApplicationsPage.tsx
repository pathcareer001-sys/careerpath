import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import ApplicationCard from "../components/ApplicationCard";
import { useApplications } from "../hooks/useApplications";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingState from "@/components/shared/LoadingState";
import { Briefcase, CheckCircle2, Clock3, XCircle } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import AppCard from "@/components/common/AppCard";

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const { data, isLoading } = useApplications(user?.uid || "");

  if (isLoading) return <LoadingState />;

  return (
    <PageContainer>
      <PageHeader title="Applications" description="Track every step of your internship journey." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total" value={data?.length || 0} icon={Briefcase} />
        <StatCard title="Accepted" value={data?.filter((i) => i.status === "accepted").length || 0} icon={CheckCircle2} />
        <StatCard title="Pending" value={data?.filter((i) => i.status === "pending").length || 0} icon={Clock3} />
        <StatCard title="Rejected" value={data?.filter((i) => i.status === "rejected").length || 0} icon={XCircle} />
      </div>

      {data?.length === 0 ? (
        <EmptyState title="No applications yet" description="Start applying and track your progress here." />
      ) : (
        <div className="space-y-3">
          {data?.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
