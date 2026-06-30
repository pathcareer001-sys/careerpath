import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookmarkService } from "../services/bookmarkService";

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      companyId,
    }: {
      userId: string;
      companyId: string;
    }) => bookmarkService.createBookmark(userId, companyId),

    onSuccess: (_, variables) => {
      try { queryClient.invalidateQueries({ queryKey: ["bookmarks", variables.userId] }); } catch {}
    },
  });
}
