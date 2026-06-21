import { useMemo, useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";

import CompanyCard from "../components/CompanyCard";

import { useCompanies } from "../hooks/useCompanies";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

export default function CompanyListPage() {
  const [search, setSearch] = useState("");

  const { data: companies, isLoading } = useCompanies();

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];

    return companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [companies, search]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Companies"
        description="Temukan tempat magang terbaik untuk kariermu."
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Cari perusahaan..."
      />

      {filteredCompanies.length === 0 ? (
        <EmptyState
          title="No Companies Found"
          description="Try another keyword"
        />
      ) : (
        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
          "
        >
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
