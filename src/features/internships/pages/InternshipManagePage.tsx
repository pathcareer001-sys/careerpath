import { useMemo, useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";

import EmptyState from "@/components/shared/EmptyState";

import { useInternships } from "../hooks/useInternships";
import { useDeleteInternship } from "../hooks/useDeleteInternship";

import InternshipManageCard from "../components/InternshipManageCard";

export default function InternshipManagePage() {
  const { data: internships } = useInternships();

  const deleteInternship = useDeleteInternship();

  const [search, setSearch] = useState("");

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
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search internships..."
        />

        {filteredInternships.length === 0 ? (
          <EmptyState
            title="No Internships"
            description="No internship data available"
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
