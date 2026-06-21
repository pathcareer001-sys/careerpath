import { useState, useMemo } from "react";

import { Plus } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import AppInput from "@/components/common/AppInput";

import { useInternships } from "../hooks/useInternships";
import { useCreateInternship } from "../hooks/useCreateInternship";

import InternshipManageCard from "../components/InternshipManageCard";
import { useDeleteInternship } from "../hooks/useDeleteInternship";

export default function InternshipManagePage() {
  const { data: internships } = useInternships();

  const createInternship = useCreateInternship();

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const handleCreate = async () => {
    if (!title.trim()) return;

    await createInternship.mutateAsync({
      title,

      companyId: "",

      companyName: "",

      location: "",

      type: "Remote",

      description: "",

      requirements: [],

      deadline: "",
    });

    setTitle("");
  };

  const deleteInternship = useDeleteInternship();

  const filteredInternships = useMemo(() => {
    if (!internships) return [];

    return internships.filter((internship) =>
      internship.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [internships, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete internship?")) return;

    await deleteInternship.mutateAsync(id);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Internship Management"
        description="Manage internships"
      />
      <div className="space-y-6">
        <AppCard>
          <div className="flex gap-3">
            <AppInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Internship Title"
              className="
            flex-1
            border
            border-slate-200
            rounded-xl
            px-4
            py-2
            "
            />

            <AppButton onClick={handleCreate}>
              <Plus size={16} />
              Add
            </AppButton>
          </div>
        </AppCard>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search internships..."
        />

        {filteredInternships.length === 0 ? (
          <EmptyState
            title="No Internships"
            description="Create your first internship"
          />
        ) : (
          <div className="space-y-4">
            {filteredInternships.map((internship) => (
              <InternshipManageCard
                key={internship.id}
                internship={internship}
                onEdit={(internship) => {
                  console.log(internship);
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
