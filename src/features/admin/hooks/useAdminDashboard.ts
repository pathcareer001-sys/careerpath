import { useQuery } from "@tanstack/react-query";

import { companyService } from "@/features/companies/services/companyService";
import { internshipService } from "@/features/internships/services/internshipService";
import { applicationService } from "@/features/applications/services/applicationService";
import { userService } from "@/features/users/services/userService";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin-dashboard"],

    queryFn: async () => {
      const [users, companies, internships, applications] = await Promise.all([
        userService.getUsers(),
        companyService.getCompanies(),
        internshipService.getInternships(),
        applicationService.getAllApplications(),
      ]);

      return {
        totalUsers: users.length,

        totalCompanies: companies.length,

        totalInternships: internships.length,

        totalApplications: applications.length,

        pendingVerification: companies.filter((company) => !company.verified)
          .length,
      };
    },
  });
}
