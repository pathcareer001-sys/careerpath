import { Building2, MapPin, Briefcase, Pencil, Trash2 } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import type { Internship } from "@/types/internship";

interface Props {
  internship: Internship;

  onEdit: (internship: Internship) => void;

  onDelete: (id: string) => void;
}

export default function InternshipManageCard({
  internship,
  onEdit,
  onDelete,
}: Props) {
  return (
    <AppCard>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-semibold">{internship.title}</h3>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Building2 size={16} />
            {internship.companyName}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} />
            {internship.location}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Briefcase size={16} />
            {internship.type}
          </div>
        </div>

        <div className="flex gap-2">
          <AppButton onClick={() => onEdit(internship)}>
            <Pencil size={16} />
          </AppButton>

          <AppButton onClick={() => onDelete(internship.id)}>
            <Trash2 size={16} />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
