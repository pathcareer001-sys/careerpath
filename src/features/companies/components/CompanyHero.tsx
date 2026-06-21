import { MapPin, Globe, Star, BadgeCheck } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import BookmarkButton from "@/features/bookmarks/components/BookmarkButton";

import type { Company } from "@/types/company";

export default function CompanyHero({ company }: { company: Company }) {
  return (
    <AppCard
      className="
      min-h-[180px]
      "
    >
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex gap-4">
          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-blue-100
            flex
            items-center
            justify-center
            "
          >
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="
                h-16
                w-16
                rounded-2xl
                object-cover
              "
              />
            ) : (
              <span
                className="
                text-2xl
                font-bold
                text-blue-600
                "
              >
                {company.name.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{company.name}</h1>

              {company.verified && (
                <BadgeCheck size={20} className="text-blue-600" />
              )}
            </div>

            {company.industry && (
              <p className="text-slate-500">{company.industry}</p>
            )}

            <div className="flex gap-4 mt-2 text-sm text-slate-500">
              <div className="flex gap-1 items-center">
                <MapPin size={16} />
                {company.location}
              </div>

              {company.website && (
                <div className="flex gap-1 items-center">
                  <Globe size={16} />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    hover:text-blue-600
                    "
                  >
                    {company.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-2">
            <Star
              size={18}
              className="
              fill-yellow-400
              text-yellow-400
              "
            />

            <span
              className="
              text-lg
              font-semibold
              "
            >
              {company.avgRating}
            </span>

            <span className="text-slate-500">
              ({company.reviewCount} reviews)
            </span>
          </div>

          <BookmarkButton companyId={company.id} />
        </div>
      </div>
    </AppCard>
  );
}
