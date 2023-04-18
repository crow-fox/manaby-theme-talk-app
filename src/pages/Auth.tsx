import { type FC } from "react";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { login, logout } from "@/features/auth/lib";

const Auth: FC = () => {
  const user = useAuthUser();

  return (
    <>
      <div>Auth</div>
      <p>user: {user?.name}</p>

      <div className="flex flex-wrap items-center gap-x-4">
        {user ? (
          <button
            onClick={logout}
            className=" rounded-md bg-blue-600 px-4 py-2 font-bold text-white"
          >
            ログアウト
          </button>
        ) : (
          <button
            onClick={login}
            className=" rounded-md bg-blue-600 px-4 py-2 font-bold text-white"
          >
            ログイン
          </button>
        )}
      </div>
    </>
  );
};

export default Auth;
