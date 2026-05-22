"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface PomodoroCardProps {
  focusTime?: number;
  shortBreakTime?: number;
  longBreakTime?: number;
}

export default function PomodoroCard({ 
  focusTime = 25 * 60,
  shortBreakTime = 5 * 60,
  longBreakTime = 15 * 60
}: PomodoroCardProps) {
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const getCurrentTime = useCallback(() => {
    switch (mode) {
      case "focus": return focusTime;
      case "shortBreak": return shortBreakTime;
      case "longBreak": return longBreakTime;
    }
  }, [mode, focusTime, shortBreakTime, longBreakTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(getCurrentTime());
    setIsActive(false);
  }, [getCurrentTime]);

  const switchMode = useCallback((newMode: typeof mode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === "focus") setTimeLeft(focusTime);
    if (newMode === "shortBreak") setTimeLeft(shortBreakTime);
    if (newMode === "longBreak") setTimeLeft(longBreakTime);
  }, [focusTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);

      if (mode === "focus") {
        const newCount = completedPomodoros + 1;
        setCompletedPomodoros(newCount);
        api("/api/pomodoro", { method: "POST" }).catch(() => null);

        if (newCount % 4 === 0) {
          switchMode("longBreak");
        } else {
          switchMode("shortBreak");
        }
      } else {
        switchMode("focus");
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, completedPomodoros, switchMode]);

  useEffect(() => {
    setTimeLeft(getCurrentTime());
  }, [mode, getCurrentTime]);

  const progress = ((getCurrentTime() - timeLeft) / getCurrentTime()) * 100;
  
  const stats = [
    { label: "حالت فعلی", value: mode === "focus" ? "تمرکز" : mode === "shortBreak" ? " کوتاه" : " بلند" },
    { label: "پومودورو", value: `${completedPomodoros}` },
    { label: "پیشرفت", value: `${Math.round(progress)}%` },
  ];

  return (
    <Card className="w-full max-w-sm rounded-[24px] border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl">
      <CardContent className="space-y-4 p-5 sm:space-y-5 sm:p-6">
        <div className="space-y-1.5 text-center">
          <Badge 
            variant="outline" 
            className="rounded-full px-3 py-0.5 text-xs text-blue-600 bg-blue-500/10 border-blue-500/30"
          >
            {mode === "focus" ? "زمان تمرکز" : mode === "shortBreak" ? "استراحت کوتاه" : "استراحت بلند"}
          </Badge>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl tabular-nums">
            {formatTime(timeLeft)}
          </h2>

          <p className="text-xs text-muted-foreground">
            {isActive 
              ? mode === "focus" ? "در حال تمرکز عمیق..." : "در حال استراحت..."
              : mode === "focus" ? "آماده‌ای شروع کنی؟" : "آماده برگشتن به تمرکز؟"}
          </p>
        </div>

        <Progress value={progress} className="h-1.5 rounded-full [&>div]:bg-blue-500" />

        <div className="grid grid-cols-3 gap-2">
          {stats.map((item) => (
            <Card key={item.label} className="rounded-xl border-border/60 bg-muted/40 shadow-none">
              <CardContent className="space-y-0.5 p-2.5 text-center">
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
                <h3 className="text-base font-black">{item.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-2">
          {!isActive ? (
            <Button 
              onClick={() => setIsActive(true)} 
              className="h-9 flex-1 rounded-xl text-xs font-bold bg-blue-500 hover:bg-blue-600"
            >
              شروع
            </Button>
          ) : (
            <Button 
              onClick={() => setIsActive(false)} 
              variant="outline" 
              className="h-9 flex-1 rounded-xl text-xs font-bold"
            >
              مکث
            </Button>
          )}
          <Button 
            onClick={resetTimer} 
            variant="secondary" 
            className="h-9 rounded-xl text-xs font-bold"
          >
            ریست
          </Button>
        </div>

        <div className="flex gap-1.5 justify-center pt-1">
          <Button
            size="sm"
            variant={mode === "focus" ? "default" : "ghost"}
            onClick={() => switchMode("focus")}
            className={`h-7 rounded-lg text-[11px] px-2 ${
              mode === "focus" ? "bg-blue-500 hover:bg-blue-600" : ""
            }`}
          >
            تمرکز
          </Button>
          <Button
            size="sm"
            variant={mode === "shortBreak" ? "default" : "ghost"}
            onClick={() => switchMode("shortBreak")}
            className={`h-7 rounded-lg text-[11px] px-2 ${
              mode === "shortBreak" ? "bg-blue-500 hover:bg-blue-600" : ""
            }`}
          >
            استراحت کوتاه
          </Button>
          <Button
            size="sm"
            variant={mode === "longBreak" ? "default" : "ghost"}
            onClick={() => switchMode("longBreak")}
            className={`h-7 rounded-lg text-[11px] px-2 ${
              mode === "longBreak" ? "bg-blue-500 hover:bg-blue-600" : ""
            }`}
          >
            استراحت بلند
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}