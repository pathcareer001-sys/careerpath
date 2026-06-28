import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const PIE_COLORS = ["#4682B4", "#5CBF8F", "#F2B84B", "#E57373", "#A1C6E8"];

export function AdminBarChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="25%">
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-secondary-text)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
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
              background: "var(--color-popover)",
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={72}>
            {data.map((_, index) => (
              <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdminPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid var(--color-border)",
              fontSize: 13,
              color: "var(--color-heading)",
              background: "var(--color-popover)",
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => <span className="text-sm" style={{ color: "var(--color-body)" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
