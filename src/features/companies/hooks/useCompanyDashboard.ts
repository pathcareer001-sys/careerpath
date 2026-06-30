import { useQuery } from "@tanstack/react-query";

import { internshipService } from "@/features/internships/services/internshipService";
import { applicationService } from "@/features/applications/services/applicationService";
import { companyService } from "@/features/companies/services/companyService";
import { reviewService } from "@/features/reviews/services/reviewService";

export function useCompanyDashboard(ownerId: string) {
  return useQuery({
    queryKey: ["company-dashboard", ownerId],

    enabled: !!ownerId,

    queryFn: async () => {
      try {
        const company = await companyService.getCompanyByOwnerId(ownerId);

        if (!company) {
          return {
            internships: [],
            applications: [],
            reviews: [],
            internshipPerformance: [],
            totalInternships: 0,
            totalApplicants: 0,
            pendingApplicants: 0,
            acceptedApplicants: 0,
            rejectedApplicants: 0,
          };
        }

        const internships =
          await internshipService.getCompanyInternships(ownerId);

        const applications = await applicationService.getCompanyApplications(
          company.id,
        );
        const reviews = await reviewService.getCompanyReviews(company.id);
        const internshipPerformance = internships
          .map((internship) => ({
            ...internship,

            applicants: applications.filter(
              (item) => item.internshipId === internship.id,
            ).length,
          }))
          .sort((a, b) => b.applicants - a.applicants);
        return {
          internships,
          applications,
          reviews,
          internshipPerformance,
          totalInternships: internships.length,

          totalApplicants: applications.length,

          pendingApplicants: applications.filter(
            (item) => item.status === "pending",
          ).length,

          acceptedApplicants: applications.filter(
            (item) => item.status === "accepted",
          ).length,
          rejectedApplicants: applications.filter(
            (item) => item.status === "rejected",
          ).length,
        };
      } catch (error) {
        console.error("Company dashboard error:", error);
        return {
          internships: [],
          applications: [],
          reviews: [],
          internshipPerformance: [],
          totalInternships: 0,
          totalApplicants: 0,
          pendingApplicants: 0,
          acceptedApplicants: 0,
          rejectedApplicants: 0,
        };
      }
    },
  });
}
