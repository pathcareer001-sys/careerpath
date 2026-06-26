import { Link } from "react-router-dom";
import { BadgeCheck, MapPin, ArrowUpRight } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import type { Company } from "@/types/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/companies/${company.id}`} className="block group">
      <AppCard className="h-full transition-colors hover:border-blue-200">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-[11px] font-medium text-blue-600">
            {company.industry || "Company"}
          </span>
          <ArrowUpRight size="16" className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-surface-alt flex items-center justify-center text-sm font-medium text-blue-600 shrink-0">
            {company.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-medium text-slate-900 truncate">{company.name}</h3>
              {company.verified && <BadgeCheck size="14" className="text-blue-600 shrink-0" />}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <MapPin size="12" />
              {company.location}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span>{company.avgRating || 0} rating</span>
          <span>{company.reviewCount} reviews</span>
        </div>
      </AppCard>
    </Link>
  );
}
