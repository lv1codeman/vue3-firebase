import { fileURLToPath, URL } from "node:url";
// import path, { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vue3-firebase/",
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // "@": resolve(__dirname, "./src"),
    },
  },
});
