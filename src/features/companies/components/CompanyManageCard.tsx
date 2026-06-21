import { Building2, MapPin, Pencil, Trash2 } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import type { Company } from "@/types/company";

interface Props {
  company: Company;

  onEdit: (company: Company) => void;

  onDelete: (id: string) => void;
}

export default function CompanyManageCard({
  company,
  onEdit,
  onDelete,
}: Props) {
  return (
    <AppCard>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 size={18} />

            <h3 className="font-semibold">{company.name}</h3>
          </div>

          <p className="text-sm text-slate-500">{company.industry}</p>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={14} />

            {company.location}
          </div>
        </div>

        <div className="flex gap-2">
          <AppButton onClick={() => onEdit(company)}>
            <Pencil size={16} />
          </AppButton>

          <AppButton onClick={() => onDelete(company.id)}>
            <Trash2 size={16} />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
