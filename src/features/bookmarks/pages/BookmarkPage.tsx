import { useState } from "react";
import { Search } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import CompanyCard from "@/features/companies/components/CompanyCard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBookmarkedCompanies } from "../hooks/useBookmarkedCompanies";
import LoadingState from "@/components/shared/LoadingState";

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
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[#0F172A]">Bookmarks</h1>
          <p className="mt-1 text-sm text-[#64748B]">Saved companies and opportunities</p>
        </div>
        <div className="relative">
          <Search size="15" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookmarks..."
            className="h-9 w-56 rounded-lg border border-[#E2E8F0] bg-[#F8FAFF] pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:outline-none focus:shadow-[0_0_0_3px_#EEF3FE] transition-colors"
          />
        </div>
      </div>

      {filteredBookmarks.length === 0 ? (
        <EmptyState title="No saved companies" description="Bookmark companies to view them later." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
