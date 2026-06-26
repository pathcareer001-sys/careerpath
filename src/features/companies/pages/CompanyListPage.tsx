import { useMemo, useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CompanyCard from "../components/CompanyCard";
import { useCompanies } from "../hooks/useCompanies";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";

export default function CompanyListPage() {
  const [search, setSearch] = useState("");
  const { data: companies, isLoading } = useCompanies();
  const [industryFilter, setIndustryFilter] = useState("");

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];
    return companies.filter((company) => {
      const matchSearch = company.name.toLowerCase().includes(search.toLowerCase());
      const matchIndustry = !industryFilter || company.industry === industryFilter;
      return matchSearch && matchIndustry;
    });
  }, [companies, search, industryFilter]);

  if (isLoading) return <LoadingState />;

  return (
    <PageContainer>
      <PageHeader title="Companies" description="Discover verified companies and internship providers." />

      <div className="flex items-center gap-3">
        <div className="flex-1 max-w-xs">
          <AppInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search companies..." />
        </div>
        <div className="flex gap-2">
          {["Technology", "Design", "Marketing", "Finance", "Business"].map((category) => (
            <button
              key={category}
              onClick={() => setIndustryFilter(industryFilter === category ? "" : category)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                industryFilter === category
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <AppCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">Company Directory</p>
            <p className="text-xs text-slate-500 mt-0.5">{filteredCompanies.length} companies</p>
          </div>
        </div>
      </AppCard>

      {filteredCompanies.length === 0 ? (
        <EmptyState title="No companies found" description="Try another keyword or filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
