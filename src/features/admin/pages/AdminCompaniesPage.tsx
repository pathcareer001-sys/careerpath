import { useState, useMemo } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/shared/EmptyState";
import CompanyManageCard from "@/features/companies/components/CompanyManageCard";
import EditCompanyDialog from "@/features/companies/components/EditCompanyDialog";
import CreateCompanyDialog from "@/features/companies/components/CreateCompanyDialog";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useDeleteCompany } from "@/features/companies/hooks/useDeleteCompany";
import { useUpdateCompany } from "@/features/companies/hooks/useUpdateCompany";
import { toast } from "sonner";
import { ShieldCheck, Building2 } from "lucide-react";
import type { Company } from "@/types/company";

type Tab = "all" | "pending";

export default function AdminCompaniesPage() {
  const { data: companies } = useCompanies();
  const deleteCompany = useDeleteCompany();
  const updateCompany = useUpdateCompany();
  const [search, setSearch] = useState("");
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState<Tab>("all");

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];
    let list = companies;
    if (tab === "pending") {
      list = list.filter((c) => !c.verified);
    }
    return list.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [companies, search, tab]);

  const pendingCount = companies?.filter((c) => !c.verified).length || 0;

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus perusahaan?")) return;
    await deleteCompany.mutateAsync(id);
    toast.success("Perusahaan dihapus");
  };

  const handleVerify = async (id: string, verified: boolean) => {
    await updateCompany.mutateAsync({ id, data: { verified: !verified } });
    toast.success(verified ? "Perusahaan tidak terverifikasi" : "Perusahaan terverifikasi");
  };

  return (
    <PageContainer>
      <PageHeader title="Manajemen Perusahaan" description="Kelola dan verifikasi data perusahaan" />

      <EditCompanyDialog
        company={editingCompany}
        open={!!editingCompany}
        onClose={() => setEditingCompany(null)}
      />
      <CreateCompanyDialog
        company={null}
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />

      <div className="space-y-6 animate-fade-in-up">
        <AppCard>
          <div className="flex items-center gap-3">
            <AppButton onClick={() => setShowCreate(true)}>
              <Building2 size="16" /> Buat Perusahaan
            </AppButton>
          </div>
        </AppCard>

        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
          <button
            onClick={() => { setTab("all"); setSearch(""); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              tab === "all"
                ? "text-primary border-b-2 border-primary bg-accent/50"
                : "text-secondary-text hover:text-body"
            }`}
          >
            Semua Perusahaan
          </button>
          <button
            onClick={() => { setTab("pending"); setSearch(""); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
              tab === "pending"
                ? "text-primary border-b-2 border-primary bg-accent/50"
                : "text-secondary-text hover:text-body"
            }`}
          >
            <ShieldCheck size="15" />
            Menunggu Verifikasi
            {pendingCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-warning/10 text-warning text-[11px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cari perusahaan..."
        />

        {filteredCompanies.length === 0 ? (
          <EmptyState
            title={tab === "pending" ? "Tidak ada verifikasi tertunda" : "Tidak Ada Perusahaan"}
            description={tab === "pending" ? "Semua perusahaan telah terverifikasi." : "Buat perusahaan pertama Anda"}
          />
        ) : (
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <CompanyManageCard
                key={company.id}
                company={company}
                onEdit={setEditingCompany}
                onDelete={handleDelete}
                onVerify={handleVerify}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
