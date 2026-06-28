export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhotoURL?: string;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected" | "withdrawn";
  interviewDate?: string;
  interviewLocation?: string;
  createdAt: string;
}
