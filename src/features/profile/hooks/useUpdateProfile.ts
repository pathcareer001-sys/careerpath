import { useMutation } from "@tanstack/react-query";

import { profileService } from "../services/profileService";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: ({
      uid,
      data,
    }: {
      uid: string;
      data: Record<string, unknown>;
    }) => profileService.updateProfile(uid, data),
  });
}
