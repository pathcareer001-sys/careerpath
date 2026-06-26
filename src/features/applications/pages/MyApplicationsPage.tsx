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

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Application Tracker"
        description="Monitor every step of your internship journey"
      />

      <AppCard className="border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
        <div className="flex justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Briefcase size={15} />
              Internship Journey
            </div>

            <h2 className="text-3xl font-bold">Track Your Applications</h2>

            <p className="mt-2 text-blue-100">
              Monitor every internship application in one place.
            </p>
          </div>

          <div className="text-right">
            <p className="text-blue-200">Applications</p>

            <h2 className="text-5xl font-bold">{data?.length || 0}</h2>
          </div>
        </div>
      </AppCard>

      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
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

        <StatCard
          title="Rejected"
          value={data?.filter((item) => item.status === "rejected").length || 0}
          icon={XCircle}
        />
      </div>

      <AppCard>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Keep Going</h2>

            <p className="mt-1 text-slate-500">
              You have submitted {data?.length || 0} internship applications.
            </p>
          </div>

          <div className="text-4xl font-bold text-blue-700">
            {data?.length || 0}
          </div>
        </div>
      </AppCard>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-950">Recent Applications</h2>

        <p className="text-sm text-slate-500">
          Track the status of your submissions
        </p>
      </div>

      <AppCard>
        <div className="space-y-4">
          <StatusProgress
            label="Interview"
            value={data?.filter((x) => x.status === "interview").length || 0}
            total={data?.length || 0}
          />

          <StatusProgress
            label="Accepted"
            value={data?.filter((x) => x.status === "accepted").length || 0}
            total={data?.length || 0}
          />

          <StatusProgress
            label="Pending"
            value={data?.filter((x) => x.status === "pending").length || 0}
            total={data?.length || 0}
          />

          <StatusProgress
            label="Rejected"
            value={data?.filter((x) => x.status === "rejected").length || 0}
            total={data?.length || 0}
          />
        </div>
      </AppCard>

      {data?.length === 0 ? (
        <EmptyState
          title="No Applications Yet"
          description="Start applying and track your internship journey here"
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

function StatusProgress({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percent = total === 0 ? 0 : (value / total) * 100;

  return (
    <div>
      <div className="mb-2 flex justify-between text-slate-700">
        <span>{label}</span>

        <span>{value}</span>
      </div>

      <div className="h-2 rounded-full bg-blue-100">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
