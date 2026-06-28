import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import { useReports } from "@/features/reports/hooks/useReports";
import { useUpdateReportStatus } from "@/features/reports/hooks/useUpdateReportStatus";
import { Flag, AlertTriangle, Check, X, Clock, Building2, MessageSquare, Briefcase } from "lucide-react";
import { toast } from "sonner";

const typeIcons: Record<string, typeof Building2> = {
  review: MessageSquare,
  company: Building2,
  internship: Briefcase,
};

const typeLabels: Record<string, string> = {
  review: "Review",
  company: "Company",
  internship: "Internship",
};

export default function ReportManagementPage() {
  const { data: reports } = useReports();
  const updateStatus = useUpdateReportStatus();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("pending");

  const filtered = reports?.filter((r) => {
    const matchesTab = tab === "pending"
      ? r.status === "pending"
      : r.status === tab;
    const matchesSearch =
      r.reason?.toLowerCase().includes(search.toLowerCase()) ||
      r.reporterName?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  }) || [];

  const pendingCount = reports?.filter((r) => r.status === "pending").length || 0;
  const resolvedCount = reports?.filter((r) => r.status === "resolved").length || 0;
  const dismissedCount = reports?.filter((r) => r.status === "dismissed").length || 0;

  const handleResolve = async (id: string) => {
    await updateStatus.mutateAsync({ id, status: "resolved" });
    toast.success("Report resolved");
  };

  const handleDismiss = async (id: string) => {
    await updateStatus.mutateAsync({ id, status: "dismissed" });
    toast.success("Report dismissed");
  };

  return (
    <PageContainer>
      <PageHeader title="Report Management" description="Manage user reports and flagged content" />

      <div className="mt-6 space-y-6 animate-fade-in-up">
        <AppCard className="border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center text-warning shrink-0">
              <AlertTriangle size="16" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-heading">About Reports</h3>
              <p className="text-sm text-body mt-1">
                Review and take action on user-reported content including reviews, companies, and internship listings.
              </p>
            </div>
          </div>
        </AppCard>

        <SearchBar value={search} onChange={setSearch} placeholder="Search reports by reason, reporter, or description..." />

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-section p-0.5 rounded-lg">
            <TabsTrigger
              value="pending"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
            >
              <Clock size="15" />
              Pending
              {pendingCount > 0 && (
                <span className="ml-0.5 rounded-full bg-warning/10 px-1.5 py-0.5 text-[11px] font-medium text-warning">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="resolved"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
            >
              <Check size="15" />
              Resolved
              {resolvedCount > 0 && (
                <span className="ml-0.5 rounded-full bg-success/10 px-1.5 py-0.5 text-[11px] font-medium text-success">
                  {resolvedCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="dismissed"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
            >
              <X size="15" />
              Dismissed
              {dismissedCount > 0 && (
                <span className="ml-0.5 rounded-full bg-error/10 px-1.5 py-0.5 text-[11px] font-medium text-error">
                  {dismissedCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {["pending", "resolved", "dismissed"].map((t) => {
            const statusLabel = t === "resolved" ? "Resolved" : "Dismissed";

            return (
              <TabsContent key={t} value={t} className="mt-6">
                {filtered.length === 0 ? (
                  <EmptyState
                    title={`No ${t} reports`}
                    description={`${t === "pending" ? "No pending reports to review." : `No ${statusLabel.toLowerCase()} reports.`}`}
                  />
                ) : (
                  <div className="space-y-4">
                    {filtered.map((report) => {
                      const TypeIcon = typeIcons[report.type] || Flag;
                      return (
                        <AppCard key={report.id}>
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white shrink-0 ${
                                report.type === "review"
                                  ? "bg-gradient-to-br from-primary to-secondary"
                                  : report.type === "company"
                                    ? "bg-gradient-to-br from-secondary to-accent"
                                    : "bg-gradient-to-br from-success to-info"
                              }`}>
                                <TypeIcon size="18" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="rounded bg-section px-2 py-0.5 text-[11px] font-medium text-body leading-none">
                                    {typeLabels[report.type]}
                                  </span>
                                  <span className="text-xs text-muted">
                                    {new Date(report.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <h3 className="font-medium text-heading mt-1">{report.reason}</h3>
                                <p className="text-sm text-body mt-1">{report.description}</p>
                                <p className="text-xs text-muted mt-2">
                                  Reported by {report.reporterName}
                                </p>
                              </div>
                            </div>
                            {t === "pending" && (
                              <div className="flex flex-wrap gap-2">
                                <AppButton
                                  variant="primary"
                                  onClick={() => handleResolve(report.id)}
                                  disabled={updateStatus.isPending}
                                >
                                  <Check size="14" /> Resolve
                                </AppButton>
                                <AppButton
                                  variant="secondary"
                                  className="text-error border-error/30 hover:bg-error/10"
                                  onClick={() => handleDismiss(report.id)}
                                  disabled={updateStatus.isPending}
                                >
                                  <X size="14" /> Dismiss
                                </AppButton>
                              </div>
                            )}
                          </div>
                        </AppCard>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </PageContainer>
  );
}
