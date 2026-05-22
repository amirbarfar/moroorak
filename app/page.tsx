"use client";

import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import { features } from "@/constants/features";
import FeatureSection from "@/components/home/FeatureSection";

const toFarsiDate = () =>
  new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection date={toFarsiDate()} features={features} navStats={{}} />
      <div className="container mx-auto px-6 space-y-20 md:space-y-40">
        {features.map((f, i) => (
          <FeatureSection key={f.id} {...f} reverse={i % 2 === 1} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
