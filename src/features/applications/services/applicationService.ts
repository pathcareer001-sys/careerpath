import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { Application } from "@/types/application";

export const applicationService = {
  async getApplications(applicantId: string) {
    const q = query(
      collection(db, COLLECTIONS.APPLICATIONS),
      where("applicantId", "==", applicantId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
  },

  async createApplication(data: Omit<Application, "id">) {
    const q = query(
      collection(db, COLLECTIONS.APPLICATIONS),

      where("applicantId", "==", data.applicantId),

      where("internshipId", "==", data.internshipId),
    );

    const existing = await getDocs(q);

    if (!existing.empty) {
      throw new Error("Already applied");
    }

    return addDoc(collection(db, COLLECTIONS.APPLICATIONS), data);
  },

  async updateApplicationStatus(id: string, status: string) {
    return updateDoc(doc(db, COLLECTIONS.APPLICATIONS, id), {
      status,
    });
  },

  async getAllApplications() {
    const snapshot = await getDocs(collection(db, COLLECTIONS.APPLICATIONS));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
  },

  async getCompanyApplications(companyId: string) {
    const q = query(
      collection(db, COLLECTIONS.APPLICATIONS),

      where("companyId", "==", companyId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
  },
};
