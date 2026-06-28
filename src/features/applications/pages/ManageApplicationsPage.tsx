import { useMemo, useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import ApplicationManageCard from "../components/ApplicationManageCard";
import { useAllApplications } from "../hooks/useAllApplications";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { toast } from "sonner";
import { FileText, CheckCircle2, XCircle, Clock } from "lucide-react";

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
    await updateStatus.mutateAsync({ id, status: "accepted" });
    toast.success("Applicant accepted");
  };

  const handleReject = async (id: string) => {
    await updateStatus.mutateAsync({ id, status: "rejected" });
    toast.success("Applicant rejected");
  };

  const total = applications?.length || 0;
  const accepted = applications?.filter((a) => a.status === "accepted").length || 0;
  const rejected = applications?.filter((a) => a.status === "rejected").length || 0;
  const pending = applications?.filter((a) => a.status === "pending" || a.status === "reviewed").length || 0;

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-heading">Applications</h1>
        <p className="mt-1 text-sm text-secondary-text">Manage internship applications</p>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-4 animate-fade-in-up animate-delay-100">
        {[
          { label: "Total", value: total, gradient: "from-primary to-secondary", icon: <FileText size="16" className="text-primary" /> },
          { label: "Pending", value: pending, gradient: "from-warning to-accent", icon: <Clock size="16" className="text-warning" /> },
          { label: "Accepted", value: accepted, gradient: "from-success to-info", icon: <CheckCircle2 size="16" className="text-success" /> },
          { label: "Rejected", value: rejected, gradient: "from-error to-accent", icon: <XCircle size="16" className="text-error" /> },
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

      <div className="mt-6 space-y-6 animate-fade-in-up animate-delay-200">
        <SearchBar value={search} onChange={setSearch} placeholder="Search applications..." />

        {filteredApplications.length === 0 ? (
          <EmptyState title="No Applications" description="No applications found" />
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
