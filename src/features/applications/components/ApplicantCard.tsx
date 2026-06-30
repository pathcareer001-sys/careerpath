import { User, Mail, CheckCircle2, XCircle } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import StatusBadge from "./StatusBadge";

import type { Application } from "@/types/application";

interface Props {
  application: Application;

  onAccept: (id: string) => void;

  onReject: (id: string) => void;
}

export default function ApplicantCard({
  application,
  onAccept,
  onReject,
}: Props) {
  return (
    <AppCard>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{application.applicantName}</h3>

            <p className="text-sm text-secondary-text">
              {application.internshipTitle}
            </p>
          </div>

          <StatusBadge status={application.status} />
        </div>

        <div className="space-y-2 text-sm text-secondary-text">
          <div className="flex items-center gap-2">
            <User size={16} />
            {application.applicantName}
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            {application.applicantEmail}
          </div>
        </div>

        {application.status === "pending" && (
          <div className="flex gap-2">
            <AppButton onClick={() => onAccept(application.id)}>
              <CheckCircle2 size={16} />
              Terima
            </AppButton>

            <AppButton onClick={() => onReject(application.id)}>
              <XCircle size={16} />
              Tolak
            </AppButton>
          </div>
        )}
      </div>
    </AppCard>
  );
}
