"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PomodoroMock() {
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (mode === "focus") {
            setMode("shortBreak");
            return 5 * 60;
          } else if (mode === "shortBreak") {
            setMode("focus");
            return 25 * 60;
          } else if (mode === "longBreak") {
            setMode("focus");
            return 25 * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const switchMode = (newMode: "focus" | "shortBreak" | "longBreak") => {
    setMode(newMode);
    if (newMode === "focus") setTimeLeft(25 * 60);
    if (newMode === "shortBreak") setTimeLeft(5 * 60);
    if (newMode === "longBreak") setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalTime = mode === "focus" ? 25 * 60 : mode === "shortBreak" ? 5 * 60 : 15 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const r = 70;
  const circ = 2 * Math.PI * r;

  return (
    <Card className="w-full max-w-xs rounded-[28px] border-border/60 bg-background/90 shadow-xl">
      <CardContent className="flex flex-col items-center gap-6 p-8">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
          {mode === "focus" ? "تمرکز" : mode === "shortBreak" ? "استراحت کوتاه" : "استراحت بلند"}
        </Badge>

        <div className="relative flex items-center justify-center">
          <svg width="170" height="170" className="-rotate-90">
            <circle cx="85" cy="85" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="85"
              cy="85"
              r={r}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={circ}
              strokeDashoffset={circ - (circ * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-4xl font-black tracking-tight tabular-nums">
              {formatTime(timeLeft)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {mode === "focus" ? "تمرکز عمیق" : "بهت خوش میگذره؟"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === "focus" ? "default" : "outline"}
            onClick={() => switchMode("focus")}
            className="rounded-full px-3 text-xs h-8"
          >
            تمرکز
          </Button>
          <Button
            size="sm"
            variant={mode === "shortBreak" ? "default" : "outline"}
            onClick={() => switchMode("shortBreak")}
            className="rounded-full px-3 text-xs h-8"
          >
            استراحت
          </Button>
          <Button
            size="sm"
            variant={mode === "longBreak" ? "default" : "outline"}
            onClick={() => switchMode("longBreak")}
            className="rounded-full px-3 text-xs h-8"
          >
            بلند
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}