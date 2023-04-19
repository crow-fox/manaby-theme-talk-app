import {
  createContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
  useContext,
} from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { timestampToDate } from "@/features/themes/lib";
import { isFirebaseTheme, type Theme } from "@/features/themes/types";
import { db } from "@/lib/firebase/client";

const defaultThemes: Theme[] = [];

const ThemesContext = createContext<Theme[]>(defaultThemes);

type Props = {
  children: ReactNode;
};

const ThemesProvider: FC<Props> = ({ children }) => {
  const [themes, setThemes] = useState<Theme[]>(defaultThemes);
  const user = useAuthUser();

  useEffect(() => {
    if (user === null) {
      setThemes([]);

      return;
    }

    if (user === undefined) {
      return;
    }

    const unsub = onSnapshot(
      query(
        collection(db, "users", user.id, "themes"),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const _themes: Theme[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (isFirebaseTheme(data)) {
            _themes.push({
              id: doc.id,
              title: data.title,
              talked: data.talked,
              createdAt: timestampToDate(data.createdAt),
              updatedAt: timestampToDate(data.updatedAt),
              user_id: data.user_id,
            });
          } else {
            throw new Error("firebaseからの返却値の値が不正");
          }
        });
        setThemes(_themes);
      }
    );

    return () => {
      unsub();
    };
  }, [user]);

  return (
    <ThemesContext.Provider value={themes}>{children}</ThemesContext.Provider>
  );
};

export default ThemesProvider;

export const useThemes = (): Theme[] => {
  const themes = useContext(ThemesContext);

  return themes;
};
