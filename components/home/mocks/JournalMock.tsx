"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const lines = ["امروز روز خوبی بود...", "یه چیز جدید یاد گرفتم", "فردا باید زودتر بیدار بشم"];

export default function JournalMock() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => (v < lines.length ? v + 1 : 0)), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <Card className="w-full max-w-xs rounded-[28px] my-20 border-border/60 bg-background/90 shadow-xl">
      <CardContent className="space-y-4 p-8">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">امروز</Badge>
          <span className="text-xs text-muted-foreground">
            {new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long" }).format(new Date())}
          </span>
        </div>
        <p className="text-base font-bold">خاطرات امروز</p>
        <div className="h-px bg-border" />
        <div className="space-y-2 min-h-20">
          {lines.map((line, i) => (
            <p key={i} className={`text-sm text-muted-foreground leading-7 transition-all duration-500 ${i < visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
              {line}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
