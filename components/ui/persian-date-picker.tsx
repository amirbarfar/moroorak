"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isToday,
  getDate,
} from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale/fa-IR";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PersianDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const toPersian = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

// Week starts Saturday — maps date-fns getDay() (0=Sun..6=Sat) to col (0=Sat..6=Fri)
const dayToCol = (d: number) => (d + 1) % 7;

const WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export function PersianDatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
}: PersianDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [viewDate, setViewDate] = useState<Date>(
    value ? new Date(value) : new Date()
  );

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayCol = dayToCol(getDay(monthStart));

  const handleSelect = (day: Date) => {
    setSelectedDate(day);
    const y = day.getFullYear();
    const m = String(day.getMonth() + 1).padStart(2, '0');
    const d = String(day.getDate()).padStart(2, '0');
    onChange(`${y}-${m}-${d}`);
    setOpen(false);
  };

  const displayLabel = selectedDate
    ? format(selectedDate, "d MMMM yyyy", { locale: faIR })
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full flex items-center gap-2 px-3 h-11 rounded-xl border border-border bg-background text-sm transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/50",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-right">{displayLabel}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setViewDate(addMonths(viewDate, 1))}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold">
            {format(viewDate, "MMMM", { locale: faIR })}{" "}
            {toPersian(format(viewDate, "yyyy"))}
          </span>
          <button
            type="button"
            onClick={() => setViewDate(subMonths(viewDate, 1))}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="text-center text-xs text-muted-foreground py-1 font-medium"
            >
              {w}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: firstDayCol }).map((_, i) => (
            <div key={`e-${i}`} />
          ))}
          {daysInMonth.map((day) => {
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isTodayDay = isToday(day);
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleSelect(day)}
                className={cn(
                  "h-8 w-full rounded-lg text-xs font-medium transition-all",
                  isSelected && "bg-primary text-primary-foreground",
                  !isSelected && isTodayDay && "bg-accent text-foreground font-bold ring-1 ring-primary/30",
                  !isSelected && !isTodayDay && "hover:bg-accent text-foreground"
                )}
              >
                {toPersian(getDate(day))}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
