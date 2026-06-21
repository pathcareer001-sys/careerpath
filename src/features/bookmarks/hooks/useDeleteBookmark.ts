import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookmarkService } from "../services/bookmarkService";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarkService.deleteBookmark,

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
