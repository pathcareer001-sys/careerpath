import { Link, useParams } from "react-router-dom";
import { Building2, MapPin, Calendar, Clock, Bookmark, BookmarkCheck, XCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import { useInternship } from "../hooks/useInternship";
import { useCreateApplication } from "@/features/applications/hooks/useCreateApplication";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import { useHasApplied } from "@/features/applications/hooks/useHasApplied";
import { useApplications } from "@/features/applications/hooks/useApplications";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import { useInternshipBookmarks } from "@/features/bookmarks/hooks/useInternshipBookmarks";
import { useCreateInternshipBookmark } from "@/features/bookmarks/hooks/useCreateInternshipBookmark";
import { useDeleteInternshipBookmark } from "@/features/bookmarks/hooks/useDeleteInternshipBookmark";

const typeColors: Record<string, string> = {
  Remote: "bg-gradient-to-r from-success/10 to-accent text-success border border-success/30",
  Hybrid: "bg-gradient-to-r from-accent to-section text-primary border border-primary/30",
  "Full-time": "bg-gradient-to-r from-info/10 to-accent text-info border border-info/30",
  Onsite: "bg-gradient-to-r from-warning/10 to-accent text-warning border border-warning/30",
};

export default function InternshipDetailPage() {
  const { id } = useParams();
  const { data: internship, isLoading } = useInternship(id || "");
  const { user } = useAuth();
  const createApplication = useCreateApplication();
  const updateStatus = useUpdateApplicationStatus();
  const { data: hasApplied } = useHasApplied(internship?.id || "", user?.uid || "");
  const { data: myApplications } = useApplications(user?.uid || "");
  const myApplication = myApplications?.find((a) => a.internshipId === internship?.id);
  const { data: bookmarks } = useInternshipBookmarks(user?.uid || "");
  const createBookmark = useCreateInternshipBookmark();
  const deleteBookmark = useDeleteInternshipBookmark();
  const bookmark = bookmarks?.find((b) => b.internshipId === internship?.id);

  const handleApply = async () => {
    if (!internship || !user) return;
    try {
      await createApplication.mutateAsync({
        internshipId: internship.id,
        internshipTitle: internship.title,
        companyId: internship.companyId,
        companyName: internship.companyName,
        applicantId: user.uid,
        applicantName: user.name,
        applicantEmail: user.email,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      toast.success("Application submitted");
    } catch {
      toast.error("You already applied");
    }
  };

  const handleWithdraw = async () => {
    if (!myApplication) return;
    try {
      await updateStatus.mutateAsync({ id: myApplication.id, status: "withdrawn" });
      toast.success("Application withdrawn");
    } catch {
      toast.error("Failed to withdraw application");
    }
  };

  const handleBookmark = () => {
    if (!user || !internship) return;
    if (bookmark) {
      deleteBookmark.mutate(bookmark.id);
      toast.success("Removed from bookmarks");
    } else {
      createBookmark.mutate({ userId: user.uid, internshipId: internship.id });
      toast.success("Internship bookmarked");
    }
  };

  if (isLoading) return <LoadingState />;
  if (!internship) return <EmptyState title="Internship not found" description="The internship may have been removed." />;

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent to-section p-6 text-heading">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/60 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-section blur-3xl" />
          <div className="relative z-10 flex items-start gap-5">
            <div className="h-16 w-16 rounded-2xl bg-surface flex items-center justify-center text-primary shrink-0 border border-border">
              <Building2 size="32" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
                  Internship Opportunity
                </span>
                {internship.status === "draft" && (
                  <span className="inline-flex rounded-full bg-warning/20 px-3 py-1 text-xs font-medium backdrop-blur-sm border border-warning/30 text-warning">
                    Draft
                  </span>
                )}
              </div>
              <h1 className="text-[24px] font-medium leading-tight">{internship.title}</h1>
              <p className="text-body mt-1">{internship.companyName}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className={`rounded-full px-3 py-1 text-[12px] font-medium ${typeColors[internship.type] || "bg-section text-body"}`}>
                  {internship.type}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-section px-3 py-1 text-[12px] text-body border border-border">
                  <MapPin size="12" /> {internship.location}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-section px-3 py-1 text-[12px] text-body border border-border">
                  <Calendar size="12" /> {internship.deadline || "No deadline"}
                </span>
                {internship.salary && (
                  <span className="inline-flex rounded-full bg-success/20 px-3 py-1 text-[12px] font-medium text-success border border-success/30">
                    {internship.salary}
                  </span>
                )}
              </div>
            </div>
            <div className="shrink-0 flex flex-col gap-2">
              {user?.role === "student" && (
                <>
                  <AppButton
                    className="w-full bg-surface text-primary hover:bg-accent"
                    onClick={handleApply}
                    disabled={hasApplied && myApplication?.status !== "withdrawn" || createApplication.isPending}
                  >
                    {myApplication?.status === "withdrawn" ? "Re-apply" : hasApplied ? "Applied ✓" : createApplication.isPending ? "Applying..." : "Apply Now"}
                  </AppButton>
                  {hasApplied && myApplication?.status !== "withdrawn" && (
                    <AppButton variant="danger" onClick={handleWithdraw} disabled={updateStatus.isPending}>
                      <XCircle size="14" /> Withdraw
                    </AppButton>
                  )}
                  <AppButton variant="secondary" onClick={handleBookmark}>
                    {bookmark ? <BookmarkCheck size="14" /> : <Bookmark size="14" />}
                    {bookmark ? "Saved" : "Save"}
                  </AppButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 animate-fade-in-up animate-delay-100">
          <AppCard>
            <h2 className="text-base font-medium text-heading mb-3">About this internship</h2>
            <p className="text-sm text-body leading-relaxed whitespace-pre-line">{internship.description}</p>
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-4">Requirements</h2>
            <div className="flex flex-wrap gap-2">
              {(internship.requirements || []).map((item) => (
                <span key={item} className="rounded-full bg-gradient-to-r from-accent to-section px-3 py-1.5 text-xs font-medium text-primary border border-primary/30">
                  {item}
                </span>
              ))}
            </div>
          </AppCard>
        </div>

        <div className="space-y-4 animate-fade-in-up animate-delay-200">
          <AppCard>
            <h3 className="text-sm font-medium text-heading mb-3">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-divider">
                <span className="text-secondary-text">Type</span>
                <span className="text-body font-medium">{internship.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-divider">
                <span className="text-secondary-text">Location</span>
                <span className="text-body font-medium">{internship.location}</span>
              </div>
              {internship.salary && (
                <div className="flex justify-between py-2 border-b border-divider">
                  <span className="text-secondary-text">Salary</span>
                  <span className="text-success font-medium">{internship.salary}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-divider">
                <span className="text-secondary-text">Company</span>
                <span className="text-body font-medium">{internship.companyName}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-secondary-text">Status</span>
                <span className={`inline-flex items-center gap-1 font-medium ${internship.status === "draft" ? "text-warning" : "text-success"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${internship.status === "draft" ? "bg-warning" : "bg-success"}`} />
                  {internship.status === "draft" ? "Draft" : "Open"}
                </span>
              </div>
            </div>
          </AppCard>

          <AppCard>
            <h3 className="text-sm font-medium text-heading mb-3">Company</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-sm">
                <Building2 size="20" />
              </div>
              <div>
                <p className="text-sm font-medium text-heading">{internship.companyName}</p>
                <p className="text-xs text-secondary-text">Internship provider</p>
              </div>
            </div>
            <Link to={`/companies/${internship.companyId}`}>
              <AppButton variant="secondary" className="w-full mt-4">
                View company <ArrowRight size="14" />
              </AppButton>
            </Link>
          </AppCard>

          <div className="rounded-xl bg-gradient-to-br from-accent to-section border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-section flex items-center justify-center text-primary shrink-0">
                <Clock size="15" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-heading">Tip</h3>
                <p className="text-xs text-secondary-text leading-relaxed mt-1">
                  Make sure your profile is complete before applying. Companies are more likely to review candidates with detailed information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
