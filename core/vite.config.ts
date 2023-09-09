import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    build: {
      emptyOutDir: false,
      lib: {
        formats: ["es", "cjs", "umd", "iife"],
        entry: "src/" + mode.replace("-", "/"),
        name: "swrf",
        fileName: (format) => `${mode}.${format}.js`
      }
    }
  };
});
