import { useMutation, useQueryClient } from "@tanstack/react-query";
import { internshipBookmarkService } from "../services/internshipBookmarkService";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useDeleteInternshipBookmark() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (bookmarkId: string) =>
      internshipBookmarkService.deleteBookmark(bookmarkId),
    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["internship-bookmarks", user?.uid] }); } catch {}
    },
  });
}
