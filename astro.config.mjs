import deno from "@astrojs/deno";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: deno(),
    integrations: [tailwind()],
});
