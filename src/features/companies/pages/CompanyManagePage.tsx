import { useState, useMemo } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import CompanyManageCard from "@/features/companies/components/CompanyManageCard";
import EditCompanyDialog from "@/features/companies/components/EditCompanyDialog";
import CreateCompanyDialog from "@/features/companies/components/CreateCompanyDialog";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useDeleteCompany } from "@/features/companies/hooks/useDeleteCompany";
import { useUpdateCompany } from "@/features/companies/hooks/useUpdateCompany";
import { toast } from "sonner";
import type { Company } from "@/types/company";

export default function CompanyManagePage() {
  const { data: companies } = useCompanies();
  const deleteCompany = useDeleteCompany();
  const updateCompany = useUpdateCompany();
  const [search, setSearch] = useState("");
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];
    return companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [companies, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete company?")) return;
    await deleteCompany.mutateAsync(id);
    toast.success("Company deleted");
  };

  const handleVerify = async (id: string, verified: boolean) => {
    await updateCompany.mutateAsync({ id, data: { verified: !verified } });
    toast.success(verified ? "Company unverified" : "Company verified");
  };

  return (
    <PageContainer>
      <PageHeader title="Company Management" description="Manage company data" />

      <EditCompanyDialog
        company={editingCompany}
        open={!!editingCompany}
        onClose={() => setEditingCompany(null)}
      />
      <CreateCompanyDialog
        company={null}
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />

      <div className="space-y-6 animate-fade-in-up">
        <AppCard>
          <div className="flex gap-3">
            <AppButton onClick={() => setShowCreate(true)}>Create Company</AppButton>
          </div>
        </AppCard>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search companies..."
        />

        {filteredCompanies.length === 0 ? (
          <EmptyState title="No Companies" description="Create your first company" />
        ) : (
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <CompanyManageCard
                key={company.id}
                company={company}
                onEdit={setEditingCompany}
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
