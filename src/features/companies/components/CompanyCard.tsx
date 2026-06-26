import { Link } from "react-router-dom";
import { BadgeCheck, MapPin, Star, ArrowUpRight } from "lucide-react";
import type { Company } from "@/types/company";

const COLORS = ["bg-blue-600", "bg-amber-500", "bg-purple-500", "bg-emerald-500", "bg-rose-500", "bg-cyan-500"];

export default function CompanyCard({ company, index = 0 }: { company: Company; index?: number }) {
  const bg = COLORS[index % COLORS.length];
  return (
    <Link to={`/companies/${company.id}`} className="block group">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-sm">
        <div className={`h-20 ${bg} relative`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute -bottom-6 left-4">
            {company.logo ? (
              <img src={company.logo} alt="" className="h-12 w-12 rounded-xl border-2 border-white bg-white object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-xl border-2 border-white bg-white flex items-center justify-center text-sm font-medium text-slate-900">
                {company.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute top-2 right-2">
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white">
              {company.industry || "Company"}
            </span>
          </div>
        </div>
        <div className="pt-8 pb-3 px-4">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-medium text-slate-900 truncate">{company.name}</h3>
            {company.verified && <BadgeCheck size="14" className="text-blue-600 shrink-0" />}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
            <MapPin size="12" />
            {company.location}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Star size="12" className="fill-amber-500 text-amber-500" />
              <span>{company.avgRating || 0} <span className="text-slate-400">({company.reviewCount})</span></span>
            </div>
            <ArrowUpRight size="14" className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  );
}
