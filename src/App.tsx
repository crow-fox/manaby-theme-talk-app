import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import AuthGuard from "@/features/auth/AuthGuard";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Talk from "@/pages/Talk";

const App: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/talk"
          element={
            <AuthGuard>
              <Talk />
            </AuthGuard>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
