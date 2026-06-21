export interface Review {
  id: string;

  companyId: string;

  userId: string;

  userName: string;

  rating: number;

  review: string;

  createdAt?: string;
}