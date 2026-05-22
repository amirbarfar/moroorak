"use client";

import Link from "next/link";
import { LucideIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentType } from "react";
import { useTranslations } from "next-intl";

interface FeatureSectionProps {
  id: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  color: string;
  bg: string;
  href: string;
  reverse?: boolean;
  Mock: ComponentType;
}

export default function FeatureSection({
  id, icon: Icon, badge, title, description, color, bg, href, reverse, Mock,
}: FeatureSectionProps) {
  const t = useTranslations("home.feature");
  return (
    <div id={id} className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-last" : ""}`}>
      <div className="space-y-6">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${bg} ${color}`}>
          <Icon className="h-3.5 w-3.5" />
          {badge}
        </div>
        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">{title}</h2>
        <p className="text-base leading-8 text-muted-foreground max-w-lg">{description}</p>
        <Link href={href}>
          <Button className="h-10 rounded-2xl px-5 font-bold gap-2 mt-2 text-sm">
            {t("goTo", { badge })}
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex justify-center">
        <Mock />
      </div>
    </div>
  );
}
