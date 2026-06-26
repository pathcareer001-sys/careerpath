import { useMemo, useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import SearchBar from "@/components/common/SearchBar";

import EmptyState from "@/components/shared/EmptyState";

import { useAuth } from "@/hooks/useAuth";

import { useCompanyInternships } from "@/features/internships/hooks/useCompanyInternships";
import { useDeleteInternship } from "@/features/internships/hooks/useDeleteInternship";

import CompanyInternshipCard from "../components/CompanyInternshipCard";
import CreateInternshipDialog from "../components/CreateInternshipDialog";
import { useMyCompany } from "../hooks/useMyCompany";
import { toast } from "sonner";

export default function CompanyInternshipsPage() {
  const { user } = useAuth();

  const { data: internships } = useCompanyInternships(user?.uid || "");

  const deleteInternship = useDeleteInternship();

  const [search, setSearch] = useState("");

  const { data: company } = useMyCompany(user?.uid || "");

  const filteredInternships = useMemo(() => {
    if (!internships) {
      return [];
    }

    return internships.filter((internship) =>
      internship.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [internships, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete internship?")) {
      return;
    }

    await deleteInternship.mutateAsync(id);

    toast.success("Internship deleted successfully");
  };

  if (!company) {
    return (
      <EmptyState
        title="No Company Profile"
        description="Create your company profile first"
      />
    );
  }

  return (
    <PageContainer>
      <div
        className="
  flex
  flex-col
  gap-4
  lg:flex-row
  lg:items-center
  lg:justify-between
  "
      >
        <div>
          <h1
            className="
      text-3xl
      font-bold
      "
          >
            My Internships
          </h1>

          <p className="text-slate-500">Manage and track internship postings</p>
        </div>

        <CreateInternshipDialog company={company} />
      </div>
      <AppCard className="mt-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search internships..."
        />
      </AppCard>

      <div
        className="
  mt-6
  grid
  gap-6
  md:grid-cols-2
  "
      >
        {filteredInternships.length === 0 ? (
          <EmptyState
            title="No Internships"
            description="Create your first internship and start receiving applicants."
          />
        ) : (
          <div
            className="
  grid
  gap-6
  md:grid-cols-2
  "
          >
            {filteredInternships.map((internship) => (
              <CompanyInternshipCard
                key={internship.id}
                internship={internship}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
