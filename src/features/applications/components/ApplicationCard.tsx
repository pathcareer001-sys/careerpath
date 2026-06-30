import { Building2, CalendarDays, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Application } from "@/types/application";

interface Props {
  application: Application;
}

const stageMeta: Record<string, { label: string; color: string }> = {
  pending: { label: "Mendaftar", color: "bg-warning/50" },
  reviewed: { label: "Ditinjau", color: "bg-accent" },
  interview: { label: "Wawancara", color: "bg-info/100" },
  accepted: { label: "Diterima", color: "bg-success/50" },
  rejected: { label: "Ditolak", color: "bg-error/100" },
};

export default function ApplicationCard({ application }: Props) {
  const stages = ["pending", "reviewed", "interview", "accepted"];
  const currentIdx = stages.indexOf(application.status);
  const timelineStages = application.status === "rejected"
    ? ["pending", "rejected"]
    : stages;

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex gap-4 p-4">
        <div className="flex flex-col items-center shrink-0">
          {timelineStages.map((s, i) => {
            const meta = stageMeta[s];
            const isPast = i <= currentIdx || s === application.status;
            const isLast = i === timelineStages.length - 1;
            return (
              <div key={s} className="flex flex-col items-center">
                <div className={`h-3 w-3 rounded-full border-2 ${isPast ? `${meta.color} border-white` : "border-border bg-surface"}`} />
                {!isLast && <div className={`w-0.5 h-6 ${isPast && timelineStages[i + 1] !== "rejected" ? "bg-primary/30" : "bg-section"}`} />}
              </div>
            );
          })}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-primary">
                  Magang
                </span>
                <StatusBadge status={application.status} />
              </div>
              <h3 className="text-sm font-medium text-heading mt-1">{application.internshipTitle}</h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-secondary-text">
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
            <ChevronRight size="16" className="text-muted mt-1 shrink-0" />
          </div>

          {application.interviewDate && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-info/10 px-2.5 py-1 text-xs font-medium text-info">
              <CalendarDays size="12" />
              Wawancara: {new Date(application.interviewDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
