"use client";

import Link from "next/link";
import { ArrowDown, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

interface Feature {
  badge: ReactNode;
  id: string;
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

interface HeroSectionProps {
  date: string;
  features: Feature[];
  navStats: Record<string, string>;
}

export default function HeroSection({ date, features }: HeroSectionProps) {
  const t = useTranslations("home");
  const scrollToFeatures = () => {
    const element = document.getElementById("features-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-linear-to-b from-muted/50 h-screen flex justify-center items-center to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--ring)/0.08),transparent_30%)]" />
      <div className="container relative mx-auto px-6 py-16 md:py-40">
        <div className="flex flex-col items-center justify-center text-center">
          <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">{date}</Badge>
          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl mt-5">
            {t("hero.welcome")}
            <span className="block text-primary">{t("hero.brand")}</span>
          </h1>
          <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg mt-5">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {features.map((f) => (
              <Link
                key={f.id}
                href={`#${f.id}`}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-75 ${f.bg} ${f.color}`}
              >
                <f.icon className="h-3 w-3" />
                {f.badge}
              </Link>
            ))}
          </div>

          <Link
            href={'#pomodoro'}
            onClick={scrollToFeatures}
            className="mt-10 cursor-pointer"
          >
          </Link>
        </div>
        <ArrowDown className="h-12 mx-auto animate-bounce" />
      </div>
    </section>
  );
}