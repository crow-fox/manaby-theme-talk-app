import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@/features/auth/AuthProvider";
import { login, logout } from "@/features/auth/lib";

const Auth: FC = () => {
  const user = useAuthUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    navigate("/");
    console.log("ログインしました");
  };

  const handleLogout = async () => {
    await logout();
    console.log("ログアウトしました");
  };

  return (
    <div className="mx-auto w-[min(40rem,100%)]">
      {user ? (
        <div className="space-y-6">
          <h2 className=" text-2xl font-bold">ユーザー情報</h2>
          <dl>
            <div className="flex flex-wrap border-y border-gray-600 ">
              <dt className=" flex-[1_0_6rem] p-4 text-xl font-bold">名前</dt>
              <dd className="flex-[999_1_0] p-4 text-xl">{user?.name}</dd>
            </div>
            <div className="mt-[-1px] flex flex-wrap border-y border-gray-600 ">
              <dt className=" flex-[1_0_6rem] p-4 text-xl font-bold">Email</dt>
              <dd className="flex-[999_1_0] p-4 text-xl">{user?.email}</dd>
            </div>
          </dl>
          <p className="flex justify-center">
            <button
              onClick={handleLogout}
              className=" w-96 rounded-md border-2 border-blue-400 bg-blue-200  p-4 text-lg font-bold "
            >
              ログアウト
            </button>
          </p>
        </div>
      ) : (
        <p className="flex justify-center ">
          <button
            onClick={handleLogin}
            className="  w-96 rounded-md border-2 border-blue-400 bg-blue-200  p-4 text-lg font-bold "
          >
            Googleでログイン
          </button>
        </p>
      )}
    </div>
  );
};

export default Auth;
