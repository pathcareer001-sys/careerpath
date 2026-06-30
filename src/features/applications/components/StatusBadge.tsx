import { CheckCircle2, Clock, XCircle, AlertCircle, CalendarCheck, ArrowLeft } from "lucide-react";

const statusConfig: Record<string, { label: string; gradient: string; dot: string; icon: React.ReactNode }> = {
  pending: {
    label: "Menunggu",
    gradient: "bg-gradient-to-r from-warning/10 to-accent text-warning border border-warning/30",
    dot: "bg-warning",
    icon: <Clock size="12" />,
  },
  reviewed: {
    label: "Ditinjau",
    gradient: "bg-gradient-to-r from-accent to-section text-primary border border-primary/30",
    dot: "bg-primary",
    icon: <AlertCircle size="12" />,
  },
  interview: {
    label: "Wawancara",
    gradient: "bg-gradient-to-r from-info/10 to-accent text-info border border-info/30",
    dot: "bg-info",
    icon: <CalendarCheck size="12" />,
  },
  accepted: {
    label: "Diterima",
    gradient: "bg-gradient-to-r from-success/10 to-accent text-success border border-success/30",
    dot: "bg-success",
    icon: <CheckCircle2 size="12" />,
  },
  rejected: {
    label: "Ditolak",
    gradient: "bg-gradient-to-r from-error/10 to-accent text-error border border-error/30",
    dot: "bg-error",
    icon: <XCircle size="12" />,
  },
  withdrawn: {
    label: "Ditarik",
    gradient: "bg-gradient-to-r from-muted/10 to-section text-secondary-text border border-border",
    dot: "bg-muted",
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
