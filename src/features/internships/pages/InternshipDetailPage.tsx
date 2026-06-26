import { Link, useParams } from "react-router-dom";
import { Building2, MapPin, Briefcase, Calendar } from "lucide-react";
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

export default function InternshipDetailPage() {
  const { id } = useParams();
  const { data: internship, isLoading } = useInternship(id || "");
  const { user } = useAuth();
  const createApplication = useCreateApplication();
  const { data: hasApplied } = useHasApplied(internship?.id || "", user?.uid || "");

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

  if (isLoading) return <LoadingState />;
  if (!internship) return <EmptyState title="Internship not found" description="The internship may have been removed." />;

  return (
    <PageContainer>
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
              <Building2 size="24" />
            </div>
            <div>
              <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-[11px] font-medium text-blue-600">
                Internship
              </span>
              <h1 className="text-[22px] font-medium text-slate-900 mt-1">{internship.title}</h1>
              <p className="text-sm text-slate-500">{internship.companyName}</p>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-64">
          {user?.role === "student" && (
            <AppButton
              className="w-full"
              onClick={handleApply}
              disabled={hasApplied || createApplication.isPending}
            >
              {hasApplied ? "Applied" : createApplication.isPending ? "Applying..." : "Apply"}
            </AppButton>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <div className="flex items-center gap-1.5 rounded-lg bg-surface-alt px-3 py-1.5 text-xs text-slate-600">
          <MapPin size="14" /> {internship.location}
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-surface-alt px-3 py-1.5 text-xs text-slate-600">
          <Briefcase size="14" /> {internship.type}
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-surface-alt px-3 py-1.5 text-xs text-slate-600">
          <Calendar size="14" /> {internship.deadline || "No deadline"}
        </div>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <AppCard>
            <h2 className="text-base font-medium text-slate-900 mb-3">About this internship</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{internship.description}</p>
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-slate-900 mb-4">Requirements</h2>
            <div className="flex flex-wrap gap-2">
              {(internship.requirements || []).map((item) => (
                <span key={item} className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-blue-600">
                  {item}
                </span>
              ))}
            </div>
          </AppCard>
        </div>

        <div className="space-y-4">
          <AppCard>
            <h3 className="text-sm font-medium text-slate-900 mb-3">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Type</span>
                <span className="text-slate-700 font-medium">{internship.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-700 font-medium">{internship.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Company</span>
                <span className="text-slate-700 font-medium">{internship.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="text-green-600 font-medium">Open</span>
              </div>
            </div>
          </AppCard>

          <AppCard>
            <h3 className="text-sm font-medium text-slate-900 mb-3">Company</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-surface-alt flex items-center justify-center">
                <Building2 size="20" className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{internship.companyName}</p>
                <p className="text-xs text-slate-500">Internship provider</p>
              </div>
            </div>
            <Link to={`/companies/${internship.companyId}`}>
              <AppButton variant="secondary" className="w-full mt-4">View company</AppButton>
            </Link>
          </AppCard>

          <AppCard>
            <h3 className="text-sm font-medium text-slate-900 mb-2">Tip</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Make sure your profile is complete before applying. Companies are more likely to review candidates with detailed information.
            </p>
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
