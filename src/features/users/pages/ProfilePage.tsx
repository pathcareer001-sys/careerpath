import { User, Mail, Briefcase, Bookmark } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";

import StatCard from "@/components/shared/StatCard";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApplications } from "@/features/applications/hooks/useApplications";
import { useBookmarks } from "@/features/bookmarks/hooks/useBookmarks";

export default function ProfilePage() {
  const { user } = useAuth();

  const { data: applications } = useApplications(user?.uid || "");

  const { data: bookmarks } = useBookmarks(user?.uid || "");

  return (
    <PageContainer>
      <PageHeader
        title="Profile"
        description="Manage your account information."
      />

      <div className="space-y-6">
        <AppCard>
          <div className="flex items-center gap-4">
            <div
              className="
              w-16
              h-16
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              "
            >
              <User size={28} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {user?.name || "Student"}
              </h2>

              <p className="text-slate-500">{user?.email}</p>
            </div>
          </div>
        </AppCard>

        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          "
        >
          <StatCard
            title="Applications"
            value={applications?.length || 0}
            icon={Briefcase}
          />

          <StatCard
            title="Bookmarks"
            value={bookmarks?.length || 0}
            icon={Bookmark}
          />
        </div>

        <AppCard>
          <h2
            className="
            text-lg
            font-semibold
            mb-4
            "
          >
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-slate-500" />

              <div>
                <p className="text-sm text-slate-500">Display Name</p>

                <p className="font-medium">{user?.name || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-slate-500" />

              <div>
                <p className="text-sm text-slate-500">Email</p>

                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>
        </AppCard>
      </div>
    </PageContainer>
  );
}
