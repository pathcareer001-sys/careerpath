import { useParams } from "react-router-dom";

import { Building2, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import { useInternship } from "../hooks/useInternship";
import { useCreateApplication } from "@/features/applications/hooks/useCreateApplication";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

export default function InternshipDetailPage() {
  const { id } = useParams();

  const { data: internship, isLoading } = useInternship(id || "");

  const { user } = useAuth();

  const createApplication = useCreateApplication();

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

  if (isLoading) {
    return <LoadingState />;
  }

  if (!internship) {
    return (
      <EmptyState
        title="Internship Not Found"
        description="The internship may have been removed."
      />
    );
  }

  return (
    <PageContainer>
      <AppCard>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{internship.title}</h1>

            <div className="space-y-2 text-slate-500">
              <div className="flex items-center gap-2">
                <Building2 size={16} />
                {internship.companyName}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {internship.location}
              </div>
            </div>

            <span
              className="
        inline-flex
        items-center
        rounded-full
        bg-blue-50
        text-blue-600
        px-3
        py-1
        text-xs
        font-medium
        "
            >
              {internship.type}
            </span>
          </div>

          <div className="space-y-3">
            <div
              className="
        flex
        items-center
        gap-2
        text-sm
        font-medium
        text-orange-600
        "
            >
              <Calendar size={16} />
              Apply before {internship.deadline}
            </div>

            {user?.role === "student" && (
              <AppButton
                onClick={handleApply}
                disabled={createApplication.isPending}
              >
                {createApplication.isPending
                  ? "Applying..."
                  : "Apply Internship"}
              </AppButton>
            )}
          </div>
        </div>
      </AppCard>

      <AppCard>
        <h2 className="font-semibold mb-4">Description</h2>

        <p
          className="
          text-slate-600
          leading-7
          "
        >
          {internship.description}
        </p>
      </AppCard>

      <AppCard>
        <h2 className="font-semibold mb-4">Requirements</h2>

        <ul className="space-y-2">
          {(internship.requirements || []).map((item) => (
            <li
              key={item}
              className="
  flex
  items-center
  gap-2
  "
            >
              <CheckCircle2 size={16} className="text-green-600" />

              {item}
            </li>
          ))}
        </ul>
      </AppCard>
    </PageContainer>
  );
}
