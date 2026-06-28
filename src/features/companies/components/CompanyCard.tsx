import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Company } from "@/types/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/companies/${company.id}`} className="block group animate-fade-in-up">
      <div className="relative bg-surface border border-border rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 hover:border-primary overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-lg font-medium overflow-hidden shadow-sm">
          {company.logo ? (
            <img src={company.logo} alt="" className="h-full w-full object-cover" />
          ) : (
            company.name.charAt(0)
          )}
        </div>
        <h3 className="mt-3 text-sm font-medium text-[#0F172A] group-hover:text-primary transition-colors duration-200">{company.name}</h3>
        <p className="text-[12px] text-muted mt-0.5">{company.industry || "Company"}</p>
        <div className="flex items-center justify-center gap-0.5 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size="13"
              className={`transition-all duration-200 ${star <= Math.round(company.avgRating || 0) ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"}`}
            />
          ))}
        </div>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-primary transition-all duration-200 group-hover:bg-section">
          {company.reviewCount || 0} open positions
        </div>
      </div>
    </Link>
  );
}
