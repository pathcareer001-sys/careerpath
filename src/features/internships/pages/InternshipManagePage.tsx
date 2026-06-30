import { useState, useMemo } from "react";
import { FirebaseError } from "firebase/app";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import InternshipManageCard from "@/features/internships/components/InternshipManageCard";
import InternshipForm from "@/features/internships/components/InternshipForm";
import { useInternships } from "../hooks/useInternships";
import { useDeleteInternship } from "../hooks/useDeleteInternship";
import { useUpdateInternship } from "../hooks/useUpdateInternship";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import type { Company } from "@/types/company";
import type { Internship } from "@/types/internship";
import { toast } from "sonner";
import type { InternshipFormData } from "@/features/internships/components/InternshipForm";

export default function InternshipManagePage() {
  const { data: internships } = useInternships();
  const { data: companies } = useCompanies();
  const deleteInternship = useDeleteInternship();
  const updateInternship = useUpdateInternship();
  const [search, setSearch] = useState("");
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);

  const companyMap = useMemo(() => {
    if (!companies) return new Map<string, Company>();
    return new Map(companies.map((c) => [c.id, c]));
  }, [companies]);

  const filteredInternships = useMemo(() => {
    if (!internships) return [];
    return internships.filter((internship) =>
      internship.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [internships, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus magang?")) return;
    await deleteInternship.mutateAsync(id);
    toast.success("Magang dihapus");
  };

  const handleEdit = async (data: InternshipFormData) => {
    if (!editingInternship) return;
    try {
      await updateInternship.mutateAsync({ id: editingInternship.id, data });
      toast.success("Magang diperbarui");
      setEditingInternship(null);
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof FirebaseError
          ? `[${error.code}] ${error.message}`
          : error instanceof Error
            ? error.message
            : "Unknown error";
      toast.error(message);
    }
  };

  return (
    <PageContainer>
      <PageHeader title="Manajemen Magang" description="Kelola magang" />

      <Dialog open={!!editingInternship} onOpenChange={(o) => { if (!o) setEditingInternship(null); }}>
        <DialogContent className="lg:max-w-4xl max-h-[90vh] overflow-y-auto p-6">
          {editingInternship && (
            <InternshipForm
              defaultValues={editingInternship}
              loading={updateInternship.isPending}
              onSubmit={handleEdit}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-6 animate-fade-in-up">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cari magang..."
        />

        {filteredInternships.length === 0 ? (
          <EmptyState title="Tidak Ada Magang" description="Tidak ada data magang" />
        ) : (
          <div className="space-y-4">
            {filteredInternships.map((internship) => (
              <InternshipManageCard
                key={internship.id}
                internship={internship}
                company={companyMap.get(internship.companyId)}
                onEdit={setEditingInternship}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
