import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface Props {
  pending: number;
  accepted: number;
  rejected: number;
}

const COLORS = {
  pending: { fill: "#F59E0B", bg: "#FEF3C7" },
  accepted: { fill: "#059669", bg: "#D1FAE5" },
  rejected: { fill: "#E11D48", bg: "#FFE4E6" },
};

export default function CompanyAnalyticsChart({
  pending,
  accepted,
  rejected,
}: Props) {
  const data = [
    { name: "Pending", value: pending, key: "pending" },
    { name: "Accepted", value: accepted, key: "accepted" },
    { name: "Rejected", value: rejected, key: "rejected" },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="20%">
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 13 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: "#F1F5F9" }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              fontSize: 13,
              color: "#0F172A",
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={64}>
            {data.map((entry) => (
              <Cell
                key={entry.key}
                fill={COLORS[entry.key as keyof typeof COLORS]?.fill || "#2563EB"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
