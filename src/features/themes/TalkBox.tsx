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

  const finishTalk = () => {
    setTalking("idle");
    setRandomTheme(null);
    navigate("/");
  };

  if (unTalkedThemes.length === 0) {
    // まだ話していないトークテーマがない場合
    return (
      <div className="rounded-md border border-red-400 bg-white p-4">
        <p>
          {themes.length === 0
            ? "トークテーマが登録されていません"
            : "すべてのトークテーマを話し終えました"}
        </p>
        <p>ダッシュボードから追加してください。</p>
        <p className="mt-4 grid ">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="rounded-md bg-blue-300 p-4 font-bold"
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
      <div>
        <button
          className="bg-blue-300 p-4 text-lg font-bold text-gray-800"
          onClick={startTalk}
        >
          トークスタート
        </button>
      </div>
    );
  }

  if (talking === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (talking === "running") {
    return (
      // トークがスタートしていて、まだ話していないテーマがある時
      <div>
        <h3 className="flex flex-wrap text-3xl font-bold ">
          <output>
            お題：
            <span className="border-b-8 border-blue-500">
              {randomTheme ? randomTheme.title : "もうありません"}
            </span>
          </output>
        </h3>
        <ul className="mt-8 flex flex-wrap items-center gap-4">
          <li>
            <button onClick={nextTalk} className="bg-blue-300 p-4  font-bold ">
              次のお題へ
            </button>
          </li>
          <li>
            <button
              onClick={finishTalk}
              className="border-b border-black p-4 font-bold"
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
