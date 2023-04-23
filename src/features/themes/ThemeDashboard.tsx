import { useState, type FC } from "react";
import AddThemeDialog from "@/features/themes/AddThemeDialog";
import FilterThemes from "@/features/themes/FilterThemes";
import PrintThemes from "@/features/themes/PrintThemes";
import ThemeTable from "@/features/themes/ThemeTable";
import { useThemes } from "@/features/themes/ThemesProvider";
import { type ThemeFilter } from "@/features/themes/types";

const ThemeDashBoard: FC = () => {
  const themes = useThemes();
  const [filter, setFilter] = useState<ThemeFilter>("all");
  const filteredThemes = themes.filter((theme) => {
    switch (filter) {
      case "all": {
        return true;
      }
      case "talked": {
        return theme.talked;
      }
      case "untalked": {
        return !theme.talked;
      }
      default: {
        const _: never = filter;
        throw new Error("unknown filter");
      }
    }
  });

  return (
    <>
      <div className="grid place-items-end">
        <div className="flex flex-wrap items-center gap-2">
          <div>
            <AddThemeDialog />
          </div>
          <div>
            <FilterThemes filter={filter} handleFilter={setFilter} />
          </div>
          <div>
            <PrintThemes themes={filteredThemes} filter={filter} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ThemeTable themes={filteredThemes} />
      </div>
    </>
  );
};

export default ThemeDashBoard;
