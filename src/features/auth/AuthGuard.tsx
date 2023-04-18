import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "@/features/auth/AuthProvider";

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthUser();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
