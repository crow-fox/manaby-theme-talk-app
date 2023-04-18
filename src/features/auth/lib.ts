import {
  GoogleAuthProvider,
  type UserCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export const login = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();

  return await signInWithPopup(auth, provider);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};
