import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppInput from "@/components/common/AppInput";
import EmptyState from "@/components/shared/EmptyState";
import InternshipCard from "../components/InternshipCard";
import { useInternships } from "../hooks/useInternships";
import CardSkeleton from "@/components/shared/CardSkeleton";
import AppCard from "@/components/common/AppCard";

export default function InternshipListPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const { data, isLoading } = useInternships();

  const internships =
    data?.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchLocation = !location || item.location === location;
      const matchType = !type || item.type === type;
      return matchSearch && matchLocation && matchType;
    }) || [];

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Internships" description="Browse available opportunities." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Internships" description="Browse available opportunities." />

      <AppCard>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <AppInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search internships..." />
          </div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 bg-surface-alt px-3 text-sm text-slate-700 focus:border-blue-600 focus:outline-none"
          >
            <option value="">All locations</option>
            {[...new Set(data?.map((i) => i.location).filter(Boolean))].map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 bg-surface-alt px-3 text-sm text-slate-700 focus:border-blue-600 focus:outline-none"
          >
            <option value="">All types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>
      </AppCard>

      {internships.length === 0 ? (
        <EmptyState title="No internships found" description="Try different keywords or filters." />
      ) : (
        <>
          <p className="text-xs text-slate-500">{internships.length} internships found</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {internships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
}
