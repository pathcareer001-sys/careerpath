import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/shared/StatCard";
import { useAuth } from "@/hooks/useAuth";
import { useCompanyInternships } from "@/features/internships/hooks/useCompanyInternships";

export default function CompanyDashboardPage() {
  const { user } = useAuth();
  const { data: internships } = useCompanyInternships(user?.uid || "");

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard Perusahaan"
        description="Kelola magang dan pelamar"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <StatCard title="Magang" value={internships?.length || 0} />
        <StatCard title="Pelamar" value={0} />
      </div>
    </PageContainer>
  );
}
