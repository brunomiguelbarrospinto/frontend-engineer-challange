import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: { target: browserslistToEsbuild("last 2 chrome versions") }, // Should be for all browsers but i aplly this for task requirement
});
