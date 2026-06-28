interface Props {
  title: string;
  value: string | number;
  gradient?: "blue" | "purple" | "emerald" | "amber" | "rose";
}

const gradients: Record<string, string> = {
  blue: "from-blue-600 to-blue-500",
  purple: "from-purple-600 to-purple-500",
  emerald: "from-emerald-600 to-emerald-500",
  amber: "from-amber-500 to-orange-500",
  rose: "from-rose-600 to-pink-500",
};

const lightBgs: Record<string, string> = {
  blue: "bg-accent",
  purple: "bg-purple-50",
  emerald: "bg-emerald-50",
  amber: "bg-amber-50",
  rose: "bg-rose-50",
};

export default function StatCard({ title, value, gradient = "blue" }: Props) {
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${lightBgs[gradient]}`}>
      <div className="relative z-10">
        <p className="text-[28px] font-medium text-[#0F172A] leading-none">{value}</p>
        <p className="mt-1.5 text-[13px] text-secondary-text font-medium">{title}</p>
      </div>
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${gradients[gradient]} opacity-[0.06] transition-all duration-300 group-hover:opacity-[0.12] group-hover:scale-110`} />
    </div>
  );
}
