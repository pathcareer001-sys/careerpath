interface Props {
  title: string;
  value: string | number;
  gradient?: "blue" | "purple" | "emerald" | "amber" | "rose";
}

const gradients: Record<string, string> = {
  blue: "from-primary to-secondary",
  purple: "from-secondary to-accent",
  emerald: "from-success to-info",
  amber: "from-warning to-accent",
  rose: "from-error to-accent",
};

const accentColors: Record<string, string> = {
  blue: "text-primary",
  purple: "text-body",
  emerald: "text-success",
  amber: "text-warning",
  rose: "text-error",
};

export default function StatCard({ title, value, gradient = "blue" }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-light bg-surface p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-border">
      <div className="relative z-10">
        <p className="text-[28px] font-semibold text-heading leading-none tracking-tight">{value}</p>
        <p className="mt-1.5 text-[13px] text-secondary-text font-medium">{title}</p>
      </div>
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${gradients[gradient]} opacity-[0.06] transition-all duration-300 group-hover:opacity-[0.12] group-hover:scale-110`} />
    </div>
  );
}
