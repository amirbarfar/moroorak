"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tasks = [
  { title: "جلسه طراحی محصول", time: "09:00" },
  { title: "پیاده‌سازی تایم‌لاین", time: "12:00" },
  { title: "مطالعه Next.js", time: "18:00" },
];

export default function PlanningMock() {
  const [checked, setChecked] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setChecked((c) => (c >= tasks.length ? 0 : c + 1)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <Card className="w-full max-w-xs rounded-[28px] my-20 border-border/60 bg-background/90 shadow-xl">
      <CardContent className="space-y-3 p-8">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs mb-2">امروز</Badge>
        {tasks.map((task, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-all duration-500 ${i < checked ? "border-emerald-500/30 bg-emerald-500/5" : "border-border/60"}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${i < checked ? "border-emerald-500 bg-emerald-500" : "border-border"}`}>
              {i < checked
                ? <CheckCircle2 className="h-4 w-4 text-white" />
                : <Circle className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate transition-all duration-500 ${i < checked ? "line-through text-muted-foreground/50" : ""}`}>{task.title}</p>
              <p className="text-xs text-muted-foreground">{task.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
