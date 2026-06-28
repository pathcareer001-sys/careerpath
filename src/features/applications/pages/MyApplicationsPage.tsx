import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "@/components/shared/EmptyState";
import { useApplications } from "../hooks/useApplications";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingState from "@/components/shared/LoadingState";
import StatusBadge from "../components/StatusBadge";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { toast } from "sonner";
import { XCircle } from "lucide-react";

const PAGE_SIZE = 8;

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const { data, isLoading } = useApplications(user?.uid || "");
  const updateStatus = useUpdateApplicationStatus();
  const [page, setPage] = useState(1);

  if (isLoading) return <LoadingState />;

  const totalPages = Math.ceil((data?.length || 0) / PAGE_SIZE);
  const paged = data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || [];

  const handleWithdraw = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: "withdrawn" });
      toast.success("Application withdrawn");
    } catch {
      toast.error("Failed to withdraw");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-heading">Applications</h1>
        <p className="mt-1 text-sm text-secondary-text">Track every step of your internship journey</p>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 animate-fade-in-up animate-delay-100">
        <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent to-white px-6 py-5">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-accent/5" />
          <p className="text-[28px] font-medium text-heading leading-none">{data?.length || 0}</p>
          <p className="mt-1.5 text-[13px] text-secondary-text font-medium">Total</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-success/10 to-white px-6 py-5">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-success/5" />
          <p className="text-[28px] font-medium text-heading leading-none">{data?.filter((i) => i.status === "accepted").length || 0}</p>
          <p className="mt-1.5 text-[13px] text-secondary-text font-medium">Accepted</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-warning/10 to-white px-6 py-5">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-warning/5" />
          <p className="text-[28px] font-medium text-heading leading-none">{data?.filter((i) => i.status === "pending" || i.status === "reviewed" || i.status === "interview").length || 0}</p>
          <p className="mt-1.5 text-[13px] text-secondary-text font-medium">In Progress</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-error/10 to-white px-6 py-5">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-error/5" />
          <p className="text-[28px] font-medium text-heading leading-none">{data?.filter((i) => i.status === "rejected" || i.status === "withdrawn").length || 0}</p>
          <p className="mt-1.5 text-[13px] text-secondary-text font-medium">Closed</p>
        </div>
      </div>

      {data?.length === 0 ? (
        <EmptyState title="No applications yet" description="Start applying and track your progress here." />
      ) : (
        <div className="animate-fade-in-up animate-delay-200">
          <div className="divide-y divide-divider bg-surface rounded-xl border border-border overflow-hidden">
            {paged.map((application) => (
              <div key={application.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-[14px] transition-all duration-200 hover:bg-background hover:pl-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-sm font-medium shrink-0 shadow-sm">
                  {application.companyName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-heading truncate">{application.internshipTitle}</p>
                  <p className="text-[13px] text-secondary-text mt-0.5">{application.companyName}</p>
                  {application.interviewDate && (
                    <p className="text-[12px] text-info mt-0.5">Interview: {application.interviewDate}</p>
                  )}
                </div>
                <StatusBadge status={application.status} />
                <span className="text-[13px] text-secondary-text text-right w-24 shrink-0">{new Date(application.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-1 shrink-0">
                  {(application.status === "pending" || application.status === "reviewed") && (
                    <button onClick={() => handleWithdraw(application.id)} className="p-1.5 rounded-lg hover:bg-error/10 text-muted hover:text-error transition-all" title="Withdraw">
                      <XCircle size="14" />
                    </button>
                  )}
                  <Link to={`/internships/${application.internshipId}`} className="text-[13px] font-medium text-primary hover:underline shrink-0 text-right w-20 transition-all duration-200 hover:text-primary-hover">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-1.5 mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-7 w-7 rounded-full text-[12px] font-medium transition-all duration-200 flex items-center justify-center ${
                    p === page
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-sm"
                      : "text-secondary-text hover:bg-accent hover:text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
