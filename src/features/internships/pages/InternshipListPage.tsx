import { useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import SearchInput from "@/components/shared/SearchInput";
import EmptyState from "@/components/shared/EmptyState";

import InternshipCard from "../components/InternshipCard";

import { useInternships } from "../hooks/useInternships";
import CardSkeleton from "@/components/shared/CardSkeleton";

export default function InternshipListPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useInternships();

  const internships =
    data?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="Internships"
          description="Temukan peluang magang terbaik"
        />

        <div
          className="
        grid
        gap-6
        md:grid-cols-2
        lg:grid-cols-3
        "
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <PageHeader
        title="Internships"
        description="Temukan peluang magang terbaik"
      />

      <SearchInput value={search} onChange={setSearch} />

      {!isLoading && internships.length === 0 && (
        <EmptyState
          title="No Internship Found"
          description="Coba kata kunci lain"
        />
      )}

      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        lg:grid-cols-3
        "
      >
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </PageContainer>
  );
}
