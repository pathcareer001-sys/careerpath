import { BadgeCheck, Building2, MapPin, Pencil, Trash2 } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import type { Company } from "@/types/company";

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
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Building2 size="18" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-slate-900">{company.name}</h3>
            <p className="text-sm text-slate-500">{company.industry || "No industry"}</p>
            <div className="flex items-center gap-2">
              <BadgeCheck size="16" className={company.verified ? "text-emerald-600" : "text-slate-300"} />
              <span className={company.verified ? "text-sm text-emerald-600 font-medium" : "text-sm text-slate-400"}>
                {company.verified ? "Verified" : "Unverified"}
              </span>
            </div>
            {company.location && (
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <MapPin size="14" />
                {company.location}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <AppButton onClick={() => onEdit(company)}>
            <Pencil size="16" />
          </AppButton>
          <AppButton
            onClick={() => onVerify(company.id, company.verified)}
            className={company.verified ? "!bg-amber-500 hover:!bg-amber-600" : "!bg-emerald-600 hover:!bg-emerald-700"}
          >
            {company.verified ? "Unverify" : "Verify"}
          </AppButton>
          <AppButton variant="danger" onClick={() => onDelete(company.id)}>
            <Trash2 size="16" />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
