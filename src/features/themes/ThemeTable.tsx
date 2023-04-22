import { type FC } from "react";
import AddThemeDialog from "@/features/themes/AddThemeDialog";
import ThemeItem from "@/features/themes/ThemeItem";
import { type Theme } from "@/features/themes/types";

type Props = {
  themes: Theme[];
};

const ThemeTable: FC<Props> = ({ themes }) => {
  const hasThemes = themes.length > 0;

  return (
    <>
      {hasThemes ? (
        <div className="min-w-[40rem] bg-white">
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
                <ThemeItem key={theme.id} {...theme} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid place-items-center gap-y-2 py-4 ">
          <p>トークテーマがありません</p>
          <p>トークテーマを追加してください</p>
          <AddThemeDialog />
        </div>
      )}
    </>
  );
};

export default ThemeTable;
