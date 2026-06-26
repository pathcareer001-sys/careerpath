interface Props {
  title: string;
  value: string | number;
}

export default function StatCard({ title, value }: Props) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5">
      <p className="text-[28px] font-medium text-[#0F172A]">{value}</p>
      <p className="mt-0.5 text-[13px] text-[#94A3B8]">{title}</p>
    </div>
  );
}
