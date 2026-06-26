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
  const typeStyles = {
    Remote: "bg-blue-50 text-blue-600",
    Hybrid: "bg-amber-50 text-amber-600",
    Onsite: "bg-emerald-50 text-emerald-600",
  };

  const badgeColor =
    typeStyles[internship.type as keyof typeof typeStyles] ||
    "bg-blue-50 text-blue-600";
  return (
    <Link to={`/internships/${internship.id}`} className="block">
      <AppCard
        className="
        h-full
        group
        overflow-hidden
        hover:border-blue-200
        hover:shadow-xl
        "
      >
        {/* Header */}

        <div className="flex justify-between items-start">
          <span
            className={`
inline-flex
items-center
gap-2
rounded-full
px-3
py-1
text-xs
font-medium

${badgeColor}
`}
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
            min-h-[56px]
            text-xl
            font-semibold
            line-clamp-2
            "
          >
            {internship.title}
          </h3>

          <p
            className="
  mt-3
  text-sm
  text-slate-500
  line-clamp-2
  "
          >
            {internship.description || "No description available."}
          </p>
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

            <span className="font-medium">{internship.companyName}</span>
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
          border-blue-100
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
            <span>
              Deadline:{" "}
              {internship.deadline
                ? new Date(internship.deadline).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <div
            className="
  flex
  items-center
  gap-1
  text-sm
  font-medium
  text-blue-600
    transition-all
  group-hover:translate-x-1
  "
          >
            Apply Now
            <ArrowUpRight size={14} />
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
