import { Link } from "react-router-dom";
import { Building2, User, CheckCircle, XCircle, Eye } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full shrink-0 overflow-hidden shadow-sm">
            {application.applicantPhotoURL ? (
              <img src={application.applicantPhotoURL} alt={application.applicantName} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
                {application.applicantName?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-heading">{application.internshipTitle}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary-text">
              <span className="flex items-center gap-1"><Building2 size="14" /> {application.companyName}</span>
              <span className="flex items-center gap-1"><User size="14" /> {application.applicantName}</span>
            </div>
            <div className="mt-1">
              <StatusBadge status={application.status} />
            </div>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Link to={`/students/${application.applicantId}`}>
            <AppButton variant="outline">
              <Eye size="16" />
            </AppButton>
          </Link>
          <AppButton onClick={() => onAccept(application.id)}>
            <CheckCircle size="16" />
          </AppButton>
          <AppButton variant="danger" onClick={() => onReject(application.id)}>
            <XCircle size="16" />
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}
