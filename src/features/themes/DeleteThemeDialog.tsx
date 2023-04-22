import { useRef, useState, type FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { deleteTheme } from "@/features/themes/lib";

type Props = {
  themeId: string;
  title: string;
  talked: boolean;
};

const DeleteThemeDialog: FC<Props> = ({ themeId, title, talked }) => {
  const user = useAuthUser();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  if (!user) return null;

  const handleDelete = async () => {
    await deleteTheme(user.id, themeId);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          ref={buttonRef}
          id={`${themeId}-button`}
          className=" rounded-md bg-red-600 p-2 font-bold text-white"
        >
          削除
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Dialog.Content className=" grid w-[min(40rem,100%)] gap-6 rounded-md bg-white p-8">
            <Dialog.Title className="text-2xl font-bold ">
              トークテーマを削除
            </Dialog.Title>
            <div className="grid gap-y-6">
              <dl className="">
                <div className="grid grid-cols-[8rem,1fr]">
                  <dt className="border border-r-0 border-gray-600 p-2">
                    トークテーマ
                  </dt>
                  <dd className="border border-gray-600 p-2">{title}</dd>
                </div>
                <div className="mt-[-1px] grid grid-cols-[8rem,1fr]">
                  <dt className="border border-r-0 border-gray-600 p-2">
                    ステータス
                  </dt>
                  <dd className="border border-gray-600 p-2">
                    {talked ? "話した" : "話してない"}
                  </dd>
                </div>
              </dl>
              <p className="grid">
                <button
                  className=" rounded-sm bg-red-600 p-4 font-bold text-white"
                  onClick={handleDelete}
                >
                  削除を確定
                </button>
              </p>
            </div>
            <div className="flex justify-end ">
              <Dialog.Close asChild>
                <button className=" rounded-sm border border-blue-950 px-4 py-2 font-bold">
                  閉じる
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteThemeDialog;
