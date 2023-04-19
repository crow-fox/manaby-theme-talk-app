import { type FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import AuthGuard from "@/features/auth/AuthGuard";
import AuthProvider from "@/features/auth/AuthProvider";
import ThemesProvider from "@/features/themes/ThemesProvider";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Talk from "@/pages/Talk";

const App: FC = () => {
  return (
    <AuthProvider>
      <ThemesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </ThemesProvider>
    </AuthProvider>
  );
};

export default App;
