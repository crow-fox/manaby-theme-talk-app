import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // base: mode === "production" ? "/manaby-theme-talk-app" : "/",
    base: process.env.GITHUB_PAGES ? "/github-actions-test" : "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
