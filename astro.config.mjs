import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
// https://astro.build/config

export default defineConfig({
  root: '.',
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  site: 'https://dev.joshuastuebner.com',
  integrations: [sitemap(), svelte()],
});
