import { Link } from "react-router-dom";

import {
  BadgeCheck,
  MapPin,
  ArrowUpRight,
  Building2,
} from "lucide-react";

import AppCard from "@/components/common/AppCard";

import type { Company } from "@/types/company";

interface Props {
  company: Company;
}

export default function CompanyCard({ company }: Props) {
  return (
    <Link to={`/companies/${company.id}`} className="block">
      <AppCard
        className="
        h-full
        group
        overflow-hidden

        hover:border-blue-200
        hover:shadow-xl
        "
      >
        {/* Badge */}

        <div className="flex justify-between items-start">
          <div
            className="
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-blue-50
            px-3
            py-1
            text-xs
            font-medium
            text-blue-600
            "
          >
            <Building2 size={14} />
            Company
          </div>

          <ArrowUpRight
            size={18}
            className="
            text-slate-400
            transition-transform
            group-hover:translate-x-1
            group-hover:-translate-y-1
            "
          />
        </div>

        {/* Logo */}
        <div className="mt-6 flex gap-4">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="
      h-20
      w-20
      rounded-3xl
      object-cover
      shadow-md
      shrink-0
      "
            />
          ) : (
            <div
              className="
      h-20
      w-20
      rounded-3xl
      bg-gradient-to-br
      from-blue-500
      to-purple-500
      flex
      items-center
      justify-center
      text-white
      text-2xl
      font-bold
      shrink-0
      "
            >
              {company.name.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold truncate">{company.name}</h3>

              {company.verified && (
                <BadgeCheck size={18} className="text-blue-600" />
              )}
            </div>

            <span
              className="
      mt-2
      inline-flex
      rounded-full
      bg-blue-50
      px-3
      py-1
      text-xs
      font-medium
      text-blue-600
      "
            >
              {company.industry || "Technology"}
            </span>

            <div
              className="
      mt-3
      flex
      items-center
      gap-2
      text-sm
      text-slate-500
      "
            >
              <MapPin size={14} />
              {company.location}
            </div>

            {company.website && (
              <p
                className="
        mt-2
        truncate
        text-sm
        text-blue-600
        "
              >
                {company.website}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="
  mt-6
  grid
  grid-cols-3
  gap-4
  border-t
  border-blue-100
  pt-5
  text-center
  "
        >
          <div>
            <p className="font-semibold">{company.avgRating || 0}</p>

            <p className="text-xs text-slate-500">Rating</p>
          </div>

          <div>
            <p className="font-semibold">{company.reviewCount}</p>

            <p className="text-xs text-slate-500">Reviews</p>
          </div>

          <div>
            <p className="font-semibold">{company.verified ? "Yes" : "No"}</p>

            <p className="text-xs text-slate-500">Verified</p>
          </div>
        </div>

        <div
          className="
          mt-5
          rounded-xl
          bg-blue-600
          py-3
          text-center
          text-sm
          font-medium
          text-white
          transition-all
          group-hover:bg-blue-700
          "
        >
          View Company
        </div>
      </AppCard>
    </Link>
  );
}
