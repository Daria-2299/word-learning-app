import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    proxy: {
      "/words": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
