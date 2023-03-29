import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                babelrc: true,
                plugins: ['module-resolver'],
            },
        }),
        // envCompatible()
    ],
    loader: { '.js': 'jsx' }
});
