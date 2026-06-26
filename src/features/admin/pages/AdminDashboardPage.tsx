import {
  Building2,
  Briefcase,
  FileText,
  Users,
  ShieldAlert,
} from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import StatCard from "@/components/shared/StatCard";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import AppCard from "@/components/common/AppCard";
import { Link } from "react-router-dom";
import AppButton from "@/components/common/AppButton";

export default function AdminDashboardPage() {
  const { data } = useAdminDashboard();

  return (
    <PageContainer>
      <PageHeader
        title="Admin Dashboard"
        description="Manage CareerPath platform"
      />

      <div
        className="
        grid
        gap-6
        sd:grid-cols-2
        xl:grid-cols-5
        "
      >
        <StatCard title="Users" value={data?.totalUsers || 0} icon={Users} />

        <StatCard
          title="Companies"
          value={data?.totalCompanies || 0}
          icon={Building2}
        />

        <StatCard
          title="Internships"
          value={data?.totalInternships || 0}
          icon={Briefcase}
        />

        <StatCard
          title="Applications"
          value={data?.totalApplications || 0}
          icon={FileText}
        />

        <StatCard
          title="Pending Verify"
          value={data?.pendingVerification || 0}
          icon={ShieldAlert}
        />
      </div>

      <AppCard className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>

        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/admin/companies">
            <AppButton className="w-full">Verify Companies</AppButton>
          </Link>

          <Link to="/admin/users">
            <AppButton className="w-full">Manage Users</AppButton>
          </Link>

          <Link to="/admin/reviews">
            <AppButton className="w-full">Manage Reviews</AppButton>
          </Link>
        </div>
      </AppCard>
      <AppCard className="mt-6">
        <h3 className="mb-4 text-lg font-semibold">Platform Overview</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Total Users</span>
            <span className="font-semibold">{data?.totalUsers || 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Companies</span>
            <span className="font-semibold">{data?.totalCompanies || 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Internships</span>
            <span className="font-semibold">{data?.totalInternships || 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Applications</span>
            <span className="font-semibold">
              {data?.totalApplications || 0}
            </span>
          </div>
        </div>
      </AppCard>
      <AppCard className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Company Verification</h3>

        {data?.pendingVerification ? (
          <p>
            There are{" "}
            <span className="font-semibold">{data.pendingVerification}</span>{" "}
            companies waiting for verification.
          </p>
        ) : (
          <p className="text-slate-500">
            No companies waiting for verification.
          </p>
        )}
      </AppCard>
    </PageContainer>
  );
}
