import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "dev") {
    return {
      build: {
        emptyOutDir: false,
        lib: {
          formats: ["es"],
          entry: "src/dev/index.ts",
          name: "swrf",
          fileName: (format) => `swrf-dev.${format}.js`
        }
      }
    };
  }

  if (mode === "slim") {
    return {
      build: {
        emptyOutDir: false,
        lib: {
          formats: ["es", "cjs", "umd", "iife"],
          entry: "src/slim.ts",
          name: "swrf",
          fileName: (format) => `swrf-slim.${format}.js`
        }
      }
    };
  }

  return {
    build: {
      emptyOutDir: false,
      lib: {
        formats: ["es", "cjs", "umd", "iife"],
        entry: "src/index.ts",
        name: "swrf",
        fileName: (format) => `swrf.${format}.js`
      }
    }
  };
});
