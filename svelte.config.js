import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        appDir: "build",
        adapter: adapter(),
        paths: {
            base: process.argv.includes("dev") ? "" : "/portfolio"
        }
    }
};

export default config;
