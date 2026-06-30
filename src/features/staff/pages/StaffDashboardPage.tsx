import { useAllReviews } from "@/features/reviews/hooks/useAllReviews";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import StatCard from "@/components/shared/StatCard";
import AppCard from "@/components/common/AppCard";
import { Star, Flag, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function StaffDashboardPage() {
  const { data: reviews } = useAllReviews();
  const { data: companies } = useCompanies();

  const pendingVerification = companies?.filter((c) => !c.verified).length || 0;
  const totalReports = 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-medium text-heading">Dashboard Staf</h1>
        <p className="mt-1 text-sm text-secondary-text">Moderasi ulasan, verifikasi perusahaan, kelola laporan</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-fade-in-up animate-delay-100">
        <StatCard title="Total Ulasan" value={reviews?.length || 0} gradient="blue" />
        <StatCard title="Verifikasi Tertunda" value={pendingVerification} gradient="amber" />
        <StatCard title="Laporan" value={totalReports} gradient="rose" />
        <StatCard title="Perusahaan Terverifikasi" value={(companies?.length || 0) - pendingVerification} gradient="emerald" />
      </div>

      <div className="grid gap-4 md:grid-cols-3 animate-fade-in-up animate-delay-200">
        <Link to="/staff/reviews">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Star size="20" className="text-primary mb-2" />
            <h3 className="font-medium">Moderasi Ulasan</h3>
            <p className="text-sm text-secondary-text mt-1">Moderasi ulasan perusahaan oleh mahasiswa</p>
          </AppCard>
        </Link>
        <Link to="/staff/verification">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <ShieldCheck size="20" className="text-success mb-2" />
            <h3 className="font-medium">Verifikasi Perusahaan</h3>
            <p className="text-sm text-secondary-text mt-1">{pendingVerification} perusahaan menunggu verifikasi</p>
          </AppCard>
        </Link>
        <Link to="/staff/reports">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Flag size="20" className="text-error mb-2" />
            <h3 className="font-medium">Laporan</h3>
            <p className="text-sm text-secondary-text mt-1">Kelola laporan pengguna</p>
          </AppCard>
        </Link>
      </div>
    </div>
  );
}
