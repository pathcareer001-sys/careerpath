import PageContainer from "@/components/common/PageContainer";
import StatCard from "@/components/shared/StatCard";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import { Link } from "react-router-dom";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useUpdateCompany } from "@/features/companies/hooks/useUpdateCompany";
import { toast } from "sonner";
import { ShieldCheck, ShieldX, ArrowRight, TrendingUp, PieChart } from "lucide-react";
import { AdminBarChart, AdminPieChart } from "../components/AdminCharts";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function AdminDashboardPage() {
  const { data } = useAdminDashboard();
  const { data: companies } = useCompanies();
  const updateCompany = useUpdateCompany();

  const pendingCompanies = companies?.filter((c) => !c.verified) || [];

  const handleVerify = async (id: string) => {
    await updateCompany.mutateAsync({ id, data: { verified: true } });
    toast.success("Company verified");
  };

  const barData = [
    { name: "Users", value: data?.totalUsers || 0 },
    { name: "Companies", value: data?.totalCompanies || 0 },
    { name: "Internships", value: data?.totalInternships || 0 },
    { name: "Applications", value: data?.totalApplications || 0 },
  ];

  const pieData = [
    { name: "Verified", value: (companies?.length || 0) - pendingCompanies.length },
    { name: "Pending", value: pendingCompanies.length },
  ];

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-heading">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-secondary-text">Manage CareerPath platform</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5 animate-fade-in-up animate-delay-100">
        <StatCard title="Users" value={data?.totalUsers || 0} gradient="blue" />
        <StatCard title="Companies" value={data?.totalCompanies || 0} gradient="purple" />
        <StatCard title="Internships" value={data?.totalInternships || 0} gradient="emerald" />
        <StatCard title="Applications" value={data?.totalApplications || 0} gradient="amber" />
        <StatCard title="Pending Verify" value={data?.pendingVerification || 0} gradient="rose" />
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-200">
        <AppCard>
          <h3 className="mb-4 text-base font-medium">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/admin/companies">
              <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ShieldX size="20" className="text-primary mb-2" />
                <p className="font-medium">Manage Companies</p>
                <p className="text-xs text-secondary-text mt-1">Verify, edit, and manage company data</p>
              </AppCard>
            </Link>
            <Link to="/admin/users">
              <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ShieldCheck size="20" className="text-info mb-2" />
                <p className="font-medium">Manage Users</p>
                <p className="text-xs text-secondary-text mt-1">Edit roles and manage user accounts</p>
              </AppCard>
            </Link>
            <Link to="/admin/reviews">
              <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ShieldCheck size="20" className="text-success mb-2" />
                <p className="font-medium">Manage Reviews</p>
                <p className="text-xs text-secondary-text mt-1">Moderate company reviews</p>
              </AppCard>
            </Link>
          </div>
        </AppCard>
      </div>

      {pendingCompanies.length > 0 && (
        <div className="mt-6 animate-fade-in-up animate-delay-200">
          <AppCard className="border-warning/30">
            <h3 className="mb-4 text-base font-medium flex items-center gap-2">
              <ShieldX size="16" className="text-warning" />
              Pending Verification ({pendingCompanies.length})
            </h3>
            <div className="space-y-3">
              {pendingCompanies.slice(0, 10).map((company) => (
                <div key={company.id} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 hover:bg-warning/5 transition-colors">
                  <div>
                    <p className="font-medium text-sm text-heading">{company.name}</p>
                    <p className="text-xs text-secondary-text">{company.industry || "No industry"}</p>
                  </div>
                  <AppButton onClick={() => handleVerify(company.id)} className="text-xs h-8 px-3">
                    <ShieldCheck size="13" /> Verify
                  </AppButton>
                </div>
              ))}
              {pendingCompanies.length > 10 && (
                <Link to="/admin/companies" className="flex items-center justify-center gap-1 text-sm text-primary hover:text-primary transition-colors pt-2">
                  View all {pendingCompanies.length} pending companies <ArrowRight size="14" />
                </Link>
              )}
            </div>
          </AppCard>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2 animate-fade-in-up animate-delay-300">
        <AppCard>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size="18" className="text-primary" />
            <h3 className="text-base font-medium">Platform Overview</h3>
          </div>
          <AdminBarChart data={barData} />
        </AppCard>

        <AppCard>
          <div className="flex items-center gap-2 mb-4">
            <PieChart size="18" className="text-info" />
            <h3 className="text-base font-medium">Company Verification Status</h3>
          </div>
          {data?.totalCompanies === 0 ? (
            <div className="h-[280px] flex items-center justify-center text-sm text-muted">
              No company data available
            </div>
          ) : (
            <AdminPieChart data={pieData} />
          )}
        </AppCard>
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h3 className="mb-4 text-base font-medium">Platform Overview</h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-accent to-white border border-border">
              <p className="text-secondary-text text-sm">Users</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalUsers || 0}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-info/10 to-white border border-border">
              <p className="text-secondary-text text-sm">Companies</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalCompanies || 0}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-success/5 to-white border border-border">
              <p className="text-secondary-text text-sm">Internships</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalInternships || 0}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-warning/5 to-white border border-border">
              <p className="text-secondary-text text-sm">Applications</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalApplications || 0}</p>
            </div>
          </div>
        </AppCard>
      </div>
    </PageContainer>
  );
}
