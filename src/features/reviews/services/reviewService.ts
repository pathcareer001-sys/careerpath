import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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
    const existingReviewQuery = query(
      collection(db, COLLECTIONS.REVIEWS),
      where("companyId", "==", data.companyId),
      where("userId", "==", data.userId),
    );

    const existingReview = await getDocs(existingReviewQuery);

    if (!existingReview.empty) {
      throw new Error("You already reviewed this company");
    }
    const docRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), data);

    reviewService.updateCompanyRating(data.companyId).catch(() => {});

    return docRef;
  },

  async updateCompanyRating(companyId: string) {
    const reviews = await reviewService.getCompanyReviews(companyId);

    const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);

    const avgRating =
      reviews.length > 0
        ? Number((totalRating / reviews.length).toFixed(1))
        : 0;
    await companyService.updateCompany(companyId, {
      avgRating,
      reviewCount: reviews.length,
    });
  },

  async getAllReviews() {
    const snapshot = await getDocs(collection(db, COLLECTIONS.REVIEWS));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  },

  async deleteReview(id: string) {
    return deleteDoc(doc(db, COLLECTIONS.REVIEWS, id));
  },

  async updateReviewModeration(id: string, moderationStatus: Review["moderationStatus"]) {
    return updateDoc(doc(db, COLLECTIONS.REVIEWS, id), { moderationStatus });
  },
};
