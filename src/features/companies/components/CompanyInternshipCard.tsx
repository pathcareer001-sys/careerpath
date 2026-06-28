import { Briefcase, MapPin, Trash2, Users, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import type { Internship } from "@/types/internship";
import EditInternshipDialog from "./EditInternshipDialog";
import { useInternshipApplications } from "@/features/applications/hooks/useInternshipApplications";

interface Props {
  internship: Internship;
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

export default function CompanyInternshipCard({ internship, onDelete }: Props) {
  const { data: applications } = useInternshipApplications(internship.id);

  return (
    <AppCard>
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shrink-0 shadow-sm">
            <Briefcase size="18" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-heading">{internship.title}</h3>
              {internship.status === "draft" && (
                <span className="rounded bg-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-warning">Draft</span>
              )}
            </div>
            <p className="text-sm text-secondary-text mt-0.5">{internship.companyName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-secondary-text">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size="14" className="text-muted" /> {internship.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase size="14" className="text-muted" /> {internship.type}
          </span>
          {internship.salary && (
            <span className="inline-flex items-center gap-1.5">
              <DollarSign size="14" className="text-muted" /> {internship.salary}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Users size="14" className="text-muted" /> {applications?.length || 0} Applicants
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size="14" className="text-muted" /> {internship.deadline || "No deadline"}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {internship.employmentType && <MiniBadge label={internship.employmentType} />}
          {internship.minEducation && <MiniBadge label={internship.minEducation} />}
          {internship.experienceLevel && <MiniBadge label={internship.experienceLevel} />}
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-divider">
          <Link to={`/company/applicants/${internship.id}`}>
            <AppButton type="button">View Applicants</AppButton>
          </Link>
          <EditInternshipDialog internship={internship} />
          <AppButton type="button" variant="danger" onClick={() => onDelete(internship.id)}>
            <Trash2 size="16" />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
