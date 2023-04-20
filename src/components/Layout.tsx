import { type FC, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthUser } from "@/features/auth/AuthProvider";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthUser();

  return (
    <div className="grid min-h-full grid-rows-[auto_1fr_auto] break-all font-sans leading-normal text-gray-900">
      <div>
        <header className="mx-auto flex max-w-[75rem] flex-wrap items-center justify-between  gap-x-4 gap-y-2 px-8 py-4">
          <h1 className="text-2xl font-bold">
            <Link to="/">manabyテーマトーク</Link>
          </h1>
          <div>
            {user && (
              <>
                <p>{user.name}</p>
                <Link to="/auth">ログアウト</Link>
              </>
            )}
          </div>
        </header>
        <div className="mx-auto max-w-[75rem] px-8">
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 ">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "inline-block border-b-4 border-blue-400 py-2 text-lg font-bold"
                      : "inline-block border-b-4 border-transparent py-2 text-lg font-bold text-gray-600"
                  }
                >
                  ダッシュボード
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/talk"
                  className={({ isActive }) =>
                    isActive
                      ? "inline-block border-b-4 border-blue-400 py-2 text-lg font-bold"
                      : "inline-block border-b-4 border-transparent py-2 text-lg font-bold text-gray-600"
                  }
                >
                  話す
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="bg-gray-200 p-8">
        <main className="mx-auto max-w-[60rem]">{children}</main>
      </div>
      <footer className="  px-8 py-2 ">
        <p className="flex justify-center">
          <small>&copy; manaby大阪梅田</small>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
