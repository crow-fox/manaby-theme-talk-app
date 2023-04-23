import { useRef, type FC } from "react";
import { useReactToPrint } from "react-to-print";
import { type ThemeFilter, type Theme } from "@/features/themes/types";

type Props = {
  themes: Theme[];
  filter: ThemeFilter;
};

const PrintThemes: FC<Props> = ({ themes, filter }) => {
  const printTargetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printTargetRef.current,
    onAfterPrint: () => {
      if (!triggerRef.current) return;

      triggerRef.current.focus();
    },
    removeAfterPrint: false,
  });

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handlePrint}
        className="rounded-md border-2 border-blue-400 bg-white  px-4 py-2 font-bold "
      >
        印刷
      </button>

      <div hidden key={filter}>
        <div ref={printTargetRef} className="p-8">
          <table className="w-full border-collapse border border-gray-500 text-left">
            <thead>
              <tr className="flex bg-gray-500 p-4  text-white">
                <th className="flex-[0_1_6rem] font-bold ">話した?</th>
                <th className="flex-[999_0_0] font-bold">トークテーマ</th>
              </tr>
            </thead>
            <tbody>
              {themes.map((theme) => (
                <tr
                  key={theme.id}
                  className="mt-[-1px] flex border-t border-t-gray-500 p-4 first:mt-0 "
                >
                  <td className="flex-[0_1_6rem] ">
                    <input type="checkbox" defaultChecked={theme.talked} />
                  </td>
                  <td className="flex-[999_0_0] ">{theme.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PrintThemes;
