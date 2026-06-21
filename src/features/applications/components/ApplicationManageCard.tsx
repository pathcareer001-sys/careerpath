import { Building2, User, CheckCircle, XCircle } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import StatusBadge from "./StatusBadge";

import type { Application } from "@/types/application";

interface Props {
  application: Application;

  onAccept: (id: string) => void;

  onReject: (id: string) => void;
}

export default function ApplicationManageCard({
  application,
  onAccept,
  onReject,
}: Props) {
  return (
    <AppCard>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">{application.internshipTitle}</h3>
        </div>

        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Building2 size={16} />
            {application.companyName}
          </div>

          <div className="flex items-center gap-2">
            <User size={16} />
            {application.userId}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge status={application.status} />

          <div className="flex gap-2">
            <AppButton onClick={() => onAccept(application.id)}>
              <CheckCircle size={16} />
            </AppButton>

            <AppButton onClick={() => onReject(application.id)}>
              <XCircle size={16} />
            </AppButton>
          </div>
        </div>
      </div>
    </AppCard>
  );
}
