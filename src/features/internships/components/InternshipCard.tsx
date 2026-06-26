import { Link } from "react-router-dom";
import { BriefcaseBusiness, Building2, MapPin, ArrowUpRight, CalendarDays } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import type { Internship } from "@/types/internship";

const typeStyles: Record<string, string> = {
  Remote: "bg-blue-50 text-blue-600",
  Hybrid: "bg-amber-50 text-amber-600",
  Onsite: "bg-emerald-50 text-emerald-600",
};

export default function InternshipCard({ internship }: { internship: Internship }) {
  const badgeColor = typeStyles[internship.type] || "bg-blue-50 text-blue-600";

  return (
    <Link to={`/internships/${internship.id}`} className="block group">
      <AppCard className="h-full transition-all hover:border-blue-300 hover:shadow-[0_0_0_1px_#2563eb1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badgeColor}`}>
            <BriefcaseBusiness size="12" className="inline mr-1" />
            {internship.type}
          </span>
          <ArrowUpRight size="16" className="text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <h3 className="mt-3 text-sm font-medium text-slate-900 line-clamp-2 min-h-[2.5rem]">
          {internship.title}
        </h3>

        <div className="mt-3 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Building2 size="13" />
            <span>{internship.companyName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size="13" />
            <span>{internship.location}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <CalendarDays size="12" className="text-slate-400" />
            {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : "No deadline"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-1.5 transition-all">
            Apply <ArrowUpRight size="12" />
          </span>
        </div>
      </AppCard>
    </Link>
  );
}
