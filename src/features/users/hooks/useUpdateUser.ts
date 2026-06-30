import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uid, data }: { uid: string; data: object }) =>
      userService.updateUser(uid, data),
    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["users"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["user"] }); } catch {}
    },
  });
}
