import { Link } from "react-router-dom";
import { BadgeCheck, MapPin, ArrowUpRight, Star } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import type { Company } from "@/types/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/companies/${company.id}`} className="block group">
      <AppCard className="h-full transition-all hover:border-blue-300 hover:shadow-[0_0_0_1px_#2563eb1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-600">
            {company.industry || "Company"}
          </span>
          <ArrowUpRight size="16" className="text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-sm font-medium text-white shrink-0">
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
          <span className="flex items-center gap-1"><Star size="12" className="fill-amber-500 text-amber-500" />{company.avgRating || 0}</span>
          <span>{company.reviewCount} reviews</span>
        </div>
      </AppCard>
    </Link>
  );
}
