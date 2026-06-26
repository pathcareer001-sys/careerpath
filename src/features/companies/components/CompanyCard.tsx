import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Company } from "@/types/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/companies/${company.id}`} className="block group">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center transition-colors hover:border-[#BFDBFE]">
        <div className="mx-auto h-10 w-10 rounded-lg border border-[#F1F5F9] bg-white flex items-center justify-center text-sm font-medium text-[#0F172A] overflow-hidden">
          {company.logo ? (
            <img src={company.logo} alt="" className="h-full w-full object-cover" />
          ) : (
            company.name.charAt(0)
          )}
        </div>
        <h3 className="mt-2 text-sm font-medium text-[#0F172A]">{company.name}</h3>
        <p className="text-[12px] text-[#94A3B8] mt-0.5">{company.industry || "Company"}</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Star size="13" className="fill-[#F59E0B] text-[#F59E0B]" />
          <span className="text-[13px] font-medium text-[#0F172A]">{company.avgRating || 0}</span>
        </div>
        <p className="text-[12px] text-[#2563EB] mt-1">{company.reviewCount} open positions</p>
      </div>
    </Link>
  );
}
