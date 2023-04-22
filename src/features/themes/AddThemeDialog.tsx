import { useState, type FC, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { FirebaseError } from "firebase/app";
import Spinner from "@/components/Spinner";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { createTheme } from "@/features/themes/lib";

const AddThemeDialog: FC = () => {
  const user = useAuthUser();
  const [themeTitle, setThemeTitle] = useState("");
  const [open, setOpen] = useState(false);

  if (user === null) return null;
  if (user === undefined) return <Spinner />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (themeTitle === "") return;
    try {
      await createTheme(user.id, themeTitle);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.message);
      }
    }
    setThemeTitle("");
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className=" rounded-md border-2 border-blue-400 bg-white  px-4 py-2 font-bold ">
          <span
            aria-hidden="true"
            className=" mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full  bg-gray-950 text-sm text-white"
          >
            ＋
          </span>
          <span>新規追加</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Dialog.Content className=" grid w-[min(40rem,100%)] gap-6 rounded-md bg-white p-8">
            <Dialog.Title className="text-2xl font-bold ">
              トークテーマを新規追加
            </Dialog.Title>
            <Form.Root onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <Form.Field name="theme-title" className="grid gap-y-2">
                  <Form.Label className="text-sm ">
                    トークテーマを入力
                  </Form.Label>
                  <Form.Control
                    className="rounded-sm border border-blue-700 p-4 text-lg"
                    type="text"
                    value={themeTitle}
                    onChange={(e) => {
                      setThemeTitle(e.target.value);
                    }}
                    required
                    minLength={1}
                  />
                </Form.Field>
                <div className="grid">
                  <Form.Submit asChild>
                    <button
                      type="submit"
                      className=" rounded-sm bg-blue-600 p-4 font-bold text-white"
                    >
                      <span aria-hidden="true">＋ </span>追加
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

export default AddThemeDialog;
