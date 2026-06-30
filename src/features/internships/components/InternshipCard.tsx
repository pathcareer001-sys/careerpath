import { Link } from "react-router-dom";
import { MapPin, CalendarDays, Bookmark, BookmarkCheck } from "lucide-react";
import type { Internship } from "@/types/internship";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateInternshipBookmark } from "@/features/bookmarks/hooks/useCreateInternshipBookmark";
import { useDeleteInternshipBookmark } from "@/features/bookmarks/hooks/useDeleteInternshipBookmark";
import { useInternshipBookmarks } from "@/features/bookmarks/hooks/useInternshipBookmarks";
import VerifiedBadge from "@/components/company/VerifiedBadge";

const tagStyles: Record<string, string> = {
  Remote: "bg-gradient-to-r from-success/10 to-accent text-success border border-success/30",
  Hybrid: "bg-gradient-to-r from-accent to-section text-primary border border-primary/30",
  Onsite: "bg-gradient-to-r from-warning/10 to-accent text-warning border border-warning/30",
};

const badgeStyles: Record<string, string> = {
  Internship: "bg-info/10 text-info border border-info/20",
  "Full Time": "bg-info/10 text-info border border-info/20",
  "Part Time": "bg-info/10 text-info border border-info/20",
  Contract: "bg-info/10 text-info border border-info/20",
  "SMA/SMK": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Diploma (D3)": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Bachelor's Degree (S1)": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Master's Degree (S2)": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Fresh Graduate": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "Less than 1 Year": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "1-3 Years": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "3-5 Years": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "5+ Years": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
};

interface InternshipCardProps {
  internship: Internship;
  showPremiumBadge?: boolean;
}

export default function InternshipCard({ internship, showPremiumBadge }: InternshipCardProps) {
  const { user } = useAuth();
  const { data: bookmarks } = useInternshipBookmarks(user?.uid || "");
  const createBookmark = useCreateInternshipBookmark();
  const deleteBookmark = useDeleteInternshipBookmark();

  const bookmark = bookmarks?.find((b) => b.internshipId === internship.id);
  const isBookmarked = !!bookmark;

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    if (isBookmarked && bookmark) {
      deleteBookmark.mutate(bookmark.id);
    } else {
      createBookmark.mutate({ userId: user.uid, internshipId: internship.id });
    }
  };

  const tagClass = tagStyles[internship.type] || "bg-gradient-to-r from-accent to-section text-primary border border-primary/30";

  return (
    <Link to={`/internships/${internship.id}`} className="block group animate-fade-in-up">
      <div className="relative bg-surface border border-border rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary">
        <button
          onClick={handleBookmark}
          className="absolute top-4 right-4 transition-colors duration-200"
        >
          {isBookmarked ? (
            <BookmarkCheck size="16" className="text-primary" />
          ) : (
            <Bookmark size="16" className="text-muted group-hover:text-primary" />
          )}
        </button>
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg shrink-0 overflow-hidden">
            {internship.companyLogo ? (
              <img src={internship.companyLogo} alt={internship.companyName} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
                {internship.companyName.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-heading leading-snug group-hover:text-primary transition-colors duration-200">{internship.title}</h3>
              {internship.status === "draft" && (
                <span className="rounded bg-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-warning leading-none">Draf</span>
              )}
            </div>
            <p className="text-[13px] text-secondary-text mt-0.5 flex items-center gap-1">
              {internship.companyName}
              <VerifiedBadge show={showPremiumBadge} size={12} />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className={`rounded-full px-2.5 py-[3px] text-[12px] font-medium leading-none ${tagClass}`}>
            {internship.type}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-secondary-text">
            <MapPin size="13" />
            {internship.location}
          </span>
          {internship.salary && (
            <span className="rounded-full bg-gradient-to-r from-success/10 to-accent px-2.5 py-[3px] text-[12px] font-medium text-success border border-success/30 leading-none">
              {internship.salary}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {internship.employmentType && (
            <span className={`rounded px-1.5 py-[2px] text-[10px] font-medium leading-none ${badgeStyles[internship.employmentType] || "bg-section text-secondary-text border border-border/60"}`}>
              {internship.employmentType}
            </span>
          )}
          {internship.minEducation && (
            <span className={`rounded px-1.5 py-[2px] text-[10px] font-medium leading-none ${badgeStyles[internship.minEducation] || "bg-section text-secondary-text border border-border/60"}`}>
              {internship.minEducation === "Bachelor's Degree (S1)" ? "S1" : internship.minEducation === "Master's Degree (S2)" ? "S2" : internship.minEducation === "Diploma (D3)" ? "D3" : internship.minEducation}
            </span>
          )}
          {internship.experienceLevel && (
            <span className={`rounded px-1.5 py-[2px] text-[10px] font-medium leading-none ${badgeStyles[internship.experienceLevel] || "bg-section text-secondary-text border border-border/60"}`}>
              {internship.experienceLevel}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-divider">
          <span className="flex items-center gap-1 text-[12px] text-muted">
            <CalendarDays size="13" />
            {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : "Tanpa tenggat"}
          </span>
          <span className="text-[13px] font-medium text-primary opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            Lihat Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
