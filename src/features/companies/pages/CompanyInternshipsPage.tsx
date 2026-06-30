import { useMemo, useState } from "react";

import PageContainer from "@/components/common/PageContainer";
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
    if (!internships) return [];
    return internships.filter((internship) =>
      internship.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [internships, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus magang?")) return;
    await deleteInternship.mutateAsync(id);
    toast.success("Magang berhasil dihapus");
  };

  if (!company) {
    return (
      <EmptyState
        title="Belum Ada Profil Perusahaan"
        description="Buat profil perusahaan Anda terlebih dahulu"
      />
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-medium text-heading">Magang Saya</h1>
          <p className="text-sm text-secondary-text mt-1">Kelola dan lacak postingan magang</p>
        </div>
        <CreateInternshipDialog company={company} />
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-100">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cari magang..."
        />
      </div>

      <div className="mt-6 animate-fade-in-up animate-delay-200">
        {filteredInternships.length === 0 ? (
          <EmptyState
            title="Tidak Ada Magang"
            description="Buat magang pertama Anda dan mulailah menerima pelamar."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredInternships.map((internship) => (
              <CompanyInternshipCard
                key={internship.id}
                internship={internship}
                company={company}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
