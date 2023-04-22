import { useRef, useState, type FC, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { updateTheme } from "@/features/themes/lib";

type Props = {
  themeId: string;
  title: string;
  talked: boolean;
};

const EditThemeDialog: FC<Props> = ({ themeId, title, talked }) => {
  const user = useAuthUser();
  const [newTheme, setNewTheme] = useState<{ title: string; talked: boolean }>({
    title,
    talked,
  });
  const [open, setOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!user) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTheme.title === title && newTheme.talked === talked) {
      return;
    }

    if (buttonRef.current instanceof HTMLButtonElement) {
      buttonRef.current.focus();
      console.log(buttonRef.current, "buttonRef");
    } else {
      console.log(buttonRef.current, "なし");
    }
    setOpen(false);
    await updateTheme(user.id, themeId, { ...newTheme });
  };

  const onOpenChange = (open: boolean) => {
    console.log("onOpenChange");
    if (!open) {
      setNewTheme({ title, talked });
    }
    setOpen(open);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          ref={buttonRef}
          id={`${themeId}-button`}
          className=" rounded-md bg-gray-600 p-2 font-bold text-white"
        >
          編集
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Dialog.Content className=" grid w-[min(40rem,100%)] gap-6 rounded-md bg-white p-8">
            <Dialog.Title className="text-2xl font-bold ">
              トークテーマを編集
            </Dialog.Title>
            <Form.Root onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <Form.Field name="title" className="grid gap-y-2">
                  <Form.Label className="text-sm ">トークテーマ</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    name="title"
                    className="rounded-sm border border-blue-700 p-4 text-lg"
                    type="text"
                    value={newTheme.title}
                    onChange={(e) => {
                      setNewTheme({ ...newTheme, title: e.target.value });
                    }}
                    required
                    minLength={1}
                  />
                </Form.Field>
                <Form.Field name="talked" className="grid gap-y-2">
                  <Form.Label className="text-sm ">話した？</Form.Label>
                  <Form.Control
                    name="talked"
                    className="rounded-sm border border-blue-700 p-4 text-lg"
                    type="checkbox"
                    checked={newTheme.talked}
                    onChange={(e) => {
                      setNewTheme({ ...newTheme, talked: e.target.checked });
                    }}
                  />
                </Form.Field>
                <div className="grid">
                  <Form.Submit asChild>
                    <button
                      type="submit"
                      className=" rounded-sm bg-blue-600 p-4 font-bold text-white"
                    >
                      編集を確定
                    </button>
                  </Form.Submit>
                </div>
              </div>
            </Form.Root>
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

export default EditThemeDialog;
