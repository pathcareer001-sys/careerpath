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
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Briefcase size="18" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-slate-900">{internship.title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Building2 size="14" /> {internship.companyName}</span>
              <span className="flex items-center gap-1"><MapPin size="14" /> {internship.location}</span>
              <span className="flex items-center gap-1"><Briefcase size="14" /> {internship.type}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <AppButton onClick={() => onEdit(internship)}>
            <Pencil size="16" />
          </AppButton>
          <AppButton variant="danger" onClick={() => onDelete(internship.id)}>
            <Trash2 size="16" />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
