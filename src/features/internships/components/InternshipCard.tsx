import { Link } from "react-router-dom";
import { MapPin, CalendarDays, Bookmark } from "lucide-react";
import type { Internship } from "@/types/internship";

const tagStyles: Record<string, string> = {
  Remote: "bg-[#F0FDFA] text-[#0F766E]",
  Hybrid: "bg-[#EFF6FF] text-[#1D4ED8]",
  "Full-time": "bg-[#F0FDF4] text-[#15803D]",
  Onsite: "bg-[#F0FDF4] text-[#15803D]",
};

export default function InternshipCard({ internship }: { internship: Internship }) {
  const tagClass = tagStyles[internship.type] || "bg-[#EFF6FF] text-[#1D4ED8]";

  return (
    <Link to={`/internships/${internship.id}`} className="block group">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 transition-colors hover:border-[#BFDBFE]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg border border-[#F1F5F9] bg-white flex items-center justify-center text-sm font-medium text-[#0F172A] shrink-0 overflow-hidden">
              {internship.companyName.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#0F172A]">{internship.title}</h3>
              <p className="text-[13px] text-[#64748B] mt-0.5">{internship.companyName}</p>
            </div>
          </div>
          <Bookmark size="16" className="text-[#CBD5E1] shrink-0 mt-1" />
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className={`rounded-full px-2.5 py-[3px] text-[12px] font-medium ${tagClass}`}>
            {internship.type}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-[#64748B]">
            <MapPin size="13" />
            {internship.location}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9]">
          <span className="flex items-center gap-1 text-[12px] text-[#94A3B8]">
            <CalendarDays size="13" />
            {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : "No deadline"}
          </span>
          <span className="text-[13px] text-[#2563EB] group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
