import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reportService } from "../services/reportService";
import type { Report } from "@/types/report";

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Report["status"] }) =>
      reportService.updateReportStatus(id, status),
    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["reports"] }); } catch {}
    },
  });
}
