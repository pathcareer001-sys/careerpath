import { useState, useMemo } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import { useCompanies } from "../hooks/useCompanies";
import { useCreateCompany } from "../hooks/useCreateCompany";
import { useDeleteCompany } from "../hooks/useDeleteCompany";

import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";

import CompanyManageCard from "../components/CompanyManageCard";

export default function CompanyManagePage() {
  const { data: companies } = useCompanies();

  const createCompany = useCreateCompany();

  const [name, setName] = useState("");

  const [search, setSearch] = useState("");

  const deleteCompany = useDeleteCompany();

  const handleCreate = async () => {
    if (!name.trim()) return;

    await createCompany.mutateAsync({
      name,

      logo: "",

      description: "",

      location: "",

      industry: "",

      website: "",

      verified: false,

      avgRating: 0,

      reviewCount: 0,
    });

    setName("");
  };

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];

    return companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [companies, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete company?")) return;

    await deleteCompany.mutateAsync(id);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Company Management"
        description="Manage company data"
      />

      <div className="space-y-6">
        <AppCard>
          <div className="flex gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company Name"
              className="
      flex-1
      border
      border-slate-200
      rounded-xl
      px-4
      py-2
      "
            />

            <AppButton onClick={handleCreate}>Add Company</AppButton>
          </div>
        </AppCard>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search companies..."
        />

        {filteredCompanies.length === 0 ? (
          <EmptyState
            title="No Companies"
            description="Create your first company"
          />
        ) : (
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <CompanyManageCard
                key={company.id}
                company={company}
                onEdit={(company) => {
                  console.log(company);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
