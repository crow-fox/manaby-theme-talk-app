import { useState, type FC } from "react";
import AddThemeDialog from "@/features/themes/AddThemeDialog";
import EditThemeDialog from "@/features/themes/EditThemeDialog";
import ThemeTable from "@/features/themes/ThemeTable";
import { type Theme } from "@/features/themes/types";

const ThemeDashBoard: FC = () => {
  const [editTheme, setEditTheme] = useState<Theme | null>(null);

  const handleEdit = (theme: Theme) => {
    setEditTheme(theme);
  };

  const resetEditTheme = () => {
    setEditTheme(null);
  };

  return (
    <>
      <AddThemeDialog />
      <ThemeTable handleEdit={handleEdit} />
      {editTheme && (
        <EditThemeDialog
          key={editTheme.id}
          themeId={editTheme.id}
          title={editTheme.title}
          talked={editTheme.talked}
          handleClose={resetEditTheme}
        />
      )}
    </>
  );
};

export default ThemeDashBoard;
