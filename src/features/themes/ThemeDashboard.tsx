import { useState, type FC } from "react";
import AddThemeDialog from "@/features/themes/AddThemeDialog";
import DeleteThemeDialog from "@/features/themes/DeleteThemeDialog";
import EditThemeDialog from "@/features/themes/EditThemeDialog";
import ThemeTable from "@/features/themes/ThemeTable";
import { type Theme } from "@/features/themes/types";

const ThemeDashBoard: FC = () => {
  const [themeStatus, setThemeStatus] = useState<
    "read" | "add" | "edit" | "delete"
  >("read");
  const [editTheme, setEditTheme] = useState<Theme | null>(null);
  const [deleteTheme, setDeleteTheme] = useState<Theme | null>(null);

  const handleAdd = () => {
    setThemeStatus("add");
  };

  const handleAddClose = () => {
    setThemeStatus("read");
  };

  const handleEdit = (theme: Theme) => {
    setThemeStatus("edit");
    setEditTheme(theme);
  };

  const handleEditClose = () => {
    setThemeStatus("read");
    setEditTheme(null);
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
      <button onClick={handleAdd}>新規追加</button>
      {themeStatus === "add" && <AddThemeDialog close={handleAddClose} />}

      <ThemeTable
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {themeStatus === "edit" && editTheme && (
        <EditThemeDialog
          key={editTheme.id}
          themeId={editTheme.id}
          title={editTheme.title}
          talked={editTheme.talked}
          close={handleEditClose}
        />
      )}

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
