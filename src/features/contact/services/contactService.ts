import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { COLLECTIONS } from "@/constants/collections";
import type { ContactSchema } from "../schemas/contactSchema";

export const contactService = {
  async submit(data: ContactSchema) {
    return addDoc(collection(db, COLLECTIONS.CONTACTS), {
      ...data,
      createdAt: new Date().toISOString(),
      read: false,
    });
  },

  async getAll() {
    const q = query(
      collection(db, COLLECTIONS.CONTACTS),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
};
