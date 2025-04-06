import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

export default defineConfig({
  prefetch: {
    defaultStrategy: "load",
    prefetchAll: true,
  },
  site: "https://ucicalendar.com",
  integrations: [svelte(), mdx(), sitemap()],
  adapter: vercel(),
});
