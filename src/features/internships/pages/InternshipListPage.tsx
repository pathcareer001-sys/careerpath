import { useState, useMemo } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppInput from "@/components/common/AppInput";
import AppCard from "@/components/common/AppCard";
import EmptyState from "@/components/shared/EmptyState";
import InternshipCard from "../components/InternshipCard";
import { useInternships } from "../hooks/useInternships";
import CardSkeleton from "@/components/shared/CardSkeleton";

const PAGE_SIZE = 12;

type SortKey = "newest" | "deadline" | "title";

export default function InternshipListPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useInternships();

  const internships = useMemo(() => {
    let list = data?.filter((item) => {
      if (item.status === "draft") return false;
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchLocation = !location || item.location === location;
      const matchType = !type || item.type === type;
      const matchSalary = !salaryFilter || item.salary?.toLowerCase().includes(salaryFilter.toLowerCase());
      return matchSearch && matchLocation && matchType && matchSalary;
    }) || [];

    switch (sort) {
      case "newest":
        list = [...list].sort((a, b) => ((b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
        break;
      case "deadline":
        list = [...list].sort((a, b) => new Date(a.deadline || "").getTime() - new Date(b.deadline || "").getTime());
        break;
      case "title":
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return list;
  }, [data, search, location, type, salaryFilter, sort]);

  const totalPages = Math.ceil(internships.length / PAGE_SIZE);
  const paged = internships.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const locations = useMemo(() => [...new Set(data?.map((i) => i.location).filter(Boolean))], [data]);

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Magang" description="Jelajahi peluang yang tersedia." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Magang" description="Jelajahi peluang yang tersedia." />

      <AppCard>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <AppInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari magang..." />
          </div>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value as SortKey); setPage(1); }}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-heading focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_var(--color-accent)] transition-colors"
          >
            <option value="newest">Terbaru</option>
            <option value="deadline">Batas Pendaftaran</option>
            <option value="title">A-Z</option>
          </select>
          <select
            value={location}
            onChange={(e) => { setLocation(e.target.value); setPage(1); }}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-heading focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_var(--color-accent)] transition-colors"
          >
            <option value="">Semua lokasi</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1); }}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-heading focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_var(--color-accent)] transition-colors"
          >
            <option value="">Semua tipe</option>
            <option value="Remote">Jarak Jauh</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Di Lokasi</option>
          </select>
          <AppInput
            value={salaryFilter}
            onChange={(e) => { setSalaryFilter(e.target.value); setPage(1); }}
            placeholder="Kata kunci gaji..."
            className="w-36"
          />
        </div>
      </AppCard>

      {paged.length === 0 ? (
        <EmptyState title="Magang tidak ditemukan" description="Coba kata kunci atau filter lain." />
      ) : (
        <>
          <p className="text-xs text-secondary-text">{internships.length} magang ditemukan</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paged.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-7 w-7 rounded-full text-[12px] font-medium transition-all duration-200 flex items-center justify-center ${
                    p === page
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-sm"
                      : "text-secondary-text hover:bg-accent hover:text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
