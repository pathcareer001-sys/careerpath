import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import EditUserDialog from "@/features/users/components/EditUserDialog";
import { useDeleteUser } from "@/features/users/hooks/useDeleteUser";
import { useUsers } from "@/features/users/hooks/useUsers";
import EmptyState from "@/components/shared/EmptyState";
import { toast } from "sonner";
import type { AppUser } from "@/types/user";

export default function UserManagePage() {
  const { data: users } = useUsers();
  const deleteUser = useDeleteUser();
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);

  const handleDelete = async (uid: string) => {
    if (!confirm("Delete user?")) return;
    await deleteUser.mutateAsync(uid);
    toast.success("User deleted");
  };

  return (
    <PageContainer>
      <PageHeader title="User Management" description="Manage platform users" />

      <EditUserDialog
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
      />

      {!users?.length ? (
        <EmptyState title="No Users" description="Users will appear here" />
      ) : (
        <div className="space-y-4 animate-fade-in-up">
          {users.map((user) => (
            <AppCard key={user.uid}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-sm font-medium shrink-0">
                    {user.name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <h3 className="font-medium text-heading">{user.name}</h3>
                    <p className="text-sm text-secondary-text">{user.email}</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-primary mt-1">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AppButton onClick={() => setEditingUser(user)}>Edit</AppButton>
                  <AppButton variant="danger" onClick={() => handleDelete(user.uid)}>Delete</AppButton>
                </div>
              </div>
            </AppCard>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
