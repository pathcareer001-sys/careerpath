import { Building2, Briefcase, FileText } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import StatCard from "@/components/shared/StatCard";

export default function AdminDashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Admin Dashboard"
        description="Manage CareerPath platform"
      />

      <div
        className="
        grid
        gap-6
        md:grid-cols-3
        "
      >
        <StatCard title="Companies" value="0" icon={Building2} />

        <StatCard title="Internships" value="0" icon={Briefcase} />

        <StatCard title="Applications" value="0" icon={FileText} />
      </div>
    </PageContainer>
  );
}
