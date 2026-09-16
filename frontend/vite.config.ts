import { defineConfig } from "vite";
import path from "path";

// Keep the presentation build portable across Windows and CI environments.
// Vite/esbuild handles TSX directly (tsconfig uses react-jsx), so the SWC
// React plugin is not required for this demo and avoiding it removes the
// native @swc/core binding dependency that was failing on Windows.
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
});
