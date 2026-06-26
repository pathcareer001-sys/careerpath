import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import type { AppUser } from "@/types/user";
import { toast } from "sonner";
import { ROLES } from "@/constants/roles";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  user: AppUser | null;
  open: boolean;
  onClose: () => void;
}

export default function EditUserDialog({ user, open, onClose }: Props) {
  const updateUser = useUpdateUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || ROLES.STUDENT);

  const handleSave = async () => {
    if (!user?.uid) {
      toast.error("Invalid user data");
      return;
    }
    try {
      await updateUser.mutateAsync({
        uid: user.uid,
        data: { name, email, role },
      });
      toast.success("User updated");
      onClose();
    } catch {
      toast.error("Failed to update user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-medium mb-6">Edit User</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <AppInput value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <AppInput value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <Select value={role} onValueChange={(value) => setRole(value as typeof role)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ROLES.STUDENT}>Student</SelectItem>
                <SelectItem value={ROLES.COMPANY}>Company</SelectItem>
                <SelectItem value={ROLES.STAFF}>Staff</SelectItem>
                <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <AppButton variant="secondary" onClick={onClose}>Cancel</AppButton>
            <AppButton onClick={handleSave} disabled={updateUser.isPending}>
              {updateUser.isPending ? "Saving..." : "Save"}
            </AppButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
