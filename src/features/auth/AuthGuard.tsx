import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { useAuthUser } from "@/features/auth/AuthProvider";

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthUser();

  if (user === null) {
    return <Navigate to="/auth" />;
  }

  if (user === undefined) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default AuthGuard;
