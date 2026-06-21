import { useQuery } from "@tanstack/react-query";
import { companyService } from "../services/companyService";

export function useCompany(id: string) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () =>
      companyService.getCompanyById(id),
    enabled: !!id,
  });
}