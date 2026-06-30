import { useMutation, useQueryClient } from "@tanstack/react-query";
import { internshipBookmarkService } from "../services/internshipBookmarkService";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useCreateInternshipBookmark() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ userId, internshipId }: { userId: string; internshipId: string }) =>
      internshipBookmarkService.createBookmark(userId, internshipId),
    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["internship-bookmarks", user?.uid] }); } catch {}
    },
  });
}
