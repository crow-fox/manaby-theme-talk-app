import { type FC } from "react";
import { type ThemeFilter } from "@/features/themes/types";

type Props = {
  handleFilter: (filter: ThemeFilter) => void;
};

const FilterThemes: FC<Props> = ({ handleFilter }) => {
  return (
    <>
      <button className="rounded-md border-2 border-blue-400 bg-white  px-4 py-2 font-bold">
        <span>絞り込み</span>
        <span className="ml-2">↓</span>
      </button>
      <div className="">
        <ul>
          <li>
            <button
              onClick={() => {
                handleFilter("all");
              }}
            >
              全て
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleFilter("talked");
              }}
            >
              話したものだけ
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleFilter("untalked");
              }}
            >
              話してないものだけ
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FilterThemes;
