import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";

import { useDeleteUser } from "@/features/users/hooks/useDeleteUser";

import EmptyState from "@/components/shared/EmptyState";

import { toast } from "sonner";
import { useUsers } from "@/features/users/hooks/useUsers";

export default function UserManagePage() {
  const { data: users } = useUsers();

  const deleteUser = useDeleteUser();

  const handleDelete = async (uid: string) => {
    if (!confirm("Delete user?")) return;

    await deleteUser.mutateAsync(uid);

    toast.success("User deleted");
  };

  return (
    <PageContainer>
      <PageHeader title="User Management" description="Manage platform users" />

      {!users?.length ? (
        <EmptyState title="No Users" description="Users will appear here" />
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <AppCard key={user.uid}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{user.name}</h3>

                  <p className="text-sm text-slate-500">{user.email}</p>

                  <p className="text-sm text-blue-600">{user.role}</p>
                </div>

                <AppButton onClick={() => handleDelete(user.uid)}>
                  Delete
                </AppButton>
              </div>
            </AppCard>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
