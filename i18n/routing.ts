import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko", "vi"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});
