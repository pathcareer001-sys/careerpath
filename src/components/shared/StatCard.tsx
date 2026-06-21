import AppCard from "@/components/common/AppCard";

import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: Props) {
  return (
    <AppCard>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="text-2xl font-bold">{value}</h3>
        </div>

        <Icon size={24} className="text-blue-600" />
      </div>
    </AppCard>
  );
}
