import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// @ts-ignore
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      // @ts-ignore
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
