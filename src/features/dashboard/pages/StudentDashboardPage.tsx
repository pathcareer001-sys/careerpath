import { Briefcase, Bookmark, Building2, Search } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";

import StatCard from "@/components/shared/StatCard";
import EmptyState from "@/components/shared/EmptyState";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApplications } from "@/features/applications/hooks/useApplications";
import StatusBadge from "@/features/applications/components/StatusBadge";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { Link } from "react-router-dom";

export default function StudentDashboardPage() {
  const { user } = useAuth();

  const { applicationCount, bookmarkCount } = useDashboardStats(
    user?.uid || "",
  );

  const { data: applications } = useApplications(user?.uid || "");

  return (
    <PageContainer>
      <PageHeader
        title={`Welcome back, ${user?.name ?? "Student"} 👋`}
        description="Track your internship journey and career progress."
      />

      <div className="space-y-6">
        {/* Stats */}

        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          "
        >
          <StatCard
            title="Applications"
            value={applicationCount}
            icon={Briefcase}
          />

          <StatCard title="Bookmarks" value={bookmarkCount} icon={Bookmark} />
        </div>

        <AppCard>
          <h2
            className="
    text-lg
    font-semibold
    mb-4
    "
          >
            Quick Actions
          </h2>

          <div
            className="
    grid
    gap-4
    md:grid-cols-2
    "
          >
            <Link to="/companies">
              <div
                className="
              flex
              items-center
              gap-3
              p-4
              rounded-xl
              border
              border-slate-200
              hover:border-blue-500
              hover:bg-blue-50
              transition-all
              duration-200
              "
              >
                <Building2 size={20} />
                Explore Companies
              </div>
            </Link>

            <Link to="/internships">
              <div
                className="
              flex
              items-center
              gap-3
              p-4
              rounded-xl
              border
              border-slate-200
              hover:border-blue-500
              hover:bg-blue-50
              transition-all
              duration-200
              "
              >
                <Search size={20} />
                Find Internships
              </div>
            </Link>
          </div>
        </AppCard>

        {/* Recent Applications */}

        <AppCard>
          <h2
            className="
            text-lg
            font-semibold
            mb-4
            "
          >
            Recent Applications
          </h2>

          {applications?.length === 0 ? (
            <EmptyState
              title="No Applications"
              description="Start applying to internships"
            />
          ) : (
            <div className="space-y-4">
              {applications?.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-100
                    pb-4
                    "
                >
                  <div>
                    <p className="font-medium">{item.internshipTitle}</p>

                    <p className="text-sm text-slate-500">{item.companyName}</p>
                  </div>

                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </PageContainer>
  );
}
