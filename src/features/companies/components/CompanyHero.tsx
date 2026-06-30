import { MapPin, Globe, Star, BadgeCheck } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import BookmarkButton from "@/features/bookmarks/components/BookmarkButton";

import type { Company } from "@/types/company";

export default function CompanyHero({ company }: { company: Company }) {
  return (
    <AppCard className="bg-accent text-heading">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface/90 flex items-center justify-center">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="h-16 w-16 rounded-2xl object-cover" />
            ) : (
              <span className="text-2xl font-medium text-primary">{company.name.charAt(0)}</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-medium">{company.name}</h1>
              {company.verified && <BadgeCheck size={20} className="text-primary" />}
            </div>

            {company.industry && <p className="text-body">{company.industry}</p>}

            <div className="flex gap-4 mt-2 text-sm text-body">
              <div className="flex gap-1 items-center">
                <MapPin size={16} />
                {company.location}
              </div>

              {company.website && (
                <div className="flex gap-1 items-center">
                  <Globe size={16} />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">
                    {company.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3">
            <Star size={18} className="fill-warning text-warning" />
            <span className="text-lg font-medium">{company.avgRating}</span>
            <span className="text-secondary-text">({company.reviewCount} ulasan)</span>
          </div>

          <BookmarkButton companyId={company.id} />
        </div>
      </div>
    </AppCard>
  );
}
