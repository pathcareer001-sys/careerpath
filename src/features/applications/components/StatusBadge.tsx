interface Props {
  status: string;
}

const variants: Record<string, string> = {
  pending: "bg-[#FEF9C3] text-[#854D0E]",
  reviewed: "bg-[#EEF3FE] text-[#2563EB]",
  interview: "bg-[#FEF9C3] text-[#854D0E]",
  accepted: "bg-[#DCFCE7] text-[#15803D]",
  rejected: "bg-[#FEE2E2] text-[#B91C1C]",
};

const labels: Record<string, string> = {
  pending: "Pending",
  reviewed: "Under Review",
  interview: "Interview",
  accepted: "Accepted",
  rejected: "Rejected",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium ${variants[status] || "bg-slate-100 text-slate-600"}`}>
      {labels[status] || status}
    </span>
  );
}
