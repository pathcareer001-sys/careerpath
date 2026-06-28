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
        <h1 className="text-2xl font-medium text-heading">Staff Dashboard</h1>
        <p className="mt-1 text-sm text-secondary-text">Moderate reviews, verify companies, manage reports</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-fade-in-up animate-delay-100">
        <StatCard title="Total Reviews" value={reviews?.length || 0} gradient="blue" />
        <StatCard title="Pending Verification" value={pendingVerification} gradient="amber" />
        <StatCard title="Reports" value={totalReports} gradient="rose" />
        <StatCard title="Verified Companies" value={(companies?.length || 0) - pendingVerification} gradient="emerald" />
      </div>

      <div className="grid gap-4 md:grid-cols-3 animate-fade-in-up animate-delay-200">
        <Link to="/staff/reviews">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Star size="20" className="text-primary mb-2" />
            <h3 className="font-medium">Review Moderation</h3>
            <p className="text-sm text-secondary-text mt-1">Moderate student company reviews</p>
          </AppCard>
        </Link>
        <Link to="/staff/verification">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <ShieldCheck size="20" className="text-success mb-2" />
            <h3 className="font-medium">Company Verification</h3>
            <p className="text-sm text-secondary-text mt-1">{pendingVerification} companies pending verification</p>
          </AppCard>
        </Link>
        <Link to="/staff/reports">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Flag size="20" className="text-error mb-2" />
            <h3 className="font-medium">Reports</h3>
            <p className="text-sm text-secondary-text mt-1">Manage user reports</p>
          </AppCard>
        </Link>
      </div>
    </div>
  );
}
