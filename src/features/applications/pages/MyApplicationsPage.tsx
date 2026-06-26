import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "@/components/shared/EmptyState";
import { useApplications } from "../hooks/useApplications";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingState from "@/components/shared/LoadingState";
import StatusBadge from "../components/StatusBadge";

const PAGE_SIZE = 8;

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const { data, isLoading } = useApplications(user?.uid || "");
  const [page, setPage] = useState(1);

  if (isLoading) return <LoadingState />;

  const totalPages = Math.ceil((data?.length || 0) / PAGE_SIZE);
  const paged = data?.slice(0, page * PAGE_SIZE) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-[#0F172A]">Applications</h1>
        <p className="mt-1 text-sm text-[#64748B]">Track every step of your internship journey</p>
      </div>

      <div className="grid gap-4 grid-cols-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5">
          <p className="text-[28px] font-medium text-[#0F172A]">{data?.length || 0}</p>
          <p className="mt-0.5 text-[13px] text-[#94A3B8]">Total</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5">
          <p className="text-[28px] font-medium text-[#0F172A]">{data?.filter((i) => i.status === "accepted").length || 0}</p>
          <p className="mt-0.5 text-[13px] text-[#94A3B8]">Accepted</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5">
          <p className="text-[28px] font-medium text-[#0F172A]">{data?.filter((i) => i.status === "pending" || i.status === "reviewed").length || 0}</p>
          <p className="mt-0.5 text-[13px] text-[#94A3B8]">In Progress</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5">
          <p className="text-[28px] font-medium text-[#0F172A]">{data?.filter((i) => i.status === "rejected").length || 0}</p>
          <p className="mt-0.5 text-[13px] text-[#94A3B8]">Rejected</p>
        </div>
      </div>

      {data?.length === 0 ? (
        <EmptyState title="No applications yet" description="Start applying and track your progress here." />
      ) : (
        <div className="bg-white border border-[#E2E8F0] rounded-xl">
          <div className="divide-y divide-[#F1F5F9]">
            {paged.map((application) => (
              <div key={application.id} className="flex items-center gap-4 px-5 py-[14px]">
                <div className="h-10 w-10 rounded-full border border-[#F1F5F9] bg-white flex items-center justify-center text-sm font-medium text-[#0F172A] shrink-0">
                  {application.companyName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{application.internshipTitle}</p>
                  <p className="text-[13px] text-[#64748B] mt-0.5">{application.companyName}</p>
                </div>
                <StatusBadge status={application.status} />
                <span className="text-[13px] text-[#64748B] w-24 text-right">{new Date(application.createdAt).toLocaleDateString()}</span>
                <Link to={`/internships/${application.internshipId}`} className="text-[13px] text-[#2563EB] hover:underline shrink-0">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-1.5 px-5 py-3 border-t border-[#F1F5F9]">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-6 w-6 rounded-full text-[12px] font-medium transition-colors ${
                    p === page
                      ? "bg-[#2563EB] text-white"
                      : "text-[#64748B] hover:bg-[#F1F5F9]"
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
