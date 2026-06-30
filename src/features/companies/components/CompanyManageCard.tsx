import { Building2, MapPin, Pencil, Trash2 } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import type { Company } from "@/types/company";
import VerifiedBadge from "@/components/company/VerifiedBadge";

interface Props {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
  onVerify: (id: string, verified: boolean) => void;
}

export default function CompanyManageCard({
  company,
  onEdit,
  onDelete,
  onVerify,
}: Props) {
  return (
    <AppCard>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shrink-0 shadow-sm">
            <Building2 size="18" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-heading flex items-center gap-1.5">
              {company.name}
              <VerifiedBadge show={company.subscription === "premium"} size={14} />
            </h3>
            <p className="text-sm text-secondary-text">{company.industry || "Tidak ada industri"}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-primary">
                {company.verified ? "Terverifikasi" : "Belum Terverifikasi"}
              </span>
              {company.subscription === "premium" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                  Premium
                  <VerifiedBadge show size={12} />
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                  Free
                </span>
              )}
            </div>
            {company.location && (
              <div className="flex items-center gap-1 text-sm text-secondary-text">
                <MapPin size="14" />
                {company.location}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <AppButton onClick={() => onEdit(company)}>
            <Pencil size="16" />
          </AppButton>
          <AppButton
            onClick={() => onVerify(company.id, company.verified)}
            className={company.verified ? "!bg-warning/50 hover:!bg-warning/70" : "!bg-success hover:!bg-success/80"}
          >
            {company.verified ? "Batalkan Verifikasi" : "Verifikasi"}
          </AppButton>
          <AppButton variant="danger" onClick={() => onDelete(company.id)}>
            <Trash2 size="16" />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
