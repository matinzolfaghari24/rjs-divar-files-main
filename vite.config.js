import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { paths } from "./src/constants/paths";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      ...paths.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: `/${cur == "src" ? cur : "src/" + cur}`,
        }),
        ""
      ),
    },
  },
});
