"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const items = [
  { title: "آب خوردن", time: "10:00", active: true },
  { title: "مرور یادگیری‌ها", time: "21:00", active: true },
  { title: "ورزش", time: "17:00", active: false },
];

export default function RemindersMock() {
  const [show, setShow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setShow((s) => s <= items.length ? s + 1 : 0);
      return () => clearInterval(t);
    }, 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <Card className="w-full max-w-xs rounded-[28px] mt-20 border-border/60 bg-background/90 shadow-xl">
      <CardContent className="space-y-3 p-8">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">یادآورهای فعال</Badge>
        </div>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-border/60 p-3.5">
            <div className={`h-2 w-2 rounded-full shrink-0 ${show >= i ? "bg-emerald-500" : "bg-white"}`} />
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.time} — {item.active ? "روزانه" : "غیرفعال"}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
