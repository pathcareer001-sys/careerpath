import {
  Briefcase,
  Users,
  Star,
  Building2,
  Globe,
  MapPin,
} from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import StatCard from "@/components/shared/StatCard";
import VerifiedBadge from "@/components/company/VerifiedBadge";

import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCompanyDashboard } from "../hooks/useCompanyDashboard";
import { useCompanyByOwnerId } from "../hooks/useCompanyByOwnerId";
import CompanyAnalyticsChart from "../components/CompanyAnalyticsChart";
import StatusBadge from "@/features/applications/components/StatusBadge";
import { Link } from "react-router-dom";

export default function CompanyDashboardPage() {
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useCompanyDashboard(user?.uid || "");
  const { data: company } = useCompanyByOwnerId(user?.uid || "");

  if (isLoading) return <LoadingState />;

  const acceptanceRate = dashboard?.totalApplicants
    ? Math.round((dashboard.acceptedApplicants / dashboard.totalApplicants) * 100)
    : 0;

  if (!dashboard) {
    return <EmptyState title="Tidak Ada Data Dashboard" description="Data dashboard tidak tersedia" />;
  }

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.04] to-section p-6 text-heading">
          <div className="absolute top-0 right-0 w-36 h-36 md:w-64 md:h-64 rounded-full bg-white/60 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-48 md:h-48 rounded-full bg-section blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div>
              <p className="text-body text-sm">Selamat Datang Kembali</p>
              <div className="mt-2 flex items-center gap-2">
                <h1 className="text-3xl font-medium">{company?.name || "Perusahaan Anda"}</h1>
                <VerifiedBadge show={company?.subscription === "premium"} />
              </div>
              <p className="mt-1 text-body">{company?.industry || "Profil Perusahaan"}</p>
              {company?.verified && (
                <span className="inline-flex mt-3 rounded-full bg-success/20 px-3 py-1 text-xs text-success border border-success/30">
                  ✓ Perusahaan Terverifikasi
                </span>
              )}
              {company?.location && (
                <div className="mt-2 flex items-center gap-2 text-body text-sm">
                  <MapPin size="14" />
                  <span>{company.location}</span>
                </div>
              )}
              {company?.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 text-secondary-text hover:text-primary text-sm transition-colors">
                  <Globe size="14" />
                  <span className="truncate">{company.website}</span>
                </a>
              )}
              <div className="mt-4 flex items-center gap-2">
                <Star size="16" className="fill-warning text-warning" />
                <span className="text-lg font-medium">{company?.avgRating || 0}</span>
                <span className="text-secondary-text text-sm">({company?.reviewCount || 0} ulasan)</span>
              </div>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-body text-sm">Total Pelamar</p>
              <h2 className="text-4xl lg:text-5xl font-medium">{dashboard.totalApplicants || 0}</h2>
              <p className="mt-1 text-body text-sm">Tingkat Penerimaan: {acceptanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 animate-fade-in-up animate-delay-100">
        <Link to="/company/internships">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Briefcase className="text-primary mb-2" size="20" />
            <h3 className="font-medium">Kelola Magang</h3>
            <p className="text-sm text-secondary-text">Buat dan kelola postingan magang</p>
          </AppCard>
        </Link>
        <Link to="/company/internships">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Users className="text-primary mb-2" size="20" />
            <h3 className="font-medium">Lihat Pelamar</h3>
            <p className="text-sm text-secondary-text">Tinjau lamaran mahasiswa</p>
          </AppCard>
        </Link>
        <Link to="/company/profile">
          <AppCard className="hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Building2 className="text-primary mb-2" size="20" />
            <h3 className="font-medium">Profil Perusahaan</h3>
            <p className="text-sm text-secondary-text">Perbarui informasi perusahaan</p>
          </AppCard>
        </Link>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-5 animate-fade-in-up animate-delay-200">
        <StatCard title="Magang" value={dashboard.totalInternships || 0} gradient="blue" />
        <StatCard title="Pelamar" value={dashboard.totalApplicants || 0} gradient="purple" />
        <StatCard title="Menunggu" value={dashboard.pendingApplicants || 0} gradient="amber" />
        <StatCard title="Diterima" value={dashboard.acceptedApplicants || 0} gradient="emerald" />
        <StatCard title="Ditolak" value={dashboard.rejectedApplicants || 0} gradient="rose" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h2 className="text-base font-medium mb-1">Pelamar Terbaru</h2>
          <p className="text-sm text-secondary-text mb-4">Lamaran magang terbaru</p>
          {dashboard.applications?.length === 0 ? (
            <EmptyState title="Belum Ada Pelamar" description="Lamaran akan muncul di sini" />
          ) : (
            <div className="space-y-3">
              {dashboard.applications?.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors -mx-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full shrink-0 overflow-hidden">
                      {application.applicantPhotoURL ? (
                        <img src={application.applicantPhotoURL} alt={application.applicantName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-medium">
                          {application.applicantName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{application.applicantName}</p>
                      <p className="text-xs text-secondary-text">{application.internshipTitle}</p>
                    </div>
                  </div>
                  <StatusBadge status={application.status} />
                </div>
              ))}
            </div>
          )}
        </AppCard>

        <AppCard>
          <h2 className="text-base font-medium mb-1">Magang Aktif</h2>
          <p className="text-sm text-secondary-text mb-4">Postingan magang terbaru Anda</p>
          {dashboard.internships?.length === 0 ? (
            <EmptyState title="Tidak Ada Magang" description="Buat magang pertama Anda" />
          ) : (
            <div className="space-y-3">
              {dashboard.internships?.slice(0, 5).map((internship) => (
                <div key={internship.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors -mx-3">
                  <div>
                    <p className="text-sm font-medium">{internship.title}</p>
                    <p className="text-xs text-secondary-text">{internship.location}</p>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-success/10 to-accent px-3 py-1 text-xs font-medium text-success border border-success/30">
                    Aktif
                  </span>
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h2 className="text-base font-medium mb-1">Analitik Lamaran</h2>
          <p className="text-sm text-secondary-text mb-4">Gambaran status pelamar</p>
          {dashboard.totalApplicants === 0 ? (
            <EmptyState title="Belum Ada Analitik" description="Statistik lamaran akan muncul setelah mahasiswa mendaftar." />
          ) : (
            <CompanyAnalyticsChart pending={dashboard.pendingApplicants} accepted={dashboard.acceptedApplicants} rejected={dashboard.rejectedApplicants || 0} />
          )}
        </AppCard>

        <AppCard>
          <h2 className="text-base font-medium mb-1">Magang Terpopuler</h2>
          <p className="text-sm text-secondary-text mb-4">Diurutkan berdasarkan jumlah pelamar</p>
          {dashboard.internshipPerformance?.length === 0 ? (
            <EmptyState title="Tidak Ada Data" description="Statistik magang akan muncul di sini." />
          ) : (
            <div className="space-y-3">
              {dashboard.internshipPerformance?.slice(0, 5).map((internship, index) => (
                <div key={internship.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xs font-medium shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{internship.title}</p>
                      <p className="text-xs text-secondary-text">{internship.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium text-primary">{internship.applicants}</p>
                    <p className="text-xs text-secondary-text">Pelamar</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-300">
        <AppCard>
          <h2 className="text-base font-medium mb-1">Ulasan Terbaru</h2>
          <p className="text-sm text-secondary-text mb-4">Masukan mahasiswa terbaru</p>
          {dashboard.reviews?.length === 0 ? (
            <EmptyState title="Belum Ada Ulasan" description="Ulasan dari mahasiswa akan muncul di sini." />
          ) : (
            <div className="space-y-4">
              {dashboard.reviews?.slice(0, 3).map((review) => (
                <div key={review.id} className="p-4 rounded-xl border border-border hover:border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full shrink-0 overflow-hidden">
                      {review.userPhotoURL ? (
                        <img src={review.userPhotoURL} alt={review.userName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-medium">
                          {review.userName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.userName}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size="10" className={star <= review.rating ? "fill-warning text-warning" : "text-muted"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-body">{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </PageContainer>
  );
}
