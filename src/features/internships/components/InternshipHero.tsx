import { Building2, MapPin, Calendar, Briefcase } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import type { Internship } from "@/types/internship";

interface Props {
  internship: Internship;

  onApply: () => void;

  isApplying: boolean;

  userRole?: string;

  hasApplied?: boolean;
}

export default function InternshipHero({
  internship,
  onApply,
  isApplying,
  userRole,
  hasApplied,
}: Props) {
  return (
    <AppCard
      className="
      relative
      overflow-hidden
      border-0
      bg-gradient-to-r
      from-blue-600
      via-blue-500
      to-indigo-600
      text-white
      "
    >
      {/* Decorative Blob */}
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
        absolute
        -left-20
        -bottom-20
        h-60
        w-60
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
        gap-8
        lg:flex-row
        lg:justify-between
        "
      >
        {/* LEFT */}
        <div className="flex gap-5">
          <div
            className="
            h-20
            w-20
            rounded-3xl
            bg-white
            text-blue-600
            flex
            items-center
            justify-center
            shrink-0
            "
          >
            <Building2 size={36} />
          </div>

          <div>
            <span
              className="
              inline-flex
              rounded-full
              bg-white/15
              px-3
              py-1
              text-xs
              font-medium
              backdrop-blur
              "
            >
              Internship Opportunity
            </span>

            <h1
              className="
              mt-4
              text-4xl
              font-bold
              leading-tight
              "
            >
              {internship.title}
            </h1>

            <div
              className="
              mt-3
              flex
              items-center
              gap-2
              text-blue-100
              "
            >
              <Building2 size={18} />

              {internship.companyName}
            </div>

            <div
              className="
              mt-5
              flex
              flex-wrap
              gap-4
              "
            >
              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white/10
                px-3
                py-2
                backdrop-blur
                "
              >
                <MapPin size={16} />
                {internship.location}
              </div>

              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white/10
                px-3
                py-2
                backdrop-blur
                "
              >
                <Briefcase size={16} />
                {internship.type}
              </div>

              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white/10
                px-3
                py-2
                backdrop-blur
                "
              >
                <Calendar size={16} />
                {internship.deadline}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
          w-full
          max-w-sm
          rounded-3xl
          bg-white
          p-6
          text-slate-900
          shadow-2xl
          "
        >
          <h3
            className="
            text-lg
            font-semibold
            "
          >
            Ready to Apply?
          </h3>

          <p
            className="
            mt-2
            text-sm
            text-slate-500
            "
          >
            Submit your application and start your internship journey today.
          </p>

          <div
            className="
            mt-6
            space-y-3
            "
          >
            <InfoRow label="Company" value={internship.companyName} />

            <InfoRow label="Type" value={internship.type} />

            <InfoRow label="Location" value={internship.location} />
          </div>

          {userRole === "student" && (
            <AppButton
              className="w-full mt-6"
              onClick={onApply}
              disabled={isApplying || hasApplied}
            >
              {hasApplied
                ? "Applied ✓"
                : isApplying
                  ? "Applying..."
                  : "Apply Internship"}
            </AppButton>
          )}
        </div>
      </div>
    </AppCard>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
