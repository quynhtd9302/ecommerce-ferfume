/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    // Keep the REACT_APP_* variable names used by the app (and in .env) since Create React App
    envPrefix: ["VITE_", "REACT_APP_"],
    define: {
        // sockjs-client expects the Node.js "global" object
        global: "globalThis"
    },
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
    build: {
        outDir: "build",
        // Single bundle on purpose: splitting antd/react into manual chunks breaks the
        // CommonJS init order of antd 4 ("Cannot read properties of undefined (reading 'version')")
        chunkSizeWarningLimit: 1500
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/setupTests.ts"],
        css: false
    }
});
