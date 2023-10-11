import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": "/src/components",
      "@ui": "/src/components/ui",
      "@lib": "/src/lib",
      "@hooks": "/src/hooks",
      "@stores": "/src/stores",
      "@types": "/src/types",
    },
  },
});
