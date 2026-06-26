import { Link } from "react-router-dom";
import { BriefcaseBusiness, MapPin, CalendarDays, ArrowUpRight } from "lucide-react";
import type { Internship } from "@/types/internship";

const GRADIENTS = [
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-amber-500 to-orange-600",
  "bg-gradient-to-br from-purple-500 to-purple-600",
  "bg-gradient-to-br from-emerald-500 to-emerald-600",
  "bg-gradient-to-br from-rose-500 to-rose-600",
  "bg-gradient-to-br from-cyan-500 to-cyan-600",
];

const typeStyles: Record<string, string> = {
  Remote: "text-blue-600",
  Hybrid: "text-amber-600",
  Onsite: "text-emerald-600",
};

export default function InternshipCard({ internship, index = 0 }: { internship: Internship; index?: number }) {
  const textColor = typeStyles[internship.type] || "text-blue-600";
  const grad = GRADIENTS[index % GRADIENTS.length];

  return (
    <Link to={`/internships/${internship.id}`} className="block group">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-sm">
        <div className={`h-14 ${grad} relative flex items-start justify-between px-4 py-3`}>
          <span className={`rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium ${textColor}`}>
            <BriefcaseBusiness size="12" className="inline mr-1" />
            {internship.type}
          </span>
          <ArrowUpRight size="14" className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4 pt-3">
          <h3 className="text-sm font-medium text-slate-900 line-clamp-2 min-h-[2.5rem] leading-snug">
            {internship.title}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <BriefcaseBusiness size="12" />
            <span>{internship.companyName}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin size="12" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <CalendarDays size="12" />
              {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : "No deadline"}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
              Apply
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
