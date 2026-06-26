import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { AppUser } from "@/types/user";

export const profileService = {
  updateProfile(uid: string, data: Partial<AppUser>) {
    return updateDoc(doc(db, COLLECTIONS.USERS, uid), data);
  },
};
