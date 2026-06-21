import { useApplications } from "@/features/applications/hooks/useApplications";

import { useBookmarks } from "@/features/bookmarks/hooks/useBookmarks";

export function useDashboardStats(userId: string) {
  const applications = useApplications(userId);

  const bookmarks = useBookmarks(userId);

  return {
    applicationCount: applications.data?.length || 0,

    bookmarkCount: bookmarks.data?.length || 0,

    isLoading: applications.isLoading || bookmarks.isLoading,
  };
}
