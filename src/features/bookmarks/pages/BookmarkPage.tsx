import { useState } from "react";
import { Search, Building2, Briefcase } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import CompanyCard from "@/features/companies/components/CompanyCard";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBookmarkedCompanies } from "../hooks/useBookmarkedCompanies";
import { useBookmarkedInternships } from "../hooks/useBookmarkedInternships";
import LoadingState from "@/components/shared/LoadingState";

export default function BookmarkPage() {
  const { user } = useAuth();
  const { data: companies, isLoading: companiesLoading } = useBookmarkedCompanies(user?.uid || "");
  const { data: internships, isLoading: internshipsLoading } = useBookmarkedInternships(user?.uid || "");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("companies");

  const filteredCompanies =
    companies?.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const filteredInternships =
    internships?.filter((i) =>
      i.title.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  if (companiesLoading || internshipsLoading) return <LoadingState />;

  const totalBookmarks = (companies?.length || 0) + (internships?.length || 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[#0F172A]">Bookmarks</h1>
          <p className="mt-1 text-sm text-[#64748B]">
            {totalBookmarks > 0
              ? `${totalBookmarks} saved ${totalBookmarks === 1 ? "item" : "items"}`
              : "Saved companies and opportunities"}
          </p>
        </div>
        <div className="relative">
          <Search size="15" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search bookmarks..."
            className="h-9 w-56 rounded-lg border border-[#E2E8F0] bg-[#F8FAFF] pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:outline-none focus:shadow-[0_0_0_3px_#EEF3FE] transition-colors"
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-[#F1F5F9] p-0.5 rounded-lg">
          <TabsTrigger
            value="companies"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-[#64748B] data-active:bg-white data-active:text-[#0F172A] data-active:shadow-sm transition-all"
          >
            <Building2 size="15" />
            Companies
            {companies && companies.length > 0 && (
              <span className="ml-0.5 rounded-full bg-[#E2E8F0] px-1.5 py-0.5 text-[11px] font-medium text-[#64748B]">
                {companies.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="internships"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-[#64748B] data-active:bg-white data-active:text-[#0F172A] data-active:shadow-sm transition-all"
          >
            <Briefcase size="15" />
            Internships
            {internships && internships.length > 0 && (
              <span className="ml-0.5 rounded-full bg-[#E2E8F0] px-1.5 py-0.5 text-[11px] font-medium text-[#64748B]">
                {internships.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="mt-6">
          {filteredCompanies.length === 0 ? (
            <EmptyState
              title="No saved companies"
              description="Browse companies and bookmark the ones you're interested in."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="internships" className="mt-6">
          {filteredInternships.length === 0 ? (
            <EmptyState
              title="No saved internships"
              description="Browse internships and bookmark the ones you're interested in."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
