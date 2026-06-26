import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  pending: number;
  accepted: number;
  rejected: number;
}

export default function CompanyAnalyticsChart({
  pending,
  accepted,
  rejected,
}: Props) {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Accepted",
      value: accepted,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
