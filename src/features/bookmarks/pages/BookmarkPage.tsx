import { useState, useMemo } from "react";
import { Search, Building2, Briefcase } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import CompanyCard from "@/features/companies/components/CompanyCard";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBookmarkedCompanies } from "../hooks/useBookmarkedCompanies";
import { useBookmarkedInternships } from "../hooks/useBookmarkedInternships";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import LoadingState from "@/components/shared/LoadingState";

export default function BookmarkPage() {
  const { user } = useAuth();
  const { data: companies, isLoading: companiesLoading } = useBookmarkedCompanies(user?.uid || "");
  const { data: internships, isLoading: internshipsLoading } = useBookmarkedInternships(user?.uid || "");
  const { data: allCompanies } = useCompanies();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("companies");

  const premiumCompanyIds = useMemo(() => {
    if (!allCompanies) return new Set<string>();
    return new Set(allCompanies.filter((c) => c.subscription === "premium").map((c) => c.id));
  }, [allCompanies]);

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
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-0 sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-heading">Tersimpan</h1>
          <p className="mt-1 text-sm text-secondary-text">
            {totalBookmarks > 0
              ? `${totalBookmarks} ${totalBookmarks === 1 ? "item" : "item"} tersimpan`
              : "Perusahaan dan peluang tersimpan"}
          </p>
        </div>
        <div className="relative">
          <Search size="15" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Cari bookmark..."
            className="h-9 w-full sm:w-56 rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-heading placeholder:text-muted focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_var(--color-accent)] transition-colors"
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-section p-0.5 rounded-lg">
          <TabsTrigger
            value="companies"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
          >
            <Building2 size="15" />
            Perusahaan
            {companies && companies.length > 0 && (
              <span className="ml-0.5 rounded-full bg-border px-1.5 py-0.5 text-[11px] font-medium text-secondary-text">
                {companies.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="internships"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-text data-active:bg-surface data-active:text-heading data-active:shadow-sm transition-all"
          >
            <Briefcase size="15" />
            Magang
            {internships && internships.length > 0 && (
              <span className="ml-0.5 rounded-full bg-border px-1.5 py-0.5 text-[11px] font-medium text-secondary-text">
                {internships.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="mt-6">
          {filteredCompanies.length === 0 ? (
            <EmptyState
              title="Belum ada perusahaan tersimpan"
              description="Jelajahi perusahaan dan bookmark yang Anda minati."
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
              title="Belum ada magang tersimpan"
              description="Jelajahi magang dan bookmark yang Anda minati."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} showPremiumBadge={premiumCompanyIds.has(internship.companyId)} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
