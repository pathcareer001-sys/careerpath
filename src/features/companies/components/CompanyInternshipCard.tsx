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

export default function CompanyInternshipCard({ internship, onDelete }: Props) {
  const { data: applications } = useInternshipApplications(internship.id);

  return (
    <AppCard>
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Briefcase size="18" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-slate-900">{internship.title}</h3>
              {internship.status === "draft" && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">Draft</span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{internship.companyName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size="14" className="text-slate-400" /> {internship.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase size="14" className="text-slate-400" /> {internship.type}
          </span>
          {internship.salary && (
            <span className="inline-flex items-center gap-1.5">
              <DollarSign size="14" className="text-slate-400" /> {internship.salary}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Users size="14" className="text-slate-400" /> {applications?.length || 0} Applicants
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size="14" className="text-slate-400" /> {internship.deadline || "No deadline"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
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
