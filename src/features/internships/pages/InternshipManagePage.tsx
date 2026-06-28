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
import type { Internship } from "@/types/internship";
import { toast } from "sonner";
import type { InternshipFormData } from "@/features/internships/components/InternshipForm";

export default function InternshipManagePage() {
  const { data: internships } = useInternships();
  const deleteInternship = useDeleteInternship();
  const updateInternship = useUpdateInternship();
  const [search, setSearch] = useState("");
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);

  const filteredInternships = useMemo(() => {
    if (!internships) return [];
    return internships.filter((internship) =>
      internship.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [internships, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete internship?")) return;
    await deleteInternship.mutateAsync(id);
    toast.success("Internship deleted");
  };

  const handleEdit = async (data: InternshipFormData) => {
    if (!editingInternship) return;
    try {
      await updateInternship.mutateAsync({ id: editingInternship.id, data });
      toast.success("Internship updated");
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
      <PageHeader title="Internship Management" description="Manage internships" />

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
          placeholder="Search internships..."
        />

        {filteredInternships.length === 0 ? (
          <EmptyState title="No Internships" description="No internship data available" />
        ) : (
          <div className="space-y-4">
            {filteredInternships.map((internship) => (
              <InternshipManageCard
                key={internship.id}
                internship={internship}
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
