import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { Review } from "@/types/review";

export const reviewService = {
  async getCompanyReviews(
  companyId: string
) {
  console.log("SEARCHING:", companyId);

  const q = query(
    collection(
      db,
      COLLECTIONS.REVIEWS
    ),
    where(
      "companyId",
      "==",
      companyId
    )
  );

  const snapshot =
    await getDocs(q);

  console.log(
    "FOUND:",
    snapshot.docs.length
  );

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Review[];
},

  async createReview(
    data: Omit<Review, "id">
  ) {
    return addDoc(
      collection(
        db,
        COLLECTIONS.REVIEWS
      ),
      data
    );
  },

  
};