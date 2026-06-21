import { Briefcase, MapPin, Pencil, Trash2 } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import type { Internship } from "@/types/internship";

interface Props {
  internship: Internship;

  onEdit: (internship: Internship) => void;

  onDelete: (id: string) => void;
}

export default function CompanyInternshipCard({
  internship,
  onEdit,
  onDelete,
}: Props) {
  return (
    <AppCard>
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase size={18} />

            <h3 className="font-semibold">{internship.title}</h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={14} />

            {internship.location}
          </div>

          <p className="text-sm text-slate-500">{internship.type}</p>
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
