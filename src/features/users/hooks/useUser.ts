import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/userService";

export function useUser(uid: string) {
  return useQuery({
    queryKey: ["user", uid],

    enabled: !!uid,

    queryFn: () => userService.getUser(uid),
  });
}
