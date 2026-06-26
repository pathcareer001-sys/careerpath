export interface Report {
  id: string;
  type: "review" | "company" | "internship";
  targetId: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  description: string;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
}
