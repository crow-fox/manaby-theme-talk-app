import { useState, type FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { themeFilters, type ThemeFilter } from "@/features/themes/types";
type Props = {
  filter: ThemeFilter;
  handleFilter: (filter: ThemeFilter) => void;
};

const FilterThemes: FC<Props> = ({ handleFilter, filter }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <button className="rounded-md border-2 border-blue-400 bg-white  px-4 py-2 font-bold ">
            絞り込み（{themeFilters[filter]}）
            <span title={open ? "閉じる" : "開く"}>{open ? "↑" : "↓"}</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="z-10 rounded-sm bg-white p-4">
            <div className="flex flex-col   ">
              {Object.entries(themeFilters).map(([key, value]) => (
                <DropdownMenu.Item asChild key={key}>
                  <button
                    className={`border-t border-current p-2 text-left last:border-b ${
                      filter === key ? "bg-gray-600 text-white" : " "
                    }`}
                    onClick={() => {
                      handleFilter(key as ThemeFilter);
                    }}
                  >
                    {value}
                  </button>
                </DropdownMenu.Item>
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default FilterThemes;
