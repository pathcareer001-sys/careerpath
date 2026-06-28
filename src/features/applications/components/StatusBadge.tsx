import { CheckCircle2, Clock, XCircle, AlertCircle, CalendarCheck, ArrowLeft } from "lucide-react";

const statusConfig: Record<string, { label: string; gradient: string; dot: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending",
    gradient: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
    icon: <Clock size="12" />,
  },
  reviewed: {
    label: "Reviewed",
    gradient: "bg-gradient-to-r from-blue-50 to-indigo-50 text-primary border border-primary/30",
    dot: "bg-accent0",
    icon: <AlertCircle size="12" />,
  },
  interview: {
    label: "Interview",
    gradient: "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border border-purple-200",
    dot: "bg-purple-500",
    icon: <CalendarCheck size="12" />,
  },
  accepted: {
    label: "Accepted",
    gradient: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
    icon: <CheckCircle2 size="12" />,
  },
  rejected: {
    label: "Rejected",
    gradient: "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-error/30",
    dot: "bg-error/100",
    icon: <XCircle size="12" />,
  },
  withdrawn: {
    label: "Withdrawn",
    gradient: "bg-gradient-to-r from-slate-50 to-gray-50 text-secondary-text border border-border",
    dot: "bg-slate-400",
    icon: <ArrowLeft size="12" />,
  },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium leading-none ${config.gradient}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
