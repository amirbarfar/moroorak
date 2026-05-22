"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PersianTimePickerProps {
    value: string;
    onChange: (time: string) => void;
}

const toPersian = (n: number | string) =>
    String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
);

export function PersianTimePicker({ value, onChange }: PersianTimePickerProps) {
    const currentHour = value?.split(":")[0] || "00";
    const rawMinute = value?.split(":")[1] || "00";
    const currentMinute = minutes.reduce((prev, curr) =>
        Math.abs(+curr - +rawMinute) < Math.abs(+prev - +rawMinute) ? curr : prev
    );

    return (
        <div 
            className="flex items-center justify-center h-11 w-full rounded-xl border border-input bg-background px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        >
            <Select
                value={currentHour}
                onValueChange={(h) => onChange(`${h}:${currentMinute}`)}
            >
                <SelectTrigger className="border-0 bg-transparent p-0 h-full w-9 justify-center font-medium shadow-none focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                    <SelectValue>
                        <span>{toPersian(currentHour)}</span>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-52">
                    {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                            {toPersian(h)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span className="text-sm font-medium text-muted-foreground px-1 animate-pulse">:</span>
            <Select
                value={currentMinute}
                onValueChange={(m) => onChange(`${currentHour}:${m}`)}
            >
                <SelectTrigger className="border-0 bg-transparent p-0 h-full w-9 justify-center font-medium shadow-none focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                    <SelectValue>
                        <span>{toPersian(currentMinute)}</span>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                            {toPersian(m)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}