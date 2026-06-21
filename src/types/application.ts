export interface Application {
  id: string;

  internshipId: string;

  internshipTitle: string;

  companyId: string;

  companyName: string;

  applicantId: string;

  applicantName: string;

  applicantEmail: string;

  status: "pending" | "reviewed" | "accepted" | "rejected";

  createdAt?: string;
}
