import { type FC, useId, useState, type FormEvent } from "react";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { updateTheme } from "@/features/themes/lib";

type Props = {
  themeId: string;
  title: string;
  talked: boolean;
  handleClose: () => void;
};

const EditThemeDialog: FC<Props> = ({
  themeId,
  title,
  talked,
  handleClose,
}) => {
  const uid = useId();
  const user = useAuthUser();

  const [newTitle, setNewTitle] = useState<string>(title);
  const [newTalked, setNewTalked] = useState<boolean>(talked);

  if (!user) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTheme(user.id, themeId, { title: newTitle, talked: newTalked });
    handleClose();
  };

  return (
    <div role="dialog" aria-labelledby={uid}>
      <h3 id={uid}>編集</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor={`${uid}-title`}>テーマタイトル</label>
          <input
            type="text"
            id={`${uid}-title`}
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor={`${uid}-talked`}>話した？</label>
          <input
            type="checkbox"
            id={`${uid}-talked`}
            checked={newTalked}
            onChange={(e) => {
              setNewTalked(e.target.checked);
            }}
          />
        </p>
        <p>
          <button type="submit">編集を確定</button>
        </p>
      </form>
      <p>
        <button type="button" onClick={handleClose}>
          閉じる
        </button>
      </p>
    </div>
  );
};

export default EditThemeDialog;
