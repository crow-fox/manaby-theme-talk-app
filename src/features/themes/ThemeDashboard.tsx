import { useState, type FC } from "react";
import AddThemeDialog from "@/features/themes/AddThemeDialog";
import DeleteThemeDialog from "@/features/themes/DeleteThemeDialog";
import EditThemeDialog from "@/features/themes/EditThemeDialog";
import ThemeTable from "@/features/themes/ThemeTable";
import { type Theme } from "@/features/themes/types";

const ThemeDashBoard: FC = () => {
  const [editTheme, setEditTheme] = useState<Theme | null>(null);
  const [deleteTheme, setDeleteTheme] = useState<Theme | null>(null);

  const handleEdit = (theme: Theme) => {
    setEditTheme(theme);
  };

  const resetEditTheme = () => {
    setEditTheme(null);
  };

  const handleDelete = (theme: Theme) => {
    setDeleteTheme(theme);
  };

  const resetDeleteTheme = () => {
    setDeleteTheme(null);
  };

  return (
    <>
      <AddThemeDialog />
      <ThemeTable handleEdit={handleEdit} handleDelete={handleDelete} />
      {editTheme && (
        <EditThemeDialog
          key={editTheme.id}
          themeId={editTheme.id}
          title={editTheme.title}
          talked={editTheme.talked}
          handleClose={resetEditTheme}
        />
      )}
      {deleteTheme && (
        <DeleteThemeDialog
          key={deleteTheme.id}
          themeId={deleteTheme.id}
          title={deleteTheme.title}
          talked={deleteTheme.talked}
          resetDeleteTheme={resetDeleteTheme}
        />
      )}
    </>
  );
};

export default ThemeDashBoard;
