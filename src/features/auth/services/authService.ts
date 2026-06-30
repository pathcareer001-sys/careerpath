import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailLink,
  signOut,
  sendPasswordResetEmail,
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
      coverPhotoURL: "",
      createdAt: serverTimestamp(),
    });

    return credential;
  },

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  loginWithGoogle() {
    return signInWithRedirect(auth, googleProvider);
  },

  async handleGoogleRedirectResult() {
    const credential = await getRedirectResult(auth);
    if (!credential) return;

    const userRef = doc(db, COLLECTIONS.USERS, credential.user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        uid: credential.user.uid,
        name: credential.user.displayName || "",
        email: credential.user.email || "",
        role: "student",
        photoURL: credential.user.photoURL || "",
        coverPhotoURL: "",
        createdAt: serverTimestamp(),
      });
    }
  },

  logout() {
    return signOut(auth);
  },

  resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  },

  async signInWithEmailLink() {
    const email = localStorage.getItem("emailForSignIn");
    if (!email) throw new Error("Email not found for sign-in link.");
    const credential = await signInWithEmailLink(auth, email, window.location.href);
    localStorage.removeItem("emailForSignIn");
    return credential;
  },
};
