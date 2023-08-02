import deno from "@astrojs/deno";
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: "server",
  adapter: deno()
});