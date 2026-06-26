import { useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import SearchInput from "@/components/shared/SearchInput";
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
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchLocation = !location || item.location === location;

      const matchType = !type || item.type === type;

      return matchSearch && matchLocation && matchType;
    }) || [];

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="Internships"
          description="Temukan peluang magang terbaik"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <AppCard className="border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Find Your Dream Career Today.
            </h2>

            <p className="mt-2 text-blue-100">
              Explore thousands of internship opportunities from top companies.
            </p>
          </div>

          <div className="text-5xl font-bold">{internships.length}</div>
        </div>
      </AppCard>

      <AppCard>
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <SearchInput value={search} onChange={setSearch} />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 px-4 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">All Locations</option>

            {[...new Set(data?.map((item) => item.location))]
              .filter(Boolean)
              .map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 px-4 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">All Types</option>

            <option value="Remote">Remote</option>

            <option value="Hybrid">Hybrid</option>

            <option value="Onsite">Onsite</option>
          </select>
        </div>
      </AppCard>

      {!isLoading && internships.length === 0 && (
        <EmptyState
          title="No Internship Found"
          description="Coba kata kunci lain"
        />
      )}

      <AppCard>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Internship Directory</h2>

            <p className="mt-1 text-slate-500">
              Browse available opportunities.
            </p>
          </div>

          <div className="text-4xl font-bold text-blue-700">
            {internships.length}
          </div>
        </div>
      </AppCard>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </PageContainer>
  );
}
