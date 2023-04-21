import { useState, type FC } from "react";
import AddThemeDialog from "@/features/themes/AddThemeDialog";
import DeleteThemeDialog from "@/features/themes/DeleteThemeDialog";
import ThemeTable from "@/features/themes/ThemeTable";
import { useThemes } from "@/features/themes/ThemesProvider";
import { type Theme } from "@/features/themes/types";

const ThemeDashBoard: FC = () => {
  const themes = useThemes();
  const hasThemes = themes.length > 0;
  const [themeStatus, setThemeStatus] = useState<
    "read" | "add" | "edit" | "delete"
  >("read");
  const [deleteTheme, setDeleteTheme] = useState<Theme | null>(null);
  const [themesFilter, setThemesFilter] = useState<
    "all" | "talked" | "untalked"
  >("all");
  const filterdThemes =
    themesFilter === "all"
      ? themes
      : themesFilter === "talked"
      ? themes.filter((theme) => theme.talked)
      : themes.filter((theme) => !theme.talked);

  const handleAdd = () => {
    setThemeStatus("add");
  };

  const handleDelete = (theme: Theme) => {
    setThemeStatus("delete");
    setDeleteTheme(theme);
  };

  const handleDeleteClose = () => {
    setThemeStatus("read");
    setDeleteTheme(null);
  };

  return (
    <>
      <div className="grid place-items-end">
        <div className="flex flex-wrap items-center gap-2">
          <AddThemeDialog />

          <button className="rounded-md border-2 border-blue-400 bg-white  px-4 py-2 font-bold">
            <span>絞り込み</span>
            <span className="ml-2">↓</span>
          </button>
          <div className="">
            <ul>
              <li>
                <button
                  onClick={() => {
                    setThemesFilter("all");
                  }}
                >
                  全て
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setThemesFilter("talked");
                  }}
                >
                  話したものだけ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setThemesFilter("untalked");
                  }}
                >
                  話してないものだけ
                </button>
              </li>
            </ul>
          </div>
          <button className="rounded-md border-2 border-blue-400 bg-white  px-4 py-2 font-bold">
            <span>一括操作</span>
            <span className="ml-2">↓</span>
          </button>
          <div className="hidden">
            <h3>選択中のトークテーマ全てに対して一括で操作します</h3>
            <ul>
              <li>
                <button>全て削除する</button>
              </li>
              <li>
                <button>全て話した状態にする</button>
              </li>
              <li>
                <button>全て話してない状態にする</button>
              </li>
            </ul>
          </div>
          <button className="rounded-md border-2 border-blue-400 bg-white  px-4 py-2 font-bold">
            印刷
          </button>
        </div>
      </div>

      <div className="mt-4">
        {hasThemes ? (
          <ThemeTable themes={filterdThemes} handleDelete={handleDelete} />
        ) : (
          <div className="grid place-items-center py-4 ">
            <button onClick={handleAdd}>新規追加</button>
          </div>
        )}
      </div>

      {themeStatus === "delete" && deleteTheme && (
        <DeleteThemeDialog
          key={deleteTheme.id}
          themeId={deleteTheme.id}
          title={deleteTheme.title}
          talked={deleteTheme.talked}
          close={handleDeleteClose}
        />
      )}
    </>
  );
};

export default ThemeDashBoard;
