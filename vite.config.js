import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/rubik-3jsx/",
  plugins: [react()],
});
