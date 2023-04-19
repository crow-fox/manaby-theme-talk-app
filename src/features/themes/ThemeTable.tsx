import { type FC } from "react";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { useThemes } from "@/features/themes/ThemesProvider";
import { type Theme } from "@/features/themes/types";

type Props = {
  handleAdd: () => void;
  handleEdit: (theme: Theme) => void;
  handleDelete: (theme: Theme) => void;
};

const ThemeTable: FC<Props> = ({ handleAdd, handleEdit, handleDelete }) => {
  const user = useAuthUser();
  const themes = useThemes();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="min-w-[40rem] bg-white">
        {themes.length !== 0 ? (
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
                          type="button"
                          onClick={() => {
                            handleEdit(theme);
                          }}
                          className="rounded-md bg-gray-600 p-2 text-white "
                        >
                          編集
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(theme);
                          }}
                          className="rounded-md bg-red-500 p-2 text-white "
                        >
                          削除
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid place-items-center py-4 ">
            <button onClick={handleAdd}>新規追加</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ThemeTable;
