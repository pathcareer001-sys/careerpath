import { Clock3, Star, Users, Briefcase, CheckCircle2 } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import StatCard from "@/components/shared/StatCard";

import { useAuth } from "@/hooks/useAuth";

import { useCompanyInternships } from "@/features/internships/hooks/useCompanyInternships";

import { useMyCompany } from "../hooks/useMyCompany";

import { useCompanyApplications } from "@/features/applications/hooks/useCompanyApplications";
import AppCard from "@/components/common/AppCard";
import StatusBadge from "@/features/applications/components/StatusBadge";

export default function CompanyDashboardPage() {
  const { user } = useAuth();

  const { data: internships } = useCompanyInternships(user?.uid || "");

  const { data: company } = useMyCompany(user?.uid || "");

  const { data: applications } = useCompanyApplications(company?.id || "");

  const totalApplicants = applications?.length || 0;

  const pendingApplicants =
    applications?.filter((item) => item.status === "pending").length || 0;

  const acceptedApplicants =
    applications?.filter((item) => item.status === "accepted").length || 0;

  const internshipsCount = internships?.length || 0;

  return (
    <PageContainer>
      <PageHeader
        title="Company Dashboard"
        description="Manage internships and applicants"
      />

      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-5
        "
      >
        <StatCard
          title="Internships"
          value={internshipsCount}
          icon={Briefcase}
        />

        <StatCard title="Applicants" value={totalApplicants} icon={Users} />

        <StatCard title="Pending" value={pendingApplicants} icon={Clock3} />

        <StatCard
          title="Accepted"
          value={acceptedApplicants}
          icon={CheckCircle2}
        />
        <StatCard
          title="Rating"
          value={company?.avgRating || 0}
          icon={Star}
        />
      </div>

      <AppCard>
        <h2 className="font-semibold mb-4">Recent Applicants</h2>

        {applications?.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="
        flex
        justify-between
        py-3
        border-b
        "
          >
            <div>
              <p className="font-medium">{item.applicantName}</p>

              <p className="text-sm text-slate-500">{item.internshipTitle}</p>
            </div>

            <StatusBadge status={item.status} />
          </div>
        ))}
      </AppCard>
    </PageContainer>
  );
}
