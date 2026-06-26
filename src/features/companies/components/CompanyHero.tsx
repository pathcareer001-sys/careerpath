import { MapPin, Globe, Star, BadgeCheck } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import BookmarkButton from "@/features/bookmarks/components/BookmarkButton";

import type { Company } from "@/types/company";

export default function CompanyHero({ company }: { company: Company }) {
  return (
    <AppCard
      className="
  relative
  overflow-hidden
  min-h-[220px]
  bg-gradient-to-r
  from-blue-600
  to-indigo-600
  text-white
  "
    >
      <div
        className="
  absolute
  -right-24
  -top-24
  h-72
  w-72
  rounded-full
  bg-white/10
  blur-3xl
  "
      />

      <div
        className="
  relative
  z-10
  flex
  flex-col
  gap-6
  md:flex-row
  md:justify-between
  "
      >
        <div className="flex gap-4">
          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-white/90
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
                <BadgeCheck size={20} className="text-white" />
              )}
            </div>

            {company.industry && (
              <p className="text-blue-100">{company.industry}</p>
            )}

            <div className="flex gap-4 mt-2 text-sm text-blue-100">
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
                    underline
                    underline-offset-4
                    hover:text-white
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
          <div
            className="
  flex
  items-center
  gap-2
  rounded-2xl
  bg-white/10
  backdrop-blur
  px-4
  py-3
  "
          >
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

            <span className="text-blue-100">
              ({company.reviewCount} reviews)
            </span>
          </div>

          <BookmarkButton companyId={company.id} />
        </div>
      </div>
      <div
        className="
  absolute
  -left-24
  -bottom-24
  h-72
  w-72
  rounded-full
  bg-white/10
  blur-3xl
  "
      />
    </AppCard>
  );
}
