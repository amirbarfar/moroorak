"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const items = [
  { title: "useMemo در React", tag: "برنامه‌نویسی", color: "bg-blue-500/10 text-blue-500" },
  { title: "اصول طراحی UI", tag: "طراحی", color: "bg-purple-500/10 text-purple-500" },
  { title: "قانون پارتو", tag: "ایده", color: "bg-rose-500/10 text-rose-500" },
];

export default function LearningMock() {
  const [show, setShow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShow((s) => (s < items.length ? s + 1 : 0)), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <Card className="w-full max-w-xs rounded-[28px] my-20 border-border/60 bg-background/90 shadow-xl">
      <CardContent className="space-y-3 p-8">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">امروز یاد گرفتم</Badge>
          <span className="text-2xl font-black text-primary">{show}</span>
        </div>
        {items.map((item, i) => (
          <div key={i} className={`rounded-2xl border border-border/60 p-4 transition-all duration-500 ${i < show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold truncate">{item.title}</p>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${item.color}`}>{item.tag}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
