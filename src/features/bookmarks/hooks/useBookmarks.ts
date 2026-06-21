import { useQuery } from "@tanstack/react-query";

import { bookmarkService } from "../services/bookmarkService";

export function useBookmarks(userId: string) {
  return useQuery({
    queryKey: ["bookmarks", userId],

    queryFn: () => bookmarkService.getBookmarks(userId),

    enabled: !!userId,
  });
}
