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

  // General Information
  category?: string;
  employmentType?: string;
  workMode?: string;

  // Requirements
  minEducation?: string;
  experienceLevel?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
  languageRequirement?: string;

  // Job Details
  salaryMin?: string;
  salaryMax?: string;
  numberOfOpenings?: number;
  workingHours?: string;
  responsibilities?: string;
  benefits?: string;
}
