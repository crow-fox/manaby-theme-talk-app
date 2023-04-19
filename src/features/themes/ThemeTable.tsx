import { useEffect, useState, type FC } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { timestampToDate } from "@/features/themes/lib";
import { isFirebaseTheme, type Theme } from "@/features/themes/types";
import { db } from "@/lib/firebase/client";

type Props = {
  handleEdit: (theme: Theme) => void;
};

const ThemeTable: FC<Props> = ({ handleEdit }) => {
  const user = useAuthUser();
  const [themes, setThemes] = useState<Theme[]>([]);

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

  if (!user) {
    return null;
  }

  return (
    <>
      {themes.length !== 0 && (
        <div className="min-w-[40rem]">
          <table className="w-full border-collapse text-left">
            <thead className=" sticky left-0 top-0 w-full  border  border-gray-600">
              <tr className=" flex w-full bg-gray-500 p-4  text-white ">
                <th className="flex-[0_1_6rem] ">話した？</th>
                <th className="flex-[1_0_auto]">トークテーマ</th>
                <th className="flex-[0_1_8rem] ">操作</th>
              </tr>
            </thead>
            <tbody className=" border  border-t-0 border-gray-600">
              {themes.map((theme) => (
                <tr
                  key={theme.id}
                  className=" flex w-full border-t border-gray-600 bg-white p-4 py-2 first:border-t-0"
                >
                  <td className="flex-[0_1_6rem]">
                    <p className="mt-2">{theme.talked ? "話した" : "まだ"}</p>
                  </td>
                  <td className="flex-[1_0_auto]">
                    <p className="mt-2">{theme.title}</p>
                  </td>
                  <td className="flex-[0_1_8rem] ">
                    <ul className="flex gap-x-4 ">
                      <li>
                        <button
                          onClick={() => {
                            handleEdit(theme);
                          }}
                          className="rounded-md bg-gray-600 p-2 text-white "
                        >
                          編集
                        </button>
                      </li>
                      <li>
                        <button className="rounded-md bg-red-500 p-2 text-white ">
                          削除
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ThemeTable;
