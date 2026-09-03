// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jaironacurena.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "nl", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
