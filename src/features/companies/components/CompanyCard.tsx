import { Link } from "react-router-dom";

import {
  BadgeCheck,
  MapPin,
  Star,
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

        <div
          className="
          mt-6
          flex
          justify-center
          "
        >
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
              "
            >
              {company.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}

        <div className="mt-6 text-center">
          <div
            className="
            flex
            justify-center
            items-center
            gap-2
            "
          >
            <h3
              className="
              text-xl
              font-semibold
              "
            >
              {company.name}
            </h3>

            {company.verified && (
              <BadgeCheck size={18} className="text-blue-600" />
            )}
          </div>

          <p
            className="
            mt-2
            text-sm
            text-slate-500
            "
          >
            {company.industry || "Technology"}
          </p>

          <div
            className="
            mt-4
            flex
            items-center
            justify-center
            gap-2
            text-sm
            text-slate-500
            "
          >
            <MapPin size={14} />

            {company.location}
          </div>
        </div>

        {/* Footer */}

        <div
          className="
          mt-6
          flex
          items-center
          justify-center
          gap-4
          border-t
          border-slate-100
          pt-5
          "
        >
          <div
            className="
            flex
            items-center
            gap-1
            "
          >
            <Star
              size={15}
              className="
              fill-yellow-400
              text-yellow-400
              "
            />

            <span className="font-medium">{company.avgRating || 0}</span>
          </div>

          <div
            className="
            text-sm
            text-slate-500
            "
          >
            {company.reviewCount} Reviews
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
