export interface Company {
  id: string;

  ownerId: string;

  name: string;

  logo: string;

  description: string;

  location: string;

  industry?: string;

  website?: string;

  verified: boolean;

  verificationRequested?: boolean;

  avgRating: number;

  reviewCount: number;

  createdAt?: string;

  subscription?: "free" | "premium";
}
