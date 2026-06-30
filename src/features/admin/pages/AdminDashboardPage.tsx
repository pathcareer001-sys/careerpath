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
    toast.success("Perusahaan terverifikasi");
  };

  const barData = [
    { name: "Pengguna", value: data?.totalUsers || 0 },
    { name: "Perusahaan", value: data?.totalCompanies || 0 },
    { name: "Magang", value: data?.totalInternships || 0 },
    { name: "Lamaran", value: data?.totalApplications || 0 },
  ];

  const pieData = [
    { name: "Terverifikasi", value: (companies?.length || 0) - pendingCompanies.length },
    { name: "Tertunda", value: pendingCompanies.length },
  ];

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-heading">Dashboard Admin</h1>
        <p className="mt-1 text-sm text-secondary-text">Kelola platform CareerPath</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5 animate-fade-in-up animate-delay-100">
        <StatCard title="Pengguna" value={data?.totalUsers || 0} gradient="blue" />
        <StatCard title="Perusahaan" value={data?.totalCompanies || 0} gradient="purple" />
        <StatCard title="Magang" value={data?.totalInternships || 0} gradient="emerald" />
        <StatCard title="Lamaran" value={data?.totalApplications || 0} gradient="amber" />
        <StatCard title="Verifikasi" value={data?.pendingVerification || 0} gradient="rose" />
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-200">
        <AppCard>
          <h3 className="mb-4 text-base font-medium">Aksi Cepat</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/admin/companies">
              <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ShieldX size="20" className="text-primary mb-2" />
                <p className="font-medium">Kelola Perusahaan</p>
                <p className="text-xs text-secondary-text mt-1">Verifikasi, ubah, dan kelola data perusahaan</p>
              </AppCard>
            </Link>
            <Link to="/admin/users">
              <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ShieldCheck size="20" className="text-info mb-2" />
                <p className="font-medium">Kelola Pengguna</p>
                <p className="text-xs text-secondary-text mt-1">Ubah peran dan kelola akun pengguna</p>
              </AppCard>
            </Link>
            <Link to="/admin/reviews">
              <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ShieldCheck size="20" className="text-success mb-2" />
                <p className="font-medium">Kelola Ulasan</p>
                <p className="text-xs text-secondary-text mt-1">Moderasi ulasan perusahaan</p>
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
              Menunggu Verifikasi ({pendingCompanies.length})
            </h3>
            <div className="space-y-3">
              {pendingCompanies.slice(0, 10).map((company) => (
                <div key={company.id} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 hover:bg-warning/5 transition-colors">
                  <div>
                    <p className="font-medium text-sm text-heading">{company.name}</p>
                    <p className="text-xs text-secondary-text">{company.industry || "Tidak ada industri"}</p>
                  </div>
                  <AppButton onClick={() => handleVerify(company.id)} className="text-xs h-8 px-3">
                    <ShieldCheck size="13" /> Verifikasi
                  </AppButton>
                </div>
              ))}
              {pendingCompanies.length > 10 && (
                <Link to="/admin/companies" className="flex items-center justify-center gap-1 text-sm text-primary hover:text-primary transition-colors pt-2">
                  Lihat semua {pendingCompanies.length} perusahaan tertunda <ArrowRight size="14" />
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
            <h3 className="text-base font-medium">Ringkasan Platform</h3>
          </div>
          <AdminBarChart data={barData} />
        </AppCard>

        <AppCard>
          <div className="flex items-center gap-2 mb-4">
            <PieChart size="18" className="text-info" />
            <h3 className="text-base font-medium">Status Verifikasi Perusahaan</h3>
          </div>
          {data?.totalCompanies === 0 ? (
            <div className="h-[280px] flex items-center justify-center text-sm text-muted">
              Tidak ada data perusahaan
            </div>
          ) : (
            <AdminPieChart data={pieData} />
          )}
        </AppCard>
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h3 className="mb-4 text-base font-medium">Ringkasan Platform</h3>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-accent to-white border border-border">
              <p className="text-secondary-text text-sm">Pengguna</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalUsers || 0}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-info/10 to-white border border-border">
              <p className="text-secondary-text text-sm">Perusahaan</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalCompanies || 0}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-success/5 to-white border border-border">
              <p className="text-secondary-text text-sm">Magang</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalInternships || 0}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-warning/5 to-white border border-border">
              <p className="text-secondary-text text-sm">Lamaran</p>
              <p className="text-2xl font-medium text-heading mt-1">{data?.totalApplications || 0}</p>
            </div>
          </div>
        </AppCard>
      </div>
    </PageContainer>
  );
}
