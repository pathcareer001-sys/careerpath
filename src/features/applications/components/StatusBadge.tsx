interface Props {
  status: string;
}

const variants: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  reviewed: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
  interview: "bg-purple-50 text-purple-600 ring-1 ring-purple-200",
  accepted: "bg-green-50 text-green-600 ring-1 ring-green-200",
  rejected: "bg-red-50 text-red-600 ring-1 ring-red-200",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${variants[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
