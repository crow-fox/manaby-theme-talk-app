import {
  type DocumentReference,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export const createTheme = async (
  userId: string,
  title: string
): Promise<DocumentReference> => {
  return await addDoc(collection(db, "users", userId, "themes"), {
    user_id: userId,
    title,
    talked: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateTheme = async (
  userId: string,
  themeId: string,
  updateData: {
    title?: string;
    talked?: boolean;
  }
): Promise<void> => {
  const themeRef = doc(db, "users", userId, "themes", themeId);

  await updateDoc(themeRef, {
    ...updateData,
    updatedAt: serverTimestamp(),
  });
};

export const timestampToDate = (timestamp: {
  seconds: number;
  nanoseconds: number;
}): Date => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  return date;
};
