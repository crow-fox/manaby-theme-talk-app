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
    <>
      <div>Auth</div>
      <p>user: {user?.name}</p>
      <button
        onClick={() => {
          navigate("/talk");
        }}
      >
        tetetete
      </button>

      <div className="flex flex-wrap items-center gap-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className=" rounded-md bg-blue-600 px-4 py-2 font-bold text-white"
          >
            ログアウト
          </button>
        ) : (
          <button
            onClick={handleLogin}
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
