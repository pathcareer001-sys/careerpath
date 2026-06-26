import { Building2, Briefcase, CalendarDays } from "lucide-react";
import AppCard from "@/components/common/AppCard";
import StatusBadge from "./StatusBadge";
import type { Application } from "@/types/application";

interface Props {
  application: Application;
}

export default function ApplicationCard({ application }: Props) {
  return (
    <AppCard className="group transition-all hover:border-blue-300 hover:shadow-[0_0_0_1px_#2563eb1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
          <Briefcase size="20" className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-600">
              Internship
            </span>
          </div>
          <h3 className="text-sm font-medium text-slate-900 mt-1">{application.internshipTitle}</h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Building2 size="12" />
              {application.companyName}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays size="12" />
              {new Date(application.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={application.status} />
          <ApplicationDots status={application.status} />
        </div>
      </div>
    </AppCard>
  );
}

function ApplicationDots({ status }: { status: string }) {
  const steps = ["pending", "interview", "accepted"];
  const currentIdx = steps.indexOf(status);

  if (status === "rejected") {
    return <div className="h-2 w-2 rounded-full bg-red-500" />;
  }

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`h-2 w-2 rounded-full ${i <= currentIdx ? "bg-blue-600" : "bg-slate-200"}`} />
          {i < steps.length - 1 && (
            <div className={`h-[2px] w-6 ${i < currentIdx ? "bg-blue-600" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
