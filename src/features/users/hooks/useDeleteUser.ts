import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "../services/userService";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uid: string) => userService.deleteUser(uid),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
