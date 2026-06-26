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
import { toast } from "sonner";
import { useUpdateCompany } from "../hooks/useUpdateCompany";
import AppInput from "@/components/common/AppInput";

export default function CompanyManagePage() {
  const { data: companies } = useCompanies();

  const createCompany = useCreateCompany();

  const [name, setName] = useState("");

  const [search, setSearch] = useState("");

  const deleteCompany = useDeleteCompany();

  const updateCompany = useUpdateCompany();

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createCompany.mutateAsync({
        name,

        logo: "",

        ownerId: "",

        description: "",

        location: "",

        industry: "",

        website: "",

        verified: false,

        avgRating: 0,

        reviewCount: 0,
      });
      toast.success("Company created successfully");
    } catch {
      toast.error("Failed to create company");
    }

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

  const handleVerify = async (id: string, verified: boolean) => {
    await updateCompany.mutateAsync({
      id,
      data: {
        verified: !verified,
      },
    });

    toast.success(verified ? "Company unverified" : "Company verified");
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
            <AppInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company Name"
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
                onVerify={handleVerify}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
