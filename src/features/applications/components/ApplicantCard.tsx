import { User, Mail, CheckCircle2, XCircle, Crown } from "lucide-react";

import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import VerifiedBadge from "@/components/company/VerifiedBadge";

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
  const isPremium = application.applicantSubscription === "premium";

  return (
    <AppCard>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{application.applicantName}</h3>
            {isPremium && <VerifiedBadge show size={14} />}
          </div>

          <StatusBadge status={application.status} />
        </div>

        {isPremium && (
          <div className="flex items-center gap-1.5 rounded-lg bg-primary/[0.06] px-3 py-1.5 text-xs font-medium text-primary w-fit">
            <Crown size="12" />
            Kandidat Prioritas
          </div>
        )}

        <p className="text-sm text-secondary-text">
          {application.internshipTitle}
        </p>

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
