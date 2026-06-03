"use client";

import Link from "next/link";
import { ArrowDown, LucideIcon, Sparkles } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fade = () =>
    `transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;

  return (
    <section className="relative h-screen flex justify-center items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground)/0.15)_1px,transparent_1px)] bg-size-[28px_28px]" />

      <div
        className="absolute top-1/4 right-1/3 w-lg h-128 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.18), transparent 70%)", animation: "orb1 8s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--ring)/0.14), transparent 70%)", animation: "orb2 10s ease-in-out infinite" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_60%,hsl(var(--background))_100%)]" />

      <style>{`
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,20px) scale(1.08)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-25px) scale(1.06)} }
      `}</style>

      <div className="container relative mx-auto px-6 flex flex-col items-center text-center gap-7">
        <div className={fade()} style={{ transitionDelay: "0ms" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 backdrop-blur-md px-4 py-1.5 text-xs text-muted-foreground shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)] animate-pulse" />
            {date}
          </span>
        </div>

        <div className={fade()} style={{ transitionDelay: "150ms" }}>
          <p className="text-muted-foreground/60 text-lg font-medium mb-2 tracking-wide">همه ابزارات</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05]">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--foreground)) 30%, hsl(var(--foreground)/0.4))" }}
            >
              یه جا،
            </span>
            <br />
            <span className="text-primary">
              مرورک
            </span>
          </h1>
        </div>

        <div className={fade()} style={{ transitionDelay: "300ms" }}>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            برنامه‌ریزی، یادگیری، تمرکز، یادآوری و ثبت خاطرات — همه در یک مکان.
          </p>
        </div>

        <div className={`${fade()} flex flex-wrap gap-2 justify-center`} style={{ transitionDelay: "450ms" }}>
          {features.map((f, i) => (
            <Link
              key={f.id}
              href={`#${f.id}`}
              className={`group flex items-center gap-2 rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:scale-105 hover:shadow-md ${f.color}`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <f.icon className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              {f.badge}
            </Link>
          ))}
        </div>

        <div className={fade()} style={{ transitionDelay: "600ms" }}>
          <Link
            href="#pomodoro"
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{ boxShadow: "0 8px 32px hsl(var(--primary)/0.35)" }}
          >
            <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            شروع کن
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/30">
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}
