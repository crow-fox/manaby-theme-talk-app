export type Theme = {
  id: string;
  title: string;
  talked: boolean;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
};

export type FirebaseTheme = {
  title: string;
  talked: boolean;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
  user_id: string;
};

export const isFirebaseTheme = (value: unknown): value is FirebaseTheme => {
  console.log({ value });
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;

  if (
    typeof obj.title !== "string" ||
    typeof obj.talked !== "boolean" ||
    typeof obj.user_id !== "string"
  ) {
    return false;
  }

  if (typeof obj.createdAt !== "object" || obj.createdAt === null) return false;
  if (typeof obj.updatedAt !== "object" || obj.updatedAt === null) return false;

  const createdAt = obj.createdAt as Record<string, unknown>;
  const updatedAt = obj.updatedAt as Record<string, unknown>;

  if (
    typeof createdAt.seconds === "number" &&
    typeof createdAt.nanoseconds === "number" &&
    typeof updatedAt.seconds === "number" &&
    typeof updatedAt.nanoseconds === "number"
  ) {
    return true;
  } else {
    return false;
  }
};
