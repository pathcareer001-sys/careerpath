import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";

import PageHeader from "@/components/common/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

import CompanyCard from "@/features/companies/components/CompanyCard";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { useBookmarkedCompanies } from "../hooks/useBookmarkedCompanies";
import LoadingState from "@/components/shared/LoadingState";
import AppCard from "@/components/common/AppCard";
import SearchInput from "@/components/shared/SearchInput";

export default function BookmarkPage() {
  const { user } = useAuth();

  const { data, isLoading } = useBookmarkedCompanies(user?.uid || "");

  const [search, setSearch] = useState("");

  const filteredBookmarks =
    data?.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Saved Internships"
        description="Keep track of opportunities you're interested in"
      />

      <AppCard>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Your Collection</h2>

            <p className="mt-1 text-slate-500">Internships you've bookmarked</p>
          </div>

          <div className="text-4xl font-bold text-blue-700">
            {filteredBookmarks.length}
          </div>
        </div>
      </AppCard>

      <SearchInput value={search} onChange={setSearch} />

      {filteredBookmarks.length === 0 ? (
        <EmptyState
          title="No Saved Internships"
          description="Bookmark internships to view them later"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
