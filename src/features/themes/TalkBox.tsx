import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { useThemes } from "@/features/themes/ThemesProvider";
import { updateTheme } from "@/features/themes/lib";
import { type Theme } from "@/features/themes/types";

const TalkBox: FC = () => {
  const navigate = useNavigate();
  const user = useAuthUser();
  const themes = useThemes();
  const unTalkedThemes = themes.filter((theme) => !theme.talked);
  const hasUnTalkedTheme = unTalkedThemes.length > 0;
  const [randomTheme, setRandomTheme] = useState<Theme | null>(null);
  const [talking, setTalking] = useState<"idle" | "loading" | "running">(
    "idle"
  );

  if (!user) return null;

  const getRandomTheme = (): Theme | null => {
    if (!hasUnTalkedTheme) return null;

    const _randomTheme = {
      ...unTalkedThemes[Math.floor(Math.random() * unTalkedThemes.length)],
    };

    if (_randomTheme.id === randomTheme?.id) {
      if (unTalkedThemes.length === 1) {
        return null;
      }

      return getRandomTheme();
    }

    return _randomTheme;
  };

  const startTalk = () => {
    if (!hasUnTalkedTheme) return;
    const _randomTheme = getRandomTheme();
    setRandomTheme(_randomTheme);
    setTalking("running");
  };

  const nextTalk = async () => {
    if (!hasUnTalkedTheme) return;
    if (randomTheme === null) return;

    setTalking("loading");
    await updateTheme(user.id, randomTheme.id, { talked: true });

    const _randomTheme = getRandomTheme();
    setRandomTheme(_randomTheme);
    setTalking("running");
  };

  const finishTalk = async () => {
    if (randomTheme === null) return;
    setTalking("loading");
    await updateTheme(user.id, randomTheme.id, { talked: true });
    setRandomTheme(null);
    navigate("/");
    setTalking("idle");
  };

  if (talking === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (unTalkedThemes.length === 0) {
    // まだ話していないトークテーマがない場合
    return (
      <div className="grid w-[min(40rem,100%)] gap-y-4 rounded-md  bg-white p-6">
        <h3 className="text-3xl font-bold">
          {themes.length === 0
            ? "トークテーマが登録されていません"
            : "すべてのトークテーマを話し終えました"}
        </h3>
        <p>ダッシュボードから追加してください。</p>
        <p className="grid justify-center ">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="w-96 rounded-md border-2 border-blue-400 bg-blue-200  p-4 text-lg font-bold"
          >
            ダッシュボードへ
          </button>
        </p>
      </div>
    );
  }

  if (talking === "idle") {
    // トークがスタートしていない時
    return (
      <div className=" grid w-[min(40rem,100%)]">
        <button
          className="rounded-md border-2 border-blue-400 bg-blue-200  p-4 text-lg font-bold "
          onClick={startTalk}
        >
          トークスタート
        </button>
      </div>
    );
  }

  if (talking === "running") {
    return (
      // トークがスタートしていて、まだ話していないテーマがある時
      <div className="grid w-[min(40rem,100%)] gap-y-4 rounded-md bg-white p-6">
        <h3 className="font-bold">トークテーマ</h3>
        <p className="grid place-content-center gap-y-2">
          <output className="text-3xl font-bold  ">
            {randomTheme ? randomTheme.title : "もうありません"}
          </output>
          <span className="flex justify-center gap-x-2">
            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
          </span>
        </p>
        <ul className="mt-8 grid place-items-center gap-y-4 ">
          <li>
            <button
              onClick={nextTalk}
              className="w-96 rounded-md border-2 border-blue-400 bg-blue-200  p-4 text-lg font-bold "
            >
              次のお題へ
            </button>
          </li>
          <li>
            <button
              onClick={finishTalk}
              className="w-96 border-b border-black p-4 text-lg font-bold"
            >
              終了する
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return null;
};

export default TalkBox;
