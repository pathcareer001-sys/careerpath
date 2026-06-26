import { useQuery } from "@tanstack/react-query";
import { internshipBookmarkService } from "../services/internshipBookmarkService";

export function useInternshipBookmarks(userId: string) {
  return useQuery({
    queryKey: ["internship-bookmarks", userId],
    queryFn: () => internshipBookmarkService.getBookmarks(userId),
    enabled: !!userId,
  });
}
