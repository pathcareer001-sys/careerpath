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
    <AppCard className="bg-accent text-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="flex gap-5">
          <div className="h-20 w-20 rounded-3xl bg-surface text-primary flex items-center justify-center shrink-0">
            <Building2 size={36} />
          </div>

          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Kesempatan Magang
            </span>

            <h1 className="mt-4 text-4xl font-medium leading-tight">
              {internship.title}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-body">
              <Building2 size={18} />
              {internship.companyName}
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-section px-3 py-2">
                <MapPin size={16} />
                {internship.location}
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-section px-3 py-2">
                <Briefcase size={16} />
                {internship.type}
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-section px-3 py-2">
                <Calendar size={16} />
                {internship.deadline}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-3xl bg-surface p-6 text-heading">
          <h3 className="text-lg font-medium">Siap Melamar?</h3>

          <p className="mt-2 text-sm text-secondary-text">
            Kirim lamaran Anda dan mulailah perjalanan magang Anda hari ini.
          </p>

          <div className="mt-6 space-y-3">
            <InfoRow label="Perusahaan" value={internship.companyName} />
            <InfoRow label="Tipe" value={internship.type} />
            <InfoRow label="Lokasi" value={internship.location} />
          </div>

          {userRole === "student" && (
            <AppButton
              className="w-full mt-6"
              onClick={onApply}
              disabled={isApplying || hasApplied}
            >
              {hasApplied
                ? "Terdaftar ✓"
                : isApplying
                  ? "Melamar..."
                  : "Lamar Magang"}
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
      <span className="text-secondary-text">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
