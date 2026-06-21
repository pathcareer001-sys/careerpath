import { Link } from "react-router-dom";

import { Building2, MapPin, Briefcase, ArrowRight } from "lucide-react";

import AppCard from "@/components/common/AppCard";

import type { Internship } from "@/types/internship";

interface Props {
  internship: Internship;
}

export default function InternshipCard({ internship }: Props) {
  return (
    <Link to={`/internships/${internship.id}`} className="block">
      <AppCard
        className="
        h-full
        min-h-[220px]
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
        "
      >
        <div className="flex flex-col h-full">
          <div className="space-y-3 flex-1">
            <h3
              className="
              text-lg
              font-semibold
              line-clamp-2
              "
            >
              {internship.title}
            </h3>

            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Building2 size={16} />

                {internship.companyName}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />

                {internship.location}
              </div>
            </div>

            <span
              className="
              inline-flex
              items-center
              rounded-full
              bg-blue-50
              text-blue-600
              px-3
              py-1
              text-xs
              font-medium
              "
            >
              <Briefcase size={14} className="mr-1" />

              {internship.type}
            </span>
          </div>

          <div
            className="
            mt-4
            flex
            items-center
            justify-between
            border-t
            pt-3
            "
          >
            <span className="text-sm text-slate-500">
              Deadline: {internship.deadline}
            </span>

            <ArrowRight size={18} className="text-blue-600" />
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
