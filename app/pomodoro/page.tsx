"use client";

import FocusTips from "@/components/pomodoro/FocusTips";
import HeroSection from "@/components/pomodoro/HeroSection";

export default function PomodoroPage() {

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      <FocusTips />
    </main>
  );
}