import type { Timestamp } from "firebase/firestore";

export interface Internship {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  ownerId: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  deadline: string;
  salary?: string;
  status?: "draft" | "published";
  createdAt?: Timestamp;
}
