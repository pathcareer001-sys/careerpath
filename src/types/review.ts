export interface Review {
  id: string;

  companyId: string;

  userId: string;

  userName: string;
  userPhotoURL?: string;

  rating: number;

  review: string;

  createdAt?: string;

  moderationStatus?: "pending" | "approved" | "rejected";
}