import { Link } from "react-router-dom";
import { BriefcaseBusiness, Building2, MapPin, ArrowUpRight } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import type { Internship } from "@/types/internship";

const typeStyles: Record<string, string> = {
  Remote: "bg-surface-alt text-blue-600",
  Hybrid: "bg-amber-50 text-amber-600",
  Onsite: "bg-emerald-50 text-emerald-600",
};

export default function InternshipCard({ internship }: { internship: Internship }) {
  const badgeColor = typeStyles[internship.type] || "bg-surface-alt text-blue-600";

  return (
    <Link to={`/internships/${internship.id}`} className="block group">
      <AppCard className="h-full transition-colors hover:border-blue-200">
        <div className="flex items-start justify-between">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badgeColor}`}>
            <BriefcaseBusiness size="12" className="inline mr-1" />
            {internship.type}
          </span>
          <ArrowUpRight size="16" className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          <span className="text-xs text-slate-400">
            {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : "No deadline"}
          </span>
          <span className="text-xs font-medium text-blue-600 group-hover:translate-x-0.5 transition-transform">
            Apply &rarr;
          </span>
        </div>
      </AppCard>
    </Link>
  );
}
