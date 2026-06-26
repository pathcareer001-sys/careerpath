import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import CompanyCard from "@/features/companies/components/CompanyCard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBookmarkedCompanies } from "../hooks/useBookmarkedCompanies";
import LoadingState from "@/components/shared/LoadingState";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";

export default function BookmarkPage() {
  const { user } = useAuth();
  const { data, isLoading } = useBookmarkedCompanies(user?.uid || "");
  const [search, setSearch] = useState("");

  const filteredBookmarks =
    data?.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  if (isLoading) return <LoadingState />;

  return (
    <PageContainer>
      <PageHeader title="Bookmarks" description="Saved companies and opportunities." />

      <div className="max-w-xs">
        <AppInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookmarks..." />
      </div>

      <AppCard>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-900">
            Your Collection <span className="text-slate-500 font-normal">({filteredBookmarks.length})</span>
          </p>
        </div>
      </AppCard>

      {filteredBookmarks.length === 0 ? (
        <EmptyState title="No saved companies" description="Bookmark companies to view them later." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
