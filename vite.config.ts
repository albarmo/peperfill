import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  ssr: {
    external: ["@prisma/client"],
  },
  optimizeDeps: {
    exclude: ["@prisma/client"],
  },
  server: {
    host: true,
  },
});
