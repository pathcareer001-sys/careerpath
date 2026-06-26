import {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { Internship } from "@/types/internship";

export const internshipService = {
  async getInternships() {
    const snapshot = await getDocs(collection(db, COLLECTIONS.INTERNSHIPS));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Internship[];
  },

  async getInternshipById(id: string): Promise<Internship | null> {
    const snapshot = await getDoc(doc(db, COLLECTIONS.INTERNSHIPS, id));

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Internship;
  },

  async createInternship(data: Omit<Internship, "id">) {
    return addDoc(collection(db, COLLECTIONS.INTERNSHIPS), data);
  },

  async updateInternship(id: string, data: Partial<Internship>) {
    return updateDoc(doc(db, COLLECTIONS.INTERNSHIPS, id), data);
  },

  async deleteInternship(id: string) {
    return deleteDoc(doc(db, COLLECTIONS.INTERNSHIPS, id));
  },

  async getCompanyInternships(ownerId: string): Promise<Internship[]> {
    const q = query(
      collection(db, COLLECTIONS.INTERNSHIPS),
      where("ownerId", "==", ownerId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Internship[];
  },

  async getInternshipsByCompanyId(companyId: string): Promise<Internship[]> {
    const q = query(
      collection(db, COLLECTIONS.INTERNSHIPS),
      where("companyId", "==", companyId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Internship[];
  },
};
