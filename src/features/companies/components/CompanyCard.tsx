import { Link } from "react-router-dom";

import { MapPin, Star, BadgeCheck } from "lucide-react";

import AppCard from "@/components/common/AppCard";

import type { Company } from "@/types/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/companies/${company.id}`} className="block">
      <AppCard
        className="
      h-full
      transition-all
      duration-200
      hover:-translate-y-1
      hover:shadow-md
      min-h-[220px]
      "
      >
        <div className="flex items-start gap-4">
          <div
            className="
            w-14
            h-14
            rounded-xl
            bg-blue-100
            flex
            items-center
            justify-center
            shrink-0
            "
          >
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="
      w-14
      h-14
      rounded-xl
      object-cover
      "
              />
            ) : (
              <span
                className="
      font-semibold
      text-blue-600
      "
              >
                {company.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3
                className="
  text-lg
  font-semibold
  line-clamp-1
  "
              >
                {company.name}
              </h3>

              {company.verified && (
                <BadgeCheck size={16} className="text-blue-600" />
              )}
            </div>

            <p className="text-sm text-slate-500">{company.industry}</p>

            <div
              className="
              flex
              items-center
              gap-2
              mt-3
              text-sm
              text-slate-500
              "
            >
              <MapPin size={14} />
              {company.location}
            </div>

            <div
              className="
              flex
              items-center
              gap-2
              mt-3
              "
            >
              {company.reviewCount > 0 ? (
                <div
                  className="
      flex
      items-center
      gap-2
      mt-3
      "
                >
                  <Star
                    size={16}
                    className="
        fill-yellow-400
        text-yellow-400
        "
                  />

                  <span className="font-medium">{company.avgRating}</span>

                  <span className="text-slate-500">
                    ({company.reviewCount})
                  </span>
                </div>
              ) : (
                <p
                  className="
      mt-3
      text-sm
      text-slate-400
      "
                >
                  No reviews yet
                </p>
              )}
            </div>
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
