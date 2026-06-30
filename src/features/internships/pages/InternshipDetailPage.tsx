import { Link, useParams } from "react-router-dom";
import { Building2, MapPin, Calendar, Clock, Bookmark, BookmarkCheck, XCircle, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import VerifiedBadge from "@/components/company/VerifiedBadge";
import { useInternship } from "../hooks/useInternship";
import { useCreateApplication } from "@/features/applications/hooks/useCreateApplication";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import { useHasApplied } from "@/features/applications/hooks/useHasApplied";
import { useApplications } from "@/features/applications/hooks/useApplications";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import { useInternshipBookmarks } from "@/features/bookmarks/hooks/useInternshipBookmarks";
import { useCreateInternshipBookmark } from "@/features/bookmarks/hooks/useCreateInternshipBookmark";
import { useDeleteInternshipBookmark } from "@/features/bookmarks/hooks/useDeleteInternshipBookmark";
import { useCompany } from "@/features/companies/hooks/useCompany";

const typeColors: Record<string, string> = {
  Remote: "bg-success/10 text-success border border-success/20",
  Hybrid: "bg-primary/10 text-primary border border-primary/20",
  "Full-time": "bg-info/10 text-info border border-info/20",
  Onsite: "bg-warning/10 text-warning border border-warning/20",
};

export default function InternshipDetailPage() {
  const { id } = useParams();
  const { data: internship, isLoading } = useInternship(id || "");
  const { data: internshipCompany } = useCompany(internship?.companyId || "");
  const { user } = useAuth();
  const createApplication = useCreateApplication();
  const updateStatus = useUpdateApplicationStatus();
  const { data: hasApplied } = useHasApplied(internship?.id || "", user?.uid || "");
  const { data: myApplications } = useApplications(user?.uid || "");
  const myApplication = myApplications?.find((a) => a.internshipId === internship?.id);
  const { data: bookmarks } = useInternshipBookmarks(user?.uid || "");
  const createBookmark = useCreateInternshipBookmark();
  const deleteBookmark = useDeleteInternshipBookmark();
  const bookmark = bookmarks?.find((b) => b.internshipId === internship?.id);

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
        applicantPhotoURL: user.photoURL || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      toast.success("Lamaran terkirim");
    } catch {
      toast.error("Anda sudah melamar");
    }
  };

  const handleWithdraw = async () => {
    if (!myApplication) return;
    try {
      await updateStatus.mutateAsync({ id: myApplication.id, status: "withdrawn" });
      toast.success("Lamaran ditarik");
    } catch {
      toast.error("Gagal menarik lamaran");
    }
  };

  const handleBookmark = async () => {
    if (!user || !internship) return;
    try {
      if (bookmark) {
        await deleteBookmark.mutateAsync(bookmark.id);
        toast.success("Dihapus dari bookmark");
      } else {
        await createBookmark.mutateAsync({ userId: user.uid, internshipId: internship.id });
        toast.success("Magang di-bookmark");
      }
    } catch {
      toast.error("Gagal");
    }
  };

  if (isLoading) return <LoadingState />;
  if (!internship) return <EmptyState title="Magang tidak ditemukan" description="Magang mungkin telah dihapus." />;

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.03] to-section border border-border shadow-sm p-5">
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.4]" />
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/50 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-primary/[0.03] blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start gap-5">
            <div className="h-16 w-16 rounded-2xl bg-surface flex items-center justify-center text-primary shrink-0 border border-border shadow-xs">
              <Building2 size="32" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
                  Kesempatan Magang
                </span>
                {internship.status === "draft" && (
                  <span className="inline-flex rounded-full bg-warning/20 px-3 py-1 text-xs font-medium border border-warning/30 text-warning">
                    Draf
                  </span>
                )}
              </div>
              <h1 className="text-[26px] font-semibold leading-tight tracking-tight">{internship.title}</h1>
              <p className="text-[15px] text-secondary-text mt-1.5 flex items-center gap-1.5">
                {internship.companyName}
                <VerifiedBadge show={internshipCompany?.subscription === "premium"} size={14} />
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                <span className={`rounded-full px-3.5 py-1 text-[12px] font-medium ${typeColors[internship.type] || "bg-section text-body border border-border"}`}>
                  {internship.type}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-section/80 px-3.5 py-1 text-[12px] text-secondary-text border border-border/60">
                  <MapPin size="13" /> {internship.location}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-section/80 px-3.5 py-1 text-[12px] text-secondary-text border border-border/60">
                  <Calendar size="13" /> {internship.deadline || "Tidak ada batas waktu"}
                </span>
                {internship.salary && (
                  <span className="inline-flex rounded-full bg-success/10 px-3.5 py-1 text-[12px] font-medium text-success border border-success/20">
                    {internship.salary}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {internship.employmentType && (
                  <span className="rounded bg-info/10 px-2 py-[2px] text-[11px] font-medium text-info border border-info/20 leading-none">{internship.employmentType}</span>
                )}
                {internship.minEducation && (
                  <span className="rounded bg-purple-500/10 px-2 py-[2px] text-[11px] font-medium text-purple-600 border border-purple-500/20 leading-none">
                    {internship.minEducation === "Bachelor's Degree (S1)" ? "S1" : internship.minEducation === "Master's Degree (S2)" ? "S2" : internship.minEducation === "Diploma (D3)" ? "D3" : internship.minEducation}
                  </span>
                )}
                {internship.experienceLevel && (
                  <span className="rounded bg-emerald-500/10 px-2 py-[2px] text-[11px] font-medium text-emerald-600 border border-emerald-500/20 leading-none">{internship.experienceLevel}</span>
                )}
                {internship.numberOfOpenings && (
                  <span className="flex items-center gap-1 rounded bg-primary/10 px-2 py-[2px] text-[11px] font-medium text-primary border border-primary/20 leading-none">{internship.numberOfOpenings} position{internship.numberOfOpenings > 1 ? "s" : ""}</span>
                )}
              </div>
            </div>
            <div className="shrink-0 flex flex-col gap-2.5 w-full md:w-auto">
              {user?.role === "student" && (
                <>
                  <AppButton
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={handleApply}
                    disabled={hasApplied && myApplication?.status !== "withdrawn" || createApplication.isPending}
                  >
                    {myApplication?.status === "withdrawn" ? (
                      <><Send size="16" /> Lamar Ulang</>
                    ) : hasApplied ? (
                      "Terdaftar ✓"
                    ) : createApplication.isPending ? (
                      "Melamar..."
                    ) : (
                      <><Send size="16" /> Lamar Sekarang</>
                    )}
                  </AppButton>
                  {hasApplied && myApplication?.status !== "withdrawn" && (
                    <AppButton variant="outline" className="w-full md:w-auto" onClick={handleWithdraw} disabled={updateStatus.isPending}>
                      <XCircle size="15" /> Tarik Lamaran
                    </AppButton>
                  )}
                  <AppButton variant="outline" className="w-full md:w-auto" onClick={handleBookmark}>
                    {bookmark ? <BookmarkCheck size="15" /> : <Bookmark size="15" />}
                    {bookmark ? "Tersimpan" : "Simpan"}
                  </AppButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 animate-fade-in-up animate-delay-100">
          <AppCard>
            <h2 className="text-[15px] font-semibold text-heading mb-3">Tentang magang ini</h2>
            <p className="text-sm text-body leading-relaxed whitespace-pre-line">{internship.description}</p>
          </AppCard>

          {internship.responsibilities && (
            <AppCard>
              <h2 className="text-[15px] font-semibold text-heading mb-3">Tanggung Jawab</h2>
              <p className="text-sm text-body leading-relaxed whitespace-pre-line">{internship.responsibilities}</p>
            </AppCard>
          )}

          <AppCard>
            <h2 className="text-[15px] font-semibold text-heading mb-4">Persyaratan</h2>
            {(internship.requiredSkills || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(internship.requiredSkills || []).map((item) => (
                  <span key={item} className="rounded-full bg-info/10 px-3.5 py-1.5 text-xs font-medium text-info border border-info/15">
                    {item}
                  </span>
                ))}
              </div>
            )}
            {(internship.preferredSkills || []).length > 0 && (
              <>
                <h3 className="text-xs font-medium text-secondary-text uppercase tracking-wider mb-2">Keahlian Tambahan</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(internship.preferredSkills || []).map((item) => (
                    <span key={item} className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-primary border border-primary/15">
                      {item}
                    </span>
                  ))}
                </div>
              </>
            )}
            {internship.languageRequirement && (
              <p className="text-sm text-body"><span className="text-secondary-text">Bahasa: </span>{internship.languageRequirement}</p>
            )}
            {!internship.requiredSkills?.length && !internship.preferredSkills?.length && !internship.languageRequirement && (
              <p className="text-sm text-secondary-text">Tidak ada persyaratan khusus.</p>
            )}
          </AppCard>

          {internship.benefits && (
            <AppCard>
              <h2 className="text-[15px] font-semibold text-heading mb-3">Manfaat & Tunjangan</h2>
              <p className="text-sm text-body leading-relaxed whitespace-pre-line">{internship.benefits}</p>
            </AppCard>
          )}
        </div>

        <div className="space-y-4 animate-fade-in-up animate-delay-200">
          <AppCard>
            <h3 className="text-[13.5px] font-semibold text-heading mb-3">Detail</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                <span className="text-secondary-text whitespace-nowrap">Mode Kerja</span>
                <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.type}</span>
              </div>
              {internship.employmentType && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Tipe Pekerjaan</span>
                  <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.employmentType}</span>
                </div>
              )}
              {internship.category && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Kategori</span>
                  <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.category}</span>
                </div>
              )}
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                <span className="text-secondary-text whitespace-nowrap">Lokasi</span>
                <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.location}</span>
              </div>
              {internship.salary && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Gaji</span>
                  <span className="text-success font-semibold text-right overflow-hidden break-words">{internship.salary}</span>
                </div>
              )}
              {!internship.salary && (internship.salaryMin || internship.salaryMax) && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Kisaran Gaji</span>
                  <span className="text-success font-semibold text-right overflow-hidden break-words">{internship.salaryMin || "—"} – {internship.salaryMax || "—"}</span>
                </div>
              )}
              {internship.numberOfOpenings && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Lowongan</span>
                  <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.numberOfOpenings}</span>
                </div>
              )}
              {internship.workingHours && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Jam Kerja</span>
                  <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.workingHours}</span>
                </div>
              )}
              {internship.minEducation && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Pendidikan Minimal</span>
                  <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.minEducation}</span>
                </div>
              )}
              {internship.experienceLevel && (
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                  <span className="text-secondary-text whitespace-nowrap">Pengalaman</span>
                  <span className="text-body font-semibold text-right overflow-hidden break-words">{internship.experienceLevel}</span>
                </div>
              )}
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                <span className="text-secondary-text whitespace-nowrap">Perusahaan</span>
                <Link to={`/companies/${internship.companyId}`} className="text-body font-semibold text-right break-words overflow-hidden hover:text-primary transition-colors inline-flex items-center gap-1 justify-end">
                  {internship.companyName}
                  <VerifiedBadge show={internshipCompany?.subscription === "premium"} size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5">
                <span className="text-secondary-text whitespace-nowrap">Status</span>
                <span className={`inline-flex items-center justify-end gap-1.5 font-semibold ${internship.status === "draft" ? "text-warning" : "text-success"}`}>
                  <span className={`h-2 w-2 rounded-full ${internship.status === "draft" ? "bg-warning" : "bg-success"}`} />
                  {internship.status === "draft" ? "Draf" : "Buka"}
                </span>
              </div>
            </div>
          </AppCard>

          <AppCard>
            <h3 className="text-[13.5px] font-semibold text-heading mb-3">Perusahaan</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-xs">
                <Building2 size="20" />
              </div>
              <div>
                <p className="text-sm font-semibold text-heading flex items-center gap-1">
                  {internship.companyName}
                  <VerifiedBadge show={internshipCompany?.subscription === "premium"} size={12} />
                </p>
                <p className="text-xs text-secondary-text">Penyedia magang</p>
              </div>
            </div>
            <Link to={`/companies/${internship.companyId}`}>
              <AppButton variant="outline" className="w-full mt-4">
                Lihat perusahaan <ArrowRight size="14" />
              </AppButton>
            </Link>
          </AppCard>

          <div className="rounded-xl bg-gradient-to-br from-primary/[0.03] to-section border border-primary/10 p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Clock size="15" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-heading">Tips</h3>
                <p className="text-xs text-secondary-text leading-relaxed mt-1.5">
                  Pastikan profil Anda lengkap sebelum melamar. Perusahaan lebih cenderung meninjau kandidat dengan informasi yang detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
