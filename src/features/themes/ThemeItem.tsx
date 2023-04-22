import { memo, type FC } from "react";
import DeleteThemeDialog from "@/features/themes/DeleteThemeDialog";
import EditThemeDialog from "@/features/themes/EditThemeDialog";

type Props = {
  id: string;
  title: string;
  talked: boolean;
};

const ThemeItem: FC<Props> = ({ id, title, talked }) => {
  return (
    <tr
      key={id}
      className=" flex w-full border-t border-gray-600 bg-white p-4 py-2 first:border-t-0"
    >
      <td className="flex-[0_1_6rem]">
        <p className="mt-2">{talked ? "話した" : "まだ"}</p>
      </td>
      <td className="flex-[1_0_auto]">
        <p className="mt-2">{title}</p>
      </td>
      <td className="flex-[0_1_8rem] ">
        <ul className="flex gap-x-4 ">
          <li>
            <EditThemeDialog themeId={id} title={title} talked={talked} />
          </li>
          <li>
            <DeleteThemeDialog themeId={id} title={title} talked={talked} />
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default memo(ThemeItem);
