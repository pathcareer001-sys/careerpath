import PageContainer from "@/components/common/PageContainer";

import PageHeader from "@/components/common/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

import CompanyCard from "@/features/companies/components/CompanyCard";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { useBookmarkedCompanies } from "../hooks/useBookmarkedCompanies";
import LoadingState from "@/components/shared/LoadingState";

export default function BookmarkPage() {
  const { user } = useAuth();

  const { data, isLoading } = useBookmarkedCompanies(user?.uid || "");

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <PageHeader title="Bookmarks" description="Saved companies" />

      {data?.length === 0 ? (
        <EmptyState title="No Bookmarks" description="Save a company first" />
      ) : (
        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
          "
        >
          {data?.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
