import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@Database": path.resolve(__dirname, "./src/database"),
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Services": path.resolve(__dirname, "./src/services"),
      "@Constants": path.resolve(__dirname, "./src/constants.ts"),
      "@Assets": path.resolve(__dirname, "./src/assets"),
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
      "@Utility": path.resolve(__dirname, "./src/utility"),
    },
  },
  define: {
    global: {
      window: {},
    },
  },
});
