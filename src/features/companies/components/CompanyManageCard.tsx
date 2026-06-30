import { BadgeCheck, Building2, MapPin, Pencil, Trash2 } from "lucide-react";
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
            <div className="flex items-center gap-2">
              <BadgeCheck size="16" className={company.verified ? "text-success" : "text-muted"} />
              <span className={company.verified ? "text-sm text-success font-medium" : "text-sm text-muted"}>
                {company.verified ? "Terverifikasi" : "Belum Terverifikasi"}
              </span>
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
