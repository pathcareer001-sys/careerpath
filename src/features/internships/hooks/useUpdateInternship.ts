import { useMutation } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";
import type { Internship } from "@/types/internship";

export function useUpdateInternship() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;

      data: Partial<Internship>;
    }) => internshipService.updateInternship(id, data),
  });
}
