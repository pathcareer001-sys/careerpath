import { useMemo, useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import EditUserDialog from "@/features/users/components/EditUserDialog";
import VerifiedBadge from "@/components/company/VerifiedBadge";
import { useDeleteUser } from "@/features/users/hooks/useDeleteUser";
import { useUsers } from "@/features/users/hooks/useUsers";
import EmptyState from "@/components/shared/EmptyState";
import { toast } from "sonner";
import type { AppUser } from "@/types/user";

export default function UserManagePage() {
  const { data: users } = useUsers();
  const deleteUser = useDeleteUser();
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);

  const sortedUsers = useMemo(
    () =>
      users?.slice().sort((a, b) => {
        if (a.subscription === "premium" && b.subscription !== "premium") return -1;
        if (a.subscription !== "premium" && b.subscription === "premium") return 1;
        return 0;
      }),
    [users],
  );

  const handleDelete = async (uid: string) => {
    if (!confirm("Hapus pengguna?")) return;
    await deleteUser.mutateAsync(uid);
    toast.success("Pengguna dihapus");
  };

  return (
    <PageContainer>
      <PageHeader title="Manajemen Pengguna" description="Kelola pengguna platform" />

      <EditUserDialog
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
      />

      {!users?.length ? (
        <EmptyState title="Tidak Ada Pengguna" description="Pengguna akan muncul di sini" />
      ) : (
        <div className="space-y-4 animate-fade-in-up">
          {sortedUsers.map((user) => (
            <AppCard key={user.uid}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full shrink-0 overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
                        {user.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                    <div>
                      <h3 className="font-medium text-heading">{user.name}</h3>
                      <p className="text-sm text-secondary-text">{user.email}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-primary">
                          {user.role}
                        </span>
                        {user.subscription === "premium" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                            Premium
                            <VerifiedBadge show size={12} />
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                </div>
                <div className="flex gap-2">
                  <AppButton onClick={() => setEditingUser(user)}>Ubah</AppButton>
                  <AppButton variant="danger" onClick={() => handleDelete(user.uid)}>Hapus</AppButton>
                </div>
              </div>
            </AppCard>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
