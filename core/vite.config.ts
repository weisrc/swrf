import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	const dev = mode === "dev";
	return {
		build: {
			emptyOutDir: false,
			lib: {
				formats: dev ? ["es"] : ["cjs", "es", "iife", "umd"],
				entry: dev ? "src/dev/index.ts" : "src/index.ts",
				name: "swrf",
				fileName: (format) => `swrf.${dev ? "dev." : ""}${format}.js`,
			},
		},
	};
});
