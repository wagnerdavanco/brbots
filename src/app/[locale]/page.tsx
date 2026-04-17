import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <h1 className="text-5xl font-bold brand-text">{t("title")}</h1>
    </main>
  );
}
