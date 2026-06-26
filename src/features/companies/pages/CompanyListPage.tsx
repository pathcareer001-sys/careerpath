import { useMemo, useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import CompanyCard from "../components/CompanyCard";

import { useCompanies } from "../hooks/useCompanies";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import AppCard from "@/components/common/AppCard";
import SearchInput from "@/components/shared/SearchInput";

export default function CompanyListPage() {
  const [search, setSearch] = useState("");

  const { data: companies, isLoading } = useCompanies();
  const [industryFilter, setIndustryFilter] = useState("");

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];

    return companies.filter((company) => {
      const matchSearch = company.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchIndustry =
        !industryFilter || company.industry === industryFilter;

      return matchSearch && matchIndustry;
    });
  }, [companies, search, industryFilter]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Top Companies"
        description="Discover companies and internship opportunities"
      />

      <AppCard className="border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Discover Top Companies</h2>

            <p className="mt-2 text-blue-100">
              Explore verified companies and find your next internship
              opportunity.
            </p>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="text-sm text-blue-200">Companies</p>

              <p className="text-3xl font-bold">{companies?.length || 0}</p>
            </div>

            <div>
              <p className="text-sm text-blue-200">Industries</p>

              <p className="text-3xl font-bold">
                {new Set(companies?.map((company) => company.industry)).size}
              </p>
            </div>
          </div>
        </div>
      </AppCard>

      <SearchInput value={search} onChange={setSearch} />

      <AppCard>
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-slate-950">Popular Categories</h2>

            <p className="text-sm text-slate-500">
              Explore companies by industry
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Technology", "Design", "Marketing", "Finance", "Business"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    setIndustryFilter(
                      industryFilter === category ? "" : category,
                    )
                  }
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    industryFilter === category
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-blue-100 bg-blue-50 text-slate-600 hover:border-blue-200 hover:text-blue-700"
                  }`}
                >
                  {category}
                </button>
              ),
            )}
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Company Directory</h2>

            <p className="mt-1 text-slate-500">
              Browse verified companies and internship providers.
            </p>
          </div>

          <div className="text-4xl font-bold text-blue-700">
            {filteredCompanies.length}
          </div>
        </div>
      </AppCard>

      {filteredCompanies.length === 0 ? (
        <EmptyState
          title="No Companies Found"
          description="Try another keyword"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
