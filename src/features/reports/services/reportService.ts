import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { COLLECTIONS } from "@/constants/collections";
import type { Report } from "@/types/report";

export const reportService = {
  async createReport(data: Omit<Report, "id">) {
    return addDoc(collection(db, COLLECTIONS.REPORTS), data);
  },

  async getReports() {
    const q = query(
      collection(db, COLLECTIONS.REPORTS),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Report[];
  },

  async updateReportStatus(id: string, status: Report["status"]) {
    return updateDoc(doc(db, COLLECTIONS.REPORTS, id), { status });
  },
};
