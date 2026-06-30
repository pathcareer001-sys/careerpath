import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Company } from "@/types/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/companies/${company.id}`} className="block group animate-fade-in-up">
      <div className="relative bg-surface border border-border rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-lg font-medium overflow-hidden shadow-sm">
          {company.logo ? (
            <img src={company.logo} alt="" className="h-full w-full object-cover" />
          ) : (
            company.name.charAt(0)
          )}
        </div>
        <h3 className="mt-3 text-sm font-medium text-heading group-hover:text-primary transition-colors duration-200">{company.name}</h3>
        <p className="text-[12px] text-muted mt-0.5">{company.industry || "Perusahaan"}</p>
        <div className="flex items-center justify-center gap-0.5 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size="13"
              className={`transition-all duration-200 ${star <= Math.round(company.avgRating || 0) ? "fill-warning text-warning" : "text-muted"}`}
            />
          ))}
        </div>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-primary transition-all duration-200 group-hover:bg-section">
          {company.reviewCount || 0} posisi terbuka
        </div>
      </div>
    </Link>
  );
}
