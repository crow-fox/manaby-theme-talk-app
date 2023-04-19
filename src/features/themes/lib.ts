import {
  type DocumentReference,
  addDoc,
  collection,
  serverTimestamp,
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

export const timestampToDate = (timestamp: {
  seconds: number;
  nanoseconds: number;
}): Date => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  return date;
};
