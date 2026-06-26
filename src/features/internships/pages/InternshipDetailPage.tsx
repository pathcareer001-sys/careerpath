import { Link, useParams } from "react-router-dom";

import { Building2 } from "lucide-react";
import { toast } from "sonner";

import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";

import { useInternship } from "../hooks/useInternship";
import InternshipHero from "../components/InternshipHero";

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

  const { data: hasApplied } = useHasApplied(
    internship?.id || "",
    user?.uid || "",
  );

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
      <InternshipHero
        internship={internship}
        onApply={handleApply}
        isApplying={createApplication.isPending}
        userRole={user?.role}
        hasApplied={hasApplied}
      />

      <div
        className="
        grid
        gap-6
        lg:grid-cols-[2fr_1fr]
        "
      >
        {/* LEFT */}
        <div className="space-y-6">
          <AppCard>
            <h2
              className="
              text-2xl
              font-bold
              mb-4
              "
            >
              About Internship
            </h2>

            <p
              className="
            whitespace-pre-line
            text-slate-600
            leading-8
            "
            >
              {internship.description}
            </p>
          </AppCard>

          <AppCard>
            <h2
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              Requirements
            </h2>

            <div className="flex flex-wrap gap-3">
              {(internship.requirements || []).map((item) => (
                <span
                  key={item}
                  className="
      rounded-full
      bg-blue-50
      px-4
      py-2
      text-sm
      font-medium
      text-blue-600
      "
                >
                  {item}
                </span>
              ))}
            </div>
          </AppCard>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <AppCard>
            <div
              className="
    grid
    grid-cols-2
    gap-3
    "
            >
              <StatBox label="Type" value={internship.type} />

              <StatBox label="Location" value={internship.location} />

              <StatBox label="Company" value={internship.companyName} />

              <StatBox label="Status" value="Open" />
            </div>
          </AppCard>
          <AppCard>
            <h3 className="font-semibold mb-4">Company</h3>

            <div className="flex items-center gap-3">
              <div
                className="
      h-12
      w-12
      rounded-xl
      bg-blue-50
      flex
      items-center
      justify-center
      "
              >
                <Building2 size={22} className="text-blue-600" />
              </div>

              <div>
                <p className="font-semibold">{internship.companyName}</p>

                <p className="text-sm text-slate-500">Internship Provider</p>
              </div>
            </div>

            <Link
              to={`/companies/${internship.companyId}`}
              className="
    mt-4
    block
    rounded-xl
    bg-blue-600
    py-3
    text-center
    text-sm
    font-medium
    text-white
    "
            >
              View Company
            </Link>
          </AppCard>

          <AppCard>
            <h3 className="font-semibold mb-4">Internship Information</h3>

            <div className="space-y-4">
              <InfoRow label="Company" value={internship.companyName} />

              <InfoRow label="Location" value={internship.location} />

              <InfoRow label="Type" value={internship.type} />

              <InfoRow label="Deadline" value={internship.deadline} />
            </div>
          </AppCard>

          <AppCard>
            <h3 className="font-semibold mb-3">Career Tip 🚀</h3>

            <p
              className="
              text-sm
              text-slate-500
              leading-6
              "
            >
              Make sure your profile is complete before applying. Companies are
              more likely to review candidates with detailed information and
              experience.
            </p>
          </AppCard>
        </div>
      </div>

      {user?.role === "student" && (
        <div
          className="
    fixed
    bottom-0
    left-0
    right-0
    z-50
    border-t
    bg-white
    p-4
    lg:hidden
    "
        >
          <button
            onClick={handleApply}
            disabled={hasApplied || createApplication.isPending}
            className="
      w-full
      rounded-xl
      bg-blue-600
      py-3
      font-medium
      text-white
      "
          >
            {hasApplied ? "Already Applied" : "Apply Internship"}
          </button>
        </div>
      )}
    </PageContainer>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>

      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
      rounded-xl
      bg-slate-50
      p-4
      "
    >
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
