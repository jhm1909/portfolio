import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #0f0f1a 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
          }}
        >
          {tHero("eyebrow")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: "1040px",
            }}
          >
            {t("siteName")}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.4,
              maxWidth: "900px",
              fontWeight: 300,
            }}
          >
            {t("rootDescription")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
