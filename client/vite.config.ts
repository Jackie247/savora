/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "node:path"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react({
		babel: {
			plugins: ['babel-plugin-react-compiler'],
		},
	}), tailwindcss(), svgr()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		environment: "jsdom",
		globals: true, // use APIs globally like Jest https://vitest.dev/config/globals
		setupFiles: ['./setup-vitest.ts']
	},
	server: {
		proxy: {
			"/api": "http://localhost:8080",
		},
	},
});
