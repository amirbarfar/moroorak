"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("home.footer");
  return (
    <footer>
      <div className="container mx-auto flex justify-between px-6 text-sm pt-30 pb-8">
        <span>{t("tagline")}</span>
        <span>{t("credit")}</span>
      </div>
    </footer>
  );
}
