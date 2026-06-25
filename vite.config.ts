import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
            {
              name: "router-vendor",
              test: /[\\/]node_modules[\\/](react-router|react-router-dom|@remix-run)[\\/]/,
            },
            {
              name: "query-vendor",
              test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
            },
          ],
        },
      },
    },
  },
});
