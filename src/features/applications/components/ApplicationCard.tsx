import { Building2, Briefcase } from "lucide-react";

import AppCard from "@/components/common/AppCard";

import StatusBadge from "./StatusBadge";

import type { Application } from "@/types/application";

export default function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  return (
    <AppCard>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="font-semibold">{application.internshipTitle}</h3>

          <div
            className="
            flex
            items-center
            gap-2
            text-slate-500
            "
          >
            <Building2 size={16} />

            {application.companyName}
          </div>

          <div
            className="
            flex
            items-center
            gap-2
            text-slate-500
            "
          >
            <Briefcase size={16} />
            Internship Application
          </div>
        </div>

        <StatusBadge status={application.status} />
      </div>
    </AppCard>
  );
}
