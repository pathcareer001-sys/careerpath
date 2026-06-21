import { useQuery } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useInternships() {
  return useQuery({
    queryKey: ["internships"],

    queryFn: () => internshipService.getInternships(),
  });
}
