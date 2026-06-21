import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { Review } from "@/types/review";

import { companyService } from "@/features/companies/services/companyService";
export const reviewService = {
  async getCompanyReviews(companyId: string) {
    console.log("SEARCHING:", companyId);

    const q = query(
      collection(db, COLLECTIONS.REVIEWS),
      where("companyId", "==", companyId),
    );

    const snapshot = await getDocs(q);

    console.log("FOUND:", snapshot.docs.length);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  },

  async createReview(data: Omit<Review, "id">) {
    await addDoc(collection(db, COLLECTIONS.REVIEWS), data);

    const reviews = await reviewService.getCompanyReviews(data.companyId);

    const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);

    const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    await companyService.updateCompany(data.companyId, {
      avgRating,
      reviewCount: reviews.length,
    });
  },
};
