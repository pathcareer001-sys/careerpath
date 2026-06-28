import { Link } from "react-router-dom";
import { MapPin, CalendarDays, Bookmark, BookmarkCheck } from "lucide-react";
import type { Internship } from "@/types/internship";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateInternshipBookmark } from "@/features/bookmarks/hooks/useCreateInternshipBookmark";
import { useDeleteInternshipBookmark } from "@/features/bookmarks/hooks/useDeleteInternshipBookmark";
import { useInternshipBookmarks } from "@/features/bookmarks/hooks/useInternshipBookmarks";

const tagStyles: Record<string, string> = {
  Remote: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200",
  Hybrid: "bg-gradient-to-r from-blue-50 to-indigo-50 text-primary border border-primary/30",
  "Full-time": "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200",
  Onsite: "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border border-purple-200",
};

export default function InternshipCard({ internship }: { internship: Internship }) {
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

  const tagClass = tagStyles[internship.type] || "bg-gradient-to-r from-blue-50 to-indigo-50 text-primary border border-primary/30";

  return (
    <Link to={`/internships/${internship.id}`} className="block group animate-fade-in-up">
      <div className="relative bg-surface border border-border rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 hover:border-primary">
        <button
          onClick={handleBookmark}
          className="absolute top-4 right-4 transition-colors duration-200"
        >
          {isBookmarked ? (
            <BookmarkCheck size="16" className="text-primary" />
          ) : (
            <Bookmark size="16" className="text-[#CBD5E1] group-hover:text-primary" />
          )}
        </button>
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-medium shrink-0">
            {internship.companyName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-[#0F172A] leading-snug group-hover:text-primary transition-colors duration-200">{internship.title}</h3>
              {internship.status === "draft" && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 leading-none">Draft</span>
              )}
            </div>
            <p className="text-[13px] text-secondary-text mt-0.5">{internship.companyName}</p>
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
            <span className="rounded-full bg-gradient-to-r from-emerald-50 to-green-50 px-2.5 py-[3px] text-[12px] font-medium text-emerald-700 border border-emerald-200 leading-none">
              {internship.salary}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9]">
          <span className="flex items-center gap-1 text-[12px] text-muted">
            <CalendarDays size="13" />
            {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : "No deadline"}
          </span>
          <span className="text-[13px] font-medium text-primary opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
