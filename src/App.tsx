import { type FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import AuthGuard from "@/features/auth/AuthGuard";
import AuthProvider from "@/features/auth/AuthProvider";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Talk from "@/pages/Talk";

const App: FC = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
