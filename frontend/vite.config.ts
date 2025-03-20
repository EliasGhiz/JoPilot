import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // Removed reactRouter() plugin since we're using inline routes
    tsconfigPaths()
  ],
  server: {
    hmr: {
      overlay: false,
    },
  },
  ssr: {
    noExternal: ['@mui/icons-material'],
  },
});
