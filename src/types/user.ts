import type { Role } from "@/constants/roles";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: Role;

  photoURL?: string;

  university?: string;
  major?: string;
  location?: string;
  bio?: string;

  skills?: string[];

  resumeUrl?: string;

  linkedin?: string;
  github?: string;
  portfolio?: string;

  createdAt: string;
}
