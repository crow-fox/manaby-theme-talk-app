import { useId, type FC } from "react";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { deleteTheme } from "@/features/themes/lib";

type Props = {
  themeId: string;
  title: string;
  talked: boolean;
  resetDeleteTheme: () => void;
};

const DeleteThemeDialog: FC<Props> = ({
  themeId,
  title,
  talked,
  resetDeleteTheme,
}) => {
  const uid = useId();
  const user = useAuthUser();

  if (!user) return null;

  const handleDelete = async () => {
    await deleteTheme(user.id, themeId);
    resetDeleteTheme();
  };

  return (
    <div role="dialog" aria-labelledby={uid}>
      <h3 id={uid}>トークテーマを削除</h3>
      <p>{title}</p>
      <p>{talked ? "話した" : "まだ話してない"}</p>
      <button type="button" onClick={handleDelete}>
        削除
      </button>
    </div>
  );
};

export default DeleteThemeDialog;
