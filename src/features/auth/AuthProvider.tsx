import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase/client";

type AppUser = {
  id: string;
  name: string;
  email: string;
};

const isAppUser = (value: unknown): value is AppUser => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  if (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  ) {
    return true;
  } else {
    return false;
  }
};

type AuthUser = AppUser | undefined | null;

const initAuthUser: AuthUser = undefined;

const AuthContext = createContext<AuthUser>(initAuthUser);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser>(initAuthUser);
  console.log(authUser);

  useEffect(() => {
    console.log("useEffect");
    const unsub = onAuthStateChanged(auth, async (_authUser) => {
      if (_authUser) {
        console.log(_authUser);
        // ユーザーがログインした場合
        const ref = doc(db, "users", _authUser.uid);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
          // すでにユーザーがusers/{uid}に存在していた場合
          // そのユーザーのデータを取得して、authUserにセット
          const data = docSnap.data();
          if (isAppUser(data)) {
            console.log("test");
            const appUser = data;

            setAuthUser({
              id: appUser.id,
              name: appUser.name ?? "",
              email: appUser.email ?? "",
            });
          } else {
            console.log({ data });
            throw new Error("ユーザーの型がただしくないよerror");
          }
        } else {
          // ユーザーがuser/{uid}に存在していなかった場合
          // そのユーザーのデータをusers/{uid}に作成してから、authUserにセット
          const appUser: AppUser = {
            id: _authUser.uid,
            name: _authUser.displayName ?? "",
            email: _authUser.email ?? "",
          };
          await setDoc(doc(db, "users", _authUser.uid), appUser);
          setAuthUser(appUser);
        }
      } else {
        // ユーザーがログアウトした場合
        setAuthUser(null);
      }
    });

    return () => {
      unsub();
      console.log("useEffect clear");
    };
  }, []);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthUser = (): AuthUser => {
  const user = useContext(AuthContext);

  return user;
};
