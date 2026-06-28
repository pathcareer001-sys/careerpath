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
  pending: { fill: "#F2B84B", bg: "#FEF7E0" },
  accepted: { fill: "#5CBF8F", bg: "#E8F8F0" },
  rejected: { fill: "#E57373", bg: "#FDE8E8" },
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
            tick={{ fill: "#7B94AA", fontSize: 13 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#A5B8C7", fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: "var(--color-section)" }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid var(--color-border)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              fontSize: 13,
              color: "var(--color-heading)",
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={64}>
            {data.map((entry) => (
              <Cell
                key={entry.key}
                fill={COLORS[entry.key as keyof typeof COLORS]?.fill || "#4682B4"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
