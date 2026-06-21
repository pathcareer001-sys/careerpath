import { Link } from "react-router-dom";

import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

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
        group
        overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex justify-between items-start">
          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-blue-50
            px-3
            py-1
            text-xs
            font-medium
            text-blue-600
            "
          >
            <BriefcaseBusiness size={14} />

            {internship.type}
          </span>

          <ArrowUpRight
            size={18}
            className="
            text-slate-400
            transition-transform
            group-hover:translate-x-1
            group-hover:-translate-y-1
            "
          />
        </div>

        {/* Title */}

        <div className="mt-5">
          <h3
            className="
            text-xl
            font-semibold
            line-clamp-2
            "
          >
            {internship.title}
          </h3>
        </div>

        {/* Company */}

        <div className="mt-5 space-y-3">
          <div
            className="
            flex
            items-center
            gap-2
            text-slate-600
            "
          >
            <Building2 size={16} />

            <span>{internship.companyName}</span>
          </div>

          <div
            className="
            flex
            items-center
            gap-2
            text-slate-600
            "
          >
            <MapPin size={16} />

            <span>{internship.location}</span>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
          mt-6
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          pt-4
          "
        >
          <div
            className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-500
            "
          >
            <CalendarDays size={15} />

            {internship.deadline}
          </div>

          <span
            className="
            text-sm
            font-medium
            text-blue-600
            "
          >
            View Details
          </span>
        </div>
      </AppCard>
    </Link>
  );
}
