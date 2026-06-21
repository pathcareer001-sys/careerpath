import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { Company } from "@/types/company";

export const companyService = {
  async getCompanies() {
    const snapshot = await getDocs(collection(db, COLLECTIONS.COMPANIES));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Company[];
  },

  async getCompanyById(id: string) {
    const snapshot = await getDoc(doc(db, COLLECTIONS.COMPANIES, id));

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Company;
  },

  async getCompanyByOwnerId(ownerId: string) {
    const q = query(
      collection(db, COLLECTIONS.COMPANIES),
      where("ownerId", "==", ownerId),
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const company = snapshot.docs[0];

    return {
      id: company.id,
      ...company.data(),
    } as Company;
  },

  async createCompany(data: Omit<Company, "id">) {
    return addDoc(collection(db, COLLECTIONS.COMPANIES), data);
  },

  async updateCompany(id: string, data: Partial<Company>) {
    return updateDoc(doc(db, COLLECTIONS.COMPANIES, id), data);
  },

  async deleteCompany(id: string) {
    return deleteDoc(doc(db, COLLECTIONS.COMPANIES, id));
  },
};
