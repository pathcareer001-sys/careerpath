import { Building2, MapPin, Briefcase, Pencil, Trash2 } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import type { Internship } from "@/types/internship";

interface Props {
  internship: Internship;
  onEdit: (internship: Internship) => void;
  onDelete: (id: string) => void;
}

const badgeStyles: Record<string, string> = {
  Internship: "bg-info/10 text-info border border-info/20",
  "Full Time": "bg-info/10 text-info border border-info/20",
  "Part Time": "bg-info/10 text-info border border-info/20",
  Contract: "bg-info/10 text-info border border-info/20",
  "SMA/SMK": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Diploma (D3)": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Bachelor's Degree (S1)": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Master's Degree (S2)": "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  "Fresh Graduate": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "Less than 1 Year": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "1-3 Years": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "3-5 Years": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  "5+ Years": "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
};

function MiniBadge({ label }: { label: string }) {
  const display = label === "Bachelor's Degree (S1)" ? "S1" : label === "Master's Degree (S2)" ? "S2" : label === "Diploma (D3)" ? "D3" : label;
  return (
    <span className={`rounded px-1.5 py-[2px] text-[10px] font-medium leading-none ${badgeStyles[label] || "bg-section text-secondary-text border border-border/60"}`}>
      {display}
    </span>
  );
}

export default function InternshipManageCard({
  internship,
  onEdit,
  onDelete,
}: Props) {
  return (
    <AppCard>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shrink-0 shadow-sm">
            <Briefcase size="18" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-heading">{internship.title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary-text">
              <span className="flex items-center gap-1"><Building2 size="14" /> {internship.companyName}</span>
              <span className="flex items-center gap-1"><MapPin size="14" /> {internship.location}</span>
              <span className="flex items-center gap-1"><Briefcase size="14" /> {internship.type}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {internship.employmentType && <MiniBadge label={internship.employmentType} />}
              {internship.minEducation && <MiniBadge label={internship.minEducation} />}
              {internship.experienceLevel && <MiniBadge label={internship.experienceLevel} />}
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
