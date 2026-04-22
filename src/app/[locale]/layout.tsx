import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `BRBots — ${t("title")}`,
    description: t("subtitle"),
    metadataBase: new URL("https://www.brbotssa.com.br"),
    alternates: { languages: { pt: "/pt", en: "/en" } },
    openGraph: {
      title: `BRBots — ${t("title")}`,
      description: t("subtitle"),
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BRBots Informatica S/A",
  url: "https://www.brbotssa.com.br",
  logo: "https://www.brbotssa.com.br/logos/brbots-logo.svg",
  telephone: "+55 11 2391-2687",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Estela, 515 - Conj. 81/82 - Bloco A",
    addressLocality: "Sao Paulo",
    addressRegion: "SP",
    postalCode: "04011-904",
    addressCountry: "BR",
  },
};

const themeInitScript = `
  (() => {
    try {
      const theme = localStorage.getItem("brbots-theme") === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
    } catch {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "pt" | "en")) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
