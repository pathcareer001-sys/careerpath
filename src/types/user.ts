import type { Role } from "@/constants/roles";

export interface AppUser {
  uid: string;

  name: string;

  email: string;

  photoURL?: string;

  role: Role;

  createdAt: string;
}
