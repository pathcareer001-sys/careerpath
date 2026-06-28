import { useMemo, useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import LoadingState from "@/components/shared/LoadingState";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useUpdateCompany } from "@/features/companies/hooks/useUpdateCompany";
import { ShieldCheck, ShieldX, Globe, MapPin, Building2, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

type Tab = "pending" | "verified";

export default function CompanyVerificationPage() {
  const { data: companies, isLoading } = useCompanies();
  const updateCompany = useUpdateCompany();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("pending");

  const filtered = useMemo(() => {
    if (!companies) return [];
    let list = companies.filter((c) => {
      const matchTab = tab === "pending" ? !c.verified : c.verified;
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
    if (tab === "pending") {
      list = [...list].sort((a, b) => {
        if (a.verificationRequested && !b.verificationRequested) return -1;
        if (!a.verificationRequested && b.verificationRequested) return 1;
        return 0;
      });
    }
    return list;
  }, [companies, search, tab]);

  const pendingCount = companies?.filter((c) => !c.verified).length || 0;
  const verifiedCount = companies?.filter((c) => c.verified).length || 0;

  const handleVerify = async (id: string, verified: boolean) => {
    await updateCompany.mutateAsync({ id, data: { verified: !verified } });
    toast.success(verified ? "Company unverified" : "Company verified");
  };

  if (isLoading) return <LoadingState />;

  return (
    <PageContainer>
      <PageHeader
        title="Company Verification"
        description="Verify company profiles to ensure authenticity"
      />

      <div className="mt-6 space-y-6 animate-fade-in-up">
        <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
          <button
            onClick={() => { setTab("pending"); setSearch(""); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              tab === "pending"
                ? "text-primary border-b-2 border-primary bg-accent/50"
                : "text-secondary-text hover:text-body"
            }`}
          >
            <ShieldX size="15" />
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => { setTab("verified"); setSearch(""); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              tab === "verified"
                ? "text-primary border-b-2 border-primary bg-accent/50"
                : "text-secondary-text hover:text-body"
            }`}
          >
            <BadgeCheck size="15" />
            Verified ({verifiedCount})
          </button>
        </div>

        <SearchBar value={search} onChange={setSearch} placeholder="Search companies..." />

        {filtered.length === 0 ? (
          <EmptyState
            title={tab === "pending" ? "No pending verifications" : "No verified companies"}
            description={tab === "pending" ? "All companies have been verified." : "No companies have been verified yet."}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((company) => (
              <AppCard key={company.id}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-lg font-medium shrink-0 shadow-sm">
                      {company.logo ? (
                        <img src={company.logo} alt="" className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        company.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-heading">{company.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        {company.industry && (
                          <span className="text-sm text-secondary-text flex items-center gap-1">
                            <Building2 size="13" /> {company.industry}
                          </span>
                        )}
                        {company.location && (
                          <span className="text-sm text-secondary-text flex items-center gap-1">
                            <MapPin size="13" /> {company.location}
                          </span>
                        )}
                        {company.website && (
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Globe size="13" /> Website
                          </a>
                        )}
                      </div>
                      {company.description && (
                        <p className="text-sm text-secondary-text mt-2 line-clamp-2">{company.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          company.verified
                            ? "bg-success/5 text-success"
                            : company.verificationRequested
                              ? "bg-accent text-primary"
                              : "bg-warning/5 text-warning"
                        }`}>
                          {company.verified ? "Verified" : company.verificationRequested ? "Requested" : "Unverified"}
                        </span>
                        <span className="text-xs text-muted">
                          {company.reviewCount || 0} reviews &middot; {company.avgRating || 0} avg rating
                        </span>
                      </div>
                    </div>
                  </div>
                  <AppButton
                    onClick={() => handleVerify(company.id, company.verified)}
                    disabled={updateCompany.isPending}
                    className={company.verified ? "!bg-warning/50 hover:!bg-warning/70" : "!bg-success hover:!bg-success/80"}
                  >
                    <ShieldCheck size="14" />
                    {company.verified ? "Unverify" : "Verify"}
                  </AppButton>
                </div>
              </AppCard>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
