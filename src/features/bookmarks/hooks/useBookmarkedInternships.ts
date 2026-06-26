import { useQuery } from "@tanstack/react-query";
import { internshipBookmarkService } from "../services/internshipBookmarkService";
import { internshipService } from "@/features/internships/services/internshipService";
import type { Internship } from "@/types/internship";

export function useBookmarkedInternships(userId: string) {
  return useQuery({
    queryKey: ["bookmarked-internships", userId],
    enabled: !!userId,
    queryFn: async () => {
      const bookmarks = await internshipBookmarkService.getBookmarks(userId);
      const internships = await Promise.all(
        bookmarks.map((bookmark: { internshipId: string }) =>
          internshipService.getInternshipById(bookmark.internshipId),
        ),
      );
      return internships.filter(
        (internship): internship is Internship => internship !== null,
      );
    },
  });
}
