import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" membuat hasil build bisa dibuka dari sub-folder GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "./",
});
