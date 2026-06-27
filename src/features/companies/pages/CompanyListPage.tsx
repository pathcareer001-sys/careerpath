import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import CompanyCard from "../components/CompanyCard";
import { useCompanies } from "../hooks/useCompanies";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

const PAGE_SIZE = 12;

export default function CompanyListPage() {
  const [search, setSearch] = useState("");
  const { data: companies, isLoading } = useCompanies();
  const [industryFilter, setIndustryFilter] = useState("");
  const [page, setPage] = useState(1);

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];
    return companies.filter((company) => {
      const matchSearch = company.name.toLowerCase().includes(search.toLowerCase());
      const matchIndustry = !industryFilter || company.industry === industryFilter;
      return matchSearch && matchIndustry;
    });
  }, [companies, search, industryFilter]);

  const topCompanies = useMemo(() => {
    if (!companies) return [];
    return [...companies].sort((a, b) => b.avgRating - a.avgRating).slice(0, 4);
  }, [companies]);

  const totalPages = Math.ceil(filteredCompanies.length / PAGE_SIZE);
  const paged = filteredCompanies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-[#0F172A]">Companies</h1>
        <p className="mt-1 text-sm text-[#64748B]">Discover verified companies and internship providers</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size="15" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search companies..."
            className="h-9 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFF] pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:outline-none focus:shadow-[0_0_0_3px_#EEF3FE] transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Technology", "Design", "Marketing", "Finance", "Business"].map((category) => (
            <button
              key={category}
              onClick={() => { setIndustryFilter(industryFilter === category ? "" : category); setPage(1); }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                industryFilter === category
                  ? "bg-[#2563EB] text-white"
                  : "bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#BFDBFE]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {topCompanies.length > 0 && (
        <div>
          <h2 className="text-base font-medium text-[#0F172A] mb-4">Top Companies</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {topCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#0F172A]">All Companies <span className="text-[#94A3B8] font-normal">({filteredCompanies.length})</span></p>
      </div>

      {filteredCompanies.length === 0 ? (
        <EmptyState title="No companies found" description="Try another keyword or filter." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-7 w-7 rounded-full text-[12px] font-medium transition-all duration-200 flex items-center justify-center ${
                    p === page
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
                      : "text-[#64748B] hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
