export const ROLES = {
  STUDENT: "student",
  COMPANY: "company",
  ADMIN: "admin",
  STAFF: "staff",
} as const;

export type Role =
  (typeof ROLES)[keyof typeof ROLES];