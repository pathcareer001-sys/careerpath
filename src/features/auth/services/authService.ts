import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

import { auth } from "@/firebase/auth";
import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";
import type { Role } from "@/constants/roles";

const googleProvider = new GoogleAuthProvider();

export const authService = {
  async register(name: string, email: string, password: string, role: Role) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await setDoc(doc(db, COLLECTIONS.USERS, credential.user.uid), {
      uid: credential.user.uid,
      name,
      email,
      role,
      photoURL: "",
      createdAt: serverTimestamp(),
    });

    return credential;
  },

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  async loginWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider);

    const userRef = doc(db, COLLECTIONS.USERS, credential.user.uid);

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        uid: credential.user.uid,
        name: credential.user.displayName || "",
        email: credential.user.email || "",
        role: "student",
        photoURL: credential.user.photoURL || "",
        createdAt: serverTimestamp(),
      });
    }

    return credential;
  },

  logout() {
    return signOut(auth);
  },
};
