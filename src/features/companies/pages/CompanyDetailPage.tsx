import { useParams, Link } from "react-router-dom";
import { Star, BadgeCheck, Globe, MapPin, Building2 } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import { useCompany } from "../hooks/useCompany";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import ReviewCard from "@/features/reviews/components/ReviewCard";
import ReviewForm from "@/features/reviews/components/ReviewForm";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import { useCompanyInternshipsByCompanyId } from "@/features/internships/hooks/useCompanyInternshipsByCompanyId";
import InternshipCard from "@/features/internships/components/InternshipCard";
import BookmarkButton from "@/features/bookmarks/components/BookmarkButton";

export default function CompanyDetailPage() {
  const { id } = useParams();
  const { data: company, isLoading } = useCompany(id || "");
  const reviews = useReviews(id || "");
  const { data: internships } = useCompanyInternshipsByCompanyId(company?.id || "");

  if (isLoading) return <LoadingState />;

  if (!company) {
    return <EmptyState title="Perusahaan tidak ditemukan" description="Perusahaan mungkin telah dihapus." />;
  }

  return (
    <PageContainer>
      <AppCard className="animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-start gap-5">
          <div className="h-16 w-16 rounded-2xl shrink-0 overflow-hidden border border-border-light">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-surface flex items-center justify-center text-primary text-2xl font-medium">
                {company.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] font-medium">{company.name}</h1>
              {company.verified && <BadgeCheck size="20" className="text-primary/60" />}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body mt-1">
              <span className="flex items-center gap-1"><MapPin size="14" />{company.location}</span>
              <span className="flex items-center gap-1"><Building2 size="14" />{company.industry}</span>
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-secondary-text hover:text-primary transition-colors">
                  <Globe size="14" />Website
                </a>
              )}
            </div>
          </div>
          <div className="shrink-0">
            <BookmarkButton companyId={company.id} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-border-light">
          <div className="text-center flex-1 min-w-[80px]">
            <p className="text-[22px] font-medium">{company.avgRating || 0}</p>
            <div className="flex items-center gap-0.5 mt-1 justify-center">
              <Star size="14" className="fill-warning text-warning" />
            </div>
            <p className="text-xs text-secondary-text mt-0.5">Rating</p>
          </div>
          <div className="w-px h-10 bg-border-light" />
          <div className="text-center flex-1 min-w-[80px]">
            <p className="text-[22px] font-medium">{company.reviewCount || 0}</p>
            <p className="text-xs text-secondary-text mt-1">Ulasan</p>
          </div>
          <div className="w-px h-10 bg-border-light" />
          <div className="text-center flex-1 min-w-[80px]">
            <p className="text-[22px] font-medium">{internships?.length || 0}</p>
            <p className="text-xs text-secondary-text mt-1">Posisi terbuka</p>
          </div>
        </div>
      </AppCard>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 animate-fade-in-up animate-delay-100">
          <AppCard>
            <h2 className="text-base font-medium text-heading mb-3">Tentang</h2>
            <p className="text-sm text-body leading-relaxed">{company.description}</p>
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-4">Magang Terbuka</h2>
            {internships?.length === 0 ? (
              <EmptyState title="Tidak ada magang terbuka" description="Perusahaan ini tidak memiliki posisi aktif." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {internships?.slice(0, 4).map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            )}
          </AppCard>

          <AppCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-heading">Ulasan ({reviews.data?.length || 0})</h2>
              <div className="flex items-center gap-3">
                <Link to={`/companies/${id}/reviews`} className="text-xs font-medium text-primary hover:text-primary transition-colors">
                  Lihat semua &rarr;
                </Link>
                <div className="flex items-center gap-1 text-sm text-secondary-text">
                  <Star size="14" className="fill-warning text-warning" />
                  {company.avgRating || 0}
                </div>
              </div>
            </div>
            {reviews.data?.length === 0 ? (
              <EmptyState title="Belum ada ulasan" description="Jadilah yang pertama memberi ulasan perusahaan ini." />
            ) : (
              <div className="space-y-3">
                {reviews.data?.map((review) => <ReviewCard key={review.id} review={review} />)}
              </div>
            )}
          </AppCard>
        </div>

        <div className="space-y-4 animate-fade-in-up animate-delay-200">
          <AppCard>
            <h3 className="text-sm font-medium text-heading mb-3">Tulis Ulasan</h3>
            <p className="text-xs text-secondary-text mb-4">Bagikan pengalaman Anda untuk membantu mahasiswa lain.</p>
            <ReviewForm companyId={company.id} />
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
