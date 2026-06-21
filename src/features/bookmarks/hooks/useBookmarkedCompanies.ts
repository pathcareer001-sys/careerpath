import { useQuery } from "@tanstack/react-query";

import { bookmarkService } from "../services/bookmarkService";

import { companyService } from "@/features/companies/services/companyService";

import type { Company } from "@/types/company";

export function useBookmarkedCompanies(userId: string) {
  return useQuery({
    queryKey: ["bookmarked-companies", userId],

    enabled: !!userId,

    queryFn: async () => {
      const bookmarks = await bookmarkService.getBookmarks(userId);

      const companies = await Promise.all(
        bookmarks.map((bookmark: any) =>
          companyService.getCompanyById(bookmark.companyId),
        ),
      );

      return companies.filter(
        (company): company is Company => company !== null,
      );
    },
  });
}
