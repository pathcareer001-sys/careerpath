import { Briefcase, MapPin, Trash2, Users, Calendar } from "lucide-react";

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
        <div>
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-blue-600" />

            <h3 className="text-lg font-semibold">{internship.title}</h3>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {internship.companyName}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            {internship.location}
          </div>

          <div className="flex items-center gap-2">
            <Briefcase size={14} />
            {internship.type}
          </div>

          <div className="flex items-center gap-2">
            <Users size={14} />
            {applications?.length || 0}
            Applicants
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} />
            {internship.deadline}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to={`/company/applicants/${internship.id}`}>
            <AppButton type="button">Applicants</AppButton>
          </Link>

          <EditInternshipDialog internship={internship} />

          <AppButton type="button" onClick={() => onDelete(internship.id)}>
            <Trash2 size={16} />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
